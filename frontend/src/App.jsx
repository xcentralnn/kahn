import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PartnerBanner from './components/PartnerBanner'
import DeliveryPlans from './components/DeliveryPlans'
import ServicesScope from './components/ServicesScope'
import MaintenanceSupport from './components/MaintenanceSupport'
import ProjectEstimator from './components/ProjectEstimator'
import HardwareFleet from './components/HardwareFleet'
import ContactConsulting from './components/ContactConsulting'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import CloudBastionModal from './components/CloudBastionModal'

export default function App() {
  const [selectedScope, setSelectedScope] = useState(null)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  return (
    <div className="app-wrapper">
      <div className="ambient-grid" aria-hidden="true"></div>
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
      <main>
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <PartnerBanner />
        <DeliveryPlans />
        <ServicesScope />
        <MaintenanceSupport />
        <ProjectEstimator onSelectScope={(scope) => setSelectedScope(scope)} />
        <HardwareFleet />
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
