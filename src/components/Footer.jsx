import { Terminal, ShieldCheck, Mail, MessageSquare } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <a href="#" className="nav-brand">
              <div className="brand-logo-icon">
                <Terminal size={18} className="icon-brand" />
              </div>
              <span className="brand-name">
                Valnia<span className="brand-dot">.</span>
              </span>
            </a>
            <p className="footer-brand-desc">
              Premier cloud infrastructure, modern delivery pipelines, and 24/7 SRE engineering partner. From high-speed landing pages to global multi-cloud fleets.
            </p>
            <div className="footer-status-badge">
              <span className="status-dot-pulse"></span>
              <span>All Client Cloud Fleets Operational (99.999% SLA)</span>
            </div>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Delivery Plans</span>
            <ul>
              <li><a href="#plans">Starter / Landing Page (2-3 Days)</a></li>
              <li><a href="#plans">Monolith &amp; Backend (1-2 Weeks)</a></li>
              <li><a href="#plans">Cloud-Native Kubernetes</a></li>
              <li><a href="#plans">Enterprise Multi-Cloud Mesh</a></li>
              <li><a href="#maintenance">24/7 SRE Maintenance Tiers</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Consulting Scope</span>
            <ul>
              <li><a href="#services">End-to-End CI/CD Pipelines</a></li>
              <li><a href="#services">Terraform &amp; OpenTofu IaC</a></li>
              <li><a href="#services">FinOps Cloud Bill Slashing</a></li>
              <li><a href="#services">Disaster Recovery &amp; Failover</a></li>
              <li><a href="#services">Zero-Trust Security &amp; SOC2</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Direct Connect</span>
            <ul>
              <li><a href="mailto:consulting@valnia.cloud">consulting@valnia.cloud</a></li>
              <li><a href="#contact">Schedule Architecture Call</a></li>
              <li><a href="#estimator">Project Scope Calculator</a></li>
              <li><a href="#faq">Delivery FAQ</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Certifications</span>
            <ul>
              <li><span className="cert-pill">AWS Solutions Architect Pro</span></li>
              <li><span className="cert-pill">CKA Kubernetes Admin</span></li>
              <li><span className="cert-pill">HashiCorp Terraform Associate</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; 2026 Valnia Cloud Consulting. All rights reserved. 100% Infrastructure as Code handover.
          </p>
          <div className="footer-socials">
            <a href="https://github.com/xcentralnn/valnia" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
