import { useState, useEffect } from 'react'
import { 
  Send, 
  CheckCircle2, 
  Mail, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  PhoneCall,
  Sparkles,
  Cpu
} from 'lucide-react'

export default function ContactConsulting({ prefilledScope }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    scopePlan: 'ai-gpu',
    cloud: 'nvidia',
    timeline: 'asap',
    message: '',
  })

  useEffect(() => {
    if (prefilledScope) {
      setFormData((prev) => ({
        ...prev,
        scopePlan: prefilledScope.scale || prev.scopePlan,
        cloud: prefilledScope.cloud || prev.cloud,
      }))
    }
  }, [prefilledScope])

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <PhoneCall size={14} className="text-cyan" />
            <span>Architecture Review &amp; Consultation</span>
          </div>
          <h2 className="section-title">
            Let's Architect Your <span className="accent">Next Cloud or AI Milestone</span>
          </h2>
          <p className="section-subtitle">
            Speak directly with a Principal Cloud &amp; AI Architect. We evaluate your stack (Cloud, GPU, CI/CD, SRE), calculate timeline and budget, and provide a concrete delivery roadmap.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-panel glass-panel">
            <div className="info-block">
              <div className="info-icon-box">
                <Clock size={20} className="text-cyan" />
              </div>
              <div>
                <h4>2-Hour SLA Response Time</h4>
                <p>All inquiries are reviewed directly by our Principal Cloud &amp; AI Architect team, not junior account managers.</p>
              </div>
            </div>

            <div className="info-block">
              <div className="info-icon-box">
                <ShieldCheck size={20} className="text-emerald" />
              </div>
              <div>
                <h4>NDA &amp; Strict Confidentiality</h4>
                <p>We are happy to sign standard bilateral NDAs before reviewing private repositories, model weights, or cloud credentials.</p>
              </div>
            </div>

            <div className="info-block">
              <div className="info-icon-box">
                <Cpu size={20} className="text-primary" />
              </div>
              <div>
                <h4>NVIDIA, AMD &amp; Intel Acceleration</h4>
                <p>Specialized hardware consulting to optimize tokens/second and slash GPU compute costs by up to 50%.</p>
              </div>
            </div>

            <div className="direct-channels-box">
              <span className="direct-channels-title">DIRECT ARCHITECT CHANNELS:</span>
              <div className="channel-link">
                <Mail size={16} className="text-cyan" />
                <a href="mailto:consulting@valnia.cloud">consulting@valnia.cloud</a>
              </div>
              <div className="channel-link">
                <MessageSquare size={16} className="text-emerald" />
                <span>Telegram: @valnia_consulting</span>
              </div>
            </div>
          </div>

          <div className="contact-form-panel glass-panel">
            {submitted ? (
              <div className="form-success-state">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={48} className="text-emerald" />
                </div>
                <h3>Consultation Request Received!</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Our Principal Cloud &amp; AI Architect will review your requirements for <strong>{formData.company || 'your project'}</strong> and follow up at <strong>{formData.email}</strong> within 2 business hours.
                </p>
                <div className="success-action">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form className="consultation-form" onSubmit={handleSubmit}>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Alex Nguyen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Work Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Company / Project Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. TechCorp Inc"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Project Scope Tier *</label>
                    <select
                      className="form-select"
                      value={formData.scopePlan}
                      onChange={(e) => setFormData({ ...formData, scopePlan: e.target.value })}
                    >
                      <option value="ai-gpu">Private AI / LLM &amp; GPU Infrastructure (NVIDIA, AMD, Intel)</option>
                      <option value="k8s">Cloud-Native Kubernetes &amp; Scale (2-4 Weeks)</option>
                      <option value="monolith">Monolith &amp; Backend API (1-2 Weeks)</option>
                      <option value="landing">Starter / Landing Page (2-3 Days)</option>
                      <option value="multicloud">Enterprise Multi-Cloud &amp; FinOps</option>
                      <option value="maintenance">Dedicated 24/7 SRE Maintenance Only</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Hardware / Cloud Platform</label>
                    <select
                      className="form-select"
                      value={formData.cloud}
                      onChange={(e) => setFormData({ ...formData, cloud: e.target.value })}
                    >
                      <option value="nvidia">NVIDIA GPU (CUDA / H100 / L40S / A100)</option>
                      <option value="amd">AMD Instinct (ROCm 6.x / MI300X)</option>
                      <option value="intel">Intel Gaudi 2/3 / OpenVINO</option>
                      <option value="aws">Amazon Web Services (AWS)</option>
                      <option value="gcp">Google Cloud Platform (GCP)</option>
                      <option value="azure">Microsoft Azure</option>
                      <option value="baremetal">On-Premises Bare-Metal GPU</option>
                      <option value="undecided">Need Recommendation from Architect</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Desired Timeline</label>
                    <select
                      className="form-select"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    >
                      <option value="asap">Urgent (Immediate kickoff)</option>
                      <option value="2weeks">Within 1 - 2 weeks</option>
                      <option value="1month">Within next month</option>
                      <option value="exploring">Just exploring options / feasibility</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Requirements &amp; Stack</label>
                  <textarea
                    className="form-textarea"
                    rows="4"
                    placeholder="Describe your current infrastructure or AI model goals (e.g. self-hosting Llama-3 on NVIDIA H100 / AMD MI300X, private RAG pipeline, CI/CD pipeline overhaul, slow deployments, or 24/7 SRE on-call needs)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full btn-lg">
                  <Send size={18} />
                  <span>Book Architecture Review</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
