import { useEffect, useRef, useState } from 'react'
import './Mascot.css'

function useGaze(ref) {
  const [gaze, setGaze] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

    let frame = null

    function handlePointerMove(e) {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = null
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy) || 1
        const maxOffset = 1.6
        setGaze({ x: (dx / dist) * maxOffset, y: (dy / dist) * maxOffset })
      })
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])

  return gaze
}

function useOrganicBlink() {
  const [blinking, setBlinking] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let closeTimer
    let nextTimer

    function blinkOnce(thenDoubleBlink) {
      setBlinking(true)
      closeTimer = setTimeout(() => {
        setBlinking(false)
        if (thenDoubleBlink) {
          nextTimer = setTimeout(() => blinkOnce(false), 150)
        } else {
          queueNext()
        }
      }, 130)
    }

    function queueNext() {
      const delay = 2600 + Math.random() * 3200
      nextTimer = setTimeout(() => blinkOnce(Math.random() < 0.18), delay)
    }

    queueNext()
    return () => {
      clearTimeout(closeTimer)
      clearTimeout(nextTimer)
    }
  }, [])

  return blinking
}

export default function Mascot({
  size = 40,
  talking = false,
  floating = false,
  interactive = false,
  onBoop,
  className = '',
}) {
  const ref = useRef(null)
  const gaze = useGaze(ref)
  const blinking = useOrganicBlink()

  const [booped, setBooped] = useState(false)
  const boopTimer = useRef(null)

  const [settling, setSettling] = useState(false)
  const wasTalking = useRef(talking)
  const settleTimer = useRef(null)

  useEffect(() => {
    if (wasTalking.current && !talking) {
      setSettling(true)
      clearTimeout(settleTimer.current)
      settleTimer.current = setTimeout(() => setSettling(false), 420)
    }
    wasTalking.current = talking
    return () => clearTimeout(settleTimer.current)
  }, [talking])

  useEffect(() => () => clearTimeout(boopTimer.current), [])

  function handleBoop() {
    setBooped(true)
    clearTimeout(boopTimer.current)
    boopTimer.current = setTimeout(() => setBooped(false), 550)
    onBoop?.()
  }

  const classes = [
    'mascot',
    floating ? 'mascot--floating' : '',
    talking ? 'mascot--talking' : '',
    blinking ? 'mascot--blinking' : '',
    settling ? 'mascot--settle' : '',
    booped ? 'mascot--booped' : '',
    interactive ? 'mascot--interactive' : '',
    className,
  ].filter(Boolean).join(' ')

  const pupilStyle = { transform: `translate(${gaze.x}px, ${gaze.y}px)` }

  const face = (
    <svg viewBox="0 0 64 64" className="mascot__svg">
      <ellipse cx="32" cy="59" rx="15" ry="3" className="mascot__shadow" />

      <line x1="32" y1="14" x2="32" y2="5" className="mascot__antenna" />
      <circle cx="32" cy="4" r="3.4" className="mascot__blip" />

      <rect x="9" y="14" width="46" height="40" rx="14" className="mascot__body" />

      <rect x="15" y="51" width="9" height="7" rx="3" className="mascot__foot" />
      <rect x="40" y="51" width="9" height="7" rx="3" className="mascot__foot" />

      <g className="mascot__eye">
        <circle cx="22" cy="33" r="4.6" className="mascot__eye-white" />
        <circle cx="22" cy="33" r="2.1" className="mascot__eye-pupil" style={pupilStyle} />
      </g>
      <g className="mascot__eye">
        <circle cx="42" cy="33" r="4.6" className="mascot__eye-white" />
        <circle cx="42" cy="33" r="2.1" className="mascot__eye-pupil" style={pupilStyle} />
      </g>

      <path d="M24 42 Q32 48 40 42" className="mascot__mouth mascot__mouth--idle" />
      <rect x="27" y="40" width="10" height="5" rx="2.5" className="mascot__mouth mascot__mouth--talk" />
      <circle cx="32" cy="44" r="4" className="mascot__mouth mascot__mouth--boop" />
    </svg>
  )

  if (interactive) {
    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        style={{ width: size, height: size }}
        onClick={handleBoop}
        aria-label="Say hi to Bit"
      >
        {face}
      </button>
    )
  }

  return (
    <span ref={ref} className={classes} style={{ width: size, height: size }} aria-hidden="true">
      {face}
    </span>
  )
}