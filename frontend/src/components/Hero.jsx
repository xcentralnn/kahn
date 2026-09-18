import { useState } from 'react'
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Lock, 
  AlertTriangle, 
  Flame,
  Search,
  FileCheck,
  Zap
} from 'lucide-react'

export default function Hero({ onOpenTerminal }) {
  const [activeTab, setActiveTab] = useState('iam')

  const auditSimulations = {
    iam: {
      name: 'IAM Entitlement & Escalation Graph',
      severity: 'CRITICAL RISK',
      summary: 'Detected 14 over-privileged service accounts with PassRole escalation to AdministratorAccess.',
      target: 'AWS IAM / GCP Cloud IAM',
      findings: [
        { label: 'iam:PassRole + ec2:RunInstances shadow admin path', status: 'CRITICAL', color: '#f43f5e' },
        { label: 'Exposed static service account access key (> 180 days)', status: 'HIGH', color: '#f97316' },
        { label: 'Wildcard Action * on Production DynamoDB & S3', status: 'HIGH', color: '#f97316' },
      ],
      remediation: 'terraform-remediation-pr-104.tf (Applied in 1-Click)',
    },
    posture: {
      name: 'Cloud Resource & Cost Drift Audit',
      severity: 'HIGH RISK & $8.4K/MO WASTE',
      summary: 'Identified 3 public S3 buckets, 8 unencrypted RDS instances, and 4 idle p4d GPU instances.',
      target: 'Multi-Cloud Asset Fleet',
      findings: [
        { label: 'Public readable S3 bucket: customer-invoices-backup', status: 'CRITICAL', color: '#f43f5e' },
        { label: 'Zombie 8x H100 GPU instance running idle ($8,420/mo)', status: 'FINOPS', color: '#38bdf8' },
        { label: 'Security Group 0.0.0.0/0 exposed to SSH port 22', status: 'HIGH', color: '#f97316' },
      ],
      remediation: 'Auto-isolate SG & trigger Spot auto-shutdown',
    },
    k8s: {
      name: 'Kubernetes Cluster & Container Escapes',
      severity: 'CRITICAL VULNERABILITY',
      summary: 'Privileged pod running with hostPath mount and hostPID access allowed root host takeover.',
      target: 'Amazon EKS / Google GKE Cluster',
      findings: [
        { label: 'HostPID=true & SYS_ADMIN capability container', status: 'CRITICAL', color: '#f43f5e' },
        { label: 'ClusterRoleBinding giving system:anonymous cluster-admin', status: 'CRITICAL', color: '#f43f5e' },
        { label: 'Missing NetworkPolicy allowing cross-namespace traffic', status: 'MEDIUM', color: '#eab308' },
      ],
      remediation: 'Kyverno / OPA Gatekeeper constraint enforced',
    },
    pentest: {
      name: 'Offensive Cloud Pentest & IMDS SSRF',
      severity: 'EXPLOITED IN SIMULATION',
      summary: 'Web application SSRF weaponized to extract AWS IMDSv1 temporary STS credentials.',
      target: 'Production API & Cloud Metadata',
      findings: [
        { label: 'IMDSv1 enabled: STS role credentials harvested', status: 'EXPLOITED', color: '#f43f5e' },
        { label: 'S3 exfiltration via compromised ec2-instance profile', status: 'CONFIRMED', color: '#f43f5e' },
        { label: 'Enforce IMDSv2 HopLimit=1 & strict session token', status: 'REMEDIATED', color: '#22c55e' },
      ],
      remediation: 'Enforce IMDSv2 HopLimit=1 across all EC2/GCE templates',
    },
  }

  const current = auditSimulations[activeTab]

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="badge">
              <ShieldCheck size={14} className="text-primary" />
              <span>KAHN CLOUD SECURITY & AUDITING PLATFORM</span>
            </div>

            <h1 className="hero-title">
              Automated Cloud Resource Audit & <span className="accent">Enterprise Pentest</span>
            </h1>

            <p className="hero-desc">
              Continuous agentless posture audits across AWS, GCP, Azure & Kubernetes. Uncover over-privileged IAM paths, misconfigured resources, and compliance drift before adversaries strike.
            </p>

            <div className="hero-metrics-chips">
              <div className="metric-chip">
                <span className="metric-val">15 Min</span>
                <span className="metric-label">Agentless Scan</span>
              </div>
              <div className="metric-chip">
                <span className="metric-val">100%</span>
                <span className="metric-label">Read-Only Safe</span>
              </div>
              <div className="metric-chip">
                <span className="metric-val">CIS & SOC 2</span>
                <span className="metric-label">Compliance Mapped</span>
              </div>
              <div className="metric-chip">
                <span className="metric-val">OSCP/CRTE</span>
                <span className="metric-label">Certified Pentest</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                <span>Request Free Cloud Audit</span>
                <ArrowRight size={16} />
              </a>
              <button 
                className="btn btn-outline terminal-trigger-btn"
                onClick={onOpenTerminal}
              >
                <Terminal size={16} className="text-primary" />
                <span>Launch Cloud Bastion</span>
              </button>
            </div>
          </div>

          <div className="hero-blueprint-card">
            <div className="blueprint-header">
              <div className="blueprint-title-row">
                <div className="blueprint-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="blueprint-title">KAHN AUDIT ENGINE — LIVE INSPECTOR</span>
              </div>

              <div className="plan-tabs">
                <button 
                  className={`plan-tab-btn ${activeTab === 'iam' ? 'active' : ''}`}
                  onClick={() => setActiveTab('iam')}
                >
                  IAM Graph
                </button>
                <button 
                  className={`plan-tab-btn ${activeTab === 'posture' ? 'active' : ''}`}
                  onClick={() => setActiveTab('posture')}
                >
                  Resource Drift
                </button>
                <button 
                  className={`plan-tab-btn ${activeTab === 'k8s' ? 'active' : ''}`}
                  onClick={() => setActiveTab('k8s')}
                >
                  Kubernetes
                </button>
                <button 
                  className={`plan-tab-btn ${activeTab === 'pentest' ? 'active' : ''}`}
                  onClick={() => setActiveTab('pentest')}
                >
                  Pentest PoC
                </button>
              </div>
            </div>

            <div className="blueprint-body">
              <div className="blueprint-meta-bar">
                <div className="meta-left">
                  <span className="meta-badge-target">{current.target}</span>
                  <h4 className="meta-plan-name">{current.name}</h4>
                </div>
                <div className="meta-right">
                  <span className="meta-severity-pill">{current.severity}</span>
                </div>
              </div>

              <p className="blueprint-summary">{current.summary}</p>

              <div className="audit-findings-list">
                {current.findings.map((f, i) => (
                  <div key={i} className="finding-item">
                    <AlertTriangle size={15} style={{ color: f.color }} />
                    <span className="finding-label">{f.label}</span>
                    <span className="finding-badge" style={{ borderColor: f.color, color: f.color }}>
                      {f.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="remediation-bar">
                <CheckCircle2 size={15} className="text-success" />
                <span className="remediation-text">{current.remediation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
