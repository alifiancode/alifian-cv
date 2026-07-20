import { useEffect, useState } from 'react'

const OBSERVER_OPTIONS = { rootMargin: '-35% 0px -55% 0px', threshold: 0 }

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }, OBSERVER_OPTIONS)

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return active
}