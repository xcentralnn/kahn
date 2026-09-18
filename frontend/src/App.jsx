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

export default function App() {
  const [selectedScope, setSelectedScope] = useState(null)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

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

      <CloudBastionModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </div>
  )
}
