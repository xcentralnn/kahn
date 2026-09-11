import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DeliveryPlans from './components/DeliveryPlans'
import ServicesScope from './components/ServicesScope'
import MaintenanceSupport from './components/MaintenanceSupport'
import ProjectEstimator from './components/ProjectEstimator'
import ContactConsulting from './components/ContactConsulting'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  const [selectedScope, setSelectedScope] = useState(null)

  return (
    <div className="app-wrapper">
      <div className="ambient-grid" aria-hidden="true"></div>
      <Navbar />
      <main>
        <Hero />
        <DeliveryPlans />
        <ServicesScope />
        <MaintenanceSupport />
        <ProjectEstimator onSelectScope={(scope) => setSelectedScope(scope)} />
        <ContactConsulting prefilledScope={selectedScope} />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
