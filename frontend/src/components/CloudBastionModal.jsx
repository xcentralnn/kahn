import { useEffect, useRef, useState } from 'react';
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    if (!isOpen) return;

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: 'block',
      fontSize: fontSize,
      fontFamily: 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
      letterSpacing: 0,
      lineHeight: 1.25,
      theme: {
        background: '#0d1117',
        foreground: '#e6edf3',
        cursor: '#58a6ff',
        cursorAccent: '#0d1117',
        selectionBackground: 'rgba(56, 139, 253, 0.35)',
        black: '#484f58',
        red: '#ff7b72',
        green: '#3fb950',
        yellow: '#d29922',
        blue: '#58a6ff',
        magenta: '#bc8cff',
        cyan: '#39c5cf',
        white: '#b1bac4',
        brightBlack: '#6e7681',
        brightRed: '#ffa198',
        brightGreen: '#56d364',
        brightYellow: '#e3b341',
        brightBlue: '#79c0ff',
        brightMagenta: '#d2a8ff',
        brightCyan: '#56d4dd',
        brightWhite: '#f0f6fc'
      },
      allowTransparency: false
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    if (terminalRef.current) {
      term.open(terminalRef.current);
      fitAddon.fit();
    }

    xtermInstance.current = term;
    fitAddonRef.current = fitAddon;

    connectWebSocket();

    const handleResize = () => {
      if (fitAddonRef.current && xtermInstance.current) {
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

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      if (socketRef.current) {
        socketRef.current.close();
      }
      term.dispose();
    };
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fitAddonRef.current && xtermInstance.current) {
        fitAddonRef.current.fit();
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({
            type: 'resize',
            cols: xtermInstance.current.cols,
            rows: xtermInstance.current.rows
          }));
        }
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  const connectWebSocket = () => {
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
      xtermInstance.current.write('\r\n\x1b[31m[Session ended]\x1b[0m\r\n');
    };

    xtermInstance.current.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(new TextEncoder().encode(data));
      }
    });
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
            <button className="mac-dot close" onClick={onClose} title="Close"></button>
            <button className="mac-dot minimize" onClick={() => setFontSize(14)} title="Reset zoom"></button>
            <button className="mac-dot maximize" onClick={() => setIsFullscreen(!isFullscreen)} title="Toggle fullscreen"></button>
          </div>

          <div className="mac-center-title">
            <span className="title-text">kahn - cloud-shell - bash</span>
          </div>

          <div className="mac-titlebar-right">
            <span 
              className={`mac-status-indicator ${status === 'CONNECTED' ? 'online' : ''}`} 
              title={`Status: ${status}`}
            ></span>
          </div>
        </div>

        <div className="bastion-terminal-viewport" ref={terminalRef}></div>
      </div>
    </div>
  );
}
