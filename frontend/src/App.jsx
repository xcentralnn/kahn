import { useState } from 'react'
import PageLoader from './components/PageLoader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PartnerBanner from './components/PartnerBanner'
import AuditPentestSolutions from './components/AuditPentestSolutions'
import ServicesScope from './components/ServicesScope'
import CloudAuditScanner from './components/CloudAuditScanner'
import ProjectEstimator from './components/ProjectEstimator'
import ContactConsulting from './components/ContactConsulting'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import CloudBastionModal from './components/CloudBastionModal'
import CornerRadialDock from './components/CornerRadialDock'
import SecurityChatbotModal from './components/SecurityChatbotModal'
import './components/radial-dock.css'

export default function App() {
  const [selectedScope, setSelectedScope] = useState(null)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const handleTriggerScan = () => {
    const elem = document.getElementById('scanner')
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
      elem.classList.add('highlight-pulse')
      setTimeout(() => elem.classList.remove('highlight-pulse'), 1500)
    }
  }

  const handleOpenContact = () => {
    const elem = document.getElementById('contact')
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app-wrapper">
      <PageLoader />
      <div className="ambient-grid" aria-hidden="true"></div>
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
      <main>
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <PartnerBanner />
        <AuditPentestSolutions onSelectScope={(scope) => setSelectedScope(scope)} />
        <ServicesScope />
        <CloudAuditScanner />
        <ProjectEstimator onSelectScope={(scope) => setSelectedScope(scope)} />
        <ContactConsulting prefilledScope={selectedScope} />
        <FAQ />
      </main>
      <Footer />

      {/* Cloud Bastion Terminal Modal */}
      <CloudBastionModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />

      {/* Security AI Chatbot Modal */}
      <SecurityChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* 1/4 Circle Radial Action Dock at Bottom-Right Corner */}
      <CornerRadialDock
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onTriggerScan={handleTriggerScan}
        onOpenContact={handleOpenContact}
      />
    </div>
  )
}
