import { useState } from 'react'
import { skillCerts } from '../../../data/certificates'
import { useReveal } from '../../../hooks/useReveal'
import CertModal from '../../ui/CertModal/CertModal'
import Icon from '../../ui/Icon/Icon'
import TypeTitle from '../../ui/TypeTitle/TypeTitle'
import './SkillCerts.css'

export default function SkillCerts() {
  const [activeCert, setActiveCert] = useState(null)
  const [ref, visible] = useReveal()

  return (
    <section className="skill-certs" id="skill-certs" ref={ref}>
      <div className="container">
        <p className={`section-label reveal${visible ? ' is-visible' : ''}`}>Mimo Skill Certificates</p>
        <TypeTitle text="Individual Skills Earned" active={visible} />
        <div className={`section-divider reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: '.1s' }} />

        <div className={`skill-certs__grid${visible ? ' is-visible' : ''}`}>
          {skillCerts.map((cert, i) => (
            <button
              key={cert.id}
              className="skill-file"
              onClick={() => setActiveCert(cert)}
              aria-label={`View ${cert.name} certificate`}
              type="button"
              style={{ '--lang-color': cert.color, '--i': i }}
            >
              <span className="skill-file__bar" />
              <span className="skill-file__icon">
                <Icon name={cert.icon} />
              </span>
              <span className="skill-file__info">
                <span className="skill-file__name">{cert.name}</span>
                <span className="skill-file__ext">{cert.ext} &middot; {cert.date}</span>
              </span>
              <span className="skill-file__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </button>
          ))}
        </div>

        <p className="skill-certs__note">
          All certificates issued by{' '}
          <button
            type="button"
            className="skill-certs__note-link"
            onClick={() => window.open('https://getmimo.com', '_blank', 'noopener,noreferrer')}
          >
            Mimo
          </button>
          {' '}and verified on virtualbadge.io. Tap any file to view the PDF.
        </p>
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