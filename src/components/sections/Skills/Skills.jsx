import { skillGroups } from '../../../data/skills'
import { useReveal } from '../../../hooks/useReveal'
import Icon from '../../ui/Icon/Icon'
import TypeTitle from '../../ui/TypeTitle/TypeTitle'
import './Skills.css'

export default function Skills() {
  const [ref, visible] = useReveal()

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <p className={`section-label reveal${visible ? ' is-visible' : ''}`}>What I Know</p>
        <TypeTitle text="Technical Skills" active={visible} />
        <div className={`section-divider reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: '.1s' }} />

        <div className={`skills__grid${visible ? ' is-visible' : ''}`}>
          {skillGroups.map(group => (
            <div key={group.category} className="skills__file">
              <div className="skills__file-header">
                <Icon name={group.icon} className="skills__file-icon" />
                <span className="skills__file-name">{group.file}</span>
              </div>

              <div className="skills__file-body">
                <div className="skills__code-line">
                  <span className="syn-punct">{'{'}</span>
                </div>
                {group.skills.map((skill, i) => (
                  <div key={skill} className="skills__code-line skills__code-line--indent">
                    <span className="syn-string">&quot;{skill}&quot;</span>
                    {i < group.skills.length - 1 && <span className="syn-punct">,</span>}
                  </div>
                ))}
                <div className="skills__code-line">
                  <span className="syn-punct">{'}'}</span>
                  <span className="skills__cursor" aria-hidden="true" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
