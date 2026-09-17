import { useState } from 'react'
import { Check, Sparkles, ArrowRight } from 'lucide-react'

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  const plans = [
    {
      name: 'Starter',
      badge: 'For Independent Developers',
      priceMonthly: 49,
      priceAnnual: 39,
      description: 'Essential autonomous deployment and monitoring for growing teams.',
      features: [
        'Up to 3 Cloud Clusters (AWS / GCP / Azure)',
        '10 Ephemeral PR environments / month',
        'Automated Canary Deployments',
        'Basic FinOps Right-Sizing Insights',
        'Community & Discord Support',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Pro Platform',
      badge: 'Most Popular for High-Velocity Teams',
      priceMonthly: 199,
      priceAnnual: 149,
      description: 'Complete multi-cloud autonomous orchestration and self-healing control plane.',
      features: [
        'Unlimited Clusters & Multi-Cloud Mesh',
        'Unlimited Ephemeral PR Preview Envs',
        'Sub-80ms Automated Rollback & Self-Healing',
        'Autonomous Spot Fleet & FinOps Engine (-45% cloud cost)',
        'SOC2 Type II & Zero-Trust Guardrails',
        'Dedicated Slack Channel & 24/7 Priority Support',
      ],
      cta: 'Get Started with Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      badge: 'For Mission-Critical Operations',
      priceMonthly: 799,
      priceAnnual: 599,
      description: 'Dedicated private VPC deployment with custom SLA and security certifications.',
      features: [
        'Self-Hosted or Dedicated Private Cloud Control Plane',
        'Custom Regulatory Guardrails (HIPAA, FedRAMP, PCI)',
        '99.999% Guaranteed SLA Uptime',
        'Custom eBPF Telemetry Integrations',
        'Dedicated Solutions Architect & Technical Account Manager',
        'Custom SSO (Okta, Azure AD, SAML)',
      ],
      cta: 'Contact Enterprise Sales',
      popular: false,
    },
  ]

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Sparkles size={14} className="text-primary" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="section-title">
            Predictable Plans for <span className="accent">Modern Teams</span>
          </h2>
          <p className="section-subtitle">
            Scale your cloud operations without surprise bills. Every tier pays for itself through automated resource right-sizing.
          </p>

          <div className="billing-toggle-container">
            <span className={`billing-label ${!annual ? 'active' : ''}`}>Monthly</span>
            <button 
              className={`toggle-switch ${annual ? 'on' : ''}`}
              onClick={() => setAnnual(!annual)}
              aria-label="Toggle annual billing"
            >
              <div className="toggle-slider"></div>
            </button>
            <span className={`billing-label ${annual ? 'active' : ''}`}>
              Annual <span className="save-badge">Save 25%</span>
            </span>
          </div>
        </div>

        <div className="pricing-cards-grid">
          {plans.map((plan, i) => {
            const price = annual ? plan.priceAnnual : plan.priceMonthly
            return (
              <div 
                key={i} 
                className={`pricing-card glass-panel ${plan.popular ? 'popular-card' : ''}`}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <Sparkles size={13} />
                    <span>RECOMMENDED</span>
                  </div>
                )}

                <div className="pricing-card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <span className="plan-badge-sub">{plan.badge}</span>
                  <p className="plan-desc">{plan.description}</p>
                </div>

                <div className="pricing-amount-block">
                  <span className="currency">$</span>
                  <span className="price-num">{price}</span>
                  <span className="price-cycle">/month</span>
                </div>
                {annual && <span className="billed-annually-note">Billed annually</span>}

                <a 
                  href="#cta" 
                  className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight size={16} />
                </a>

                <div className="plan-divider"></div>

                <div className="plan-features-list">
                  <span className="features-headline">INCLUDED IN {plan.name.toUpperCase()}:</span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="feature-item">
                      <div className="check-bullet">
                        <Check size={14} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
