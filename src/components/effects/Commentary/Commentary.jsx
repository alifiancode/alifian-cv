import { useEffect, useState } from 'react'
import { commentaryEntries } from '../../../data/commentary'
import { useActiveSection } from '../../../hooks/useActiveSection'
import { useTypeReveal } from '../../../hooks/useTypeReveal'
import { scrollToSection } from '../../../utils/scrollTo'
import Icon from '../../ui/Icon/Icon'
import './Commentary.css'

const SECTION_IDS = commentaryEntries.map((entry) => entry.id)
const STORAGE_KEY = 'alifian-portfolio:commentary-open'

function readStoredOpen() {
  if (typeof window === 'undefined') return true
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === null) return window.innerWidth > 640
  return stored === 'true'
}

export default function Commentary() {
  const [open, setOpen] = useState(readStoredOpen)
  const [everOpened, setEverOpened] = useState(open)
  const activeId = useActiveSection(SECTION_IDS)
  const active = commentaryEntries.find((entry) => entry.id === activeId) ?? commentaryEntries[0]
  const [display, done] = useTypeReveal(active.text, true, 2200, 8, 30)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(open))
    if (open) setEverOpened(true)
  }, [open])

  if (!open) {
    return (
      <div className="commentary">
        <button
          className="commentary__toggle"
          onClick={() => setOpen(true)}
          aria-label="Show section commentary"
          aria-expanded="false"
          type="button"
        >
          <Icon name="message" />
          <span>Commentary</span>
          {!everOpened && <span className="commentary__ping" aria-hidden="true" />}
        </button>
      </div>
    )
  }

  return (
    <div className="commentary">
      <div className="commentary__panel">
        <div className="commentary__titlebar">
          <div className="traffic-lights">
            <button
              className="tl tl--red"
              onClick={() => setOpen(false)}
              aria-label="Collapse commentary"
              type="button"
            />
            <span className="tl tl--yellow" />
            <span className="tl tl--green" />
          </div>
          <span className="commentary__filename">{active.file}</span>
          <span className="commentary__spacer" />
        </div>

        <div className="commentary__body">
          <p className="commentary__eyebrow">notes on this section</p>
          <p className="commentary__text" aria-label={active.text}>
            {display}
            {!done && <span className="type-cursor" aria-hidden="true" />}
          </p>
        </div>

        <div className="commentary__dots" role="group" aria-label="Jump to section">
          {commentaryEntries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              aria-label={`Jump to ${entry.file}`}
              aria-current={entry.id === active.id ? 'true' : undefined}
              className={`commentary__dot${entry.id === active.id ? ' commentary__dot--active' : ''}`}
              onClick={() => scrollToSection(entry.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}