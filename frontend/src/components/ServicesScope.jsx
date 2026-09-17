import { 
  GitMerge, 
  FileCode, 
  CloudSun, 
  TrendingDown, 
  ShieldAlert, 
  Cpu, 
  CheckCircle2,
  Terminal
} from 'lucide-react'

export default function ServicesScope() {
  const services = [
    {
      icon: Cpu,
      title: 'GPU & Self-Hosted AI/LLM',
      tag: 'NVIDIA • AMD • Intel',
      description: 'Deploy private LLMs and vision models with high-throughput inference engines and zero API token leakage.',
      bullets: [
        'NVIDIA (H100/A100/L40S, CUDA, TensorRT-LLM, vLLM)',
        'AMD Instinct (MI300X, ROCm 6.x) & Intel Gaudi',
        'Private RAG (Qdrant, Milvus) & LiteLLM Gateway',
      ],
    },
    {
      icon: GitMerge,
      title: 'End-to-End CI/CD Pipelines',
      tag: 'Speed & Reliability',
      description: 'Bulletproof delivery pipelines with automated testing, container security scanning, and instant rollback.',
      bullets: [
        'Bitbucket Pipelines, GitHub Actions, GitLab CI & ArgoCD',
        'Vulnerability scanning with Trivy & Snyk gates',
        'Zero-downtime Blue/Green & Canary deployments',
      ],
    },
    {
      icon: FileCode,
      title: 'Infrastructure as Code (IaC)',
      tag: '100% Declarative',
      description: 'All VPCs, clusters, databases, and IAM permissions codified in clean, modular Terraform or OpenTofu.',
      bullets: [
        'Terraform, Terragrunt, OpenTofu & Ansible',
        'Secure remote state in S3 & DynamoDB locks',
        'Complete architectural diagrams & documentation',
      ],
    },
    {
      icon: CloudSun,
      title: 'Multi-Cloud & Hybrid Mesh',
      tag: 'High Availability',
      description: 'Active-active or active-passive disaster recovery across AWS, Google Cloud, Azure, and bare-metal.',
      bullets: [
        'AWS, GCP, Azure & Bare-metal Kubernetes',
        'Cross-cloud low-latency DNS traffic routing',
        'Automated disaster recovery failover runbooks',
      ],
    },
    {
      icon: TrendingDown,
      title: 'FinOps Cloud Cost Slashing',
      tag: '-30% to -45% Typical Savings',
      description: 'Audit workloads, replace costly on-demand instances with automated Spot fleets, and right-size capacity.',
      bullets: [
        'Spot fleet & Karpenter automated orchestration',
        'GPU spot instances & serverless scaling',
        'Savings Plans & Reserved Instance optimization',
      ],
    },
    {
      icon: ShieldAlert,
      title: 'Zero-Trust Security & Hardening',
      tag: 'SOC2 & CIS Ready',
      description: 'Embed security into your pipeline with least-privilege IAM, automated Vault secrets, and WAF defense.',
      bullets: [
        'CIS Foundation Benchmark compliance',
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
            <span>Core Capabilities</span>
          </div>
          <h2 className="section-title">
            End-to-End <span className="accent">Cloud, DevOps &amp; AI Scope</span>
          </h2>
          <p className="section-subtitle">
            From NVIDIA/AMD GPU kernel tuning and high-speed CI/CD to multi-cloud GitOps architecture.
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
