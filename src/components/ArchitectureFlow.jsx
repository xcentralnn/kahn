import { useState } from 'react'
import { GitCommit, Cpu, Cloud, Activity, ChevronRight, Check } from 'lucide-react'

export default function ArchitectureFlow() {
  const [selectedStep, setSelectedStep] = useState(0)

  const steps = [
    {
      id: 0,
      icon: GitCommit,
      number: '01',
      title: 'Declarative Git Push',
      summary: 'Developers push standard code or Kubernetes/Terraform manifests.',
      details: 'Valnia integrates via webhooks to GitHub, GitLab, or Bitbucket. No proprietary DSLs required. Pure standard OpenTofu, Helm, or Docker manifests.',
      codeTitle: 'git-commit-hook.yaml',
      codeSnippet: `name: production-deployment
on:
  push:
    branches: [main]
jobs:
  valnia-orchestrate:
    uses: valnia/pipeline-action@v2
    with:
      autonomic_guardrails: strict
      cost_target_reduction: 40%`,
    },
    {
      id: 1,
      icon: Cpu,
      number: '02',
      title: 'Agentic Pre-Flight Engine',
      summary: 'AI analyzes blast radius, security posture, and cloud cost impact.',
      details: 'Valnia runs real-time static analysis, verifies CIS benchmarks, and checks spot instance availability across regions before touching production.',
      codeTitle: 'ai-audit-result.json',
      codeSnippet: `{
  "audit_status": "PASSED",
  "security_score": "100/100 (CIS AWS Benchmark v1.5)",
  "recommended_placement": ["aws:us-east-1", "gcp:us-central1"],
  "estimated_savings": "$1,420/month",
  "canary_strategy": "progressive-traffic-split (10% -> 50% -> 100%)"
}`,
    },
    {
      id: 2,
      icon: Cloud,
      number: '03',
      title: 'Zero-Downtime Multi-Cloud Fleet',
      summary: 'Automated canary rollout across heterogeneous cloud providers.',
      details: 'Deploy across multiple clouds with global ingress failover and automated traffic shifting. If any cluster fails, traffic reroutes in sub-100ms.',
      codeTitle: 'fleet-status.log',
      codeSnippet: `[CANARY 10%] Cluster-US-East: 12 pods healthy (0 errors)
[CANARY 50%] Traffic shifted via Envoy Gateway mesh
[CANARY 100%] Full deployment verified. Promotion completed in 42s.
All regions synced: US-East-1, EU-Central-1, AP-Southeast-1.`,
    },
    {
      id: 3,
      icon: Activity,
      number: '04',
      title: 'Continuous Autonomous Healing',
      summary: 'Real-time eBPF telemetry actively remediates anomalies.',
      details: 'Continuous monitoring tracks p99 latency, memory leaks, and CPU throttling. Valnia self-heals, scales pods, or rolls back without waking on-call engineers.',
      codeTitle: 'telemetry-action.json',
      codeSnippet: `{
  "sensor": "eBPF-kernel-probe",
  "event": "pod-memory-saturation-imminent",
  "target": "order-processing-svc-78cf",
  "action_taken": "HORIZONTAL_AUTOSCALE_SPAWNED_4_PODS",
  "result": "Latency normalized to 16ms (P99)"
}`,
    },
  ]

  return (
    <section className="architecture-section" id="architecture">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Cpu size={14} className="text-primary" />
            <span>How It Works</span>
          </div>
          <h2 className="section-title">
            The Autonomous Delivery <span className="accent">Architecture</span>
          </h2>
          <p className="section-subtitle">
            Experience complete end-to-end automation from git commit to globally distributed, self-healing multi-cloud infrastructure.
          </p>
        </div>

        <div className="arch-flow-wrapper glass-panel">
          <div className="arch-stepper">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isSelected = selectedStep === index
              return (
                <button
                  key={step.id}
                  className={`arch-step-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedStep(index)}
                >
                  <div className="step-btn-top">
                    <span className="step-btn-num">{step.number}</span>
                    <Icon size={18} className="step-btn-icon" />
                  </div>
                  <h4 className="step-btn-title">{step.title}</h4>
                  <p className="step-btn-desc">{step.summary}</p>
                </button>
              )
            })}
          </div>

          <div className="arch-detail-card">
            <div className="arch-detail-info">
              <span className="detail-tag">STEP {steps[selectedStep].number} DEEP DIVE</span>
              <h3>{steps[selectedStep].title}</h3>
              <p>{steps[selectedStep].details}</p>
            </div>

            <div className="arch-code-window">
              <div className="code-window-top">
                <span className="code-dot dot-r"></span>
                <span className="code-dot dot-y"></span>
                <span className="code-dot dot-g"></span>
                <span className="code-window-filename">{steps[selectedStep].codeTitle}</span>
              </div>
              <pre className="code-block">
                <code>{steps[selectedStep].codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
