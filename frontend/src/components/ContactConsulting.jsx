import { useState } from 'react'
import { Send, Shield, Clock, CheckCircle2, Lock, FileText } from 'lucide-react'

export default function ContactConsulting({ prefilledScope }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    scopeType: 'Automated Cloud Resource Audit',
    cloudCount: '1 - 10 Cloud Accounts',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="badge">
              <Shield size={14} className="text-primary" />
              <span>Confidential Security Assessment</span>
            </div>
            <h2 className="section-title">
              Request Your <span className="accent">Cloud Audit & Pentest</span>
            </h2>
            <p className="contact-desc">
              Schedule an automated 15-minute read-only cloud resource scan or initiate a confidential penetration testing scoping call with our certified security architects.
            </p>

            <div className="nda-card">
              <div className="nda-icon-box">
                <Lock size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="nda-title">NDA & Strict Confidentiality Guaranteed</h4>
                <p className="nda-desc">
                  We sign bilateral Non-Disclosure Agreements prior to receiving read-only credentials or initiating offensive testing. Your data and architecture remain strictly confidential.
                </p>
              </div>
            </div>

            <div className="direct-contact-block">
              <span className="direct-label">Direct Security Desk:</span>
              <a href="mailto:security@kahn.cloud" className="direct-link">security@kahn.cloud</a>
              <span className="direct-channel">Telegram: @kahn_security</span>
            </div>
          </div>

          <div className="contact-form-card">
            {submitted ? (
              <div className="form-success-state">
                <CheckCircle2 size={48} className="text-success" />
                <h3 className="success-title">Assessment Request Received</h3>
                <p className="success-desc">
                  Our Lead Security Architect will review your scope and deliver our mutual NDA within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="consulting-form">
                <div className="form-group">
                  <label htmlFor="company">Company / Organization Name *</label>
                  <input
                    type="text"
                    id="company"
                    required
                    placeholder="e.g. Acme FinTech Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name & Role *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. Alex Rivera, Head of Infrastructure"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Work Email *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="alex@acmefintech.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="scopeType">Primary Security Engagement *</label>
                    <select
                      id="scopeType"
                      value={formData.scopeType}
                      onChange={(e) => setFormData({ ...formData, scopeType: e.target.value })}
                    >
                      <option value="Automated Cloud Resource Audit">Automated Cloud Resource Audit (Free Scan)</option>
                      <option value="Full-Scope Cloud Penetration Testing">Full-Scope Cloud Penetration Testing</option>
                      <option value="Kubernetes & Container Hardening">Kubernetes & Container Hardening Audit</option>
                      <option value="Continuous CSPM & SOC2 Compliance">Continuous CSPM & SOC 2 Readiness</option>
                      <option value="Emergency Incident / Leak Review">Emergency Vulnerability / Leak Review</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cloudCount">Cloud Infrastructure Scale</label>
                    <select
                      id="cloudCount"
                      value={formData.cloudCount}
                      onChange={(e) => setFormData({ ...formData, cloudCount: e.target.value })}
                    >
                      <option value="1 - 5 Accounts">1 - 5 Accounts (Startup / MVP)</option>
                      <option value="5 - 20 Accounts">5 - 20 Accounts (Growth Stage)</option>
                      <option value="20+ Accounts">20+ Accounts (Enterprise Fleet)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Key Security Concerns or Cloud Providers</label>
                  <textarea
                    id="message"
                    rows="3"
                    placeholder="Describe your current cloud setup (AWS, GCP, Azure, K8s) and any specific concerns or upcoming compliance deadlines..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  <Send size={16} />
                  <span>Submit Confidential Assessment Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
