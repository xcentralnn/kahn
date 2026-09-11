import { Award } from 'lucide-react'

export default function PartnerBanner() {
  const partners = [
    {
      name: 'AWS Partner Network',
      tier: 'Advanced Tier Services',
      color: '#ff9900',
      svg: (
        <svg width="34" height="22" viewBox="0 0 100 60" fill="currentColor">
          <path fill="#FF9900" d="M38.8 35.8c-7.2 4.8-17.7 7.4-26.6 7.4-12.6 0-23.9-4.7-32.5-12.5-.7-.6-.1-1.4.7-1 8.8 4.9 19.8 7.8 31.1 7.8 8 0 16.7-1.8 24.6-5.6 1.2-.6 2.2.8 1.1 1.7z"/>
          <path fill="#FF9900" d="M40.9 31.8c-.9-1.2-6.1-.6-8.5-.3-.7.1-.8-.5-.2-.9 4.1-2.9 10.9-2.1 11.6-1.1.8 1.1-.3 7.8-4.2 11-.6.5-1.1.2-.8-.4 1-2.1 3-7.1 2.1-8.3z"/>
          <text x="2" y="24" fill="#ffffff" fontFamily="sans-serif" fontSize="24" fontWeight="bold">aws</text>
        </svg>
      ),
    },
    {
      name: 'Microsoft Azure',
      tier: 'Solutions Partner',
      color: '#0089D6',
      svg: (
        <svg width="26" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M13.05 4.24l-6.2 11.08L2 19.76h6.14l4.91-4.44 6.95 4.44H22l-8.95-15.52z" fill="#0089D6"/>
          <path d="M13.05 4.24l-3.32 7.03 5.4 4.85 4.87 3.64H22l-8.95-15.52z" fill="#0078D4"/>
        </svg>
      ),
    },
    {
      name: 'NVIDIA Partner Network',
      tier: 'AI & GPU Compute Preferred',
      color: '#76B900',
      svg: (
        <svg width="32" height="24" viewBox="0 0 24 18" fill="none">
          <path d="M10.95 13.92v-2.02c1.78-.1 2.92-.93 2.92-2.12 0-1.25-1.18-1.92-2.92-1.92v-2.12c3.08.06 5.17 1.63 5.17 4.04 0 2.45-2.16 4.08-5.17 4.14zm-4.13-2.02v-2.02c1.78-.1 2.92-.93 2.92-2.12 0-1.25-1.18-1.92-2.92-1.92V3.7c3.08.06 5.17 1.63 5.17 4.04 0 2.45-2.16 4.08-5.17 4.14zm-4.13-2.02V7.86c1.78-.1 2.92-.93 2.92-2.12 0-1.25-1.18-1.92-2.92-1.92V1.7c3.08.06 5.17 1.63 5.17 4.04 0 2.45-2.16 4.08-5.17 4.14z" fill="#76B900"/>
          <path d="M0 0h2.69v18H0V0z" fill="#76B900"/>
        </svg>
      ),
    },
    {
      name: 'Google Cloud',
      tier: 'Premier Partner',
      color: '#4285F4',
      svg: (
        <svg width="28" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/>
          <path d="M12 17l3.5-3.5-1.41-1.41L12 14.17l-2.09-2.08L8.5 13.5 12 17z" fill="#ffffff"/>
        </svg>
      ),
    },
    {
      name: 'CNCF KCSP',
      tier: 'Kubernetes Certified Partner',
      color: '#2463eb',
      svg: (
        <svg width="28" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 1.5L2.5 7v10L12 22.5 21.5 17V7L12 1.5z" stroke="#326CE5" strokeWidth="1.8" fill="rgba(50, 108, 229, 0.15)"/>
          <circle cx="12" cy="12" r="3.2" fill="#326CE5"/>
          <path d="M12 5.5v3M12 15.5v3M5.5 12h3M15.5 12h3" stroke="#326CE5" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      name: 'Kubernetes',
      tier: 'Certified Service Provider',
      color: '#326CE5',
      svg: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 7.5v9L12 22l9-5.5v-9L12 2z" stroke="#38bdf8" strokeWidth="1.6" fill="rgba(56, 189, 248, 0.1)"/>
          <circle cx="12" cy="12" r="4" fill="#38bdf8"/>
        </svg>
      ),
    },
    {
      name: 'AMD Instinct',
      tier: 'ROCm AI Partner',
      color: '#ED1C24',
      svg: (
        <svg width="30" height="20" viewBox="0 0 100 60" fill="none">
          <path d="M0 50h36V14H0v36zm14-14h8v8h-8v-8z" fill="#ED1C24"/>
          <path d="M46 14v36h36V14H46zm22 22h-8v-8h8v8z" fill="#ffffff"/>
        </svg>
      ),
    },
    {
      name: 'Intel Gaudi',
      tier: 'AI Accelerator Partner',
      color: '#0071C5',
      svg: (
        <svg width="32" height="20" viewBox="0 0 100 50" fill="none">
          <circle cx="20" cy="12" r="5" fill="#00C7FD"/>
          <text x="5" y="42" fill="#ffffff" fontFamily="sans-serif" fontSize="32" fontWeight="bold" letterSpacing="-1">intel</text>
        </svg>
      ),
    },
  ]

  // Duplicate the list for seamless infinite marquee loop
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
                    {p.svg}
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
