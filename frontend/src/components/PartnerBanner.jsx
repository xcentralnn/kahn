import { Award } from 'lucide-react'

export default function PartnerBanner() {
  const partners = [
    {
      name: 'AWS Partner Network',
      tier: 'Advanced Tier Services',
      logo: '/logos/aws.svg',
      width: 46,
      height: 28,
    },
    {
      name: 'Microsoft Azure',
      tier: 'Solutions Partner',
      logo: '/logos/azure.svg',
      width: 30,
      height: 30,
    },
    {
      name: 'Google Cloud',
      tier: 'Premier Partner',
      logo: '/logos/gcp.svg',
      width: 34,
      height: 28,
    },
    {
      name: 'NVIDIA Partner Network',
      tier: 'AI & GPU Compute Preferred',
      logo: '/logos/nvidia.svg',
      width: 38,
      height: 28,
    },
    {
      name: 'CNCF KCSP',
      tier: 'Kubernetes Certified Partner',
      logo: '/logos/cncf.svg',
      width: 30,
      height: 30,
    },
    {
      name: 'Kubernetes',
      tier: 'Certified Service Provider',
      logo: '/logos/k8s.svg',
      width: 30,
      height: 30,
    },
    {
      name: 'AMD Instinct',
      tier: 'ROCm AI Partner',
      logo: '/logos/amd.svg',
      width: 34,
      height: 24,
    },
    {
      name: 'Intel Gaudi',
      tier: 'AI Accelerator Partner',
      logo: '/logos/intel.svg',
      width: 36,
      height: 24,
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
              <span>OFFICIAL PARTNER NETWORK</span>
            </div>
            <span className="partners-sub-tag">Certified Multi-Cloud, GPU &amp; CNCF Providers</span>
          </div>

          <div className="marquee-outer">
            <div className="marquee-track">
              {marqueeItems.map((p, idx) => (
                <div key={idx} className="partner-slide-card">
                  <div className="partner-logo-box">
                    <img 
                      src={p.logo} 
                      alt={p.name} 
                      style={{ width: `${p.width}px`, height: `${p.height}px`, objectFit: 'contain' }}
                      className="partner-logo-img" 
                    />
                  </div>
                  <div className="partner-info">
                    <span className="partner-name">{p.name}</span>
                    <span className="partner-tier">{p.tier}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
