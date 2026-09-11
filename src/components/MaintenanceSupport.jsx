import { 
  ShieldCheck, 
  Clock, 
  LifeBuoy, 
  AlertTriangle, 
  Check, 
  ArrowRight,
  PhoneCall,
  Activity
} from 'lucide-react'

export default function MaintenanceSupport() {
  const tiers = [
    {
      name: 'Essential Ops Care',
      sla: 'Business Hours (5x8)',
      responseP1: '< 1 Hour SLA',
      description: 'Reliable ongoing maintenance and routine health checks for production workloads.',
      features: [
        'Uptime & availability monitoring (99.9% target)',
        'Monthly OS kernel & container security patching',
        'Weekly automated backup restore verification drills',
        'Cloud cost review & waste identification report',
        'Standard business hours ticket & email support',
      ],
      cta: 'Choose Essential Care',
      popular: false,
    },
    {
      name: 'Critical 24/7 SRE Guard',
      sla: '24x7x365 Continuous On-Call',
      responseP1: '< 15 Minutes P1 SLA',
      description: 'Round-the-clock incident response with immediate engineer dispatch for mission-critical apps.',
      features: [
        'Dedicated PagerDuty / OpsGenie & Slack Connect channel',
        'Sub-15 minute response for critical P1 outages',
        'Immediate incident war-room assembly & triage',
        'Bi-weekly FinOps cloud bill optimization & right-sizing',
        'Continuous eBPF & Prometheus APM telemetry tracking',
        'Post-mortem root cause analysis & prevention runbooks',
      ],
      cta: 'Activate 24/7 Coverage',
      popular: true,
    },
    {
      name: 'Embedded Platform Squad',
      sla: 'Dedicated Senior SRE Squad',
      responseP1: 'Immediate Hot-Line',
      description: 'A dedicated Senior Cloud Architect embedded directly into your software engineering sprints.',
      features: [
        'Dedicated Senior DevOps / SRE Lead dedicated to your team',
        'Sprint planning, architecture reviews & developer pairing',
        'Continuous CI/CD pipeline optimization & tooling upgrades',
        'Custom compliance audits (SOC2, HIPAA, ISO27001)',
        'Comprehensive quarterly disaster recovery failover drills',
        'Unlimited architectural advisory & technical consulting',
      ],
      cta: 'Engage Platform Squad',
      popular: false,
    },
  ]

  return (
    <section className="maintenance-section" id="maintenance">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <ShieldCheck size={14} className="text-emerald" />
            <span>24/7 SRE &amp; Maintenance</span>
          </div>
          <h2 className="section-title">
            Peace of Mind with <span className="accent">24/7 Dedicated SRE Support</span>
          </h2>
          <p className="section-subtitle">
            Never worry about midnight production outages. Our seasoned site reliability engineers monitor your cloud 24/7 with strict SLA guarantees.
          </p>
        </div>

        <div className="sla-banner glass-panel">
          <div className="sla-item">
            <span className="sla-time">&lt; 15 mins</span>
            <span className="sla-label">P1 Outage Response Time</span>
          </div>
          <div className="sla-divider"></div>
          <div className="sla-item">
            <span className="sla-time">99.99%</span>
            <span className="sla-label">Uptime SLA Commitment</span>
          </div>
          <div className="sla-divider"></div>
          <div className="sla-item">
            <span className="sla-time">24x7x365</span>
            <span className="sla-label">Active Cloud Watch &amp; War Room</span>
          </div>
          <div className="sla-divider"></div>
          <div className="sla-item">
            <span className="sla-time">0 Lock-in</span>
            <span className="sla-label">Transparent Runbooks &amp; Docs</span>
          </div>
        </div>

        <div className="maintenance-grid">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`maintenance-card glass-panel ${tier.popular ? 'highlight-popular' : ''}`}
            >
              {tier.popular && (
                <div className="popular-badge">
                  <Activity size={13} />
                  <span>RECOMMENDED FOR PRODUCTION</span>
                </div>
              )}

              <div className="maint-card-header">
                <h3 className="maint-tier-name">{tier.name}</h3>
                <div className="maint-sla-chips">
                  <span className="chip-sla"><Clock size={13} /> {tier.sla}</span>
                  <span className="chip-p1">{tier.responseP1}</span>
                </div>
                <p className="maint-tier-desc">{tier.description}</p>
              </div>

              <div className="maint-features-list">
                {tier.features.map((feat, fIdx) => (
                  <div key={fIdx} className="maint-feature-item">
                    <div className="check-bullet">
                      <Check size={14} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" className={`btn w-full ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}>
                <PhoneCall size={15} />
                <span>{tier.cta}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
