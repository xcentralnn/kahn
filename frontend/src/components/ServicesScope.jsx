import { 
  KeyRound, 
  DollarSign, 
  Layers, 
  Flame, 
  GitBranch, 
  FileCheck2,
  CheckCircle2
} from 'lucide-react'

export default function ServicesScope() {
  const services = [
    {
      icon: KeyRound,
      title: 'Cloud IAM & Entitlement Review (CIEM)',
      tag: 'Least Privilege • Zero Trust',
      description: 'Audit complex IAM relationship trees, cross-account assume-roles, and shadow admin escalation vectors across AWS, GCP, and Azure.',
      bullets: [
        'Toxic permission combo detection (iam:PassRole, sts:AssumeRole)',
        'Unused & over-privileged service account credential pruning',
        'Automated least-privilege policy generation via CloudTrail analysis',
      ],
    },
    {
      icon: DollarSign,
      title: 'Multi-Cloud Asset & Cost Drift Audit',
      tag: 'FinOps & Security Fusion',
      description: 'Discover forgotten shadow assets, open security groups, and zombie GPU/compute instances draining your monthly cloud budget.',
      bullets: [
        'Zombie compute, unattached EBS volumes & idle GPU detection',
        'Exposed S3/GCS buckets, public RDS instances & 0.0.0.0/0 ports',
        'Instant cost leakage report with guaranteed cloud bill savings',
      ],
    },
    {
      icon: Layers,
      title: 'Kubernetes & Container Security Posture',
      tag: 'EKS • GKE • AKS • Bare-Metal',
      description: 'Harden Kubernetes clusters against container breakouts, privileged daemonsets, and vulnerable admission controllers.',
      bullets: [
        'CIS Kubernetes Benchmark automated conformance testing',
        'RBAC privilege auditing, cluster-admin role restriction',
        'Admission controller policies via Kyverno & OPA Gatekeeper',
      ],
    },
    {
      icon: Flame,
      title: 'Full-Scope Cloud Penetration Testing',
      tag: 'Certified Offensive Red Team',
      description: 'Rigorous manual and automated offensive testing exploiting real-world cloud attack vectors without risking service availability.',
      bullets: [
        'SSRF attacks targeting IMDSv1/v2 to steal cloud instance profiles',
        'Serverless function breakout & API authorization bypass testing',
        'Executive CVSS v3.1 report with step-by-step developer remediation',
      ],
    },
    {
      icon: GitBranch,
      title: 'Shift-Left IaC Security & Guardrails',
      tag: 'Terraform • OpenTofu • Helm',
      description: 'Prevent misconfigured infrastructure from ever reaching production by implementing automated security gating in your Git pipelines.',
      bullets: [
        'Static analysis of Terraform, Terragrunt & Helm in GitHub / Bitbucket',
        'Automated detection of hardcoded secrets, API tokens & unencrypted disks',
        'Auto-generated pull requests applying secure IaC baseline templates',
      ],
    },
    {
      icon: FileCheck2,
      title: 'Continuous Compliance & Posture (CSPM)',
      tag: 'SOC 2 • ISO 27001 • CIS • HIPAA',
      description: 'Maintain 24/7 continuous audit readiness with real-time compliance drift monitoring and automated evidence collection.',
      bullets: [
        'Continuous compliance mapping against SOC 2 Type II and ISO 27001',
        'Real-time drift alerts delivered to Slack, Microsoft Teams & Jira',
        'One-click exportable audit packages ready for external auditor review',
      ],
    },
  ]

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <KeyRound size={14} className="text-primary" />
            <span>Comprehensive Capabilities</span>
          </div>
          <h2 className="section-title">
            Enterprise Cloud Audit & <span className="accent">Security Capabilities</span>
          </h2>
          <p className="section-subtitle">
            Engineered for high-growth tech companies and enterprise workloads requiring rigorous cloud security posture and zero regulatory blind spots.
          </p>
        </div>

        <div className="services-grid">
          {services.map((srv, idx) => {
            const Icon = srv.icon
            return (
              <div key={idx} className="service-card">
                <div className="service-card-header">
                  <div className="service-icon-wrapper">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <span className="service-tag">{srv.tag}</span>
                </div>
                <h3 className="service-title">{srv.title}</h3>
                <p className="service-desc">{srv.description}</p>
                <ul className="service-bullets">
                  {srv.bullets.map((b, bIdx) => (
                    <li key={bIdx}>
                      <CheckCircle2 size={14} className="text-success" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
