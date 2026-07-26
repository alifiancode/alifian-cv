import { useState, useEffect } from 'react'

export function useCountUp(target, duration = 1200, start = false, delay = 0) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }

    let raf
    let startTime = null

    function step(timestamp) {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    const delayId = setTimeout(() => {
      raf = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(delayId)
      cancelAnimationFrame(raf)
    }
  }, [start, target, duration, delay])

  return count
}