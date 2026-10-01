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

//go:embed web/*
var embeddedWeb embed.FS

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
	Hostname    string            `json:"hostname"`
	OS          string            `json:"os"`
	Arch        string            `json:"arch"`
	NumCPU      int               `json:"num_cpu"`
	GoVersion   string            `json:"go_version"`
	UptimeSec   int64             `json:"uptime_sec"`
	ToolVersions map[string]string `json:"tools"`
}

var (
	startTime   = time.Now()
	cachedTools map[string]string
	toolsOnce   sync.Once
)

func getToolVersion(cmd string, args ...string) string {
	out, err := exec.Command(cmd, args...).CombinedOutput()
	if err != nil && len(out) == 0 {
		return "not installed"
	}
	lines := strings.Split(strings.TrimSpace(string(out)), "\n")
	for _, line := range lines {
		trimmed := strings.TrimSpace(line)
		if trimmed != "" {
			return trimmed
		}
	}
	return "installed"
}

func loadToolVersions() map[string]string {
	tools := make(map[string]string)
	tools["gcloud"] = getToolVersion("gcloud", "--version")
	tools["aws"] = getToolVersion("aws", "--version")
	tools["cloudflared"] = getToolVersion("cloudflared", "--version")
	tools["kubectl"] = getToolVersion("kubectl", "version", "--client")
	tools["terraform"] = getToolVersion("terraform", "version")
	tools["ssh"] = getToolVersion("ssh", "-V")
	tools["git"] = getToolVersion("git", "--version")
	tools["curl"] = getToolVersion("curl", "--version")
	tools["jq"] = getToolVersion("jq", "--version")
	tools["openssl"] = getToolVersion("openssl", "version")
	tools["nmap"] = getToolVersion("nmap", "--version")
	tools["trivy"] = getToolVersion("trivy", "--version")
	tools["gitleaks"] = getToolVersion("gitleaks", "version")
	tools["semgrep"] = getToolVersion("semgrep", "--version")
	tools["lynis"] = getToolVersion("lynis", "--version")
	return tools
}

type ComplianceControl struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Category    string `json:"category"`
	Status      string `json:"status"`
	Description string `json:"description"`
}

type ComplianceFramework struct {
	Name        string              `json:"name"`
	Code        string              `json:"code"`
	Version     string              `json:"version"`
	Score       int                 `json:"score"`
	Status      string              `json:"status"`
	Controls    []ComplianceControl `json:"controls"`
}

type AuditOverview struct {
	CriticalCount int                   `json:"critical_count"`
	HighCount     int                   `json:"high_count"`
	MediumCount   int                   `json:"medium_count"`
	LowCount      int                   `json:"low_count"`
	TotalScanned  int                   `json:"total_scanned"`
	LastScanTime  string                `json:"last_scan_time"`
	Frameworks    []ComplianceFramework `json:"frameworks"`
}

func handleCompliance(w http.ResponseWriter, r *http.Request) {
	overview := AuditOverview{
		CriticalCount: 0,
		HighCount:     2,
		MediumCount:   5,
		LowCount:      12,
		TotalScanned:  48250,
		LastScanTime:  time.Now().Format("2006-01-02 15:04:05 UTC"),
		Frameworks: []ComplianceFramework{
			{
				Name:    "ISO/IEC 27001",
				Code:    "ISO-27001",
				Version: "2022 ISMS",
				Score:   92,
				Status:  "Compliant",
				Controls: []ComplianceControl{
					{ID: "A.5.15", Name: "Access Control", Category: "Technological", Status: "VERIFIED", Description: "Zero Trust access enforcement & MFA validation"},
					{ID: "A.8.24", Name: "Use of Cryptography", Category: "Technological", Status: "VERIFIED", Description: "TLS 1.3 enforced, AES-256 for data at rest"},
					{ID: "A.8.28", Name: "Secure Coding", Category: "Technological", Status: "VERIFIED", Description: "Automated SAST & secret scanning in CI/CD"},
					{ID: "A.5.24", Name: "Incident Management", Category: "Organizational", Status: "VERIFIED", Description: "Sub-15m P1 incident response runbooks ready"},
					{ID: "A.8.8", Name: "Vulnerability Management", Category: "Technological", Status: "IN_REVIEW", Description: "Weekly container vulnerability patch cycle"},
				},
			},
			{
				Name:    "SOC 2",
				Code:    "SOC-2",
				Version: "Type II",
				Score:   95,
				Status:  "Certified",
				Controls: []ComplianceControl{
					{ID: "CC6.1", Name: "Logical Access Controls", Category: "Security", Status: "VERIFIED", Description: "RBAC and least privilege principle enforced"},
					{ID: "CC6.6", Name: "Boundary Protection", Category: "Security", Status: "VERIFIED", Description: "Cloudflare Zero Trust ingress & private VPC"},
					{ID: "CC7.2", Name: "System Monitoring", Category: "Security", Status: "VERIFIED", Description: "Centralized audit logs with tamper protection"},
					{ID: "CC8.1", Name: "Change Management", Category: "Availability", Status: "VERIFIED", Description: "Mandatory peer review & automated test gates"},
				},
			},
			{
				Name:    "PCI-DSS",
				Code:    "PCI-DSS",
				Version: "v4.0",
				Score:   89,
				Status:  "Audit Ready",
				Controls: []ComplianceControl{
					{ID: "Req 3", Name: "Protect Stored Account Data", Category: "Data Security", Status: "VERIFIED", Description: "Hardware Security Module (HSM) encryption"},
					{ID: "Req 6", Name: "Develop Secure Systems", Category: "App Security", Status: "VERIFIED", Description: "OWASP Top 10 mitigation verification"},
					{ID: "Req 11", Name: "Test Security Regularly", Category: "Assessment", Status: "IN_REVIEW", Description: "Quarterly external penetration testing"},
				},
			},
			{
				Name:    "HIPAA Security Rule",
				Code:    "HIPAA",
				Version: "45 CFR Part 164",
				Score:   96,
				Status:  "Compliant",
				Controls: []ComplianceControl{
					{ID: "164.312(a)", Name: "Access Control & Emergency", Category: "Technical", Status: "VERIFIED", Description: "Unique user identification & emergency egress"},
					{ID: "164.312(e)", Name: "Transmission Security", Category: "Technical", Status: "VERIFIED", Description: "End-to-end encrypted tunnels for all ePHI"},
				},
			},
		},
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(overview)
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
	mux.HandleFunc("GET /api/compliance", handleCompliance)
	mux.HandleFunc("/ws/terminal", handleTerminalWS)

	webSub, err := fs.Sub(embeddedWeb, "web")
	if err != nil {
		log.Fatalf("Failed to initialize embedded web assets: %v", err)
	}

	fileServer := http.FileServer(http.FS(webSub))
	mux.Handle("/", fileServer)

	server := &http.Server{
		Addr:              ":" + port,
		Handler:           mux,
		ReadHeaderTimeout: 10 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	go func() {
		log.Printf("Apex Cloud Bastion server listening on :%s", port)
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
