import { Award, ShieldCheck, Lock, CheckCircle2, Terminal } from 'lucide-react'

export default function PartnerBanner() {
  const partners = [
    {
      name: 'AWS Partner Network',
      tier: 'Security Competency & Well-Architected',
      logo: '/logos/aws.svg',
      width: 46,
      height: 28,
    },
    {
      name: 'Google Cloud',
      tier: 'Security & Infrastructure Partner',
      logo: '/logos/gcp.svg',
      width: 34,
      height: 28,
    },
    {
      name: 'Microsoft Azure',
      tier: 'Security Solutions Specialist',
      logo: '/logos/azure.svg',
      width: 30,
      height: 30,
    },
    {
      name: 'CNCF KCSP',
      tier: 'Kubernetes Certified Security Provider',
      logo: '/logos/cncf.svg',
      width: 30,
      height: 30,
    },
    {
      name: 'Kubernetes CKS',
      tier: 'Offensive Cluster Hardening',
      logo: '/logos/k8s.svg',
      width: 30,
      height: 30,
    },
    {
      name: 'CIS Benchmarks',
      tier: 'Automated Posture Auditing',
      icon: ShieldCheck,
      color: '#38bdf8'
    },
    {
      name: 'SOC 2 Type II',
      tier: 'Continuous Compliance Evidence',
      icon: Lock,
      color: '#a78bfa'
    },
    {
      name: 'ISO/IEC 27001',
      tier: 'Certified Information Security',
      icon: CheckCircle2,
      color: '#34d399'
    },
    {
      name: 'CREST & OSCP',
      tier: 'Certified Offensive Red Team',
      icon: Terminal,
      color: '#f43f5e'
    },
  ]

  const marqueeItems = [...partners, ...partners]

  return (
    <section className="partners-section">
      <div className="container">
        <div className="partners-wrapper glass-panel">
          <div className="partners-header-bar">
            <div className="partners-label-box">
              <Award size={16} className="text-cyan" />
              <span>COMPLIANCE &amp; ACCREDITATIONS</span>
            </div>
            <span className="partners-sub-tag">Certified Multi-Cloud Security, CIS Benchmarks &amp; Offensive Pentesting</span>
          </div>

          <div className="marquee-outer">
            <div className="marquee-track">
              {marqueeItems.map((p, idx) => {
                const Icon = p.icon
                return (
                  <div key={idx} className="partner-slide-card">
                    <div className="partner-logo-box">
                      {p.logo ? (
                        <img 
                          src={p.logo} 
                          alt={p.name} 
                          style={{ width: `${p.width}px`, height: `${p.height}px`, objectFit: 'contain' }}
                          className="partner-logo-img" 
                        />
                      ) : (
                        <Icon size={24} style={{ color: p.color || '#00f2fe' }} />
                      )}
                    </div>
                    <div className="partner-info">
                      <span className="partner-name">{p.name}</span>
                      <span className="partner-tier">{p.tier}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
