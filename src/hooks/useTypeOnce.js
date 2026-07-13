import { useState, useEffect, useRef } from 'react'

export function useTypeOnce(text, speed = 55, startDelay = 300) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const engine = useRef(0)

  useEffect(() => {
    let timeoutId

    function tick() {
      engine.current += 1
      setCount(engine.current)
      if (engine.current >= text.length) {
        setDone(true)
        return
      }
      timeoutId = setTimeout(tick, speed)
    }

    timeoutId = setTimeout(tick, startDelay)
    return () => clearTimeout(timeoutId)
  }, [text, speed, startDelay])

  return [text.substring(0, count), done]
}
