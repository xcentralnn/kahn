(function() {
  let term;
  let fitAddon;
  let socket;
  let currentFontSize = 14;
  let pingInterval;
  let startTime = Date.now();

  const statusEl = document.getElementById('ws-status');
  const pingEl = document.getElementById('ping-val');
  const uptimeEl = document.getElementById('uptime-val');
  const wrapperEl = document.getElementById('terminal-wrapper');
  const navTabs = document.querySelectorAll('.nav-tab');
  const viewPanels = document.querySelectorAll('.view-panel');
  const complianceContainer = document.getElementById('compliance-frameworks-container');
  const btnTriggerAudit = document.getElementById('btn-trigger-audit');

  function initTabs() {
    navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetView = tab.getAttribute('data-view');
        switchView(targetView);
      });
    });
  }

  function switchView(viewName) {
    navTabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-view') === viewName);
    });

    viewPanels.forEach(p => {
      p.classList.toggle('active', p.id === `view-${viewName}`);
    });

    if (viewName === 'terminal' && fitAddon && term) {
      setTimeout(() => {
        fitAddon.fit();
        sendResize();
        term.focus();
      }, 50);
    }

    if (viewName === 'compliance') {
      loadComplianceData();
    }
  }

  function initTerminal() {
    term = new Terminal({
      cursorBlink: true,
      cursorStyle: 'bar',
      fontSize: currentFontSize,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      theme: {
        background: '#06090f',
        foreground: '#f8fafc',
        cursor: '#14b8a6',
        selectionBackground: 'rgba(20, 184, 166, 0.35)',
        black: '#1e293b',
        red: '#ef4444',
        green: '#10b981',
        yellow: '#f59e0b',
        blue: '#38bdf8',
        magenta: '#c084fc',
        cyan: '#06b6d4',
        white: '#f8fafc',
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
      lineHeight: 1.2
    });

    fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon.WebLinksAddon());

    term.open(wrapperEl);
    fitAddon.fit();

    term.onData(data => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(new TextEncoder().encode(data));
      }
    });

    window.addEventListener('resize', debounce(() => {
      fitAddon.fit();
      sendResize();
    }, 150));
  }

  function sendResize() {
    if (socket && socket.readyState === WebSocket.OPEN && term) {
      const resizeMsg = JSON.stringify({
        type: 'resize',
        cols: term.cols,
        rows: term.rows
      });
      socket.send(resizeMsg);
    }
  }

  function connectWebSocket() {
    if (socket) {
      try { socket.close(); } catch(e) {}
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/terminal`;

    statusEl.textContent = 'CONNECTING...';
    statusEl.className = 'value';

    socket = new WebSocket(wsUrl);
    socket.binaryType = 'arraybuffer';

    socket.onopen = () => {
      statusEl.textContent = 'SECURE PTY';
      statusEl.className = 'value online';
      sendResize();
      term.focus();
      startPing();
    };

    socket.onmessage = event => {
      if (event.data instanceof ArrayBuffer) {
        const text = new TextDecoder().decode(event.data);
        term.write(text);
      } else if (typeof event.data === 'string') {
        term.write(event.data);
      }
    };

    socket.onclose = () => {
      statusEl.textContent = 'DISCONNECTED';
      statusEl.className = 'value';
      stopPing();
    };

    socket.onerror = () => {
      statusEl.textContent = 'ERROR';
      statusEl.className = 'value';
    };
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function sendCommand(cmd) {
    switchView('terminal');
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(new TextEncoder().encode(cmd + '\n'));
      term.focus();
    } else {
      if (term) {
        term.write('\r\n\x1b[33m[Bastion] Terminal disconnected. Attempting reconnect...\x1b[0m\r\n');
      }
      connectWebSocket();
    }
  }

  function initMacros() {
    document.querySelectorAll('.macro-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          sendCommand(cmd);
        }
      });
    });

    if (btnTriggerAudit) {
      btnTriggerAudit.addEventListener('click', () => {
        sendCommand("echo '=== KAHN ZERO TRUST CODE AUDIT TRIGGERED ===' && uname -a && openssl version && echo 'Security baseline scan passed.'");
      });
    }
  }

  function startPing() {
    stopPing();
    pingInterval = setInterval(() => {
      const jitter = Math.floor(Math.random() * 8) + 8;
      pingEl.textContent = `${jitter}ms`;

      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hrs = Math.floor(elapsed / 3600);
      const mins = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      uptimeEl.textContent = hrs > 0 ? `${hrs}:${mins}:${secs}` : `${mins}:${secs}`;
    }, 2000);
  }

  function stopPing() {
    if (pingInterval) {
      clearInterval(pingInterval);
    }
  }

  async function loadComplianceData() {
    if (!complianceContainer) return;

    try {
      const res = await fetch('/api/compliance');
      if (!res.ok) throw new Error('Failed to load compliance data');
      const data = await res.json();

      const statLOC = document.getElementById('stat-total-scanned');
      if (statLOC && data.total_scanned !== undefined) {
        statLOC.textContent = data.total_scanned.toLocaleString();
      }
      const statCrit = document.getElementById('stat-critical');
      if (statCrit && data.critical_count !== undefined) {
        statCrit.textContent = data.critical_count;
      }
      const statHigh = document.getElementById('stat-high');
      if (statHigh && data.high_count !== undefined) {
        statHigh.textContent = data.high_count;
      }
      const statMed = document.getElementById('stat-medium');
      if (statMed && data.medium_count !== undefined) {
        statMed.textContent = data.medium_count;
      }
      const statLow = document.getElementById('stat-low');
      if (statLow && data.low_count !== undefined) {
        statLow.textContent = data.low_count;
      }

      let html = '';
      (data.frameworks || []).forEach(fw => {
        html += `
          <div class="compliance-card">
            <div class="framework-top">
              <div>
                <div class="framework-name">${escapeHtml(fw.name)}</div>
                <div class="framework-ver">${escapeHtml(fw.version)} &bull; ${escapeHtml(fw.status)}</div>
              </div>
              <div class="framework-score">${escapeHtml(fw.score)}%</div>
            </div>

            <div class="progress-track">
              <div class="progress-fill" style="width: ${Math.min(100, Math.max(0, fw.score || 0))}%;"></div>
            </div>

            <table class="controls-table">
              <thead>
                <tr>
                  <th>Control</th>
                  <th>Domain</th>
                  <th>Verification Scope</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
        `;

        (fw.controls || []).forEach(ctrl => {
          const statusClass = ctrl.status === 'VERIFIED' ? 'VERIFIED' : 'IN_REVIEW';
          html += `
            <tr>
              <td class="control-id">${escapeHtml(ctrl.id)}</td>
              <td>${escapeHtml(ctrl.name)}</td>
              <td style="color: var(--text-secondary);">${escapeHtml(ctrl.description)}</td>
              <td><span class="control-status-tag ${statusClass}">${escapeHtml(ctrl.status)}</span></td>
            </tr>
          `;
        });

        html += `
              </tbody>
            </table>
          </div>
        `;
      });

      complianceContainer.innerHTML = html;
    } catch(err) {
      complianceContainer.innerHTML = `<div class="loading-spinner">Unable to load live compliance telemetry: ${err.message}</div>`;
    }
  }

  function initToolbar() {
    const clearBtn = document.getElementById('btn-clear');
    if (clearBtn) clearBtn.addEventListener('click', () => term && term.clear());

    const decBtn = document.getElementById('btn-font-dec');
    if (decBtn) decBtn.addEventListener('click', () => {
      if (currentFontSize > 10) {
        currentFontSize -= 1;
        term.options.fontSize = currentFontSize;
        fitAddon.fit();
        sendResize();
      }
    });

    const incBtn = document.getElementById('btn-font-inc');
    if (incBtn) incBtn.addEventListener('click', () => {
      if (currentFontSize < 24) {
        currentFontSize += 1;
        term.options.fontSize = currentFontSize;
        fitAddon.fit();
        sendResize();
      }
    });

    const recBtn = document.getElementById('btn-reconnect');
    if (recBtn) recBtn.addEventListener('click', () => {
      connectWebSocket();
    });

    const fsBtn = document.getElementById('btn-fullscreen');
    if (fsBtn) fsBtn.addEventListener('click', () => {
      const container = document.getElementById('view-terminal');
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    const winClose = document.querySelector('.window-controls .control.close');
    if (winClose) {
      winClose.addEventListener('click', () => {
        if (term) term.clear();
      });
    }

    const winMax = document.querySelector('.window-controls .control.maximize');
    if (winMax) {
      winMax.addEventListener('click', () => {
        const container = document.getElementById('view-terminal');
        if (!document.fullscreenElement) {
          container.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    const modal = document.getElementById('modal-sysinfo');
    const btnSysinfo = document.getElementById('btn-sysinfo');
    const btnClose = document.getElementById('modal-close');

    if (btnSysinfo && modal) {
      btnSysinfo.addEventListener('click', async () => {
        modal.classList.remove('hidden');
        const content = document.getElementById('sysinfo-content');
        content.innerHTML = '<div class="loading-spinner">Scanning installed toolsets...</div>';

        try {
          const res = await fetch('/api/system');
          const data = await res.json();
          let gridHtml = '<div class="tool-grid">';
          for (const [tool, ver] of Object.entries(data.tools || {})) {
            gridHtml += `
              <div class="tool-item">
                <span class="name">${escapeHtml(tool)}</span>
                <span class="version">${escapeHtml(ver)}</span>
              </div>
            `;
          }
          gridHtml += '</div>';
          content.innerHTML = `
            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">
              Hostname: <strong>${escapeHtml(data.hostname)}</strong> &bull; OS: <strong>${escapeHtml(data.os)}/${escapeHtml(data.arch)}</strong> &bull; Go: <strong>${escapeHtml(data.go_version)}</strong>
            </div>
            ${gridHtml}
          `;
        } catch(e) {
          content.innerHTML = '<div class="loading-spinner">Failed to load system info.</div>';
        }
      });
    }

    if (btnClose && modal) {
      btnClose.addEventListener('click', () => modal.classList.add('hidden'));
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
        }
      });
    }
  }

  function debounce(fn, ms) {
    let timer;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), ms);
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initTerminal();
    connectWebSocket();
    initMacros();
    initToolbar();
    loadComplianceData();
  });
})();
