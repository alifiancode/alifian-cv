import './Marquee.css'

const ITEMS = [
  'REACT', 'JAVASCRIPT', 'TYPESCRIPT', 'PYTHON', 'NODE.JS',
  'EXPRESS', 'SQL', 'HTML5', 'CSS3', 'GIT', 'VITE', 'REST API',
]

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {track.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
