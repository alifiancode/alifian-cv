import { config } from '../../../data/config'
import { useReveal } from '../../../hooks/useReveal'
import Icon from '../../ui/Icon/Icon'
import TypeTitle from '../../ui/TypeTitle/TypeTitle'
import './Contact.css'

export default function Contact() {
  const [ref, visible] = useReveal()

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact__glow" aria-hidden="true" />

      <div className="container contact__inner">
        <p className={`section-label reveal${visible ? ' is-visible' : ''}`}>Let's Work Together</p>
        <TypeTitle text="Ready to build something great?" active={visible} style={{ transitionDelay: '.08s' }} />

        <div className={`contact__terminal scanlines${visible ? ' is-visible' : ''}`}>
          <div className="contact__titlebar">
            <div className="traffic-lights">
              <span className="tl tl--red" />
              <span className="tl tl--yellow" />
              <span className="tl tl--green" />
            </div>
            <span className="contact__filename">contact.sh</span>
          </div>

          <div className="contact__body">
            <p className="contact__line">
              <span className="contact__prompt">$</span> whoami
            </p>
            <p className="contact__output">alifian-putra-wijaya</p>

            <p className="contact__line">
              <span className="contact__prompt">$</span> cat status.txt
            </p>
            <p className="contact__output contact__output--accent">
              Open to full-time roles, internships, and freelance projects
            </p>

            <p className="contact__line">
              <span className="contact__prompt">$</span> ./get-in-touch
              <span className="contact__cursor" aria-hidden="true" />
            </p>
          </div>
        </div>

        <div className={`contact__actions reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: '.5s' }}>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => { window.location.href = `mailto:${config.email}` }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Send Me an Email
          </button>

          <button
            type="button"
            className="btn btn--ghost"
            title={`WhatsApp: ${config.phone}`}
            onClick={() => window.open(config.whatsapp, '_blank', 'noopener,noreferrer')}
          >
            <Icon name="message" />
            Chat on WhatsApp
          </button>

          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => window.open(config.github, '_blank', 'noopener,noreferrer')}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            View GitHub
          </button>
        </div>
      </div>
    </section>
  )
}