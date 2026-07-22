import { useEffect, useRef } from 'react'
import './ScrollProgress.css'

export default function ScrollProgress() {
  const barRef = useRef(null)
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    function updateTarget() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      targetRef.current = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0
    }

    function tick() {
      const diff = targetRef.current - currentRef.current
      currentRef.current += diff * 0.15
      if (Math.abs(diff) < 0.0003) currentRef.current = targetRef.current
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${currentRef.current})`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    updateTarget()
    currentRef.current = targetRef.current
    if (barRef.current) barRef.current.style.transform = `scaleX(${targetRef.current})`

    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', updateTarget)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', updateTarget)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress__bar" />
    </div>
  )
}