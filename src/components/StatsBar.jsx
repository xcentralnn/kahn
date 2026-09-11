import { Activity, ShieldCheck, Zap, TrendingDown } from 'lucide-react'

export default function StatsBar() {
  const stats = [
    {
      icon: Zap,
      value: '10x',
      label: 'Deployment Velocity',
      description: 'From git commit to multi-region canary rollout in seconds',
    },
    {
      icon: ShieldCheck,
      value: '99.99%',
      label: 'Guaranteed SLA Uptime',
      description: 'Zero-downtime automatic rollback on anomaly detection',
    },
    {
      icon: TrendingDown,
      value: '45%',
      label: 'Average Cloud Cost Cut',
      description: 'Autonomous Spot orchestration and idle resource harvesting',
    },
    {
      icon: Activity,
      value: '<150ms',
      label: 'Self-Healing Response',
      description: 'Sub-second remediation before end users experience packet loss',
    },
  ]

  const integrations = [
    'Amazon Web Services',
    'Google Cloud',
    'Microsoft Azure',
    'Kubernetes',
    'HashiCorp Terraform',
    'OpenTelemetry',
    'GitHub Actions',
    'Datadog',
  ]

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="stat-card glass-panel">
                <div className="stat-icon-wrap">
                  <Icon size={24} className="stat-icon" />
                </div>
                <div className="stat-numbers">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
                <p className="stat-desc">{stat.description}</p>
              </div>
            )
          })}
        </div>

        <div className="integrations-banner">
          <p className="integrations-title">Seamlessly integrates with your existing DevOps and cloud ecosystem</p>
          <div className="integrations-pills">
            {integrations.map((item, index) => (
              <span key={index} className="integration-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
