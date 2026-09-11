import { ShieldCheck, Award } from 'lucide-react'

export default function PartnerBanner() {
  const partners = [
    {
      name: 'AWS Partner Network',
      tier: 'Advanced Tier Services',
      color: '#f59e0b',
    },
    {
      name: 'Microsoft Azure',
      tier: 'Solutions Partner',
      color: '#38bdf8',
    },
    {
      name: 'Google Cloud',
      tier: 'Premier Partner',
      color: '#34d399',
    },
    {
      name: 'NVIDIA Partner Network',
      tier: 'AI & GPU Compute Preferred',
      color: '#76b900',
    },
    {
      name: 'CNCF KCSP',
      tier: 'Kubernetes Certified Partner',
      color: '#3b82f6',
    },
  ]

  return (
    <section className="partners-section">
      <div className="container">
        <div className="partners-wrapper glass-panel">
          <div className="partners-label-box">
            <Award size={18} className="text-cyan" />
            <span>OFFICIAL PARTNER NETWORK</span>
          </div>

          <div className="partners-grid">
            {partners.map((p, idx) => (
              <div key={idx} className="partner-card">
                <span className="partner-dot" style={{ backgroundColor: p.color }}></span>
                <div className="partner-info">
                  <span className="partner-name">{p.name}</span>
                  <span className="partner-tier">{p.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
