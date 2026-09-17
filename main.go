package main

import (
	"context"
	"embed"
	"encoding/json"
	"errors"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"runtime"
	"strings"
	"sync"
	"syscall"
	"time"

	"github.com/creack/pty"
	"github.com/gorilla/websocket"
)

//go:embed all:dist
var distFS embed.FS

var upgrader = websocket.Upgrader{
	ReadBufferSize:  4096,
	WriteBufferSize: 4096,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type WindowSize struct {
	Type string `json:"type"`
	Cols uint16 `json:"cols"`
	Rows uint16 `json:"rows"`
}

type SystemInfo struct {
	Hostname     string            `json:"hostname"`
	OS           string            `json:"os"`
	Arch         string            `json:"arch"`
	NumCPU       int               `json:"num_cpu"`
	GoVersion    string            `json:"go_version"`
	UptimeSec    int64             `json:"uptime_sec"`
	ToolVersions map[string]string `json:"tools"`
}

var (
	startTime   = time.Now()
	cachedTools map[string]string
	toolsOnce   sync.Once
)

func getToolVersion(cmd string, args ...string) string {
	out, err := exec.Command(cmd, args...).Output()
	if err != nil {
		return "not installed"
	}
	lines := strings.Split(strings.TrimSpace(string(out)), "\n")
	if len(lines) > 0 {
		return lines[0]
	}
	return "installed"
}

func loadToolVersions() map[string]string {
	tools := make(map[string]string)
	tools["gcloud"] = getToolVersion("gcloud", "--version")
	tools["aws"] = getToolVersion("aws", "--version")
	tools["cloudflared"] = getToolVersion("cloudflared", "--version")
	tools["kubectl"] = getToolVersion("kubectl", "version", "--client=true", "--short")
	tools["terraform"] = getToolVersion("terraform", "version")
	tools["ssh"] = getToolVersion("ssh", "-V")
	tools["git"] = getToolVersion("git", "--version")
	tools["curl"] = getToolVersion("curl", "--version")
	tools["jq"] = getToolVersion("jq", "--version")
	return tools
}

func handleSystemInfo(w http.ResponseWriter, r *http.Request) {
	toolsOnce.Do(func() {
		cachedTools = loadToolVersions()
	})

	hostname, _ := os.Hostname()
	info := SystemInfo{
		Hostname:     hostname,
		OS:           runtime.GOOS,
		Arch:         runtime.GOARCH,
		NumCPU:       runtime.NumCPU(),
		GoVersion:    runtime.Version(),
		UptimeSec:    int64(time.Since(startTime).Seconds()),
		ToolVersions: cachedTools,
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(info)
}

func handleHealthz(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write([]byte(`{"status":"ok"}`))
}

func handleTerminalWS(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WebSocket upgrade failed: %v", err)
		return
	}
	defer conn.Close()

	shell := os.Getenv("SHELL")
	if shell == "" {
		shell = "/bin/bash"
	}

	cmd := exec.Command(shell)
	cmd.Env = append(os.Environ(),
		"TERM=xterm-256color",
		"COLORTERM=truecolor",
		"HOME=/root",
		"USER=root",
		"SHELL="+shell,
	)

	ptyFile, err := pty.Start(cmd)
	if err != nil {
		log.Printf("Failed to spawn PTY: %v", err)
		_ = conn.WriteMessage(websocket.TextMessage, []byte(fmt.Sprintf("\r\nFailed to start terminal: %v\r\n", err)))
		return
	}
	defer func() {
		_ = ptyFile.Close()
		if cmd.Process != nil {
			_ = cmd.Process.Kill()
			_, _ = cmd.Process.Wait()
		}
	}()

	_ = pty.Setsize(ptyFile, &pty.Winsize{Rows: 30, Cols: 100})

	errChan := make(chan error, 2)

	go func() {
		buf := make([]byte, 2048)
		for {
			n, err := ptyFile.Read(buf)
			if n > 0 {
				if wErr := conn.WriteMessage(websocket.BinaryMessage, buf[:n]); wErr != nil {
					errChan <- wErr
					return
				}
			}
			if err != nil {
				errChan <- err
				return
			}
		}
	}()

	go func() {
		for {
			msgType, payload, err := conn.ReadMessage()
			if err != nil {
				errChan <- err
				return
			}

			if msgType == websocket.TextMessage && len(payload) > 0 && payload[0] == '{' {
				var size WindowSize
				if jErr := json.Unmarshal(payload, &size); jErr == nil && size.Type == "resize" {
					if size.Cols > 0 && size.Rows > 0 {
						_ = pty.Setsize(ptyFile, &pty.Winsize{Cols: size.Cols, Rows: size.Rows})
					}
					continue
				}
			}

			if _, wErr := ptyFile.Write(payload); wErr != nil {
				errChan <- wErr
				return
			}
		}
	}()

	select {
	case <-errChan:
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", handleHealthz)
	mux.HandleFunc("GET /api/system", handleSystemInfo)
	mux.HandleFunc("/ws/terminal", handleTerminalWS)

	distSub, err := fs.Sub(distFS, "dist")
	if err != nil {
		log.Fatalf("Failed to initialize dist assets: %v", err)
	}

	fileServer := http.FileServer(http.FS(distSub))
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := strings.TrimPrefix(r.URL.Path, "/")
		if path == "" {
			fileServer.ServeHTTP(w, r)
			return
		}
		f, err := distSub.Open(path)
		if err == nil {
			_ = f.Close()
			fileServer.ServeHTTP(w, r)
			return
		}
		r.URL.Path = "/"
		fileServer.ServeHTTP(w, r)
	})

	server := &http.Server{
		Addr:              ":" + port,
		Handler:           mux,
		ReadHeaderTimeout: 10 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	go func() {
		log.Printf("Valnia Cloud Bastion server listening on :%s", port)
		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("Server error: %v", err)
		}
	}()

	<-stop
	log.Println("Shutting down server gracefully...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server shutdown failed: %v", err)
	}
	log.Println("Server stopped")
}
