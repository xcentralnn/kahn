import { Terminal } from 'lucide-react'

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
              Cloud infrastructure, GPU/AI acceleration, and 24/7 SRE delivery partner.
            </p>
            <div className="footer-status-badge">
              <span className="status-dot-pulse"></span>
              <span>Client Cloud Fleets: 99.999% SLA</span>
            </div>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Delivery Plans</span>
            <ul>
              <li><a href="#plans">Starter / Landing (2-3 Days)</a></li>
              <li><a href="#plans">Monolith &amp; Backend (1-2 Wks)</a></li>
              <li><a href="#plans">Kubernetes &amp; Scale (2-4 Wks)</a></li>
              <li><a href="#plans">AI / LLM &amp; GPU Fleet</a></li>
              <li><a href="#plans">Multi-Cloud &amp; FinOps</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Services</span>
            <ul>
              <li><a href="#services">NVIDIA / AMD / Intel GPU</a></li>
              <li><a href="#services">CI/CD Pipelines</a></li>
              <li><a href="#services">Terraform IaC</a></li>
              <li><a href="#services">24/7 SRE Maintenance</a></li>
              <li><a href="#services">FinOps Cost Slashing</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Official Partners</span>
            <ul>
              <li><span className="cert-pill">AWS Partner Network</span></li>
              <li><span className="cert-pill">Microsoft Azure Partner</span></li>
              <li><span className="cert-pill">Google Cloud Partner</span></li>
              <li><span className="cert-pill">NVIDIA Partner Network</span></li>
              <li><span className="cert-pill">CNCF KCSP Certified</span></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Contact</span>
            <ul>
              <li><a href="mailto:consulting@valnia.cloud">consulting@valnia.cloud</a></li>
              <li><a href="#contact">Book Architecture Review</a></li>
              <li><a href="#estimator">Scope Estimator</a></li>
              <li><a href="#faq">Delivery FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; 2026 Valnia Cloud &amp; AI Consulting. 100% Infrastructure as Code handover.
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
