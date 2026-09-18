import { Terminal, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react'
import KahnLogo from './KahnLogo'

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <a href="#" className="nav-brand">
              <div className="brand-logo-icon">
                <KahnLogo size={26} variant="crimson" />
              </div>
              <span className="brand-name">
                Kahn<span className="brand-dot">.</span>
              </span>
            </a>
            <p className="footer-brand-desc">
              Autonomous Cloud Resource Auditing, Continuous CSPM &amp; Certified Enterprise Penetration Testing for high-scale multi-cloud fleets.
            </p>
            <div className="footer-status-badge">
              <span className="status-dot-pulse"></span>
              <span>Cloud Security Posture: Continuous Active Protection</span>
            </div>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Solutions</span>
            <ul>
              <li><a href="#solutions">Automated Cloud Audit</a></li>
              <li><a href="#solutions">Offensive Penetration Testing</a></li>
              <li><a href="#solutions">Continuous CSPM Compliance</a></li>
              <li><a href="#solutions">External Attack Surface (EASM)</a></li>
              <li><a href="#scanner">Live Security Inspector</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Capabilities</span>
            <ul>
              <li><a href="#services">IAM Privilege &amp; CIEM Review</a></li>
              <li><a href="#services">Zombie Resource &amp; FinOps Slashing</a></li>
              <li><a href="#services">Kubernetes CKS Hardening</a></li>
              <li><a href="#services">IMDSv2 SSRF Vulnerability Defense</a></li>
              <li><a href="#services">Shift-Left IaC Terraform Guardrails</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Accreditations</span>
            <ul>
              <li><span className="cert-pill">AWS Security Partner</span></li>
              <li><span className="cert-pill">Google Cloud Security</span></li>
              <li><span className="cert-pill">Microsoft Azure Security</span></li>
              <li><span className="cert-pill">CIS Benchmarks Member</span></li>
              <li><span className="cert-pill">CREST &amp; OSCP Certified</span></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Contact &amp; Scopes</span>
            <ul>
              <li><a href="mailto:security@kahn.cloud">security@kahn.cloud</a></li>
              <li><a href="#contact">Request Security Audit</a></li>
              <li><a href="#estimator">Assessment Scope Estimator</a></li>
              <li><a href="#faq">Compliance &amp; Pentest FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; 2026 Kahn Cloud Security. Agentless posture auditing &amp; offensive red teaming.
          </p>
          <div className="footer-socials">
            <a href="https://github.com/xcentralnn/kahn" target="_blank" rel="noreferrer" aria-label="GitHub">
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
