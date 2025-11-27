import React from 'react'
import WeatherIcon from './Icon'

// SmallIcon: uses OpenWeather icon code if provided (e.g., '01d'),
// otherwise falls back to our friendly SVG WeatherIcon types.
export default function SmallIcon({ typeOrCode = 'sun', size = 40, alt }) {
  // map friendly types to OpenWeather icon codes (approx)
  const map = {
    sun: '01d',
    cloud: '03d',
    rain: '10d',
    snow: '13d',
    moon: '01n',
    sunrise: '01d',
    wind: '50d'
  }

  const isOWCode = typeof typeOrCode === 'string' && /^[0-9]{2}[dn]$/.test(typeOrCode)
  const code = isOWCode ? typeOrCode : map[typeOrCode] || null

  // normalize a friendly type name for classNames
  const typeName = isOWCode ? (typeOrCode || 'sun') : (typeof typeOrCode === 'string' ? typeOrCode : 'sun')

  const circleStyle = {width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center'}

  if (code) {
    const url = `https://openweathermap.org/img/wn/${code}@2x.png`
    return (
      <div className={`icon-circle icon-${typeName}`} style={circleStyle} role="img" aria-label={alt || typeOrCode}>
        <img src={url} alt={alt || typeOrCode} style={{width: Math.round(size * 0.7), height: Math.round(size * 0.7)}} />
      </div>
    )
  }

  return (
    <div className={`icon-circle icon-${typeName}`} style={circleStyle} role="img" aria-label={alt || typeOrCode}>
      <WeatherIcon type={typeOrCode} size={Math.round(size * 0.7)} title={alt || typeOrCode} />
    </div>
  )
}
