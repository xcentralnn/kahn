import { useState, useRef, useEffect } from 'react'
import KahnLogo from './KahnLogo'
import { 
  Bot, 
  Terminal, 
  Search, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  ChevronUp, 
  X,
  Radio
} from 'lucide-react'

export default function CornerRadialDock({
  onOpenTerminal,
  onOpenChatbot,
  onTriggerScan,
  onOpenContact
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredOption, setHoveredOption] = useState(null)
  const closeTimeoutRef = useRef(null)

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setHoveredOption(null)
    }, 280)
  }

  const toggleOpen = () => {
    setIsOpen(prev => !prev)
  }

  const options = [
    {
      id: 'chatbot',
      label: 'AI Security Chatbot',
      tag: 'CSPM AI',
      icon: Bot,
      color: 'from-purple-500 to-indigo-600',
      action: () => {
        setIsOpen(false)
        if (onOpenChatbot) onOpenChatbot()
      },
      // Polar coords: R=130px, Angle=102deg (upwards)
      x: -30,
      y: -128,
      delay: '0.03s'
    },
    {
      id: 'terminal',
      label: 'Cloud Shell Bastion',
      tag: 'CLI Live',
      icon: Terminal,
      color: 'from-emerald-500 to-teal-600',
      action: () => {
        setIsOpen(false)
        if (onOpenTerminal) onOpenTerminal()
      },
      // Angle ~ 124deg
      x: -78,
      y: -104,
      delay: '0.07s'
    },
    {
      id: 'scanner',
      label: 'Automated Cloud Scanner',
      tag: 'Instant Audit',
      icon: Search,
      color: 'from-amber-500 to-rose-600',
      action: () => {
        setIsOpen(false)
        if (onTriggerScan) {
          onTriggerScan()
        } else {
          const el = document.getElementById('scanner')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
      },
      // Angle ~ 146deg
      x: -114,
      y: -68,
      delay: '0.11s'
    },
    {
      id: 'contact',
      label: 'Book Cloud Pentest',
      tag: 'Red Team',
      icon: Mail,
      color: 'from-cyan-500 to-blue-600',
      action: () => {
        setIsOpen(false)
        if (onOpenContact) {
          onOpenContact()
        } else {
          const el = document.getElementById('contact')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
      },
      // Angle ~ 168deg (leftwards)
      x: -132,
      y: -22,
      delay: '0.15s'
    }
  ]

  return (
    <aside 
      className={`corner-radial-dock-wrapper ${isOpen ? 'is-expanded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Quick Navigation and Cloud Operations"
    >
      {/* Pop-up Radial Options */}
      <div className="radial-options-arc" aria-hidden={!isOpen}>
        {options.map((opt) => {
          const Icon = opt.icon
          const isItemHovered = hoveredOption === opt.id

          return (
            <div
              key={opt.id}
              className={`radial-option-node ${isOpen ? 'node-visible' : ''}`}
              style={{
                transform: isOpen 
                  ? `translate(${opt.x}px, ${opt.y}px)` 
                  : 'translate(0px, 0px) scale(0.2)',
                transitionDelay: opt.delay
              }}
            >
              {/* Tooltip Label */}
              <div className={`radial-node-tooltip ${isItemHovered ? 'tooltip-active' : ''}`}>
                <span className="tooltip-title">{opt.label}</span>
                <span className="tooltip-tag">{opt.tag}</span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className={`radial-node-btn ${opt.id}`}
                onClick={opt.action}
                onMouseEnter={() => setHoveredOption(opt.id)}
                onMouseLeave={() => setHoveredOption(null)}
                aria-label={opt.label}
              >
                <Icon size={19} />
              </button>
            </div>
          )
        })}
      </div>

      {/* 1/4 Circle Corner Anchor Trigger */}
      <button 
        type="button"
        className={`radial-dock-quarter-circle ${isOpen ? 'active-pulse' : ''}`}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-label="Toggle Quick Cloud Ops Dock"
      >
        <span className="quarter-circle-beacon"></span>
        <div className="quarter-circle-content">
          <div className="quarter-icon-ring">
            {isOpen ? (
              <X size={18} className="text-cyan quarter-toggle-icon" />
            ) : (
              <KahnLogo size={24} variant="crimson" glow={false} />
            )}
          </div>
          <span className="quarter-label">OPS</span>
        </div>
      </button>
    </aside>
  )
}
