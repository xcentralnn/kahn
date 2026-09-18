import { useState } from 'react'
import { Terminal, Shield, Menu, X } from 'lucide-react'

export default function Navbar({ onOpenTerminal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <a href="#" className="navbar-brand">
          <div className="brand-logo-icon">
            <Shield size={18} className="text-primary" />
          </div>
          <span className="brand-name">
            Kahn<span className="brand-dot">.</span>
          </span>
          <span className="brand-subtag">SECURITY & AUDIT</span>
        </a>

        <nav className={`navbar-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#solutions" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Solutions</a>
          <a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#scanner" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Live Inspector</a>
          <a href="#estimator" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Scope Estimator</a>
          <a href="#faq" className="nav-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
        </nav>

        <div className="navbar-actions">
          <button 
            className="btn btn-outline terminal-nav-btn"
            onClick={onOpenTerminal}
            aria-label="Open Cloud Bastion Terminal"
          >
            <Terminal size={15} />
            <span>Cloud Bastion</span>
          </button>
          <a href="#contact" className="btn btn-primary">
            <span>Request Audit</span>
          </a>

          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}
