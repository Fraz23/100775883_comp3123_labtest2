import React from 'react'

// Friendly, simple SVG icons with a circular pastel background
export function WeatherIcon({ type = 'sun', size = 56, title }) {
  const common = { width: size, height: size, viewBox: '0 0 64 64', role: 'img', 'aria-label': title || type }
  const circleStyle = { fill: '#E6F6FF' }
  switch (type) {
    case 'sun':
      return (
        <svg {...common} aria-hidden>
          <circle cx="32" cy="32" r="26" fill="#FFEDD5" />
          <circle cx="32" cy="28" r="10" fill="#FFB020" />
        </svg>
      )
    case 'cloud':
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="30" width="52" height="26" rx="12" fill="#CBD5E1" />
          <path d="M18 36a10 10 0 0116-6 12 12 0 0116 8" fill="#334155" />
        </svg>
      )
    case 'rain':
      return (
        <svg {...common} aria-hidden>
          <circle cx="32" cy="22" r="16" fill="#E0F2FF" />
          <path d="M22 36c2 6 6 8 6 8s4-2 6-8" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M34 36c2 6 6 8 6 8s4-2 6-8" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      )
    case 'snow':
      return (
        <svg {...common} aria-hidden>
          <circle cx="32" cy="22" r="16" fill="#F0F9FF" />
          <g stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24 36l4 4" />
            <path d="M40 36l-4 4" />
            <path d="M32 36v6" />
            <path d="M28 34h8" />
          </g>
        </svg>
      )
    case 'moon':
      return (
        <svg {...common} aria-hidden>
          <circle cx="32" cy="32" r="26" fill="#EDE9FF" />
          <path d="M40 20a14 14 0 11-19 19 10 10 0 0019-19z" fill="#1F2937" />
        </svg>
      )
    case 'sunrise':
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="30" width="52" height="26" rx="12" fill="#FFF7ED" />
          <path d="M10 36h44" stroke="#FDBA74" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="26" r="8" fill="#F59E0B" />
        </svg>
      )
    case 'wind':
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="30" width="52" height="26" rx="12" fill="#F3F4F6" />
          <path d="M12 36h30a6 6 0 100-12" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" fill="none"/>
        </svg>
      )
    default:
      return (
        <svg {...common} aria-hidden>
          <circle cx="32" cy="32" r="26" fill="#E6F6FF" />
        </svg>
      )
  }
}

export default WeatherIcon
