import { 
  CloudRain, 
  RefreshCw, 
  DollarSign, 
  Lock, 
  GitBranch, 
  Cpu, 
  Sparkles,
  CheckCircle,
  TerminalSquare
} from 'lucide-react'

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Sparkles size={14} className="text-primary" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="section-title">
            Engineered for High-Velocity <span className="accent">Platform Engineering</span>
          </h2>
          <p className="section-subtitle">
            Valnia eliminates infrastructure toil with autonomous orchestration, automated compliance guardrails, and real-time self-healing agents.
          </p>
        </div>

        <div className="bento-grid">
          {/* Bento Item 1: Wide */}
          <div className="bento-card bento-wide glass-panel">
            <div className="bento-content">
              <div className="feature-icon-box icon-cyan">
                <CloudRain size={24} />
              </div>
              <h3>Autonomous Multi-Cloud Control Plane</h3>
              <p>
                Eliminate vendor lock-in. Define application architectures declaratively once and deploy seamlessly across AWS, Azure, GCP, or hybrid Kubernetes clusters with automatic traffic steering.
              </p>
              <div className="bento-feature-tags">
                <span className="pill">Unified API</span>
                <span className="pill">AWS / GCP / Azure</span>
                <span className="pill">Hybrid Cloud Mesh</span>
              </div>
            </div>
            <div className="bento-visual cloud-control-visual">
              <div className="mini-region-pill">
                <span className="status-ping"></span>
                <span>AWS us-east-1</span>
                <span className="tag-latency">12ms</span>
              </div>
              <div className="mini-region-pill">
                <span className="status-ping"></span>
                <span>GCP europe-west3</span>
                <span className="tag-latency">19ms</span>
              </div>
              <div className="mini-region-pill">
                <span className="status-ping"></span>
                <span>Azure eastus2</span>
                <span className="tag-latency">15ms</span>
              </div>
            </div>
          </div>

          {/* Bento Item 2 */}
          <div className="bento-card glass-panel">
            <div className="feature-icon-box icon-indigo">
              <RefreshCw size={24} />
            </div>
            <h3>Self-Healing Canaries</h3>
            <p>
              Autonomous real-time anomaly detection triggers safe instant rollbacks in under 80ms before bad deploys ever reach production end users.
            </p>
            <div className="metric-chip positive-chip">
              <CheckCircle size={14} />
              <span>0% Deployment Outage Rate</span>
            </div>
          </div>

          {/* Bento Item 3 */}
          <div className="bento-card glass-panel">
            <div className="feature-icon-box icon-emerald">
              <DollarSign size={24} />
            </div>
            <h3>Predictive FinOps AI</h3>
            <p>
              Continuous machine learning dynamically balances Spot and On-Demand instances, rightsizes CPU/RAM limits, and cuts cloud waste automatically.
            </p>
            <div className="metric-chip emerald-chip">
              <span>Avg. -45% Cloud Spend Reduction</span>
            </div>
          </div>

          {/* Bento Item 4 */}
          <div className="bento-card glass-panel">
            <div className="feature-icon-box icon-purple">
              <Lock size={24} />
            </div>
            <h3>Zero-Trust Guardrails</h3>
            <p>
              Pre-flight static code checks and runtime eBPF monitoring enforce least-privilege IAM roles, SOC2 compliance, and automatic vulnerability patching.
            </p>
            <div className="metric-chip purple-chip">
              <span>SOC2, ISO27001, HIPAA Ready</span>
            </div>
          </div>

          {/* Bento Item 5: Wide */}
          <div className="bento-card bento-wide glass-panel">
            <div className="bento-content">
              <div className="feature-icon-box icon-cyan">
                <GitBranch size={24} />
              </div>
              <h3>Instant Ephemeral Environments</h3>
              <p>
                Every pull request automatically provisions an isolated, production-identical staging preview environment in less than 45 seconds. De-provisioned automatically when PR merges.
              </p>
              <div className="bento-feature-tags">
                <span className="pill">GitOps Native</span>
                <span className="pill">Database Branching</span>
                <span className="pill">Automatic Teardown</span>
              </div>
            </div>
            <div className="bento-visual pr-env-visual">
              <div className="pr-bubble">
                <div className="pr-header">
                  <TerminalSquare size={16} className="text-cyan" />
                  <span>pr-482-payment-v2.valnia.preview</span>
                </div>
                <div className="pr-meta">
                  <span className="text-emerald">● Live Ready</span>
                  <span className="text-faint">Provisioned in 38s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 6 */}
          <div className="bento-card glass-panel">
            <div className="feature-icon-box icon-rose">
              <Cpu size={24} />
            </div>
            <h3>Autonomous Root-Cause AI</h3>
            <p>
              Connect telemetry traces and log streams directly to autonomous diagnosis agents. Pinpoint memory leaks and degraded microservices in seconds.
            </p>
            <div className="metric-chip rose-chip">
              <span>10x Faster MTTR (Mean Time to Repair)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
