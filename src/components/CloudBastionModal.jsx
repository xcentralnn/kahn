import React, { useEffect, useRef, useState } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, RotateCcw, Activity, Shield, Cloud, Server } from 'lucide-react';
import { Terminal } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import 'xterm/css/xterm.css';
import './bastion.css';

export default function CloudBastionModal({ isOpen, onClose }) {
  const terminalRef = useRef(null);
  const xtermInstance = useRef(null);
  const fitAddonRef = useRef(null);
  const socketRef = useRef(null);
  
  const [status, setStatus] = useState('CONNECTING');
  const [latency, setLatency] = useState('12ms');
  const [sessionUptime, setSessionUptime] = useState('00:00');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showSysInfo, setShowSysInfo] = useState(false);
  const [sysInfoData, setSysInfoData] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: 'bar',
      fontSize: fontSize,
      fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, monospace",
      theme: {
        background: '#090d16',
        foreground: '#f1f5f9',
        cursor: '#38bdf8',
        selectionBackground: 'rgba(56, 189, 248, 0.3)',
        black: '#1e293b',
        red: '#f87171',
        green: '#34d399',
        yellow: '#fbbf24',
        blue: '#60a5fa',
        magenta: '#c084fc',
        cyan: '#38bdf8',
        white: '#f1f5f9',
        brightBlack: '#64748b',
        brightRed: '#fca5a5',
        brightGreen: '#6ee7b7',
        brightYellow: '#fde047',
        brightBlue: '#93c5fd',
        brightMagenta: '#d8b4fe',
        brightCyan: '#7dd3fc',
        brightWhite: '#ffffff'
      },
      allowTransparency: true,
      lineHeight: 1.25
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    xtermInstance.current = term;
    fitAddonRef.current = fitAddon;

    if (terminalRef.current) {
      terminalRef.current.innerHTML = '';
      term.open(terminalRef.current);
      setTimeout(() => fitAddon.fit(), 100);
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/terminal`;
    
    const socket = new WebSocket(wsUrl);
    socket.binaryType = 'arraybuffer';
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus('CONNECTED');
      if (fitAddonRef.current && xtermInstance.current) {
        fitAddonRef.current.fit();
        socket.send(JSON.stringify({
          type: 'resize',
          cols: xtermInstance.current.cols,
          rows: xtermInstance.current.rows
        }));
      }
      term.focus();
    };

    socket.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        const text = new TextDecoder().decode(event.data);
        term.write(text);
      } else {
        term.write(event.data);
      }
    };

    socket.onclose = () => {
      setStatus('DISCONNECTED');
      term.write('\r\n\x1b[31m[Session terminated. Click Reconnect to restart PTY]\x1b[0m\r\n');
    };

    socket.onerror = (err) => {
      console.error('Terminal WebSocket error:', err);
      setStatus('ERROR');
    };

    term.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(new TextEncoder().encode(data));
      }
    });

    const handleResize = () => {
      if (fitAddonRef.current && socket.readyState === WebSocket.OPEN) {
        fitAddonRef.current.fit();
        socket.send(JSON.stringify({
          type: 'resize',
          cols: term.cols,
          rows: term.rows
        }));
      }
    };
    window.addEventListener('resize', handleResize);

    const start = Date.now();
    const uptimeTimer = setInterval(() => {
      const sec = Math.floor((Date.now() - start) / 1000);
      const mins = Math.floor(sec / 60);
      const s = sec % 60;
      setSessionUptime(`${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);

    const pingTimer = setInterval(() => {
      const pingStart = Date.now();
      fetch('/healthz')
        .then(() => {
          setLatency(`${Date.now() - pingStart}ms`);
        })
        .catch(() => setLatency('--'));
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(uptimeTimer);
      clearInterval(pingTimer);
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
      term.dispose();
    };
  }, [isOpen]);

  const sendCommand = (cmd) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(new TextEncoder().encode(cmd + '\n'));
      if (xtermInstance.current) {
        xtermInstance.current.focus();
      }
    }
  };

  const handleReconnect = () => {
    if (xtermInstance.current) {
      xtermInstance.current.reset();
    }
    if (socketRef.current) {
      try { socketRef.current.close(); } catch(e) {}
    }
    setStatus('CONNECTING');
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/terminal`;
    const socket = new WebSocket(wsUrl);
    socket.binaryType = 'arraybuffer';
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus('CONNECTED');
      if (fitAddonRef.current && xtermInstance.current) {
        fitAddonRef.current.fit();
        socket.send(JSON.stringify({
          type: 'resize',
          cols: xtermInstance.current.cols,
          rows: xtermInstance.current.rows
        }));
      }
      xtermInstance.current.focus();
    };

    socket.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        const text = new TextDecoder().decode(event.data);
        xtermInstance.current.write(text);
      } else {
        xtermInstance.current.write(event.data);
      }
    };

    socket.onclose = () => {
      setStatus('DISCONNECTED');
      xtermInstance.current.write('\r\n\x1b[31m[Session terminated. Click Reconnect to restart PTY]\x1b[0m\r\n');
    };

    xtermInstance.current.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(new TextEncoder().encode(data));
      }
    });
  };

  const handleClear = () => {
    if (xtermInstance.current) {
      xtermInstance.current.clear();
      xtermInstance.current.focus();
    }
  };

  const changeFontSize = (delta) => {
    const next = Math.max(10, Math.min(22, fontSize + delta));
    setFontSize(next);
    if (xtermInstance.current && fitAddonRef.current) {
      xtermInstance.current.options.fontSize = next;
      fitAddonRef.current.fit();
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({
          type: 'resize',
          cols: xtermInstance.current.cols,
          rows: xtermInstance.current.rows
        }));
      }
    }
  };

  const fetchSysInfo = () => {
    setShowSysInfo(true);
    fetch('/api/system')
      .then(r => r.json())
      .then(d => setSysInfoData(d))
      .catch(() => setSysInfoData(null));
  };

  if (!isOpen) return null;

  return (
    <div className="bastion-modal-overlay">
      <div className={`bastion-modal-container ${isFullscreen ? 'fullscreen' : ''}`}>
        
        {/* Modal Header */}
        <div className="bastion-header">
          <div className="bastion-brand">
            <div className="bastion-icon">
              <TerminalIcon size={18} />
            </div>
            <div>
              <div className="bastion-title">VALNIA CLOUD BASTION</div>
              <div className="bastion-sub">Ubuntu 24.04 LTS &bull; Multi-Cloud Jump Host</div>
            </div>
          </div>

          <div className="bastion-targets">
            <div className="cloud-chip cf">
              <span className="dot"></span>
              <span className="name">Cloudflare</span>
              <span className="state">Tunnel</span>
            </div>
            <div className="cloud-chip aws">
              <span className="dot"></span>
              <span className="name">AWS</span>
              <span className="state">CLI v2</span>
            </div>
            <div className="cloud-chip gcp">
              <span className="dot"></span>
              <span className="name">GCP</span>
              <span className="state">gcloud</span>
            </div>
            <div className="cloud-chip k8s">
              <span className="dot"></span>
              <span className="name">K8s</span>
              <span className="state">kubectl</span>
            </div>
          </div>

          <div className="bastion-telemetry">
            <div className="tele-item">
              <span className="t-label">STATUS</span>
              <span className={`t-val ${status === 'CONNECTED' ? 'online' : ''}`}>{status}</span>
            </div>
            <div className="tele-item">
              <span className="t-label">LATENCY</span>
              <span className="t-val">{latency}</span>
            </div>
            <div className="tele-item">
              <span className="t-label">UPTIME</span>
              <span className="t-val">{sessionUptime}</span>
            </div>
          </div>

          <button className="bastion-close-btn" onClick={onClose} aria-label="Close terminal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="bastion-body">
          {/* Sidebar Quick Command Macros */}
          <aside className="bastion-sidebar">
            <div className="sidebar-sec-title">COMMAND MACROS</div>
            
            <div className="macro-section">
              <div className="m-group-header">&#9889; Cloudflare Tunnel</div>
              <button className="m-cmd-btn" onClick={() => sendCommand('cloudflared --version')}>cloudflared --version</button>
              <button className="m-cmd-btn" onClick={() => sendCommand('cloudflared tunnel list')}>cloudflared tunnel list</button>
              <button className="m-cmd-btn" onClick={() => sendCommand('cloudflared access login')}>cloudflared access login</button>
            </div>

            <div className="macro-section">
              <div className="m-group-header">&#9729; Amazon Web Services</div>
              <button className="m-cmd-btn" onClick={() => sendCommand('aws sts get-caller-identity')}>aws sts get-caller-identity</button>
              <button className="m-cmd-btn" onClick={() => sendCommand('aws s3 ls')}>aws s3 ls</button>
              <button className="m-cmd-btn" onClick={() => sendCommand('aws ecs list-clusters')}>aws ecs list-clusters</button>
            </div>

            <div className="macro-section">
              <div className="m-group-header">&#128640; Google Cloud Platform</div>
              <button className="m-cmd-btn" onClick={() => sendCommand('gcloud auth list')}>gcloud auth list</button>
              <button className="m-cmd-btn" onClick={() => sendCommand('gcloud projects list')}>gcloud projects list</button>
              <button className="m-cmd-btn" onClick={() => sendCommand('gcloud compute instances list')}>gcloud compute instances</button>
            </div>

            <div className="macro-section">
              <div className="m-group-header">&#9881; IaC & Kubernetes</div>
              <button className="m-cmd-btn" onClick={() => sendCommand('kubectl version --client')}>kubectl version</button>
              <button className="m-cmd-btn" onClick={() => sendCommand('kubectl get nodes')}>kubectl get nodes</button>
              <button className="m-cmd-btn" onClick={() => sendCommand('terraform version')}>terraform version</button>
            </div>

            <div className="macro-section">
              <div className="m-group-header">&#128269; Diagnostics</div>
              <button className="m-cmd-btn" onClick={() => sendCommand('curl -s ifconfig.me && echo ""')}>Public IP</button>
              <button className="m-cmd-btn" onClick={() => sendCommand('df -h')}>Disk Space</button>
              <button className="m-cmd-btn" onClick={() => sendCommand('free -m')}>Memory</button>
              <button className="m-cmd-btn" onClick={() => sendCommand('uname -a')}>Kernel info</button>
            </div>

            <button className="btn-sysinfo-trigger" onClick={fetchSysInfo}>
              <span>&#9432;</span> Installed Toolsets
            </button>
          </aside>

          {/* Main Terminal Viewport */}
          <main className="bastion-terminal-main">
            <div className="term-window-topbar">
              <div className="term-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="term-tab-title">
                <TerminalIcon size={14} className="term-tab-icon" />
                <span>root@valnia-bastion: ~ (bash PTY)</span>
              </div>
              <div className="term-ctrl-btns">
                <button className="ctrl-action-btn" onClick={handleClear} title="Clear Screen">Clear</button>
                <button className="ctrl-action-btn" onClick={() => changeFontSize(-1)} title="Decrease Font">A-</button>
                <button className="ctrl-action-btn" onClick={() => changeFontSize(1)} title="Increase Font">A+</button>
                <button className="ctrl-action-btn highlight" onClick={handleReconnect} title="Restart PTY">
                  <RotateCcw size={12} />
                  <span>Reconnect</span>
                </button>
                <button className="ctrl-action-btn" onClick={() => setIsFullscreen(!isFullscreen)} title="Fullscreen">
                  {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
              </div>
            </div>

            <div className="term-viewport" ref={terminalRef}></div>
          </main>
        </div>
      </div>

      {/* System Info Popup */}
      {showSysInfo && (
        <div className="bastion-submodal-overlay" onClick={() => setShowSysInfo(false)}>
          <div className="bastion-submodal" onClick={e => e.stopPropagation()}>
            <div className="submodal-header">
              <div className="submodal-title">Installed DevOps Toolsets</div>
              <button className="submodal-close" onClick={() => setShowSysInfo(false)}>&times;</button>
            </div>
            <div className="submodal-body">
              {sysInfoData ? (
                <>
                  <div className="host-badge">
                    Host: <strong>{sysInfoData.hostname}</strong> &bull; {sysInfoData.os}/{sysInfoData.arch} &bull; Go {sysInfoData.go_version} &bull; {sysInfoData.num_cpu} CPUs
                  </div>
                  <div className="toolset-grid">
                    {Object.entries(sysInfoData.tools || {}).map(([tool, ver]) => (
                      <div className="toolset-card" key={tool}>
                        <div className="tool-tag">{tool}</div>
                        <div className="tool-ver">{ver}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="loading-state">Loading tool telemetry...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
