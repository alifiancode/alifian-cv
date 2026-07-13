export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function handleSectionLink(id) {
  return (e) => {
    e.preventDefault()
    scrollToSection(id)
  }
}
