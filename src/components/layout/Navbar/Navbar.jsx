import { useState, useEffect } from 'react'
import { config } from '../../../data/config'
import Icon from '../../ui/Icon/Icon'
import './Navbar.css'

export default function Navbar({ onToggleSidebar, sidebarOpen = false }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__titlebar">
        <button
          className={`navbar__toggle${sidebarOpen ? ' navbar__toggle--active' : ''}`}
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? 'Close file explorer' : 'Open file explorer'}
          aria-expanded={sidebarOpen}
          type="button"
        >
          <span className="navbar__burger" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="navbar__toggle-label">Menu</span>
        </button>

        <div className="traffic-lights">
          <span className="tl tl--red" />
          <span className="tl tl--yellow" />
          <span className="tl tl--green" />
        </div>

        <span className="navbar__path">alifiancode/alifian-portfolio</span>

        <button
          type="button"
          className="navbar__hire"
          onClick={() => { window.location.href = `mailto:${config.email}` }}
        >
          <Icon name="mail" />
          <span>Hire Me</span>
        </button>
      </div>
    </header>
  )
}