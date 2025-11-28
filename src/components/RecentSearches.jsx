import React from 'react'

export default function RecentSearches({ recent = [], onSelect, onClear }) {
  if (!recent || recent.length === 0) return null

  return (
    <div className="recent" role="region" aria-label="Recent searches">
      <div style={{display:'flex',alignItems:'center',gap:12,width:'100%',padding:'6px 0'}}>
        <div style={{fontWeight:800,color:'var(--muted)',minWidth:70}}>Recent</div>
        <div className="recent-list" style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {recent.map((r, i) => {
            const name = typeof r === 'string' ? r : (r.name || '')
            return (
              <button key={i} type="button" className="recent-item" onClick={() => onSelect && onSelect(name)} title={`Search ${name}`}>
                {name}
              </button>
            )
          })}
        </div>

        {onClear && (
          <div style={{marginLeft:'auto'}}>
            <button type="button" className="recent-item" onClick={onClear} title="Clear recent searches">Clear</button>
          </div>
        )}
      </div>
    </div>
  )
}
