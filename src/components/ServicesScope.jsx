import { 
  GitMerge, 
  FileCode, 
  CloudSun, 
  TrendingDown, 
  ShieldAlert, 
  Cpu, 
  CheckCircle2,
  Terminal,
  Zap
} from 'lucide-react'

export default function ServicesScope() {
  const services = [
    {
      icon: Cpu,
      title: 'GPU & Self-Hosted AI/LLM Infrastructure',
      tag: 'NVIDIA • AMD • Intel',
      description: 'End-to-end deployment of private LLMs, multimodal models, and vector search. We configure GPU drivers, container runtimes, and high-throughput inference engines with zero cloud API token leakage.',
      bullets: [
        'NVIDIA (H100, A100, L40S, CUDA, TensorRT-LLM, vLLM)',
        'AMD Instinct (MI300X, ROCm 6.x) & Intel (Gaudi 2/3, OpenVINO)',
        'Private RAG architectures (Qdrant, Milvus, pgvector) & LiteLLM Gateway',
      ],
    },
    {
      icon: GitMerge,
      title: 'End-to-End CI/CD Pipelines',
      tag: 'Automation & Velocity',
      description: 'Design and implementation of bulletproof continuous delivery pipelines. From commit to staging and production with automated testing, container image security scans, and instant rollback capability.',
      bullets: [
        'Bitbucket Pipelines, GitHub Actions, GitLab CI & ArgoCD',
        'Vulnerability scanning with Trivy & Snyk gates',
        'Zero-downtime Blue/Green and Canary rollouts',
      ],
    },
    {
      icon: FileCode,
      title: 'Infrastructure as Code (IaC)',
      tag: 'Declarative & Reliable',
      description: 'Zero manual clicking in cloud consoles. All VPCs, subnets, clusters, databases, and IAM permissions are codified in clean, modular Terraform or OpenTofu modules.',
      bullets: [
        'Terraform, Terragrunt, OpenTofu & Ansible',
        'Secure remote state management (S3 / DynamoDB locks)',
        'Full documentation & architectural diagrams included',
      ],
    },
    {
      icon: CloudSun,
      title: 'Multi-Cloud & Hybrid Architecture',
      tag: 'High Availability & Resilience',
      description: 'Eliminate single-provider dependency. Architect active-active or active-passive disaster recovery across Amazon Web Services, Google Cloud, Microsoft Azure, and bare-metal environments.',
      bullets: [
        'AWS, GCP, Azure & Bare-metal Kubernetes',
        'Cross-cloud low-latency DNS & Global Traffic Management',
        'Disaster recovery failover simulation & runbooks',
      ],
    },
    {
      icon: TrendingDown,
      title: 'FinOps & Cloud Cost Slashing',
      tag: '30% - 45% Typical Savings',
      description: 'Stop burning budget on unneeded cloud capacity. We audit workloads, replace costly on-demand instances with automated Spot fleets, eliminate orphaned storage, and optimize data egress paths.',
      bullets: [
        'Spot fleet & Karpenter automated orchestration',
        'GPU spot instances & serverless LLM scaling',
        'Savings Plans & Reserved Instance planning',
      ],
    },
    {
      icon: ShieldAlert,
      title: 'Zero-Trust Security & Compliance',
      tag: 'SOC2, ISO27001 & CIS Ready',
      description: 'Embed security directly into your delivery pipeline. Implement least-privilege IAM policies, automated secret rotation with Vault, SSL/TLS enforcement, and AWS WAF perimeter defense.',
      bullets: [
        'CIS Foundation Benchmark hardening',
        'Automated secret management & key rotation',
        'Air-gapped private model inference compliance',
      ],
    },
  ]

  return (
    <section className="services-scope-section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Terminal size={14} className="text-primary" />
            <span>Consulting &amp; Engineering Scope</span>
          </div>
          <h2 className="section-title">
            Complete End-to-End <span className="accent">DevOps, Cloud &amp; AI Delivery</span>
          </h2>
          <p className="section-subtitle">
            From low-level NVIDIA/AMD GPU kernel tuning and high-speed CI/CD pipelines to high-level multi-cloud GitOps architecture.
          </p>
        </div>

        <div className="services-grid">
          {services.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div key={i} className="service-card glass-panel">
                <div className="service-card-top">
                  <div className="service-icon-box">
                    <Icon size={24} className="service-icon" />
                  </div>
                  <span className="service-tag">{svc.tag}</span>
                </div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.description}</p>
                <div className="service-bullets">
                  {svc.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="service-bullet-item">
                      <CheckCircle2 size={15} className="text-cyan" />
                      <span>{b}</span>
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
