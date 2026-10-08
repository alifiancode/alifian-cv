import { useState } from 'react'
import { resume } from '../../../data/resume'
import { useReveal } from '../../../hooks/useReveal'
import CertModal from '../../ui/CertModal/CertModal'
import Icon from '../../ui/Icon/Icon'
import TypeTitle from '../../ui/TypeTitle/TypeTitle'
import './Resume.css'

function handleSpotlight(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function Resume() {
  const [ref, visible] = useReveal()
  const [open, setOpen] = useState(false)

  const pdfUrl = `${import.meta.env.BASE_URL}certificates/${resume.pdfFile}`

  return (
    <section className="resume" id="resume" ref={ref}>
      <div className="container">
        <p className={`section-label reveal${visible ? ' is-visible' : ''}`}>My Resume</p>
        <TypeTitle text="Everything on One Page" active={visible} />
        <div className={`section-divider reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: '.1s' }} />

        <div className={`resume__wrap${visible ? ' is-visible' : ''}`}>
          <article
            className="resume-card"
            style={{ '--resume-color': resume.color }}
            onMouseMove={handleSpotlight}
          >
            <div className="resume-card__spotlight" aria-hidden="true" />

            <div className="resume-card__titlebar">
              <div className="traffic-lights">
                <span className="tl tl--red" />
                <span className="tl tl--yellow" />
                <span className="tl tl--green" />
              </div>
              <span className="resume-card__filename">{resume.file}</span>
              <Icon name={resume.icon} className="resume-card__titlebar-icon" />
            </div>

            <div className="resume-card__body">
              <span className="resume-card__badge">
                <span className="resume-card__badge-dot" aria-hidden="true" />
                {resume.tagline}
              </span>

              <h3 className="resume-card__title">{resume.title}</h3>
              <p className="resume-card__desc">{resume.description}</p>

              <dl className="resume-card__facts">
                {resume.facts.map(({ label, value }) => (
                  <div key={label} className="resume-card__fact">
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

              <div className="resume-card__techs">
                {resume.skills.map((skill) => (
                  <span key={skill} className="resume-card__tech">{skill}</span>
                ))}
              </div>

              <div className="resume-card__actions">
                <button type="button" className="btn btn--primary" onClick={() => setOpen(true)}>
                  <Icon name="file" />
                  View Resume
                </button>
                <a className="btn btn--ghost" href={pdfUrl} download={resume.downloadName}>
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

      {open && <CertModal cert={resume} onClose={() => setOpen(false)} />}
    </section>
  )
}