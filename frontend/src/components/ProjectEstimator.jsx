import { useState } from 'react'
import { Calculator, Check, ArrowRight, Clock, Shield, Sparkles, Layers, Cpu } from 'lucide-react'

export default function ProjectEstimator({ onSelectScope }) {
  const [scale, setScale] = useState('ai-gpu')
  const [cloud, setCloud] = useState('nvidia')
  const [addons, setAddons] = useState({
    vllm: true,
    rag: true,
    cicd: true,
    sre: true,
    finops: false,
    security: true,
  })

  const scales = [
    { id: 'landing', label: 'Landing Page / Static Web', days: 3, complexity: 'Fast Turnaround' },
    { id: 'monolith', label: 'Monolith & Backend API', days: 10, complexity: 'Standard Production' },
    { id: 'k8s', label: 'Kubernetes & Microservices', days: 20, complexity: 'High Concurrency' },
    { id: 'ai-gpu', label: 'Private AI / LLM & GPU Fleet', days: 14, complexity: 'NVIDIA • AMD • Intel' },
    { id: 'multicloud', label: 'Multi-Cloud & Global Mesh', days: 30, complexity: 'Enterprise Scale' },
  ]

  const clouds = [
    { id: 'nvidia', label: 'NVIDIA GPU (CUDA / H100 / L40S / A100)' },
    { id: 'amd', label: 'AMD Instinct (ROCm 6.x / MI300X)' },
    { id: 'intel', label: 'Intel Gaudi 2/3 / OpenVINO' },
    { id: 'aws', label: 'AWS (p4/p5/g5 / EKS GPU)' },
    { id: 'gcp', label: 'Google Cloud (A3/G2 / GKE GPU)' },
    { id: 'baremetal', label: 'On-Premises Bare-Metal GPU' },
  ]

  const toggleAddon = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const baseDays = scales.find((s) => s.id === scale)?.days || 14
  let extraDays = 0
  if (addons.vllm) extraDays += 2
  if (addons.rag) extraDays += 2
  if (addons.finops) extraDays += 3
  if (addons.security) extraDays += 2
  const totalDays = baseDays + extraDays

  const handleApplyToContact = () => {
    if (onSelectScope) {
      onSelectScope({
        scale,
        cloud,
        addons,
      })
    }
    const contactElem = document.getElementById('contact')
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="estimator-section" id="estimator">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Calculator size={14} className="text-primary" />
            <span>Scope &amp; Delivery Calculator</span>
          </div>
          <h2 className="section-title">
            Estimate Your Project <span className="accent">Scope &amp; Timeline</span>
          </h2>
          <p className="section-subtitle">
            Configure your infrastructure or AI/GPU requirements below to view an estimated delivery timeline and recommended architectural blueprint.
          </p>
        </div>

        <div className="estimator-box glass-panel">
          <div className="estimator-controls">
            <div className="control-group">
              <label className="control-label">1. Select Architecture Scale</label>
              <div className="scale-options-grid">
                {scales.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`scale-option-btn ${scale === s.id ? 'selected' : ''}`}
                    onClick={() => setScale(s.id)}
                  >
                    <div className="option-top">
                      <span className="option-label">{s.label}</span>
                      {scale === s.id && <Check size={16} className="text-cyan" />}
                    </div>
                    <span className="option-sub">{s.complexity}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label className="control-label">2. Target Hardware / Cloud Platform</label>
              <div className="cloud-options-grid">
                {clouds.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`cloud-option-btn ${cloud === c.id ? 'selected' : ''}`}
                    onClick={() => setCloud(c.id)}
                  >
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label className="control-label">3. Essential Delivery Modules</label>
              <div className="addons-grid">
                <label className={`addon-checkbox-card ${addons.vllm ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addons.vllm}
                    onChange={() => toggleAddon('vllm')}
                  />
                  <div>
                    <span className="addon-title">vLLM / TensorRT-LLM High-Throughput Serving</span>
                    <span className="addon-desc">PagedAttention, continuous batching &amp; model quantization (FP8/AWQ)</span>
                  </div>
                </label>

                <label className={`addon-checkbox-card ${addons.rag ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addons.rag}
                    onChange={() => toggleAddon('rag')}
                  />
                  <div>
                    <span className="addon-title">Private RAG &amp; Vector Database</span>
                    <span className="addon-desc">Qdrant, Milvus, or pgvector hybrid retrieval pipeline</span>
                  </div>
                </label>

                <label className={`addon-checkbox-card ${addons.cicd ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addons.cicd}
                    onChange={() => toggleAddon('cicd')}
                  />
                  <div>
                    <span className="addon-title">End-to-End CI/CD Pipeline</span>
                    <span className="addon-desc">Automated build, test gating, container registry &amp; zero-downtime deploy</span>
                  </div>
                </label>

                <label className={`addon-checkbox-card ${addons.sre ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addons.sre}
                    onChange={() => toggleAddon('sre')}
                  />
                  <div>
                    <span className="addon-title">24/7 SRE Monitoring &amp; GPU Health Tracking</span>
                    <span className="addon-desc">NVIDIA DCGM / Prometheus metrics &amp; on-call incident paging</span>
                  </div>
                </label>

                <label className={`addon-checkbox-card ${addons.finops ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addons.finops}
                    onChange={() => toggleAddon('finops')}
                  />
                  <div>
                    <span className="addon-title">FinOps Cloud &amp; GPU Cost Optimization</span>
                    <span className="addon-desc">GPU Spot fleet management &amp; idle workload harvesting (-40%)</span>
                  </div>
                </label>

                <label className={`addon-checkbox-card ${addons.security ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addons.security}
                    onChange={() => toggleAddon('security')}
                  />
                  <div>
                    <span className="addon-title">Zero-Trust &amp; Air-Gapped AI Privacy</span>
                    <span className="addon-desc">Zero external API egress, isolated VPC &amp; encrypted weights storage</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="estimator-result-card">
            <div className="result-header">
              <span className="result-badge">ESTIMATED PROJECTION</span>
              <h3>Delivery Assessment</h3>
            </div>

            <div className="result-metric-block">
              <span className="result-metric-label">Estimated Delivery Window</span>
              <div className="result-metric-time">
                <Clock size={28} className="text-cyan" />
                <span className="metric-days">{totalDays <= 5 ? `${totalDays} Business Days` : `${Math.ceil(totalDays / 5)} Weeks`}</span>
              </div>
              <p className="result-metric-note">From kickoff &amp; repository access to production go-live</p>
            </div>

            <div className="result-summary-list">
              <div className="summary-row">
                <span className="sum-label">Architecture Tier:</span>
                <span className="sum-val">{scales.find((s) => s.id === scale)?.label}</span>
              </div>
              <div className="summary-row">
                <span className="sum-label">Target Hardware / Cloud:</span>
                <span className="sum-val">{clouds.find((c) => c.id === cloud)?.label}</span>
              </div>
              <div className="summary-row">
                <span className="sum-label">Deliverable Handover:</span>
                <span className="sum-val text-emerald">100% Terraform IaC + Runbooks</span>
              </div>
            </div>

            <button type="button" className="btn btn-primary w-full btn-lg" onClick={handleApplyToContact}>
              <span>Book Review with This Scope</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
