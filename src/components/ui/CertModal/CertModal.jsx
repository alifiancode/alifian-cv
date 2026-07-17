import { useEffect, useState, useCallback } from 'react'
import Icon from '../Icon/Icon'
import './CertModal.css'

export default function CertModal({ cert, onClose }) {
  const [closing, setClosing] = useState(false)
  const [pdfLoaded, setPdfLoaded] = useState(false)
  const [isTouch] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches
  )
  const pdfUrl = `${import.meta.env.BASE_URL}certificates/${cert.pdfFile}`
  const downloadName = `Alifian-Putra-Wijaya-${cert.name.replace(/\s+/g, '-')}-Certificate.pdf`

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 220)
  }, [onClose])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleClose])

  return (
    <div
      className={`cm-backdrop${closing ? ' cm-backdrop--closing' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.name} Certificate`}
    >
      <div
        className={`cm${closing ? ' cm--closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={{ '--lang-color': cert.color }}
      >
        <div className="cm__titlebar">
          <div className="traffic-lights">
            <button className="tl tl--red" onClick={handleClose} aria-label="Close" type="button" />
            <span className="tl tl--yellow" />
            <span className="tl tl--green" />
          </div>
          <div className="cm__filename">
            <Icon name={cert.icon} className="cm__filename-icon" />
            <span>{cert.name}{cert.ext}</span>
          </div>
          <span className="cm__spacer" />
        </div>

        <div className="cm__explain">
          <p className="cm__explain-label">
            <span className="syn-punct">/**</span> what is {cert.name}<span className="syn-punct">?</span>
          </p>
          <p className="cm__explain-text">{cert.explain}</p>
        </div>

        <div className="cm__toolbar">
          <span className="cm__meta">Mimo Certificate &middot; {cert.date}</span>

          <div className="cm__controls">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cm__btn"
              title="Open in new tab"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              <span>Open</span>
            </a>

            <a
              href={pdfUrl}
              download={downloadName}
              className="cm__btn cm__btn--primary"
              title="Download PDF"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download</span>
            </a>

            <button
              className="cm__close"
              onClick={handleClose}
              aria-label="Close modal"
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="cm__body">
          {isTouch ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cm__tap-card"
            >
              <Icon name="file" className="cm__tap-icon" />
              <span className="cm__tap-title">Tap to view certificate</span>
              <span className="cm__tap-sub">Opens {cert.name}{cert.ext} in a new tab</span>
              <span className="cm__tap-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Open Certificate
              </span>
            </a>
          ) : (
            <>
              {!pdfLoaded && (
                <div className="cm__loading" aria-hidden="true">
                  <span className="cm__spinner" />
                  <span className="cm__loading-text">Loading certificate&hellip;</span>
                </div>
              )}
              <iframe
                src={pdfUrl}
                title={`${cert.name} Certificate`}
                className="cm__pdf"
                onLoad={() => setPdfLoaded(true)}
                style={{ opacity: pdfLoaded ? 1 : 0 }}
              />
              <p className="cm__fallback">
                Preview not loading? <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Open the PDF directly</a>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}