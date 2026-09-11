import { useState } from 'react'
import { 
  ArrowRight, 
  CheckCircle2, 
  Server, 
  Layers, 
  GitBranch, 
  Cloud, 
  Clock,
  Cpu,
  Database,
  Sparkles
} from 'lucide-react'

export default function Hero() {
  const [selectedPlan, setSelectedPlan] = useState('gpu')

  const planBlueprints = {
    landing: {
      name: 'Starter / Landing Page',
      delivery: '2 - 3 Days',
      stack: 'S3 + CloudFront + Cloudflare WAF + SSL',
      pipeline: 'GitHub Actions / Bitbucket to Global CDN',
      highlight: 'Ultra-fast global TTFB (<40ms), DDoS protection, zero server maintenance required.',
      nodes: [
        { name: 'Git Commit', role: 'Main branch push', type: 'git' },
        { name: 'CI/CD Gating', role: 'Automated build & lint', type: 'ci' },
        { name: 'CloudFront CDN', role: '300+ Edge POPs & TLS 1.3', type: 'cloud' },
        { name: 'S3 / Vercel Edge', role: 'Static origin assets', type: 'storage' },
      ],
    },
    monolith: {
      name: 'Fullstack Monolith & API',
      delivery: '1 - 2 Weeks',
      stack: 'AWS ECS Fargate / DigitalOcean + RDS PostgreSQL + Redis',
      pipeline: 'Docker Multi-Stage Build + Automated DB Migrations + Staging/Prod',
      highlight: 'Production-ready High Availability with automated point-in-time database backups and SSL renewal.',
      nodes: [
        { name: 'ALB Gateway', role: 'TLS termination & WAF', type: 'cloud' },
        { name: 'ECS Tasks / VPS', role: 'Auto-healing container runtime', type: 'compute' },
        { name: 'RDS Multi-AZ', role: 'PostgreSQL / MySQL with PITR', type: 'storage' },
        { name: 'Redis Cache', role: 'Session store & fast query cache', type: 'cache' },
      ],
    },
    k8s: {
      name: 'Cloud-Native Kubernetes',
      delivery: '2 - 4 Weeks',
      stack: 'AWS EKS / GCP GKE + ArgoCD GitOps + Helm + Prometheus',
      pipeline: 'Bitbucket/GitLab/GitHub -> Image Scan -> GitOps Sync -> Canary Deploy',
      highlight: 'Enterprise Kubernetes cluster with HPA auto-scaling, cert-manager, external-dns, and 24/7 Prometheus/Grafana alerts.',
      nodes: [
        { name: 'Ingress Controller', role: 'Traefik / NGINX with Auto SSL', type: 'cloud' },
        { name: 'EKS Worker Nodes', role: 'Spot + On-Demand Karpenter fleet', type: 'compute' },
        { name: 'ArgoCD GitOps', role: 'Declarative state synchronization', type: 'ci' },
        { name: 'Monitoring Stack', role: 'Prometheus, Grafana, Loki', type: 'monitor' },
      ],
    },
    multicloud: {
      name: 'Enterprise Multi-Cloud & FinOps',
      delivery: 'Custom Sprints',
      stack: 'AWS + GCP + Azure Mesh + Terraform IaC + Zero-Trust IAM',
      pipeline: 'Cross-cloud unified CI/CD with disaster recovery failover drills',
      highlight: 'Eliminate single cloud risk with active-active routing, automated cost optimization (-40%), and SOC2 compliance.',
      nodes: [
        { name: 'Global Traffic Mgr', role: 'DNS latency routing & health probes', type: 'cloud' },
        { name: 'AWS Primary Region', role: 'Core transaction cluster', type: 'compute' },
        { name: 'GCP / Azure Backup', role: 'Warm standby / Analytics read replicas', type: 'compute' },
        { name: 'FinOps Optimizer', role: 'Spot arbitrage & reserved right-sizing', type: 'finops' },
      ],
    },
    gpu: {
      name: 'Private AI / LLM & GPU Infrastructure',
      delivery: '1 - 3 Weeks',
      stack: 'NVIDIA (CUDA / TensorRT) + AMD ROCm + Intel Gaudi + vLLM / Triton',
      pipeline: 'Automated Model Quantization (AWQ/FP8) + Private RAG + High-Throughput Serving API',
      highlight: 'Sub-30ms first-token latency, air-gapped data privacy, auto-scaling GPU inference clusters across cloud or on-prem.',
      nodes: [
        { name: 'AI API Gateway', role: 'LiteLLM + Rate Limiting + Semantic Cache', type: 'cloud' },
        { name: 'GPU Cluster Engine', role: 'NVIDIA H100 / AMD MI300X / Intel Gaudi', type: 'compute' },
        { name: 'vLLM / Triton', role: 'PagedAttention & Continuous Batching', type: 'ci' },
        { name: 'Vector DB / RAG', role: 'Qdrant / Milvus / pgvector Hybrid Search', type: 'storage' },
      ],
    },
  }

  const current = planBlueprints[selectedPlan]

  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge hero-badge">
            <span className="badge-dot"></span>
            <span>Cloud Infrastructure &amp; AI Delivery Partner</span>
          </div>

          <h1 className="hero-title">
            From High-Speed Landing Pages to <span className="accent">GPU Accelerated AI Fleets</span>
          </h1>

          <p className="hero-description">
            We architect, automate, and maintain battle-tested cloud platforms. From static landing pages and monoliths to self-hosted LLM clusters (NVIDIA, AMD, Intel) and multi-cloud Kubernetes with 24/7 SRE support.
          </p>

          <div className="hero-actions">
            <a href="#plans" className="btn btn-lg btn-primary">
              <span>Explore Delivery Plans</span>
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-lg btn-secondary">
              <span>Book Architecture Review</span>
            </a>
          </div>

          <div className="hero-trust-signals">
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>100% Terraform/IaC Handover</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>NVIDIA, AMD &amp; Intel GPU Stacks</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>Sub-15m P1 SLA Coverage</span>
            </div>
          </div>
        </div>

        <div className="hero-preview-wrapper" id="blueprint-preview">
          <div className="console-card glass-panel">
            <div className="console-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="console-tab-bar">
                <button 
                  className={`console-tab-btn ${selectedPlan === 'gpu' ? 'active' : ''}`}
                  onClick={() => setSelectedPlan('gpu')}
                >
                  <Cpu size={14} />
                  <span>GPU &amp; Private AI / LLM</span>
                </button>
                <button 
                  className={`console-tab-btn ${selectedPlan === 'k8s' ? 'active' : ''}`}
                  onClick={() => setSelectedPlan('k8s')}
                >
                  <Layers size={14} />
                  <span>Kubernetes &amp; Scale</span>
                </button>
                <button 
                  className={`console-tab-btn ${selectedPlan === 'monolith' ? 'active' : ''}`}
                  onClick={() => setSelectedPlan('monolith')}
                >
                  <Database size={14} />
                  <span>Monolith &amp; Backend</span>
                </button>
                <button 
                  className={`console-tab-btn ${selectedPlan === 'multicloud' ? 'active' : ''}`}
                  onClick={() => setSelectedPlan('multicloud')}
                >
                  <Cloud size={14} />
                  <span>Multi-Cloud Mesh</span>
                </button>
                <button 
                  className={`console-tab-btn ${selectedPlan === 'landing' ? 'active' : ''}`}
                  onClick={() => setSelectedPlan('landing')}
                >
                  <Server size={14} />
                  <span>Landing Page</span>
                </button>
              </div>
              <div className="console-status-pill">
                <Clock size={12} />
                <span>Delivery: {current.delivery}</span>
              </div>
            </div>

            <div className="console-body">
              <div className="blueprint-meta-strip">
                <div>
                  <span className="blueprint-label">Target Architecture</span>
                  <h3 className="blueprint-title">{current.name}</h3>
                </div>
                <div className="blueprint-stack-box">
                  <span className="blueprint-label">Infrastructure &amp; AI Stack</span>
                  <span className="blueprint-stack-val">{current.stack}</span>
                </div>
              </div>

              <div className="blueprint-nodes-row">
                {current.nodes.map((node, nIdx) => (
                  <div key={nIdx} className="blueprint-node-box">
                    <div className="node-box-top">
                      <span className="node-step-tag">0{nIdx + 1}</span>
                      <span className={`node-type-pill type-${node.type}`}>{node.type}</span>
                    </div>
                    <h4>{node.name}</h4>
                    <p>{node.role}</p>
                  </div>
                ))}
              </div>

              <div className="blueprint-bottom-summary">
                <div className="blueprint-pipeline-info">
                  <GitBranch size={16} className="text-cyan" />
                  <span><strong>End-to-End Pipeline:</strong> {current.pipeline}</span>
                </div>
                <p className="blueprint-highlight-text">{current.highlight}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
