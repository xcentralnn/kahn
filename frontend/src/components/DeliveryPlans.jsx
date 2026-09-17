import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Layers, 
  Server, 
  Database, 
  Cloud,
  Cpu
} from 'lucide-react'

export default function DeliveryPlans() {
  const plans = [
    {
      id: 'starter',
      name: 'Starter Launchpad',
      target: 'Landing Pages & Static Web',
      timeline: '2 - 3 Days',
      description: 'Production-ready hosting setup for high-speed marketing landing pages and micro-apps.',
      icon: Server,
      popular: false,
      deliverables: [
        'CloudFront CDN + S3 / Cloudflare Pages Edge setup',
        'Custom Domain, SSL/TLS 1.3 automated renewal',
        'Automated CI/CD via GitHub Actions or Bitbucket',
        '100% Terraform IaC & Handover Documentation',
      ],
      tag: 'JAMstack • Fast Edge • Zero Server Cost',
    },
    {
      id: 'monolith',
      name: 'Monolith & Growth App',
      target: 'Fullstack Apps & APIs',
      timeline: '1 - 2 Weeks',
      description: 'Resilient cloud infrastructure for monolithic apps, REST/GraphQL APIs, and background queues.',
      icon: Database,
      popular: false,
      deliverables: [
        'AWS ECS Fargate or Hardened VPS (Docker Compose)',
        'AWS RDS (PostgreSQL/MySQL) with Automated Backups',
        'Redis cache cluster for sessions and worker queues',
        'Staging and Production CI/CD pipelines',
      ],
      tag: 'Node.js • Python • Go • Laravel • Spring',
    },
    {
      id: 'k8s',
      name: 'Cloud-Native Kubernetes',
      target: 'Microservices & Scale',
      timeline: '2 - 4 Weeks',
      description: 'Production-grade Kubernetes architecture for high concurrency, auto-scaling, and GitOps.',
      icon: Layers,
      popular: false,
      deliverables: [
        'Production EKS / GKE cluster via Terraform',
        'GitOps deployment workflow using ArgoCD',
        'Ingress controller with automated SSL cert-manager',
        'Observability stack: Prometheus, Grafana, Loki',
      ],
      tag: 'EKS • GKE • Helm • ArgoCD • Karpenter',
    },
    {
      id: 'ai-gpu',
      name: 'AI / LLM & GPU Fleet',
      target: 'Self-Hosted AI & RAG',
      timeline: '1 - 3 Weeks',
      description: 'High-throughput private LLM and model serving on NVIDIA, AMD, or Intel accelerators.',
      icon: Cpu,
      popular: true,
      deliverables: [
        'NVIDIA (CUDA / TensorRT), AMD (ROCm), Intel Gaudi setup',
        'High-throughput vLLM / Triton serving engines',
        'Private RAG with Qdrant, Milvus, or pgvector',
        'LiteLLM AI Gateway: Rate-limiting & semantic caching',
      ],
      tag: 'NVIDIA H100/A100 • AMD MI300X • Intel Gaudi',
    },
    {
      id: 'enterprise',
      name: 'Multi-Cloud & FinOps',
      target: 'Enterprise Scale & DR',
      timeline: 'Custom Sprints',
      description: 'Multi-cloud redundancy mesh, disaster recovery, and radical cloud invoice reduction.',
      icon: Cloud,
      popular: false,
      deliverables: [
        'Multi-cloud mesh across AWS, Azure, and Google Cloud',
        'Active-Active Disaster Recovery with failover drills',
        'FinOps cloud cost audit (-30% to -45% spend cut)',
        'Zero-Trust IAM, Vault secrets, and SOC2 hardening',
      ],
      tag: 'AWS + Azure + GCP • 99.999% SLA • FinOps',
    },
  ]

  return (
    <section className="delivery-plans-section" id="plans">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Sparkles size={14} className="text-primary" />
            <span>Turnkey Delivery Plans</span>
          </div>
          <h2 className="section-title">
            Tailored Cloud &amp; AI Architecture <span className="accent">Plans</span>
          </h2>
          <p className="section-subtitle">
            From quick turnaround landing pages to self-hosted GPU LLM clusters and multi-cloud fleets.
          </p>
        </div>

        <div className="delivery-plans-grid">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <div 
                key={plan.id} 
                className={`plan-delivery-card glass-panel ${plan.popular ? 'highlight-popular' : ''}`}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <Sparkles size={13} />
                    <span>HOT: PRIVATE AI &amp; GPU</span>
                  </div>
                )}

                <div className="delivery-card-top">
                  <div className="plan-icon-wrapper">
                    <Icon size={24} className="plan-icon" />
                  </div>
                  <div className="plan-time-chip">
                    <Clock size={13} />
                    <span>{plan.timeline}</span>
                  </div>
                </div>

                <div className="delivery-card-info">
                  <h3 className="plan-title">{plan.name}</h3>
                  <span className="plan-target-badge">{plan.target}</span>
                  <p className="plan-desc-text">{plan.description}</p>
                </div>

                <div className="plan-deliverables-box">
                  <span className="deliverables-heading">DELIVERABLES:</span>
                  <ul className="deliverables-list">
                    {plan.deliverables.map((item, idx) => (
                      <li key={idx} className="deliverable-item">
                        <Check size={15} className="check-icon-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="plan-suitable-box">
                  <span className="suitable-text">{plan.tag}</span>
                </div>

                <a href="#contact" className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                  <span>Request Scope for {plan.name}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
