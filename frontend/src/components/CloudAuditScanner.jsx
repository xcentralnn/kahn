import { useState } from 'react'
import { 
  Search, 
  ShieldAlert, 
  CheckCircle, 
  DollarSign, 
  Terminal, 
  Lock, 
  AlertOctagon,
  RefreshCw,
  ExternalLink
} from 'lucide-react'

export default function CloudAuditScanner() {
  const [activeCategory, setActiveCategory] = useState('all')

  const scanRecords = [
    {
      id: 'SEC-01',
      category: 'iam',
      provider: 'AWS',
      severity: 'CRITICAL',
      title: 'PassRole Privilege Escalation Path Found',
      resource: 'arn:aws:iam::12704697717:role/dev-deployer-role',
      impact: 'Allows any compromised developer key to assume AdministratorAccess via EC2 instance profile creation.',
      costSavings: '$0',
      remediation: 'Restrict iam:PassRole to specific hardened Bastion role ARNs only.',
    },
    {
      id: 'FIN-02',
      category: 'cost',
      provider: 'GCP',
      severity: 'HIGH',
      title: 'Zombie 8x NVIDIA H100 GPU Instance Idle (720h)',
      resource: 'projects/kahn-dev/zones/asia-southeast1-a/instances/gpu-cluster-worker-04',
      impact: 'Instance has 0% GPU utilization over past 30 days, generating $8,420/month unneeded billing waste.',
      costSavings: '$8,420 / mo',
      remediation: 'Generate 1-click snapshot and trigger automated instance termination.',
    },
    {
      id: 'NET-03',
      category: 'network',
      provider: 'AWS',
      severity: 'CRITICAL',
      title: 'Public S3 Bucket with Unrestricted Listing',
      resource: 's3://production-customer-kyc-documents-v2',
      impact: 'Public Principal (*) granted s3:GetObject and s3:ListBucket. Critical data exposure risk.',
      costSavings: '$0',
      remediation: 'Apply AWS S3 Block Public Access at account root and bucket level.',
    },
    {
      id: 'K8S-04',
      category: 'k8s',
      provider: 'Kubernetes',
      severity: 'CRITICAL',
      title: 'Container Running With HostPID and Root Mount',
      resource: 'namespace: monitoring / pod: log-forwarder-daemonset-8kfx2',
      impact: 'Allows malicious actor inside container to inspect host process memory and breakout to node.',
      costSavings: '$0',
      remediation: 'Remove HostPID=true and replace hostPath with unprivileged volume mount.',
    },
    {
      id: 'PENTEST-05',
      category: 'pentest',
      provider: 'AWS',
      severity: 'HIGH',
      title: 'IMDSv1 SSRF Exfiltration Vulnerability',
      resource: 'https://api.internal.company.com/proxy?url=http://169.254.169.254',
      impact: 'Exploitable via SSRF to exfiltrate IAM role session tokens without token header validation.',
      costSavings: '$0',
      remediation: 'Enforce HttpTokens=required (IMDSv2) with HttpPutResponseHopLimit=1.',
    },
    {
      id: 'FIN-06',
      category: 'cost',
      provider: 'AWS',
      severity: 'MEDIUM',
      title: '38 Unattached gp3 EBS Volumes in us-east-1',
      resource: 'vol-098e21a8f9, vol-0382dca91c (+36 more)',
      impact: 'Dangling storage left over from deleted worker nodes consuming $1,240/month in idle capacity.',
      costSavings: '$1,240 / mo',
      remediation: 'Execute automated pruning script with backup snapshot retention policy.',
    },
  ]

  const filtered = activeCategory === 'all' 
    ? scanRecords 
    : scanRecords.filter((r) => r.category === activeCategory)

  return (
    <section className="fleet-section" id="scanner">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Search size={14} className="text-primary" />
            <span>Kahn Security Inspector</span>
          </div>
          <h2 className="section-title">
            Interactive Cloud Audit & <span className="accent">Vulnerability Scanner</span>
          </h2>
          <p className="section-subtitle">
            Explore realistic findings uncovered by Kahn's automated audit engine across IAM permissions, cloud resource posture, cost drift, and offensive pentest vectors.
          </p>
        </div>

        <div className="scanner-control-bar">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Findings ({scanRecords.length})
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'iam' ? 'active' : ''}`}
              onClick={() => setActiveCategory('iam')}
            >
              IAM & Entitlements
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'cost' ? 'active' : ''}`}
              onClick={() => setActiveCategory('cost')}
            >
              Cost & Zombie Waste
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'k8s' ? 'active' : ''}`}
              onClick={() => setActiveCategory('k8s')}
            >
              Kubernetes Posture
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'pentest' ? 'active' : ''}`}
              onClick={() => setActiveCategory('pentest')}
            >
              Pentest Exploits
            </button>
          </div>
        </div>

        <div className="scanner-findings-grid">
          {filtered.map((item) => (
            <div key={item.id} className="finding-card">
              <div className="finding-card-top">
                <span className={`severity-badge severity-${item.severity.toLowerCase()}`}>
                  {item.severity}
                </span>
                <span className="provider-badge">{item.provider}</span>
                {item.costSavings !== '$0' && (
                  <span className="savings-badge">Waste: {item.costSavings}</span>
                )}
              </div>

              <h4 className="finding-card-title">{item.title}</h4>
              <p className="finding-resource-path"><code>{item.resource}</code></p>
              <p className="finding-card-impact">{item.impact}</p>

              <div className="finding-remediation-box">
                <span className="remediation-label">Automated Remediation:</span>
                <p className="remediation-desc">{item.remediation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
