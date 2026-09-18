import { useState } from 'react'
import { Calculator, Check, ArrowRight, ShieldCheck, Clock, Layers } from 'lucide-react'

export default function ProjectEstimator({ onSelectScope }) {
  const [scopeType, setScopeType] = useState('full-pentest')
  const [cloudProvider, setCloudProvider] = useState('aws-gcp')
  const [addons, setAddons] = useState({
    iam_graph: true,
    cost_leak: true,
    k8s_posture: true,
    remediation_pr: true,
    compliance_doc: true,
    urgent_support: false,
  })

  const scopes = [
    { id: 'fast-audit', label: '15-Min Automated Cloud Posture Audit', turnaround: '24 Hours', complexity: 'Fast Agentless Scan' },
    { id: 'full-pentest', label: 'Full-Scope Cloud & API Penetration Testing', turnaround: '1 - 2 Weeks', complexity: 'Certified Offensive Red Team' },
    { id: 'k8s-hard', label: 'Kubernetes & Container Escape Hardening', turnaround: '3 - 5 Days', complexity: 'Cluster & RBAC Deep-Dive' },
    { id: 'compliance-soc2', label: 'Continuous CSPM & SOC 2 / ISO Readiness', turnaround: 'Continuous', complexity: 'Automated Audit Evidence' },
  ]

  const cloudOptions = [
    { id: 'aws-only', label: 'Amazon Web Services (AWS Single Account / Org)' },
    { id: 'gcp-only', label: 'Google Cloud Platform (GCP Organization)' },
    { id: 'azure-only', label: 'Microsoft Azure (Tenant / Subscriptions)' },
    { id: 'aws-gcp', label: 'Multi-Cloud: AWS + Google Cloud (Hybrid)' },
    { id: 'k8s-multi', label: 'Multi-Cluster Kubernetes Fleets (EKS / GKE / On-Prem)' },
  ]

  const toggleAddon = (k) => {
    setAddons((prev) => ({ ...prev, [k]: !prev[k] }))
  }

  const handleApply = () => {
    if (onSelectScope) {
      onSelectScope({
        scopeType,
        cloudProvider,
        addons,
      })
    }
    const elem = document.getElementById('contact')
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="estimator-section" id="estimator">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Calculator size={14} className="text-primary" />
            <span>Audit & Pentest Estimator</span>
          </div>
          <h2 className="section-title">
            Configure Your <span className="accent">Assessment Scope</span>
          </h2>
          <p className="section-subtitle">
            Tailor your audit parameters and instantly preview report deliverables, test methodology, and remediation pairing.
          </p>
        </div>

        <div className="estimator-grid">
          <div className="estimator-controls">
            <div className="control-group">
              <label className="control-label">1. Select Assessment Engagement Type</label>
              <div className="scale-options">
                {scopes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`scale-option-btn ${scopeType === s.id ? 'active' : ''}`}
                    onClick={() => setScopeType(s.id)}
                  >
                    <div className="scale-info">
                      <span className="scale-name">{s.label}</span>
                      <span className="scale-complexity">{s.complexity}</span>
                    </div>
                    <span className="scale-days">{s.turnaround}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label className="control-label">2. Target Cloud Environment</label>
              <div className="cloud-select-grid">
                {cloudOptions.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`cloud-option-btn ${cloudProvider === c.id ? 'active' : ''}`}
                    onClick={() => setCloudProvider(c.id)}
                  >
                    <Check size={14} className={`check-icon ${cloudProvider === c.id ? 'visible' : ''}`} />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label className="control-label">3. Included Security Modules & Deliverables</label>
              <div className="addons-grid">
                <label className="addon-checkbox">
                  <input
                    type="checkbox"
                    checked={addons.iam_graph}
                    onChange={() => toggleAddon('iam_graph')}
                  />
                  <span>IAM Entitlement & Toxic Combinations Graph</span>
                </label>
                <label className="addon-checkbox">
                  <input
                    type="checkbox"
                    checked={addons.cost_leak}
                    onChange={() => toggleAddon('cost_leak')}
                  />
                  <span>Zombie Resource & Cloud Billing Waste Audit</span>
                </label>
                <label className="addon-checkbox">
                  <input
                    type="checkbox"
                    checked={addons.k8s_posture}
                    onChange={() => toggleAddon('k8s_posture')}
                  />
                  <span>Kubernetes Pod Escape & Container Breakout Audit</span>
                </label>
                <label className="addon-checkbox">
                  <input
                    type="checkbox"
                    checked={addons.remediation_pr}
                    onChange={() => toggleAddon('remediation_pr')}
                  />
                  <span>Auto-Generated Terraform Remediation Pull Requests</span>
                </label>
                <label className="addon-checkbox">
                  <input
                    type="checkbox"
                    checked={addons.compliance_doc}
                    onChange={() => toggleAddon('compliance_doc')}
                  />
                  <span>SOC 2 & ISO 27001 Formal Compliance Audit Dossier</span>
                </label>
                <label className="addon-checkbox">
                  <input
                    type="checkbox"
                    checked={addons.urgent_support}
                    onChange={() => toggleAddon('urgent_support')}
                  />
                  <span>Emergency 24-Hour Expedited Pentest War-Room</span>
                </label>
              </div>
            </div>
          </div>

          <div className="estimator-summary-card">
            <div className="summary-card-header">
              <ShieldCheck size={24} className="text-primary" />
              <div>
                <h3 className="summary-title">Scope Estimate Overview</h3>
                <span className="summary-subtitle">100% Non-Disruptive Security Audit</span>
              </div>
            </div>

            <div className="summary-metrics">
              <div className="summary-metric-item">
                <span className="metric-label">Estimated Turnaround</span>
                <span className="metric-val text-primary">
                  {scopes.find((s) => s.id === scopeType)?.turnaround || '1 Week'}
                </span>
              </div>
              <div className="summary-metric-item">
                <span className="metric-label">Testing Methodology</span>
                <span className="metric-val text-success">
                  {scopeType === 'fast-audit' ? 'Agentless Read-Only' : 'OSCP/CRTE Red Team'}
                </span>
              </div>
            </div>

            <div className="summary-deliverables-list">
              <span className="deliverables-heading">Deliverables Package:</span>
              <ul>
                <li><Check size={14} className="text-success" /> Executive Risk & Board Summary PDF</li>
                <li><Check size={14} className="text-success" /> Full Technical Vulnerability Findings with CVSS v3.1</li>
                <li><Check size={14} className="text-success" /> Validated Proof-of-Concept Exploit Scripts</li>
                <li><Check size={14} className="text-success" /> Automated Terraform / OpenTofu Remediation Code</li>
                <li><Check size={14} className="text-success" /> Live Engineer Review & Remediation Call (60 Min)</li>
              </ul>
            </div>

            <button className="btn btn-primary w-full" onClick={handleApply}>
              <span>Lock In Assessment Scope</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
