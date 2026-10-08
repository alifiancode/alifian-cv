import { games } from '../../../data/games'
import { useReveal } from '../../../hooks/useReveal'
import { useTypeReveal } from '../../../hooks/useTypeReveal'
import Icon from '../../ui/Icon/Icon'
import Mascot from '../../ui/Mascot/Mascot'
import TypeTitle from '../../ui/TypeTitle/TypeTitle'
import './Games.css'

function handleSpotlight(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

function BitExplain({ text, title, active }) {
  const [display, done] = useTypeReveal(text, active, 4200, 8, 30)

  return (
    <div className="game-card__explain">
      <Mascot
        size={54}
        talking={active && !done}
        floating
        interactive
        className="game-card__explain-mascot"
      />
      <div className="game-card__explain-content">
        <p className="game-card__explain-label">
          <span className="syn-punct">$</span> what is {title}<span className="syn-punct">?</span>
        </p>
        <p className="game-card__explain-text" aria-label={text}>
          <span className="game-card__explain-ghost" aria-hidden="true">{text}</span>
          <span className="game-card__explain-live" aria-hidden="true">
            {display}
            {active && !done && <span className="type-cursor" />}
          </span>
        </p>
      </div>
    </div>
  )
}

export default function Games() {
  const [ref, visible] = useReveal()

  return (
    <section className="games" id="games" ref={ref}>
      <div className="container">
        <p className={`section-label reveal${visible ? ' is-visible' : ''}`}>What I've Built</p>
        <TypeTitle text="Games & Projects" active={visible} />
        <div className={`section-divider reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: '.1s' }} />

        <div className={`games__grid${visible ? ' is-visible' : ''}`}>
          {games.map((game, i) => (
            <article
              key={game.id}
              className="game-card"
              style={{ '--game-color': game.accentColor, '--i': i }}
              onMouseMove={handleSpotlight}
            >
              <div className="game-card__spotlight" aria-hidden="true" />

              <div className="game-card__titlebar">
                <div className="traffic-lights">
                  <span className="tl tl--red" />
                  <span className="tl tl--yellow" />
                  <span className="tl tl--green" />
                </div>
                <span className="game-card__filename">{game.file}</span>
                <Icon name={game.icon} className="game-card__titlebar-icon" />
              </div>

              <div className="game-card__body">
                <span className="game-card__badge">
                  <span className="game-card__badge-dot" aria-hidden="true" />
                  {game.tagline}
                </span>

                <h3 className="game-card__title">{game.title}</h3>
                <p className="game-card__desc">{game.description}</p>

                <BitExplain text={game.explain} title={game.title} active={visible} />

                <div className="game-card__meta">
                  <span className="game-card__role">{game.role}</span>
                </div>

                <div className="game-card__techs">
                  {game.technologies.map(tech => (
                    <span key={tech} className="game-card__tech">{tech}</span>
                  ))}
                </div>

                <div className="game-card__actions">
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => window.open(game.playUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <Icon name="zap" />
                    Play Now
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => window.open(game.repoUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <Icon name="external-link" />
                    View Source
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}