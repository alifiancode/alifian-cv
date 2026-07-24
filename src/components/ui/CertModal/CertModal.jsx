import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import Icon from '../Icon/Icon'
import './CertModal.css'

function triggerDownload(url, filename) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function CertModal({
  cert,
  onClose,
  onPrev = () => {},
  onNext = () => {},
  position = null,
  total = null,
}) {
  const [closing, setClosing] = useState(false)
  const [loadedPdfUrl, setLoadedPdfUrl] = useState(null)
  const [isTouch] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches
  )
  const modalRef = useRef(null)
  const titlebarRef = useRef(null)
  const touchStartRef = useRef(null)

  const hasPrev = total !== null && position !== null && position > 1
  const hasNext = total !== null && position !== null && position < total

  const pdfUrl = `${import.meta.env.BASE_URL}certificates/${cert.pdfFile}`
  const pdfLoaded = loadedPdfUrl === pdfUrl
  const downloadName = `Alifian-Putra-Wijaya-${cert.name.replace(/\s+/g, '-')}-Certificate.pdf`

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 220)
  }, [onClose])

  const handlePrev = useCallback(() => {
    if (hasPrev) onPrev()
  }, [hasPrev, onPrev])

  const handleNext = useCallback(() => {
    if (hasNext) onNext()
  }, [hasNext, onNext])

  // Keep the sticky action bar pinned directly beneath the titlebar, whatever
  // height the titlebar happens to render at (it can change across breakpoints).
  useLayoutEffect(() => {
    const titlebarEl = titlebarRef.current
    const modalEl = modalRef.current
    if (!titlebarEl || !modalEl) return

    const setTitlebarHeight = () => {
      modalEl.style.setProperty('--cm-titlebar-h', `${titlebarEl.offsetHeight}px`)
    }
    setTitlebarHeight()

    const observer = new ResizeObserver(setTitlebarHeight)
    observer.observe(titlebarEl)
    return () => observer.disconnect()
  }, [])

  // Snap back to the top of the modal whenever we switch to a different certificate,
  // so Previous/Next always lands somewhere predictable instead of mid-scroll.
  useLayoutEffect(() => {
    if (modalRef.current) modalRef.current.scrollTop = 0
  }, [cert.pdfFile])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') { handleClose(); return }
      if (e.key === 'ArrowLeft' && hasPrev) { e.preventDefault(); handlePrev(); return }
      if (e.key === 'ArrowRight' && hasNext) { e.preventDefault(); handleNext() }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleClose, handlePrev, handleNext, hasPrev, hasNext])

  function handleTouchStart(e) {
    const touch = e.touches && e.touches[0]
    if (!touch) return
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  function handleTouchEnd(e) {
    const start = touchStartRef.current
    touchStartRef.current = null
    const touch = e.changedTouches && e.changedTouches[0]
    if (!start || !touch) return

    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    // Require a deliberate, mostly-horizontal drag so vertical scrolling
    // through the explainer text or PDF is never mistaken for a swipe.
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.4) return

    if (dx > 0) handlePrev()
    else handleNext()
  }

  return (
    <div
      className={`cm-backdrop${closing ? ' cm-backdrop--closing' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.name} Certificate`}
    >
      <div
        ref={modalRef}
        className={`cm${closing ? ' cm--closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => { touchStartRef.current = null }}
        style={{ '--lang-color': cert.color }}
      >
        <span className="sr-only" aria-live="polite">
          {total > 1
            ? `Viewing ${cert.name}${cert.ext} certificate, ${position} of ${total}`
            : `Viewing ${cert.name}${cert.ext} certificate`}
        </span>

        <div className="cm__titlebar" ref={titlebarRef}>
          <div className="traffic-lights">
            <button className="tl tl--red" onClick={handleClose} aria-label="Close" type="button" />
            <span className="tl tl--yellow" />
            <span className="tl tl--green" />
          </div>
          <div className="cm__filename cm__fade" key={cert.pdfFile}>
            <Icon name={cert.icon} className="cm__filename-icon" />
            <span>{cert.name}{cert.ext}</span>
          </div>
          <span className="cm__spacer" />
        </div>

        {total > 1 && (
          <div className="cm__nav">
            <button
              type="button"
              className="cm__nav-btn cm__nav-btn--prev"
              onClick={handlePrev}
              disabled={!hasPrev}
              aria-label="View previous certificate"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 6 9 12 15 18" />
              </svg>
              <span>Previous</span>
            </button>

            <span className="cm__nav-count" aria-hidden="true">{position} / {total}</span>

            <button
              type="button"
              className="cm__nav-btn cm__nav-btn--next"
              onClick={handleNext}
              disabled={!hasNext}
              aria-label="View next certificate"
            >
              <span>Next</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        )}

        <div className="cm__explain cm__fade" key={cert.pdfFile}>
          <p className="cm__explain-label">
            <span className="syn-punct">/**</span> what is {cert.name}<span className="syn-punct">?</span>
          </p>
          <p className="cm__explain-text">{cert.explain}</p>
        </div>

        <div className="cm__toolbar">
          <span className="cm__meta cm__fade" key={cert.pdfFile}>Mimo Certificate &middot; {cert.date}</span>

          <div className="cm__controls">
            <button
              type="button"
              className="cm__btn"
              onClick={() => window.open(pdfUrl, '_blank', 'noopener,noreferrer')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              <span>Open</span>
            </button>

            <button
              type="button"
              className="cm__btn cm__btn--primary"
              onClick={() => triggerDownload(pdfUrl, downloadName)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download</span>
            </button>

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
            <button
              type="button"
              className="cm__tap-card cm__fade"
              key={cert.pdfFile}
              onClick={() => window.open(pdfUrl, '_blank', 'noopener,noreferrer')}
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
            </button>
          ) : (
            <>
              {!pdfLoaded && (
                <div className="cm__loading" aria-hidden="true">
                  <span className="cm__spinner" />
                  <span className="cm__loading-text">Loading certificate&hellip;</span>
                </div>
              )}
              <iframe
                key={pdfUrl}
                src={pdfUrl}
                title={`${cert.name} Certificate`}
                className="cm__pdf"
                onLoad={() => setLoadedPdfUrl(pdfUrl)}
                style={{ opacity: pdfLoaded ? 1 : 0 }}
              />
              <p className="cm__fallback">
                Preview not loading?{' '}
                <button
                  type="button"
                  className="cm__fallback-link"
                  onClick={() => window.open(pdfUrl, '_blank', 'noopener,noreferrer')}
                >
                  Open the PDF directly
                </button>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}