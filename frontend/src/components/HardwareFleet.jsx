import { useState } from 'react'
import { Cpu, Server, Zap, Layers, Activity, Gauge } from 'lucide-react'

export default function HardwareFleet() {
  const [activeTab, setActiveTab] = useState('sxm')

  const hardwareItems = [
    {
      id: 'sxm',
      name: 'NVIDIA H100 SXM5 Tensor Core',
      category: 'Primary AI Silicon Core',
      tag: 'FLAGSHIP ACCELERATOR',
      img: '/assets/gpu_h100_sxm.png',
      alt: 'NVIDIA H100 SXM5 Tensor Core GPU Die and Substrate',
      description: 'Ultra-dense 80B transistor Hopper architecture optimized for distributed LLM training, GPT-4 scale fine-tuning, and ultra-high throughput transformer workloads.',
      specs: [
        { label: 'Architecture', val: 'Hopper GH100 (TSMC 4N)' },
        { label: 'VRAM Capacity', val: '80 GB HBM3' },
        { label: 'Memory Bandwidth', val: '3.35 TB/s' },
        { label: 'Tensor Compute', val: '3,958 TFLOPS (FP8)' },
        { label: 'Interconnect', val: 'NVLink 4 (900 GB/s)' },
        { label: 'Thermal Envelope', val: '700W SXM5' }
      ]
    },
    {
      id: 'tray',
      name: 'NVIDIA HGX B200 NVL8 Baseboard',
      category: 'Multi-GPU Supercomputing Blade',
      tag: 'AI SERVER BLADE TRAY',
      img: '/assets/server_tray_hgx.png',
      alt: 'NVIDIA HGX B200 NVL8 8-GPU AI Server Tray',
      description: '8-way interconnected supercomputing tray engineered for billion-parameter model inference with unified memory mesh and full-bandwidth all-to-all NVLink interconnect.',
      specs: [
        { label: 'Accelerators', val: '8x Blackwell B200 GPUs' },
        { label: 'Total Cores', val: '151,552 CUDA Cores' },
        { label: 'Unified Memory', val: '1,152 GB HBM3e' },
        { label: 'AI Compute Peak', val: '144 PFLOPS (FP4)' },
        { label: 'Fabric Topology', val: '1.8 TB/s NVLink 5 Mesh' },
        { label: 'Cooling Design', val: 'Direct-to-Chip Liquid / Air' }
      ]
    },
    {
      id: 'pcie',
      name: 'NVIDIA H100 PCIe Gen5 Card',
      category: 'Enterprise Rack Accelerator',
      tag: 'PCIE ACCELERATOR',
      img: '/assets/gpu_h100_pcie.png',
      alt: 'NVIDIA H100 PCIe Gen5 Data Center Card',
      description: 'Passive-cooled dual-slot PCIe 5.0 accelerator designed for immediate drop-in integration into standard 2U and 4U enterprise data center server nodes.',
      specs: [
        { label: 'Form Factor', val: 'Dual-Slot Full-Height FHFL' },
        { label: 'Host Interface', val: 'PCIe 5.0 x16 (128 GB/s)' },
        { label: 'Memory Capacity', val: '80 GB HBM3 (2.0 TB/s)' },
        { label: 'Tensor Compute', val: '1,513 TFLOPS (FP8)' },
        { label: 'Thermal Envelope', val: '350W Passive Flow' },
        { label: 'Reliability', val: 'Enterprise ECC & Secure Boot' }
      ]
    }
  ]

  const activeItem = hardwareItems.find((h) => h.id === activeTab) || hardwareItems[0]

  return (
    <section className="hardware-section" id="hardware">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Cpu size={14} className="text-primary" />
            <span>Accelerated Silicon Infrastructure</span>
          </div>
          <h2 className="section-title">
            Enterprise GPU &amp; <span className="accent">AI Hardware Fleet</span>
          </h2>
          <p className="section-subtitle">
            Dedicated private AI clusters, Bare-Metal GPU nodes, and high-bandwidth NVLink infrastructure built for foundation model training and sub-millisecond inference.
          </p>
        </div>

        <div className="hardware-tabs">
          {hardwareItems.map((item) => (
            <button
              key={item.id}
              className={`hardware-tab-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.id === 'sxm' && <Cpu size={16} />}
              {item.id === 'tray' && <Server size={16} />}
              {item.id === 'pcie' && <Layers size={16} />}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="hardware-display-card">
          <div className="hardware-visual-col">
            <div className="hardware-halo-bg" aria-hidden="true"></div>
            <div className="hardware-image-wrap">
              <img 
                src={activeItem.img} 
                alt={activeItem.alt} 
                className={`hardware-cutout-img ${activeItem.id}`}
              />
            </div>
            <div className="hardware-floating-tag">
              <Activity size={12} className="text-cyan animate-pulse" />
              <span>{activeItem.tag}</span>
            </div>
          </div>

          <div className="hardware-info-col">
            <div className="hardware-category">{activeItem.category}</div>
            <h3 className="hardware-title">{activeItem.name}</h3>
            <p className="hardware-desc">{activeItem.description}</p>

            <div className="hardware-specs-grid">
              {activeItem.specs.map((spec, sidx) => (
                <div key={sidx} className="spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-val">{spec.val}</span>
                </div>
              ))}
            </div>

            <div className="hardware-action-row">
              <a href="#contact" className="btn btn-primary">
                <Zap size={15} />
                <span>Request Dedicated Nodes</span>
              </a>
              <div className="hardware-status-chip">
                <Gauge size={14} className="text-emerald" />
                <span>Verified Bare-Metal &amp; Cloud Ready</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hardware-mini-gallery">
          {hardwareItems.map((item) => (
            <div 
              key={item.id} 
              className={`mini-card ${activeTab === item.id ? 'selected' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="mini-thumb-wrap">
                <img src={item.img} alt={item.name} className="mini-thumb-img" />
              </div>
              <div className="mini-card-info">
                <h4>{item.name}</h4>
                <p>{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
