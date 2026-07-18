import { useTypewriter } from '../../../hooks/useTypewriter'
import { useTypeOnce } from '../../../hooks/useTypeOnce'
import { useCountUp } from '../../../hooks/useCountUp'
import { config } from '../../../data/config'
import { handleSectionLink } from '../../../utils/scrollTo'
import CodeRain from '../../effects/CodeRain/CodeRain'
import './Hero.css'

const ROLES = [
  'Front-End Developer',
  'Full-Stack Developer',
  'Python Developer',
  'Web Developer',
]

const STATS = [
  { target: 4, suffix: '', label: 'Professional\nCertificates' },
  { target: 8, suffix: '', label: 'Skill\nCertificates' },
  { target: 12, suffix: '+', label: 'Technologies\nLearned' },
]

function Stat({ target, suffix, label }) {
  const count = useCountUp(target, 1200, true)
  return (
    <div className="hero__stat">
      <span className="hero__stat-num">{count}{suffix}</span>
      <span className="hero__stat-label">
        {label.split('\n').map((line, i) => (
          <span key={i}>{line}{i === 0 && <br />}</span>
        ))}
      </span>
    </div>
  )
}

export default function Hero() {
  const role = useTypewriter(ROLES, 80, 2200)
  const [headline, headlineDone] = useTypeOnce('Welcome to my CV.', 48, 500)

  return (
    <section className="hero" id="hero">
      <CodeRain />
      <div className="hero__vignette" aria-hidden="true" />

      <div className="container hero__content">
        <div className="hero__top">
        <div className="hero__avatar">
          <img
            src={`${import.meta.env.BASE_URL}${config.photo}`}
            alt={`Photo of ${config.name}`}
            className="hero__avatar-img"
            width="112"
            height="112"
          />
        </div>

        <div className="hero__main">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Available for work &nbsp;&middot;&nbsp; Open worldwide
        </div>

        <h1 className="hero__headline">
          <span className="hero__prompt">&gt;</span> {headline}
          {!headlineDone && <span className="hero__cursor" aria-hidden="true" />}
        </h1>

        <p className={`hero__subtitle${headlineDone ? ' is-visible' : ''}`}>
          Hi, I'm {config.name}, a {role}
          <span className="hero__cursor hero__cursor--inline" aria-hidden="true" />
        </p>

        <p className={`hero__desc${headlineDone ? ' is-visible' : ''}`}>
          Self-taught developer from Surabaya, certified in front-end, back-end,
          full-stack, and Python development by Mimo. Passionate about building
          clean, purposeful web experiences.
        </p>

        <div className={`hero__actions${headlineDone ? ' is-visible' : ''}`}>
          <a href="#certificates" onClick={handleSectionLink('certificates')} className="btn btn--primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            View Certificates
          </a>
          <a href="#contact" onClick={handleSectionLink('contact')} className="btn btn--ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="4 6 9 12 4 18" />
              <line x1="12" y1="18" x2="20" y2="18" />
            </svg>
            Get In Touch
          </a>
        </div>
        </div>
        </div>

        <div className={`hero__window scanlines${headlineDone ? ' is-visible' : ''}`}>
          <div className="hero__titlebar">
            <div className="traffic-lights">
              <span className="tl tl--red" />
              <span className="tl tl--yellow" />
              <span className="tl tl--green" />
            </div>
            <span className="hero__filename">profile.js</span>
          </div>

          <div className="hero__code">
            <div className="hero__gutter" aria-hidden="true">
              <span>1</span><span>2</span><span>3</span><span>4</span>
              <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
            </div>

            <div className="hero__lines">
              <div className="hero__line">
                <span className="syn-keyword">const</span> developer <span className="syn-punct">=</span> <span className="syn-punct">{'{'}</span>
              </div>
              <div className="hero__line hero__line--indent">
                <span className="syn-property">name</span><span className="syn-punct">:</span> <span className="syn-string">'{config.name}'</span><span className="syn-punct">,</span>
              </div>
              <div className="hero__line hero__line--indent">
                <span className="syn-property">age</span><span className="syn-punct">:</span> <span className="syn-number">18</span><span className="syn-punct">,</span>
              </div>
              <div className="hero__line hero__line--indent">
                <span className="syn-property">role</span><span className="syn-punct">:</span> <span className="syn-string">'{role}'</span><span className="syn-punct">,</span>
              </div>
              <div className="hero__line hero__line--indent">
                <span className="syn-property">location</span><span className="syn-punct">:</span> <span className="syn-string">'{config.location}'</span><span className="syn-punct">,</span>
              </div>
              <div className="hero__line hero__line--indent">
                <span className="syn-property">openTo</span><span className="syn-punct">:</span> <span className="syn-punct">[</span><span className="syn-string">'full-time'</span><span className="syn-punct">,</span> <span className="syn-string">'internship'</span><span className="syn-punct">,</span> <span className="syn-string">'relocation'</span><span className="syn-punct">],</span>
              </div>
              <div className="hero__line hero__line--indent">
                <span className="syn-property">languages</span><span className="syn-punct">:</span> <span className="syn-punct">[</span><span className="syn-string">'Indonesian'</span><span className="syn-punct">,</span> <span className="syn-string">'English'</span><span className="syn-punct">],</span>
              </div>
              <div className="hero__line hero__line--indent">
                <span className="syn-property">available</span><span className="syn-punct">:</span> <span className="syn-number">true</span><span className="syn-punct">,</span>
              </div>
              <div className="hero__line">
                <span className="syn-punct">{'};'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__stats">
          {STATS.map(stat => <Stat key={stat.label} {...stat} />)}
        </div>
      </div>
    </section>
  )
}