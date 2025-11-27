import React, { useState } from 'react'

export default function SearchBar({ onSearch, initialValue = '', onUseLocation }) {
  const [q, setQ] = useState(initialValue)

  function submit(e) {
    e.preventDefault()
    if (q.trim()) onSearch(q.trim())
  }

  return (
    <form className="search" onSubmit={submit}>
      <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
        <path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="11" cy="11" r="6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>

      <input
        type="text"
        placeholder="Search city or postal code"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="city"
      />

      <button type="button" className="loc-icon" title="Use my location" onClick={() => onUseLocation && onUseLocation()} aria-label="Use my location">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#7c3aed"/>
          <circle cx="12" cy="9" r="2.2" fill="#fff"/>
        </svg>
      </button>

      <button type="submit" className="search-submit" aria-label="search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M21 21l-4.35-4.35" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="11" cy="11" r="6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </form>
  )
}
