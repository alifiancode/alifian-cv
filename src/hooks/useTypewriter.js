import { useState, useEffect, useRef } from 'react'

export function useTypewriter(words, typingSpeed = 80, pauseDuration = 2000) {
  const [display, setDisplay] = useState('')
  const engine = useRef({ wordIdx: 0, charIdx: 0, deleting: false })

  useEffect(() => {
    let timeoutId

    function tick() {
      const s = engine.current
      const word = words[s.wordIdx]
      let delay

      if (!s.deleting && s.charIdx < word.length) {
        s.charIdx += 1
        delay = typingSpeed
      } else if (!s.deleting && s.charIdx === word.length) {
        s.deleting = true
        delay = pauseDuration
      } else if (s.deleting && s.charIdx > 0) {
        s.charIdx -= 1
        delay = typingSpeed / 2
      } else {
        s.deleting = false
        s.wordIdx = (s.wordIdx + 1) % words.length
        delay = typingSpeed
      }

      setDisplay(words[s.wordIdx].substring(0, s.charIdx))
      timeoutId = setTimeout(tick, delay)
    }

    timeoutId = setTimeout(tick, typingSpeed)
    return () => clearTimeout(timeoutId)
  }, [words, typingSpeed, pauseDuration])

  return display
}
