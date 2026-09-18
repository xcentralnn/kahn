import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  const faqs = [
    {
      q: 'How does the automated cloud resource audit work without deploying agents?',
      a: 'Our audit platform connects via standard native cloud IAM roles (such as AWS SecurityAudit or Google Cloud Security Reviewer) using read-only metadata APIs. No software agents, daemonsets, or sidecars are installed on your production servers, guaranteeing zero performance impact and zero workload disruption.',
    },
    {
      q: 'What is the difference between automated scanning and deep penetration testing?',
      a: 'Automated scanning continuously audits cloud configurations, IAM drift, and resource waste against benchmarks. Penetration testing is an offensive, human-led assessment by certified security specialists (OSCP, CRTE) who chain multiple low-risk misconfigurations together to prove real exploit paths, such as SSRF metadata theft or lateral privilege escalation.',
    },
    {
      q: 'Can the security assessment cause downtime or interrupt production traffic?',
      a: 'Never. Our automated resource audit is strictly read-only. For offensive cloud penetration testing, all activities adhere to agreed Rules of Engagement (RoE). Offensive testing is performed with rate-limiting, and any destructive exploits or denial-of-service simulations are strictly prohibited unless authorized in a designated sandbox.',
    },
    {
      q: 'How do you handle confidentiality and sensitive architectural data?',
      a: 'We sign bilateral Non-Disclosure Agreements (NDAs) before any credentials or architecture diagrams are shared. All vulnerability reports, scan artifacts, and proof-of-concept scripts are encrypted in transit and at rest, and purged following project completion and formal handover.',
    },
    {
      q: 'What deliverables do our executive and engineering teams receive?',
      a: 'You receive: (1) An Executive Summary with overall cloud security score and business risk breakdown; (2) Detailed technical vulnerability documentation with CVSS v3.1 scores and PoC exploit steps; (3) Production-ready Terraform / OpenTofu remediation pull requests; and (4) A 60-minute live debrief session with our lead architects.',
    },
    {
      q: 'How does Kahn help us achieve SOC 2 Type II or ISO 27001 compliance?',
      a: 'Our continuous posture management (CSPM) automatically maps your cloud controls directly to SOC 2, ISO 27001, and CIS Benchmark requirements. We generate audit-ready evidence exports, eliminating manual screenshot collection and spreadsheet tracking for external auditors.',
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
            <span>Audit & Security FAQ</span>
          </div>
          <h2 className="section-title">
            Answers to Common <span className="accent">Security Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about our read-only audit methodology, pentest Rules of Engagement, and compliance guarantees.
          </p>
        </div>

        <div className="faq-accordion">
          {faqs.map((f, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${openIdx === idx ? 'open' : ''}`}
              onClick={() => toggle(idx)}
            >
              <div className="faq-question-row">
                <span className="faq-q-text">{f.q}</span>
                <ChevronDown size={18} className={`faq-chevron ${openIdx === idx ? 'rotate' : ''}`} />
              </div>
              {openIdx === idx && (
                <div className="faq-answer">
                  <p>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
