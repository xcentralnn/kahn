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
      timeline: '2 - 3 Days Delivery',
      description: 'Production-ready hosting setup for high-converting marketing landing pages, portfolios, or micro-frontends.',
      icon: Server,
      popular: false,
      deliverables: [
        'CloudFront CDN + S3 or Cloudflare Pages Edge setup',
        'Custom Domain DNS, SSL/TLS 1.3 automated renewal',
        'End-to-end CI/CD via GitHub Actions or Bitbucket',
        'DDoS & Bot mitigation rules configured',
        'Global edge caching with sub-50ms latency',
        'Complete Terraform IaC & Handover Documentation',
      ],
      suitableFor: 'Marketing Landing Pages, JAMstack sites, documentation hubs, product launch web apps.',
    },
    {
      id: 'monolith',
      name: 'Monolith & Growth App',
      target: 'Fullstack Apps & Backend APIs',
      timeline: '1 - 2 Weeks Delivery',
      description: 'Resilient cloud infrastructure for monolithic web apps, REST/GraphQL APIs, and background worker queues.',
      icon: Database,
      popular: false,
      deliverables: [
        'Containerized ECS Fargate or Hardened VPS (Docker Compose)',
        'AWS RDS (PostgreSQL/MySQL) with Multi-AZ & Automated Backups',
        'Managed Redis cache cluster for sessions & queues',
        'Staging & Production isolated environments',
        'Automated CI/CD: Lint -> Test -> Docker Build -> Zero-Downtime Deploy',
        'Centralized CloudWatch / Papertrail logs and alert notifications',
      ],
      suitableFor: 'Node.js, Python FastAPI/Django, Laravel, Go, Java Spring Boot web applications.',
    },
    {
      id: 'k8s',
      name: 'Cloud-Native Kubernetes',
      target: 'Microservices & High Scale',
      timeline: '2 - 4 Weeks Delivery',
      description: 'Enterprise-grade Kubernetes architecture built for high concurrency, auto-scaling, and GitOps delivery.',
      icon: Layers,
      popular: true,
      deliverables: [
        'Production EKS (AWS) or GKE (GCP) cluster provisioning via Terraform',
        'GitOps continuous deployment workflow using ArgoCD',
        'Custom Helm Charts & standard manifest standardization',
        'Ingress Controller (NGINX/Traefik) with auto SSL cert-manager',
        'Complete Observability: Prometheus, Grafana dashboards, Loki/ELK',
        'Horizontal Pod Autoscaling (HPA) + Cluster Autoscaler / Karpenter',
      ],
      suitableFor: 'Fast-scaling SaaS platforms, microservice architectures, fintech & e-commerce platforms.',
    },
    {
      id: 'ai-gpu',
      name: 'AI / LLM & GPU Infrastructure',
      target: 'Self-Hosted Inference & RAG',
      timeline: '1 - 3 Weeks Delivery',
      description: 'Production-grade self-hosted LLM & Vision model serving on NVIDIA, AMD, or Intel accelerators with complete privacy.',
      icon: Cpu,
      popular: true,
      deliverables: [
        'NVIDIA (CUDA / TensorRT-LLM), AMD (ROCm), Intel (Gaudi / OpenVINO) setup',
        'High-throughput inference serving with vLLM, Triton Inference Server, or TGI',
        'Private RAG pipeline & vector search (Qdrant, Milvus, pgvector)',
        'LiteLLM AI Gateway with API keys, rate-limiting, and token budget analytics',
        'Model quantization (FP8, AWQ) for 2x to 4x VRAM cost efficiency',
        'Cloud GPU (AWS p4/p5/g5, Lambda, RunPod) or On-Prem Bare-metal GPU orchestration',
      ],
      suitableFor: 'Companies deploying private LLMs, AI agents, high-volume embeddings, or air-gapped models.',
    },
    {
      id: 'enterprise',
      name: 'Multi-Cloud & FinOps Fleet',
      target: 'Enterprise Large Scale & DR',
      timeline: 'Custom Sprint Cycles',
      description: 'Comprehensive multi-cloud infrastructure, disaster recovery failover, and radical cloud invoice reduction.',
      icon: Cloud,
      popular: false,
      deliverables: [
        'Multi-Cloud redundancy mesh across AWS, Google Cloud, and Azure',
        'Active-Active / Warm Standby Disaster Recovery with failover drills',
        'Autonomous FinOps Cloud Cost Audit (guaranteed 30-45% spend cut)',
        'Zero-Trust IAM governance, Vault secret storage, and WAF security',
        'SOC2 Type II, ISO27001, and CIS Benchmark compliance hardening',
        '24/7 Dedicated SRE On-Call and Incident War-Room SLA handoff',
      ],
      suitableFor: 'Enterprises requiring zero single-cloud failure risk, compliance audits, and cloud cost slashing.',
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
            Tailored Cloud &amp; AI Architecture for <span className="accent">Every Project Stage</span>
          </h2>
          <p className="section-subtitle">
            From quick turnaround landing pages and monoliths to self-hosted GPU LLM clusters and multi-cloud fleets. 100% code handover and zero lock-in.
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
                    <span>{plan.id === 'ai-gpu' ? 'HOT: PRIVATE AI & GPU' : 'POPULAR FOR SCALE'}</span>
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
                  <span className="deliverables-heading">DELIVERABLES INCLUDED:</span>
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
                  <span className="suitable-label">Best Suited For:</span>
                  <p className="suitable-text">{plan.suitableFor}</p>
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
