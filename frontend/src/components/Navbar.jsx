import { useState, useEffect } from 'react'
import { Terminal, Shield, Menu, X, ArrowRight, PhoneCall } from 'lucide-react'

export default function Navbar({ onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="nav-brand">
          <div className="brand-logo-icon">
            <Terminal size={20} className="icon-brand" />
          </div>
          <span className="brand-name">
            Valnia<span className="brand-dot">.</span>
          </span>
          <span className="brand-tag">Cloud &amp; Bastion</span>
        </a>

        <nav className="nav-links desktop-only">
          <a href="#plans" className="nav-link">Delivery Plans</a>
          <a href="#services" className="nav-link">Services &amp; Scope</a>
          <a href="#maintenance" className="nav-link">24/7 SRE Support</a>
          <a href="#estimator" className="nav-link">Scope Estimator</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>

        <div className="nav-actions desktop-only">
          <button 
            onClick={onOpenTerminal} 
            className="btn-nav-terminal"
            title="Open Web Terminal Jump Host"
          >
            <Terminal size={15} />
            <span>Cloud Bastion</span>
          </button>
          <a href="#estimator" className="btn btn-sm btn-secondary">
            Estimate Scope
          </a>
          <a href="#contact" className="btn btn-sm btn-primary">
            <PhoneCall size={15} />
            <span>Book Consultation</span>
          </a>
        </div>

        <button 
          className="mobile-toggle mobile-only" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenTerminal && onOpenTerminal(); }} 
            className="btn-nav-terminal w-full"
            style={{ marginBottom: '12px' }}
          >
            <Terminal size={16} />
            <span>Open Cloud Bastion Terminal</span>
          </button>
          <a href="#plans" onClick={() => setMobileMenuOpen(false)}>Delivery Plans</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services &amp; Scope</a>
          <a href="#maintenance" onClick={() => setMobileMenuOpen(false)}>24/7 SRE Support</a>
          <a href="#estimator" onClick={() => setMobileMenuOpen(false)}>Scope Estimator</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <div className="mobile-drawer-actions">
            <a href="#estimator" className="btn btn-secondary w-full" onClick={() => setMobileMenuOpen(false)}>Estimate Scope</a>
            <a href="#contact" className="btn btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>Book Consultation</a>
          </div>
        </div>
      )}
    </header>
  )
}
