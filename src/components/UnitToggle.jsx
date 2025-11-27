import React from 'react'

export default function UnitToggle({ units = 'metric', onChange }) {
  return (
    <div className="unit-toggle" role="group" aria-label="units">
      <button className={units === 'metric' ? 'active' : ''} onClick={() => onChange('metric')}>°C</button>
      <button className={units === 'imperial' ? 'active' : ''} onClick={() => onChange('imperial')}>°F</button>
    </div>
  )
}
