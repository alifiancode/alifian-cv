import { useTypeReveal } from '../../../hooks/useTypeReveal'

export default function TypeTitle({ text, active, className = 'section-title', style }) {
  const [display, done] = useTypeReveal(text, active)
  return (
    <h2 className={className} style={style} aria-label={text}>
      {display || '\u00A0'}
      {active && !done && <span className="type-cursor" aria-hidden="true" />}
    </h2>
  )
}
