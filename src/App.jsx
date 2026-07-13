import { useState } from 'react'
import Navbar from './components/layout/Navbar/Navbar'
import Sidebar from './components/layout/Sidebar/Sidebar'
import Footer from './components/layout/Footer/Footer'
import Hero from './components/sections/Hero/Hero'
import About from './components/sections/About/About'
import Skills from './components/sections/Skills/Skills'
import ProfessionalCerts from './components/sections/ProfessionalCerts/ProfessionalCerts'
import SkillCerts from './components/sections/SkillCerts/SkillCerts'
import Contact from './components/sections/Contact/Contact'
import Marquee from './components/effects/Marquee/Marquee'
import ScrollProgress from './components/effects/ScrollProgress/ScrollProgress'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app">
      <ScrollProgress />
      <Navbar onToggleSidebar={() => setSidebarOpen(v => !v)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <ProfessionalCerts />
        <SkillCerts />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
