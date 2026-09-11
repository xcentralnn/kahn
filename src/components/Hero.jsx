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
  Award
} from 'lucide-react'

export default function Hero() {
  const [selectedPlan, setSelectedPlan] = useState('gpu')

  const planBlueprints = {
    landing: {
      name: 'Starter / Landing Page',
      delivery: '2 - 3 Days',
      stack: 'S3 + CloudFront + Cloudflare WAF + SSL',
      pipeline: 'Git Push to Global Edge CDN',
      highlight: 'Sub-40ms global TTFB, DDoS protection, zero server maintenance.',
      nodes: [
        { name: 'Git Commit', role: 'Main push', type: 'git' },
        { name: 'CI/CD Gating', role: 'Lint & build', type: 'ci' },
        { name: 'CloudFront CDN', role: '300+ Edge POPs', type: 'cloud' },
        { name: 'S3 Origin', role: 'Static assets', type: 'storage' },
      ],
    },
    monolith: {
      name: 'Fullstack Monolith & API',
      delivery: '1 - 2 Weeks',
      stack: 'AWS ECS Fargate / VPS + RDS PostgreSQL + Redis',
      pipeline: 'Docker Multi-Stage Build + Automated DB Migrations',
      highlight: 'High availability with automated database backups and zero-downtime deploys.',
      nodes: [
        { name: 'ALB Gateway', role: 'WAF & TLS', type: 'cloud' },
        { name: 'ECS Tasks', role: 'Auto-healing containers', type: 'compute' },
        { name: 'RDS Multi-AZ', role: 'Postgres / MySQL', type: 'storage' },
        { name: 'Redis Cache', role: 'Fast cache & queue', type: 'cache' },
      ],
    },
    k8s: {
      name: 'Cloud-Native Kubernetes',
      delivery: '2 - 4 Weeks',
      stack: 'AWS EKS / GCP GKE + ArgoCD GitOps + Helm + Prometheus',
      pipeline: 'GitLab / Bitbucket / GitHub to ArgoCD Canary Sync',
      highlight: 'Auto-scaling cluster with Karpenter, cert-manager, and Grafana observability.',
      nodes: [
        { name: 'Ingress Controller', role: 'Auto SSL certs', type: 'cloud' },
        { name: 'K8s Worker Nodes', role: 'Spot + On-Demand', type: 'compute' },
        { name: 'ArgoCD GitOps', role: 'Declarative sync', type: 'ci' },
        { name: 'Monitoring Stack', role: 'Prometheus & Grafana', type: 'monitor' },
      ],
    },
    gpu: {
      name: 'Private AI / LLM & GPU Fleet',
      delivery: '1 - 3 Weeks',
      stack: 'NVIDIA (H100/L40S) + AMD (MI300X) + Intel Gaudi + vLLM / Triton',
      pipeline: 'AWQ / FP8 Quantization + Private RAG + High-Throughput API',
      highlight: 'Sub-30ms first token, complete data privacy, cloud or on-prem GPU orchestration.',
      nodes: [
        { name: 'AI API Gateway', role: 'LiteLLM + Cache', type: 'cloud' },
        { name: 'GPU Cluster', role: 'NVIDIA / AMD / Intel', type: 'compute' },
        { name: 'vLLM Engine', role: 'PagedAttention', type: 'ci' },
        { name: 'Vector Database', role: 'Qdrant / Milvus', type: 'storage' },
      ],
    },
    multicloud: {
      name: 'Enterprise Multi-Cloud & FinOps',
      delivery: 'Custom Sprints',
      stack: 'AWS + Azure + GCP Mesh + Terraform IaC',
      pipeline: 'Cross-cloud CI/CD with Disaster Recovery drills',
      highlight: 'Zero single-cloud risk, active-active failover, and -40% cloud cost reduction.',
      nodes: [
        { name: 'Global Traffic Mgr', role: 'Latency routing', type: 'cloud' },
        { name: 'AWS Primary Region', role: 'Core compute', type: 'compute' },
        { name: 'Azure / GCP Backup', role: 'Warm standby', type: 'compute' },
        { name: 'FinOps Engine', role: 'Spot arbitrage', type: 'finops' },
      ],
    },
  }

  const current = planBlueprints[selectedPlan]

  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge hero-badge">
            <Award size={14} className="text-cyan" />
            <span>Official Cloud, AI &amp; CNCF Partner</span>
          </div>

          <h1 className="hero-title">
            Architect, Deploy &amp; Scale <span className="accent">Cloud &amp; AI Infrastructure</span>
          </h1>

          <p className="hero-description">
            End-to-end DevOps, GPU acceleration, and cloud delivery consulting. From landing pages and monoliths to multi-cloud Kubernetes fleets with 24/7 SRE support.
          </p>

          <div className="hero-actions">
            <a href="#plans" className="btn btn-lg btn-primary">
              <span>Delivery Plans</span>
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-lg btn-secondary">
              <span>Book Consultation</span>
            </a>
          </div>

          <div className="hero-partner-chips">
            <span className="partner-badge-pill">AWS Partner</span>
            <span className="partner-badge-pill">Microsoft Azure</span>
            <span className="partner-badge-pill">Google Cloud</span>
            <span className="partner-badge-pill">NVIDIA Partner</span>
            <span className="partner-badge-pill">CNCF KCSP</span>
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
                  <span>AI &amp; GPU Fleet</span>
                </button>
                <button 
                  className={`console-tab-btn ${selectedPlan === 'k8s' ? 'active' : ''}`}
                  onClick={() => setSelectedPlan('k8s')}
                >
                  <Layers size={14} />
                  <span>Kubernetes</span>
                </button>
                <button 
                  className={`console-tab-btn ${selectedPlan === 'monolith' ? 'active' : ''}`}
                  onClick={() => setSelectedPlan('monolith')}
                >
                  <Database size={14} />
                  <span>Monolith / API</span>
                </button>
                <button 
                  className={`console-tab-btn ${selectedPlan === 'multicloud' ? 'active' : ''}`}
                  onClick={() => setSelectedPlan('multicloud')}
                >
                  <Cloud size={14} />
                  <span>Multi-Cloud</span>
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
                  <span className="blueprint-label">Stack</span>
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
                  <GitBranch size={15} className="text-cyan" />
                  <span><strong>Pipeline:</strong> {current.pipeline}</span>
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
