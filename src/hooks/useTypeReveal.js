import { useState, useEffect, useRef } from 'react'

export function useTypeReveal(text, active, targetDuration = 1600, minPerChar = 45, maxPerChar = 95) {
  const [count, setCount] = useState(0)
  const engine = useRef(0)

  useEffect(() => {
    if (!active) {
      engine.current = 0
      setCount(0)
      return
    }

    engine.current = 0
    setCount(0)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      engine.current = text.length
      setCount(text.length)
      return
    }

    const perChar = Math.min(Math.max(targetDuration / text.length, minPerChar), maxPerChar)
    let timeoutId

    function tick() {
      engine.current += 1
      setCount(engine.current)
      if (engine.current < text.length) {
        timeoutId = setTimeout(tick, perChar)
      }
    }

    timeoutId = setTimeout(tick, perChar)
    return () => clearTimeout(timeoutId)
  }, [active, text, targetDuration, minPerChar, maxPerChar])

  const done = count >= text.length
  return [text.substring(0, count), done]
}