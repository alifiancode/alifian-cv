import { config } from '../../../data/config'
import { useReveal } from '../../../hooks/useReveal'
import Icon from '../../ui/Icon/Icon'
import TypeTitle from '../../ui/TypeTitle/TypeTitle'
import './About.css'

export default function About() {
  const [ref, visible] = useReveal()

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <p className={`section-label reveal${visible ? ' is-visible' : ''}`}>About Me</p>
        <TypeTitle text="Passionate & Self-Driven" active={visible} style={{ transitionDelay: '.08s' }} />
        <div className={`section-divider reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: '.16s' }} />

        <div className="about__grid">
          <div className={`about__window reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: '.22s' }}>
            <div className="about__titlebar">
              <div className="traffic-lights">
                <span className="tl tl--red" />
                <span className="tl tl--yellow" />
                <span className="tl tl--green" />
              </div>
              <span className="about__filename">about.md</span>
            </div>

            <div className="about__content">
              <p className="about__bio">
                I'm <strong>{config.name}</strong>, an 18-year-old fresh graduate
                and self-taught web developer originally based in {config.location}.
                My journey into coding started from pure curiosity, and that
                curiosity turned into a genuine passion for building things
                on the web.
              </p>
              <p className="about__bio">
                Through the <strong>Mimo</strong> platform, I've earned
                professional certifications in Front-End, Back-End, Full-Stack,
                and Python Development, plus eight individual skill certificates.
                Every course I completed, I saw as one more tool added to my belt.
              </p>
              <p className="about__bio">
                I'm now actively seeking my <strong>first role as a web developer</strong>,
                ready to bring clean code, dedication, and a growth mindset to any team,
                anywhere in the world.
              </p>
              <p className="about__bio">
                I'm fully fluent in <strong>English</strong> for both daily
                communication and technical work, and I'm ready to relocate to
                <strong> any country</strong>, based entirely on what the
                opportunity and the company need.
              </p>

              <ul className="about__highlights">
                {[
                  { icon: 'globe', text: 'Open to relocation, worldwide' },
                  { icon: 'search', text: 'Fluent in English' },
                  { icon: 'award', text: 'Self-taught · Mimo Certified' },
                  { icon: 'map-pin', text: `Currently in ${config.location}` },
                ].map(({ icon, text }) => (
                  <li key={text} className="about__highlight">
                    <span className="about__highlight-icon"><Icon name={icon} /></span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="about__sidebar">
            <div className={`about__stat-file reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: '.32s' }}>
              <div className="about__stat-header">
                <Icon name="database" className="about__stat-icon" />
                <span>stats.json</span>
              </div>
              <div className="about__stat-body">
                <div className="about__stat-row">
                  <span className="syn-property">age</span>
                  <span className="syn-punct">:</span>
                  <span className="syn-number about__stat-value">18</span>
                </div>
                <div className="about__stat-row">
                  <span className="syn-property">certificates</span>
                  <span className="syn-punct">:</span>
                  <span className="syn-number about__stat-value">12</span>
                </div>
                <div className="about__stat-row">
                  <span className="syn-property">professional</span>
                  <span className="syn-punct">:</span>
                  <span className="syn-number about__stat-value">4</span>
                </div>
                <div className="about__stat-row">
                  <span className="syn-property">skillBadges</span>
                  <span className="syn-punct">:</span>
                  <span className="syn-number about__stat-value">8</span>
                </div>
                <div className="about__stat-row">
                  <span className="syn-property">since</span>
                  <span className="syn-punct">:</span>
                  <span className="syn-string about__stat-value">'2025'</span>
                </div>
              </div>
            </div>

            <div className={`about__stat-file reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: '.4s' }}>
              <div className="about__stat-header">
                <Icon name="code" className="about__stat-icon" />
                <span>stack.json</span>
              </div>
              <div className="about__stat-body">
                <span className="syn-property">core</span>
                <span className="syn-punct">: [</span>
                {['React', 'JavaScript', 'Node.js', 'Python', 'SQL', 'AI Integration'].map((t, i, arr) => (
                  <span key={t} className="about__stack-item">
                    <span className="syn-string">'{t}'</span>
                    {i < arr.length - 1 && <span className="syn-punct">,</span>}
                  </span>
                ))}
                <span className="syn-punct">]</span>
                <div className="about__stat-row about__stat-row--wrap">
                  <span className="syn-property">verifiedBy</span>
                  <span className="syn-punct">:</span>
                  <span className="syn-string about__stat-value">'Johannes Berger, CEO Mimo'</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}