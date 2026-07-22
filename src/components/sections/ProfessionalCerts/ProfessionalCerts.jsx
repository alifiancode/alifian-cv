import { useState } from 'react'
import { professionalCerts } from '../../../data/certificates'
import { useReveal } from '../../../hooks/useReveal'
import Icon from '../../ui/Icon/Icon'
import TypeTitle from '../../ui/TypeTitle/TypeTitle'
import CertModal from '../../ui/CertModal/CertModal'
import './ProfessionalCerts.css'

function handleSpotlight(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function ProfessionalCerts() {
  const [ref, visible] = useReveal()
  const [activeCert, setActiveCert] = useState(null)

  function openCert(cert) {
    setActiveCert({
      ...cert,
      name: cert.title,
      color: cert.accentColor,
    })
  }

  return (
    <section className="prof-certs" id="certificates" ref={ref}>
      <div className="container">
        <p className={`section-label reveal${visible ? ' is-visible' : ''}`}>Mimo Professional Certificates</p>
        <TypeTitle text="Certified & Verified" active={visible} />
        <div className={`section-divider reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: '.1s' }} />

        <div className={`prof-certs__grid${visible ? ' is-visible' : ''}`}>
          {professionalCerts.map((cert, i) => (
            <article
              key={cert.id}
              className={`cert-card ${cert.colorClass}`}
              style={{ '--cert-color': cert.accentColor, '--i': i }}
              onMouseMove={handleSpotlight}
              onClick={() => openCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCert(cert) } }}
              aria-label={`View ${cert.title} certificate`}
            >
              <div className="cert-card__spotlight" aria-hidden="true" />
              <div className="cert-card__tab">
                <span className="cert-card__dot" />
                <span className="cert-card__filename">{cert.file}</span>
                <Icon name={cert.icon} className="cert-card__tab-icon" />
              </div>

              <div className="cert-card__body">
                <span className="cert-card__badge">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2-6.3-4.5-6.3 4.5 2.3-7.2-6-4.6h7.6z"/>
                  </svg>
                  Mimo Certified Graduate
                </span>

                <h3 className="cert-card__title">{cert.title}</h3>
                <p className="cert-card__desc">{cert.description}</p>

                <div className="cert-card__meta">
                  <span className="cert-card__issuer">{cert.issuer}</span>
                  <span className="cert-card__sep">&middot;</span>
                  <span className="cert-card__date">{cert.date}</span>
                </div>

                <div className="cert-card__techs">
                  {cert.technologies.map(tech => (
                    <span key={tech} className="cert-card__tech">{tech}</span>
                  ))}
                </div>

                <div className="cert-card__actions">
                  <span className="cert-card__view">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    View certificate
                  </span>

                  <button
                    type="button"
                    className="cert-card__verify"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer')
                    }}
                  >
                    <span className="syn-punct">$</span> verify
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeCert && (
        <CertModal
          cert={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </section>
  )
}