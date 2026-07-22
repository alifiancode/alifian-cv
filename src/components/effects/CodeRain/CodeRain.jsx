import { useEffect, useRef } from 'react'

const CHARS = '0123456789+-*/<>[]{}=;:'.split('')

export default function CodeRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isNarrow = window.innerWidth < 640
    const ctx = canvas.getContext('2d', { alpha: false })
    const fontSize = isNarrow ? 15 : 14
    const frameInterval = isNarrow ? 1000 / 24 : 1000 / 36
    let width, height, columns, drops, speeds, dpr
    let rafId = null
    let running = true
    let lastTime = 0

    function setup() {
      dpr = Math.min(window.devicePixelRatio || 1, isNarrow ? 1.5 : 2)
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.ceil(width / fontSize)
      drops = new Array(columns).fill(0).map(() => Math.random() * -80)
      speeds = new Array(columns).fill(0).map(() => 0.35 + Math.random() * 0.45)
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, width, height)
    }

    function draw(timestamp) {
      if (!running) {
        rafId = null
        return
      }
      rafId = requestAnimationFrame(draw)
      if (timestamp - lastTime < frameInterval) return
      lastTime = timestamp

      ctx.fillStyle = 'rgba(0, 0, 0, 0.09)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      ctx.textBaseline = 'top'

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const y = drops[i] * fontSize
        const isLead = Math.random() > 0.94

        ctx.fillStyle = isLead ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.32)'
        ctx.fillText(char, i * fontSize, y)

        if (y > height && Math.random() > 0.965) {
          drops[i] = Math.random() * -20
        }
        drops[i] += speeds[i]
      }
    }

    const resizeObserver = new ResizeObserver(() => setup())
    resizeObserver.observe(canvas)
    setup()
    rafId = requestAnimationFrame(draw)

    const visObserver = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting
        if (running && rafId === null) {
          lastTime = 0
          rafId = requestAnimationFrame(draw)
        }
      },
      { threshold: 0 }
    )
    visObserver.observe(canvas)

    function handleVisibilityChange() {
      if (document.hidden) {
        running = false
      } else if (canvas.getBoundingClientRect().top < window.innerHeight) {
        running = true
        if (rafId === null) {
          lastTime = 0
          rafId = requestAnimationFrame(draw)
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      running = false
      if (rafId !== null) cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      visObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="code-rain" aria-hidden="true" />
}