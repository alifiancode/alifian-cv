const ICONS = {
  code: (
    <>
      <polyline points="8 6 2 12 8 18" />
      <polyline points="16 6 22 12 16 18" />
    </>
  ),
  palette: (
    <>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.5-.2-.95-.5-1.3-.3-.35-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.5c2.5 0 4.5-2 4.5-4.5C22 6.5 17.5 2 12 2z" />
      <circle cx="6.5" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  zap: (
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  ),
  'shield-check': (
    <>
      <path d="M12 2.5l7.5 3v6c0 4.8-3.2 8.9-7.5 10-4.3-1.1-7.5-5.2-7.5-10v-6z" />
      <polyline points="8.5 12 11 14.5 15.5 9.5" />
    </>
  ),
  atom: (
    <>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </>
  ),
  python: (
    <>
      <path d="M16.5 4.5c0 2.8-8.5.9-8.5 4.5s10 0 10 5-8.5 4.5-8.5 4.5" />
      <circle cx="17" cy="3.6" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 22 7.5 12 13 2 7.5 12 2" />
      <polyline points="2 13 12 18.5 22 13" />
      <polyline points="2 18 12 23.5 22 18" />
    </>
  ),
  gamepad: (
    <>
      <rect x="2" y="7" width="20" height="11" rx="4" />
      <line x1="6.5" y1="10" x2="6.5" y2="14" />
      <line x1="4.5" y1="12" x2="8.5" y2="12" />
      <circle cx="16" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="13" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="9" x2="9" y2="21" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <circle cx="7" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="7" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <line x1="12" y1="1.5" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22.5" />
      <line x1="1.5" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22.5" y2="12" />
    </>
  ),
  tool: (
    <path d="M14.7 6.3a4 4 0 1 0-5.66 5.66L2 19l3 3 7.03-7.04a4 4 0 0 0 5.67-5.66z" />
  ),
  'map-pin': (
    <>
      <path d="M12 22s7-7.58 7-12A7 7 0 0 0 5 10c0 4.42 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <polyline points="9 13.5 7 22 12 19 17 22 15 13.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z" />
    </>
  ),
  folder: (
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
  ),
  'folder-open': (
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2H8l-2.5 7.5H3V7z M5.5 17L8 9.5h13.5L19 17z" />
  ),
  file: (
    <>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="13 2 13 8 19 8" />
    </>
  ),
  menu: (
    <>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="14" y2="17" />
    </>
  ),
  'chevron-right': (
    <polyline points="9 6 15 12 9 18" />
  ),
  message: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2.5" />
      <path d="M8 17l-1 4 4.5-4" />
    </>
  ),
  mail: (
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </>
  ),
}

export default function Icon({ name, className = '' }) {
  const content = ICONS[name]
  if (!content) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      aria-hidden="true"
    >
      {content}
    </svg>
  )
}