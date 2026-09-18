import { useState, useRef, useEffect } from 'react'
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  Copy, 
  Check, 
  AlertTriangle, 
  Flame, 
  KeyRound, 
  DollarSign, 
  Layers 
} from 'lucide-react'

const KNOWLEDGE_BASE = {
  iam: {
    title: 'Cloud IAM & Entitlement Review (CIEM)',
    badge: 'LEAST PRIVILEGE',
    response: `Cloud IAM Privilege Escalation typically occurs when non-admin identities have toxic permission combinations:

1. **PassRole Escalation**: An identity with \`iam:PassRole\` + \`ec2:RunInstances\` can launch an EC2 instance with an attached \`AdministratorAccess\` instance profile.
2. **AssumeRole Drift**: Cross-account assume-role trust policies with \`Principal: "*"\` or missing ExternalId allow unauthorized lateral movement.
3. **Shadow Admin Pruning**: Use Kahn's agentless scanner to evaluate IAM entitlement graphs and identify dormant keys unused for > 90 days.

**Recommended Terraform Guardrail:**
\`\`\`hcl
resource "aws_iam_policy" "restrict_passrole" {
  name        = "deny-wildcard-passrole"
  description = "Deny iam:PassRole to privileged roles"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Deny"
      Action   = "iam:PassRole"
      Resource = "arn:aws:iam::*:role/admin-*"
    }]
  })
}
\`\`\``
  },
  cost: {
    title: 'Cloud Resource Drift & FinOps Leakage',
    badge: 'FINOPS & POSTURE',
    response: `Our audit engine analyzes multi-cloud telemetry to uncover hidden infrastructure waste:

1. **Zombie GPU / Compute Nodes**: Idle \`p4d.24xlarge\` or \`a2-highgpu\` instances lingering from machine learning experiments cost between $5,000 - $12,000/mo each.
2. **Orphan Storage Assets**: Unattached EBS / Persistent Disks, outdated manual snapshots (> 1 year), and unassociated Elastic IPs.
3. **Over-provisioned Clusters**: Kubernetes worker nodes running at < 15% CPU/Memory utilization without Karpenter / Cluster Autoscaler rightsizing.

**Quick AWS CLI Discovery Command:**
\`\`\`bash
# Find unattached EBS volumes across current region
aws ec2 describe-volumes --filters Name=status,Values=available \
  --query "Volumes[*].{ID:VolumeId,Size:Size,Type:VolumeType}" --output table
\`\`\``
  },
  k8s: {
    title: 'Kubernetes Hardening & Container Security',
    badge: 'CIS K8S BENCHMARK',
    response: `Kubernetes clusters require defense-in-depth across API server, worker nodes, and workloads:

1. **Pod Security Admission (PSA)**: Enforce \`restricted\` profile across non-system namespaces to block \`hostPID\`, \`hostNetwork\`, and privileged capabilities.
2. **RBAC Least Privilege**: Restrict \`cluster-admin\` to emergency break-glass accounts. Prevent service accounts from mounting default tokens with \`automountServiceAccountToken: false\`.
3. **Admission Gateways**: Deploy Kyverno or OPA Gatekeeper to block root containers and images from untrusted registries.

**Enforce PSA Restricted in Namespace:**
\`\`\`yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production-apps
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/enforce-version: latest
\`\`\``
  },
  pentest: {
    title: 'Cloud Penetration Testing & IMDSv2 SSRF',
    badge: 'OFFENSIVE RED TEAM',
    response: `Our offensive penetration tests simulate real threat actors targeting production cloud perimeters:

1. **SSRF to Cloud Metadata**: Attackers use vulnerable webhooks or PDF generators to query \`http://169.254.169.254/latest/meta-data/iam/security-credentials/\`.
2. **IMDSv2 Enforcement**: Mitigate immediately by requiring session tokens and setting \`HttpHopLimit=1\` so containers cannot query host metadata.
3. **Cloud Privilege Hopping**: Once temporary STS tokens are extracted, attackers enumerate S3 buckets, Secrets Manager, and KMS keys.

**AWS CLI Enforce IMDSv2 HopLimit=1:**
\`\`\`bash
aws ec2 modify-instance-metadata-options \
  --instance-id i-0123456789abcdef0 \
  --http-tokens required \
  --http-put-response-hop-limit 1
\`\`\``
  }
}

