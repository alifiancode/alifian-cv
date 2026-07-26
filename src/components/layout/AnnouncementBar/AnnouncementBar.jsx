import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { handleSectionLink } from '../../../utils/scrollTo'
import './AnnouncementBar.css'

export default function AnnouncementBar({ hidden = false }) {
  const [dismissed, setDismissed] = useState(false)
  const [closing, setClosing] = useState(false)
  const barRef = useRef(null)
  const closeTimer = useRef(null)

  useLayoutEffect(() => {
    const root = document.documentElement
    const el = barRef.current

    if (dismissed || hidden || !el) {
      root.style.setProperty('--announce-h', '0px')
      return
    }

    const setHeight = () => root.style.setProperty('--announce-h', `${el.offsetHeight}px`)
    setHeight()

    const observer = new ResizeObserver(setHeight)
    observer.observe(el)
    window.addEventListener('resize', setHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', setHeight)
      root.style.setProperty('--announce-h', '0px')
    }
  }, [dismissed, hidden])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  function handleDismiss() {
    setClosing(true)
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setDismissed(true)
      setClosing(false)
    }, 200)
  }

  if (hidden) return null

  if (dismissed) {
    return (
      <button
        type="button"
        className="announce-reopen"
        onClick={() => setDismissed(false)}
        aria-label="Show job search availability message again"
      >
        <span className="announce-reopen__dot" aria-hidden="true" />
        Open to any role ready to start now
      </button>
    )
  }

  return (
    <div className={`announce${closing ? ' announce--closing' : ''}`} ref={barRef} role="region" aria-label="Job search availability">
      <div className="announce__inner">
        <div className="announce__lead">
          <span className="announce__dot" aria-hidden="true" />
          <p className="announce__text">
            <strong>Open to any role, not just development</strong> flexible,
            fast learner, ready to start right away.
          </p>
        </div>

        <button type="button" className="announce__link" onClick={handleSectionLink('contact')}>
          Get in touch
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        <button
          type="button"
          className="announce__close"
          onClick={handleDismiss}
          aria-label="Dismiss this message"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Close
        </button>
      </div>
    </div>
  )
}