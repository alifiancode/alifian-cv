import { useState } from 'react'
import { competenceCert } from '../../../data/certificates'
import { useReveal } from '../../../hooks/useReveal'
import CertModal from '../../ui/CertModal/CertModal'
import Icon from '../../ui/Icon/Icon'
import TypeTitle from '../../ui/TypeTitle/TypeTitle'
import './CompetenceCert.css'

function handleSpotlight(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function CompetenceCert() {
  const [ref, visible] = useReveal()
  const [open, setOpen] = useState(false)

  const pdfUrl = `${import.meta.env.BASE_URL}certificates/${competenceCert.pdfFile}`

  return (
    <section className="competence" id="competence" ref={ref}>
      <div className="container">
        <p className={`section-label reveal${visible ? ' is-visible' : ''}`}>BNSP Certificate of Competence</p>
        <TypeTitle text="Nationally Certified" active={visible} />
        <div className={`section-divider reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: '.1s' }} />

        <div className={`competence__wrap${visible ? ' is-visible' : ''}`}>
          <article
            className="competence-card"
            style={{ '--competence-color': competenceCert.color }}
            onMouseMove={handleSpotlight}
          >
            <div className="competence-card__spotlight" aria-hidden="true" />

            <div className="competence-card__titlebar">
              <div className="traffic-lights">
                <span className="tl tl--red" />
                <span className="tl tl--yellow" />
                <span className="tl tl--green" />
              </div>
              <span className="competence-card__filename">{competenceCert.file}</span>
              <Icon name={competenceCert.icon} className="competence-card__titlebar-icon" />
            </div>

            <div className="competence-card__body">
              <div className="competence-card__main">
                <span className="competence-card__badge">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2-6.3-4.5-6.3 4.5 2.3-7.2-6-4.6h7.6z"/>
                  </svg>
                  {competenceCert.tagline}
                </span>

                <h3 className="competence-card__title">{competenceCert.title}</h3>
                <p className="competence-card__desc">{competenceCert.description}</p>

                <dl className="competence-card__facts">
                  {competenceCert.facts.map(({ label, value }) => (
                    <div key={label} className="competence-card__fact">
                      <dt>
                        <span className="syn-property">{label}</span>
                        <span className="syn-punct">:</span>
                      </dt>
                      <dd>
                        <span className="syn-string">'{value}'</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="competence-card__units">
                <p className="competence-card__units-label">
                  <span className="syn-property">competencyUnits</span>
                  <span className="syn-punct">:</span>{' '}
                  <span className="syn-number">{competenceCert.units.length}</span>
                </p>
                <ul className="competence-card__unit-list">
                  {competenceCert.units.map(({ code, title }) => (
                    <li key={code} className="competence-card__unit">
                      <span className="competence-card__unit-code">{code}</span>
                      <span className="competence-card__unit-title">{title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="competence-card__actions">
                <button type="button" className="btn btn--primary" onClick={() => setOpen(true)}>
                  <Icon name="file" />
                  View Certificate
                </button>
                <a className="btn btn--ghost" href={pdfUrl} download={competenceCert.downloadName}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>

      {open && <CertModal cert={competenceCert} onClose={() => setOpen(false)} />}
    </section>
  )
}