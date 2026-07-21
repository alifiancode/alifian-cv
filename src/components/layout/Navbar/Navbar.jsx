import { useState, useEffect } from 'react'
import { config } from '../../../data/config'
import Icon from '../../ui/Icon/Icon'
import './Navbar.css'

export default function Navbar({ onToggleSidebar }) {
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
          className="navbar__toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle file explorer"
          type="button"
        >
          <Icon name="menu" />
          <span>Menu</span>
        </button>

        <div className="traffic-lights">
          <span className="tl tl--red" />
          <span className="tl tl--yellow" />
          <span className="tl tl--green" />
        </div>

        <span className="navbar__path">alifiancode/alifian-cv</span>

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