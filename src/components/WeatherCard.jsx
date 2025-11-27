import React from 'react'
import SmallIcon from './SmallIcon'

export default function WeatherCard({ data, units = 'metric', daily = [] }) {
  if (!data) return null

  const { name, sys, weather, main, _fetchedAt } = data
  const w = (weather && weather[0]) || {}
  const iconUrl = w.icon ? `https://openweathermap.org/img/wn/${w.icon}@2x.png` : null

  const dateLabel = new Date().toLocaleDateString(undefined, {weekday: 'long', month: 'short', day: 'numeric'})

  function formatHM(ts) {
    if (!ts) return 'N/A'
    const d = new Date(ts * 1000)
    return d.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit', hour12: true}).toLowerCase()
  }

  function daylightLabel(sunrise, sunset) {
    if (!sunrise || !sunset) return 'N/A'
    const hours = (sunset - sunrise) / 3600
    return `${hours.toFixed(1)} hours`
  }

  return (
    <div className="card full current-card simplified-card redesigned">
      <div className="card-left-panel">
        <div className="left-bg">
          <div className="left-top">
            <div className="day-large">{new Date().toLocaleDateString(undefined, {weekday: 'long'})}</div>
            <div className="date-small">{dateLabel}</div>
            <div className="loc">{name}{sys?.country ? `, ${sys.country}` : ''}</div>
          </div>

          <div className="left-center">
            <div className="big-icon">
              {w.icon ? (
                <img src={`https://openweathermap.org/img/wn/${w.icon}@4x.png`} alt={w.description || w.main || 'weather'} />
              ) : (
                <SmallIcon typeOrCode={w.main || 'sun'} size={80} />
              )}
            </div>

            <div className="big-data">
              <div className="big-temp">{main?.temp ? `${Math.round(main.temp)}°${units === 'metric' ? 'C' : 'F'}` : 'N/A'}</div>
              <div className="big-desc">{w.main}{w.description ? ` — ${w.description}` : ''}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-right-panel">
        <div className="info-card">
          <div className="detail-grid compact">
            <div className="detail-item">
              <div className="detail-label">Humidity</div>
              <div className="detail-value">{main?.humidity != null ? `${main.humidity}%` : (daily?.[0]?.humidity != null ? `${daily[0].humidity}%` : 'N/A')}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Wind</div>
              <div className="detail-value">{data?.wind?.speed != null ? `${data.wind.speed} ${units === 'metric' ? 'm/s' : 'mph'}` : (daily?.[0]?.wind != null ? `${daily[0].wind} ${units === 'metric' ? 'm/s' : 'mph'}` : 'N/A')}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Pressure</div>
              <div className="detail-value">{main?.pressure != null ? `${main.pressure} hPa` : 'N/A'}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Sunrise → Sunset</div>
              <div className="detail-value">{formatHM(sys?.sunrise)} → {formatHM(sys?.sunset)}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Daylight</div>
              <div className="detail-value">{daylightLabel(sys?.sunrise, sys?.sunset)}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">High / Low</div>
              <div className="detail-value">{(main?.temp_max != null || daily?.[0]?.max != null) ? `${main?.temp_max != null ? Math.round(main.temp_max) : Math.round(daily[0].max)}° / ${main?.temp_min != null ? Math.round(main.temp_min) : Math.round(daily[0].min)}°` : 'N/A'}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Predictability</div>
              <div className="detail-value">{daily?.[0]?.chance != null ? `${daily[0].chance}%` : (data?.pop != null ? `${Math.round(data.pop*100)}%` : 'N/A')}</div>
            </div>
          </div>

          <div className="five-day">
            <div className="five-day-inner">
              <div className="five-day-list">
                {Array.isArray(daily) && daily.length > 0 ? (
                  daily.map((d, i) => {
                    const dayLabel = d.day || (new Date((d.dt || Date.now()/1000) * 1000).toLocaleDateString(undefined,{weekday:'short'}))
                    const typeOrCode = d.owIcon || d.icon
                    const tempLabel = d.max != null ? Math.round(d.max) : (d.temp != null ? Math.round(d.temp) : null)
                    return (
                      <div className="five-day-item" key={i}>
                        <div className="fd-day">{dayLabel}</div>
                        <div className="fd-icon">{typeOrCode ? <SmallIcon typeOrCode={typeOrCode} size={36} /> : <div className="fd-icon-placeholder" />}</div>
                        <div className="fd-temp">{tempLabel != null ? `${tempLabel}°${units === 'metric' ? 'C' : 'F'}` : '—'}</div>
                      </div>
                    )
                  })
                ) : (
                  <div className="no-forecast">No forecast available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

