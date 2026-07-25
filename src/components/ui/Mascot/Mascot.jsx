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
    boopTimer.current = setTimeout(() => setBooped(false), 720)
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
    <svg viewBox="0 0 64 84" className="mascot__svg">
      <path d="M24 53 Q23 65 22 76" className="mascot__leg" />
      <path d="M40 53 Q41 65 42 76" className="mascot__leg" />
      <rect x="12" y="73" width="17" height="9" rx="4.3" className="mascot__shoe" />
      <rect x="35" y="73" width="17" height="9" rx="4.3" className="mascot__shoe" />

      <g className="mascot__arm-left">
        <path d="M17 27 Q8 44 11 53" className="mascot__sleeve" />
        <ellipse cx="11" cy="53" rx="5" ry="5.5" className="mascot__hand" />
        <circle cx="7" cy="50" r="2.1" className="mascot__thumb" />
      </g>

      <path d="M17 27 Q18 24 22 23 H42 Q46 24 47 27 L45 49 Q44 53 40 53 H24 Q20 53 19 49 Z" className="mascot__torso" />
      <path d="M24 42 Q32 46 40 42" className="mascot__pocket" />
      <path d="M20 26 Q19 23 22 22" className="mascot__torso-highlight" />

      <path d="M26 23 L25 32" className="mascot__string" />
      <circle cx="25" cy="33" r="1.3" className="mascot__string-cap" />
      <path d="M38 23 L39 32" className="mascot__string" />
      <circle cx="39" cy="33" r="1.3" className="mascot__string-cap" />

      <g className="mascot__head">
        <circle cx="32" cy="14" r="11" className="mascot__head-shape" />
        <path d="M27 5 Q32 -1 37 5" className="mascot__hood-peak" />
        <path d="M22 10 Q21 6 25 4" className="mascot__head-highlight" />
        <circle cx="22.5" cy="15" r="2.2" className="mascot__ear" />
        <circle cx="41.5" cy="15" r="2.2" className="mascot__ear" />

        <g className="mascot__eye">
          <circle cx="28" cy="14" r="2.7" className="mascot__eye-white" />
          <circle cx="28" cy="14" r="1.3" className="mascot__eye-pupil" style={pupilStyle} />
        </g>
        <g className="mascot__eye">
          <circle cx="36" cy="14" r="2.7" className="mascot__eye-white" />
          <circle cx="36" cy="14" r="1.3" className="mascot__eye-pupil" style={pupilStyle} />
        </g>

        <ellipse cx="23" cy="18.5" rx="2.3" ry="1.6" className="mascot__cheek" />
        <ellipse cx="41" cy="18.5" rx="2.3" ry="1.6" className="mascot__cheek" />

        <path d="M28 19 Q32 22 36 19" className="mascot__mouth mascot__mouth--idle" />
        <rect x="29.5" y="18.5" width="5" height="3" rx="1.5" className="mascot__mouth mascot__mouth--talk" />
        <circle cx="32" cy="20" r="2" className="mascot__mouth mascot__mouth--boop" />
      </g>

      <g className="mascot__arm-right">
        <path d="M47 27 Q51 32 54 40" className="mascot__sleeve" />
        <g className="mascot__forearm-right">
          <path d="M54 40 Q58 47 55 53" className="mascot__sleeve mascot__forearm-sleeve" />
          <ellipse cx="55" cy="53" rx="5" ry="5.5" className="mascot__hand" />
          <circle cx="59" cy="50" r="2.1" className="mascot__thumb" />
        </g>
      </g>
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