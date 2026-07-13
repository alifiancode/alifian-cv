import { useState, useEffect } from 'react'
import { scrollToSection } from '../../../utils/scrollTo'
import Icon from '../../ui/Icon/Icon'
import './Sidebar.css'

const SECTIONS = [
  { id: 'hero', label: 'index.jsx' },
  { id: 'about', label: 'about.jsx' },
  { id: 'skills', label: 'skills.jsx' },
  { id: 'certificates', label: 'certificates.jsx' },
  { id: 'contact', label: 'contact.jsx' },
]

export default function Sidebar({ isOpen, onClose }) {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  function handleSelect(id) {
    scrollToSection(id)
    onClose()
  }

  return (
    <>
      {isOpen && <div className="sidebar__backdrop" onClick={onClose} aria-hidden="true" />}

      <aside className={`sidebar${isOpen ? ' sidebar--open' : ''}`} aria-hidden={!isOpen}>
        <div className="sidebar__header">
          <span className="sidebar__header-label">Explorer</span>
          <button className="sidebar__close" onClick={onClose} aria-label="Close explorer" type="button">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="sidebar__tree">
          <div className="sidebar__row sidebar__row--root">
            <Icon name="chevron-right" className="sidebar__chevron sidebar__chevron--open" />
            <Icon name="folder-open" className="sidebar__icon sidebar__icon--folder" />
            <span>ALIFIAN-PORTFOLIO</span>
          </div>

          <div className="sidebar__row sidebar__row--nested">
            <Icon name="chevron-right" className="sidebar__chevron sidebar__chevron--open" />
            <Icon name="folder-open" className="sidebar__icon sidebar__icon--folder" />
            <span>src</span>
          </div>

          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              className={`sidebar__file${active === id ? ' sidebar__file--active' : ''}`}
              onClick={() => handleSelect(id)}
              type="button"
              tabIndex={isOpen ? 0 : -1}
            >
              <Icon name="file" className="sidebar__icon" />
              <span>{label}</span>
              {active === id && <span className="sidebar__file-dot" aria-hidden="true" />}
            </button>
          ))}
        </div>

        <div className="sidebar__footer">
          <span className="syn-punct">//</span> click a file to jump there
        </div>
      </aside>
    </>
  )
}
