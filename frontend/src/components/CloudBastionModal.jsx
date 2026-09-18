import React, { useEffect, useRef, useState } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, RotateCcw, Activity } from 'lucide-react';
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
      fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
      theme: {
        background: '#080c14',
        foreground: '#f8fafc',
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
      term.write('\r\n\x1b[31m[Session disconnected. Click Reconnect to restart PTY]\x1b[0m\r\n');
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
        .catch(() => setLatency('err'));
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
      xtermInstance.current.write('\r\n\x1b[31m[Session disconnected. Click Reconnect to restart PTY]\x1b[0m\r\n');
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
    <div className="bastion-modal-overlay" onClick={onClose}>
      <div 
        className={`bastion-modal-container ${isFullscreen ? 'fullscreen' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="bastion-window-titlebar">
          <div className="mac-dots">
            <button className="mac-dot close" onClick={onClose} title="Close terminal"></button>
            <button className="mac-dot minimize" onClick={() => setFontSize(14)} title="Reset font"></button>
            <button className="mac-dot maximize" onClick={() => setIsFullscreen(!isFullscreen)} title="Toggle fullscreen"></button>
          </div>

          <div className="mac-tab">
            <TerminalIcon size={12} className="tab-glyph" />
            <span className="tab-title">root@valnia-bastion: ~ (bash PTY)</span>
          </div>

          <div className="titlebar-telemetry">
            <div className={`status-pill ${status === 'CONNECTED' ? 'online' : ''}`}>
              <span className="status-dot"></span>
              <span>{status}</span>
            </div>
            <div className="metric-pill">
              <span className="metric-label">RTT</span>
              <span className="metric-val">{latency}</span>
            </div>
            <div className="metric-pill">
              <span className="metric-label">UPTIME</span>
              <span className="metric-val">{sessionUptime}</span>
            </div>
          </div>

          <div className="titlebar-actions">
            <button className="tb-btn" onClick={fetchSysInfo} title="View installed DevOps toolsets">
              <Activity size={12} />
              <span>Toolsets</span>
            </button>
            <button className="tb-btn" onClick={handleClear} title="Clear terminal">Clear</button>
            <button className="tb-btn font-btn" onClick={() => changeFontSize(-1)} title="Decrease font">A-</button>
            <button className="tb-btn font-btn" onClick={() => changeFontSize(1)} title="Increase font">A+</button>
            <button className="tb-btn highlight" onClick={handleReconnect} title="Restart session">
              <RotateCcw size={11} />
              <span>Reconnect</span>
            </button>
            <button className="tb-btn icon-btn" onClick={() => setIsFullscreen(!isFullscreen)} title="Toggle fullscreen">
              {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            </button>
            <button className="tb-btn icon-btn close-btn" onClick={onClose} title="Close">
              <X size={13} />
            </button>
          </div>
        </div>

        <div className="bastion-quick-bar">
          <div className="quick-category">
            <span className="qb-badge cf">Cloudflare</span>
            <button className="qb-chip" onClick={() => sendCommand('cloudflared --version')}>cloudflared -v</button>
            <button className="qb-chip" onClick={() => sendCommand('cloudflared tunnel list')}>tunnel list</button>
          </div>

          <div className="quick-category">
            <span className="qb-badge aws">AWS</span>
            <button className="qb-chip" onClick={() => sendCommand('aws sts get-caller-identity')}>caller-identity</button>
            <button className="qb-chip" onClick={() => sendCommand('aws s3 ls')}>s3 ls</button>
          </div>

          <div className="quick-category">
            <span className="qb-badge gcp">GCP</span>
            <button className="qb-chip" onClick={() => sendCommand('gcloud auth list')}>auth list</button>
            <button className="qb-chip" onClick={() => sendCommand('gcloud projects list')}>projects list</button>
          </div>

          <div className="quick-category">
            <span className="qb-badge k8s">K8s &amp; IaC</span>
            <button className="qb-chip" onClick={() => sendCommand('kubectl version --client')}>kubectl -v</button>
            <button className="qb-chip" onClick={() => sendCommand('terraform version')}>terraform -v</button>
          </div>

          <div className="quick-category">
            <span className="qb-badge sys">System</span>
            <button className="qb-chip" onClick={() => sendCommand('curl -s ifconfig.me && echo ""')}>public ip</button>
            <button className="qb-chip" onClick={() => sendCommand('df -h')}>df -h</button>
            <button className="qb-chip" onClick={() => sendCommand('free -m')}>free -m</button>
            <button className="qb-chip" onClick={() => sendCommand('uname -a')}>uname -a</button>
          </div>
        </div>

        <div className="bastion-terminal-viewport" ref={terminalRef}></div>
      </div>

      {showSysInfo && (
        <div className="bastion-submodal-overlay" onClick={() => setShowSysInfo(false)}>
          <div className="bastion-submodal" onClick={e => e.stopPropagation()}>
            <div className="submodal-header">
              <div className="submodal-title">Installed Cloud &amp; DevOps Toolsets</div>
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