export default function SecurityChatbotModal({ isOpen, onClose, onOpenTerminal }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am Kahn Cyber AI, your autonomous cloud security posture & penetration testing advisor. I can analyze IAM privilege escalations, detect zombie cloud resource waste, assess CIS benchmarks, or generate remediation code.',
      badge: 'ONLINE',
      timestamp: 'Just now'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  if (!isOpen) return null

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSend = (userText) => {
    const query = (userText || inputValue).trim()
    if (!query) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      let matchedResponse = null
      const lower = query.toLowerCase()

      if (lower.includes('iam') || lower.includes('passrole') || lower.includes('privilege') || lower.includes('role')) {
        matchedResponse = KNOWLEDGE_BASE.iam
      } else if (lower.includes('cost') || lower.includes('zombie') || lower.includes('gpu') || lower.includes('waste') || lower.includes('finops')) {
        matchedResponse = KNOWLEDGE_BASE.cost
      } else if (lower.includes('k8s') || lower.includes('kube') || lower.includes('container') || lower.includes('pod')) {
        matchedResponse = KNOWLEDGE_BASE.k8s
      } else if (lower.includes('pentest') || lower.includes('ssrf') || lower.includes('imds') || lower.includes('offensive') || lower.includes('attack')) {
        matchedResponse = KNOWLEDGE_BASE.pentest
      } else {
        matchedResponse = {
          title: 'Automated Posture Analysis',
          badge: 'ADVISORY',
          response: `Regarding "${query}":

Kahn delivers 100% agentless cloud security posture management (CSPM) and certified cloud penetration testing:

1. **Read-Only Automated Inspection**: Connect AWS, GCP, or Azure via least-privilege IAM roles. Our engine detects misconfigurations across 120+ cloud services in < 15 minutes.
2. **Exploitation & Risk Scoring**: Verified CVSS v3.1 scoring eliminates false positives and ranks critical attack vectors.
3. **Automated Remediation**: Receive copy-paste Terraform modules, Helm values, and CLI fixes to eliminate drift instantly.

Feel free to click any of the preset audit topics below or launch our **Live Cloud Terminal** to test remediation commands!`
        }
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        title: matchedResponse.title,
        badge: matchedResponse.badge,
        text: matchedResponse.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 650)
  }

  return (
    <div className="chatbot-modal-overlay" onClick={onClose}>
      <div className="chatbot-modal-container" onClick={e => e.stopPropagation()}>
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <div className="chatbot-avatar-box">
              <Bot size={20} className="text-cyan" />
              <span className="chatbot-pulse-dot"></span>
            </div>
            <div>
              <div className="chatbot-title-row">
                <span className="chatbot-name">Kahn Cyber AI</span>
                <span className="chatbot-status-badge">CSPM &amp; PENTEST ADVISOR</span>
              </div>
              <p className="chatbot-sub">Autonomous Cloud Posture &amp; Remediation Engine</p>
            </div>
          </div>
          <div className="chatbot-header-actions">
            {onOpenTerminal && (
              <button 
                type="button" 
                className="chatbot-terminal-btn"
                title="Launch Cloud Shell"
                onClick={() => {
                  onClose()
                  onOpenTerminal()
                }}
              >
                <Terminal size={15} />
                <span>Cloud Shell</span>
              </button>
            )}
            <button type="button" className="chatbot-close-btn" onClick={onClose} aria-label="Close Chat">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="chatbot-messages-wrap">
          {messages.map((m) => (
            <div key={m.id} className={`chatbot-msg-row ${m.sender === 'user' ? 'user' : 'ai'}`}>
              {m.sender === 'ai' && (
                <div className="chatbot-msg-avatar">
                  <Bot size={15} />
                </div>
              )}
              <div className="chatbot-msg-bubble">
                {m.sender === 'ai' && (m.title || m.badge) && (
                  <div className="chatbot-msg-meta">
                    {m.badge && <span className="chatbot-msg-badge">{m.badge}</span>}
                    {m.title && <span className="chatbot-msg-topic">{m.title}</span>}
                  </div>
                )}
                <div className="chatbot-msg-text">
                  {m.text.split('\n\n').map((para, pIdx) => {
                    if (para.startsWith('```')) {
                      const lines = para.split('\n')
                      const lang = lines[0].replace('```', '') || 'code'
                      const codeContent = lines.slice(1, -1).join('\n')
                      return (
                        <div key={pIdx} className="chatbot-code-block">
                          <div className="chatbot-code-header">
                            <span>{lang}</span>
                            <button 
                              type="button"
                              className="chatbot-copy-code-btn"
                              onClick={() => handleCopy(`${m.id}-${pIdx}`, codeContent)}
                            >
                              {copiedId === `${m.id}-${pIdx}` ? (
                                <><Check size={12} className="text-success" /> Copied</>
                              ) : (
                                <><Copy size={12} /> Copy</>
                              )}
                            </button>
                          </div>
                          <pre><code>{codeContent}</code></pre>
                        </div>
                      )
                    }
                    return <p key={pIdx}>{para}</p>
                  })}
                </div>
                <div className="chatbot-msg-time">{m.timestamp}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chatbot-msg-row ai">
              <div className="chatbot-msg-avatar">
                <Bot size={15} />
              </div>
              <div className="chatbot-msg-bubble typing-bubble">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-preset-prompts">
          <button 
            type="button" 
            className="chatbot-prompt-chip"
            onClick={() => handleSend('Audit IAM PassRole privilege escalation vectors')}
          >
            <KeyRound size={13} className="text-cyan" />
            <span>IAM PassRole Toxic Combo</span>
          </button>
          <button 
            type="button" 
            className="chatbot-prompt-chip"
            onClick={() => handleSend('Find zombie GPU instances and idle cloud cost waste')}
          >
            <DollarSign size={13} className="text-primary" />
            <span>Zombie GPU Cost Leakage</span>
          </button>
          <button 
            type="button" 
            className="chatbot-prompt-chip"
            onClick={() => handleSend('Kubernetes CIS Benchmark hardening and Pod Security Admission')}
          >
            <Layers size={13} className="text-cyan" />
            <span>Kubernetes CIS Benchmark</span>
          </button>
          <button 
            type="button" 
            className="chatbot-prompt-chip"
            onClick={() => handleSend('Simulate IMDSv2 SSRF cloud credential theft')}
          >
            <Flame size={13} className="text-danger" />
            <span>IMDSv2 SSRF Mitigation</span>
          </button>
        </div>

        <form 
          className="chatbot-input-bar"
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
        >
          <input 
            type="text"
            className="chatbot-text-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about IAM drift, pentest scopes, CIS compliance, or CLI fixes..."
          />
          <button 
            type="submit" 
            className="chatbot-send-btn"
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}
