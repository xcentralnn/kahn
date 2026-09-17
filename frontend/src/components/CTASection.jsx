import { useState } from 'react'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim().includes('@')) {
      setSubmitted(true)
    }
  }

  return (
    <section className="cta-section" id="cta">
      <div className="container">
        <div className="cta-card glass-panel">
          <div className="cta-glow-orb"></div>
          <div className="cta-content">
            <div className="badge cta-badge">
              <Sparkles size={14} className="text-cyan" />
              <span>Instant Cloud Setup</span>
            </div>

            <h2 className="cta-title">
              Ready to Accelerate Your <span className="accent">Cloud Operations?</span>
            </h2>

            <p className="cta-desc">
              Experience autonomous deployments, self-healing canaries, and intelligent multi-cloud orchestration. Start your free 14-day trial in 3 minutes.
            </p>

            {submitted ? (
              <div className="cta-success-box">
                <CheckCircle2 size={24} className="text-emerald" />
                <div>
                  <h4>Welcome to Valnia Platform!</h4>
                  <p>Check your inbox at <strong>{email}</strong> for your instant sandbox credentials.</p>
                </div>
              </div>
            ) : (
              <form className="cta-form" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  className="cta-input" 
                  placeholder="Enter your work email address..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary cta-submit-btn">
                  <span>Start Free Trial</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            )}

            <div className="cta-guarantees">
              <span>✓ No credit card required</span>
              <span>✓ Instant GitHub integration</span>
              <span>✓ Full enterprise support during trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
