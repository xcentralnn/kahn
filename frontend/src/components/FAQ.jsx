import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  const faqs = [
    {
      q: 'How does the delivery handover work? Do we own the code and architecture?',
      a: 'You own 100% of all intellectual property, Git repositories, and cloud resources. Every engagement delivers clean, declarative Terraform or OpenTofu modules, clear architectural documentation, and a recorded handover session with your development team. Zero proprietary black boxes.',
    },
    {
      q: 'Can you deliver small, fast-turnaround projects like landing pages or MVPs?',
      a: 'Yes. Our Starter Launchpad package is specifically built for marketing landing pages, JAMstack apps, and micro-services. We deliver production-grade global CDN caching, SSL certificates, custom DNS, and automated GitHub/Bitbucket CI/CD within 2 to 3 business days.',
    },
    {
      q: 'How does your 24/7 SRE On-Call and ongoing maintenance work?',
      a: 'We connect directly into your monitoring tools (Datadog, Prometheus, CloudWatch) and alerting channels (Slack, PagerDuty). When an anomaly or outage occurs, our on-call engineers respond within our guaranteed sub-15 minute P1 SLA to stabilize workloads and resolve root causes.',
    },
    {
      q: 'Which CI/CD engines and cloud platforms do you support?',
      a: 'We have production expertise across Amazon Web Services (AWS), Google Cloud (GCP), Microsoft Azure, and bare-metal Kubernetes. For CI/CD, we natively support Bitbucket Pipelines, GitHub Actions, GitLab CI, ArgoCD GitOps, and Jenkins.',
    },
    {
      q: 'Can you help us migrate our existing monolith to Kubernetes or microservices?',
      a: 'Yes. We specialize in zero-downtime migrations. We containerize your application, architect production EKS or GKE clusters with Helm and ArgoCD, establish synchronized database replication, and perform cutovers without dropping a single user session.',
    },
    {
      q: 'How does your FinOps cloud cost optimization guarantee savings?',
      a: 'We audit your infrastructure to identify over-provisioned CPU/RAM, unattached storage volumes, expensive cross-AZ network traffic, and on-demand compute. By implementing automated Spot fleet orchestration and right-sizing, we routinely slash AWS/GCP bills by 30% to 45%.',
    },
  ]

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx)
  }

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <HelpCircle size={14} className="text-primary" />
            <span>Consulting FAQ</span>
          </div>
          <h2 className="section-title">
            Answers to Common <span className="accent">Delivery Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about our engagement models, delivery handoffs, and 24/7 SRE coverage.
          </p>
        </div>

        <div className="faq-accordion-list">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div 
                key={idx} 
                className={`faq-item glass-panel ${isOpen ? 'open' : ''}`}
                onClick={() => toggle(idx)}
              >
                <div className="faq-question">
                  <h4>{item.q}</h4>
                  <div className={`faq-icon ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
