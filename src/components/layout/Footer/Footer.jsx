import { config } from '../../../data/config'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__bar">
        <div className="footer__group">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="6" y1="3" x2="6" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </svg>
          <span>main</span>
        </div>
        <div className="footer__group">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>0 problems</span>
        </div>

        <span className="footer__spacer" />

        <div className="footer__group footer__group--muted">UTF-8</div>
        <div className="footer__group footer__group--muted">LF</div>
        <div className="footer__group footer__group--muted">React</div>
        <div className="footer__group footer__group--muted">
          &copy; {year} {config.name}
        </div>
      </div>
    </footer>
  )
}
