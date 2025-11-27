import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import UnitToggle from './components/UnitToggle'
import RecentSearches from './components/RecentSearches'

const API_BASE = 'https://api.openweathermap.org/data/2.5/weather'

export default function App() {
  const [city, setCity] = useState('Toronto')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [units, setUnits] = useState(() => localStorage.getItem('units') || 'metric')
  const [recent, setRecent] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('recent_searches') || '[]')
      // normalize: older entries may be strings
      return Array.isArray(raw) ? raw.map(it => typeof it === 'string' ? { name: it } : it) : []
    } catch { return [] }
  })
  const [hourly, setHourly] = useState([])
  const [daily, setDaily] = useState([])

  useEffect(() => {
    // fetch initial city
    fetchWeather(city, units)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('units', units)
  }, [units])

  async function fetchWeather(q, unit = units) {
    const key = import.meta.env.VITE_OPENWEATHER_KEY
    if (!key) {
      setError('OpenWeather API key is not set. Add it to .env and restart dev server.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}?q=${encodeURIComponent(q)}&appid=${key}&units=${unit}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || 'Failed to fetch')
      }
      const data = await res.json()
      data._fetchedAt = Date.now()
      // Try to fetch One Call data (for UV index, hourly/daily details) using coords
      let oneUsed = false
      try {
        if (data.coord && data.coord.lat != null && data.coord.lon != null) {
          const oneRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,alerts&units=${unit}&appid=${key}`)
          if (oneRes.ok) {
            const one = await oneRes.json()
            // attach uvi if present
            if (one.current && one.current.uvi != null) data.uvi = one.current.uvi

            // build hourly items compatible with HourlyForecast
            if (Array.isArray(one.hourly)) {
              const h = one.hourly.slice(0, 24).map(hh => {
                const d = new Date(hh.dt * 1000)
                const hour = d.getHours()
                const label = hour === 0 ? '12am' : hour < 12 ? `${hour}am` : `${hour===12?12:hour-12}pm`
                return { timeLabel: label, temp: Math.round(hh.temp), owIcon: hh.weather && hh.weather[0] && hh.weather[0].icon, icon: hh.weather && hh.weather[0] && hh.weather[0].main }
              })
              setHourly(h)
              oneUsed = true
            }

            // build daily items compatible with DailyForecast
            if (Array.isArray(one.daily)) {
              const d = one.daily.slice(0,7).map(dd => ({
                day: new Date(dd.dt * 1000).toLocaleDateString(undefined,{weekday:'short'}),
                dt: dd.dt,
                max: Math.round(dd.temp.max),
                min: Math.round(dd.temp.min),
                chance: Math.round((dd.pop || 0) * 100),
                owIcon: dd.weather && dd.weather[0] && dd.weather[0].icon,
                icon: dd.weather && dd.weather[0] && dd.weather[0].main,
                humidity: dd.humidity,
                wind: dd.wind_speed
              }))
              setDaily(d)
              oneUsed = true
            }
          }
        }
      } catch (oneErr) {
        // ignore One Call errors and fall back to mock forecasts below
        console.warn('One Call fetch failed', oneErr)
      }

      setWeather(data)
      setCity(data.name)
      // if One Call didn't provide hourly/daily, generate mock forecasts (respecting the requested units)
      if (!oneUsed) {
        const mocks = makeMockForecasts(data, unit)
        setHourly(mocks.hourly)
        setDaily(mocks.daily)
      }
      // update recent searches (store rich objects: name, country, temp, units, fetchedAt, icon)
      setRecent(prev => {
        const nextItem = {
          name: data.name,
          country: data.sys?.country,
          temp: data.main?.temp != null ? Math.round(data.main.temp) : null,
          units: unit,
          fetchedAt: Date.now(),
          icon: data.weather && data.weather[0] && data.weather[0].icon
        }
        const filtered = prev.filter(s => (s && s.name && s.name.toLowerCase()) !== (nextItem.name && nextItem.name.toLowerCase()))
        const next = [nextItem, ...filtered].slice(0,5)
        localStorage.setItem('recent_searches', JSON.stringify(next))
        return next
      })
    } catch (err) {
      setError(err.message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  function makeMockForecasts(current, unit) {
    // generate 12 hourly samples and 7 daily samples based on current.temp
    const base = current?.main?.temp ?? 20
    // unit-aware threshold for deciding 'sun' vs 'cloud' icons
    const iconThreshold = unit === 'metric' ? 20 : 68
    const hourly = Array.from({length:12}).map((_,i)=>{
      const t = base + Math.round((Math.sin(i/3)*4) + (Math.random()*2-1))
      const now = new Date()
      now.setHours(now.getHours()+i)
      const hour = now.getHours()
      const label = hour === 0 ? '12am' : hour < 12 ? `${hour}am` : `${hour===12?12:hour-12}pm`
      return {timeLabel: label, temp: t, icon: (t > iconThreshold ? 'sun' : 'cloud')}
    })

    const daily = Array.from({length:7}).map((_,i)=>{
      const max = base + 3 + Math.round(Math.random()*6)
      const min = base - 3 + Math.round(Math.random()*4)
      const day = new Date(); day.setDate(day.getDate()+i)
      const dayName = day.toLocaleDateString(undefined,{weekday:'short'})
      return {day: dayName, max, min, chance: Math.round(Math.random()*50), icon: (max > iconThreshold ? 'sun' : 'cloud'), humidity: 50 + Math.round(Math.random()*40), wind: Math.round(2+Math.random()*5)}
    })
    return {hourly, daily}
  }

  function handleUnitChange(u) {
    setUnits(u)
    if (city) fetchWeather(city, u)
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setError('Geolocation not supported by this browser')
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords
      try {
        const key = import.meta.env.VITE_OPENWEATHER_KEY
        const res = await fetch(`${API_BASE}?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`)
        if (!res.ok) throw new Error('Unable to fetch for current location')
        const data = await res.json()
        data._fetchedAt = Date.now()
        setWeather(data)
        setCity(data.name)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, (err) => {
      setLoading(false)
      setError(err.message || 'Unable to obtain location')
    })
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand" aria-hidden>
          <svg viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" aria-hidden preserveAspectRatio="xMidYMid meet">
            <rect width="2048" height="2048" rx="256.001" ry="256.001" fill="#3f51b5" />
            <path fill="#fffffe" d="M639.995 1343.36c1.298-116.25 44.137-207.951 108.904-272.622 73.26-73.152 174.494-111.16 275.227-110.614 101.659.554 202.957 40.173 275.871 113.086 65.35 65.352 108.007 157.017 108.007 270.793-255.908 0-512.15 1.368-768.009-.643zM991.998 928.093V607.997H1056v320.096zM1792 1440H255.999v-64H1792zM672.507 1103.02 457.378 886.502l45.25-45 215.13 216.518zM1324.9 1057.77l220.73-216.519 44.75 45.501-220.73 216.518z"/>
          </svg>
        </div>
        <div className="header-text">
          <h1>Atmos</h1>
          <p className="sub">Fast, simple weather for anywhere.</p>
        </div>
      </header>

      <main>
        <div className="controls">
          <SearchBar onSearch={(q) => fetchWeather(q, units)} initialValue={city} onUseLocation={handleUseLocation} />
          <div className="side-controls">
            <UnitToggle units={units} onChange={handleUnitChange} />
          </div>
        </div>

        {/* Recent searches (click to re-run) */}
        {recent && recent.length > 0 && (
          <div style={{padding: '0 16px'}}>
            <RecentSearches
              recent={recent}
              onSelect={(q) => fetchWeather(q, units)}
              onClear={() => { localStorage.removeItem('recent_searches'); setRecent([]) }}
            />
          </div>
        )}

        {loading && <div className="message"><div className="loader" aria-hidden></div></div>}
        {error && <div className="message error">{error}</div>}

        {weather ? (
          <div className="single-card-area">
            <WeatherCard data={weather} units={units} daily={daily.slice(0,5)} />
          </div>
        ) : (
          <div className="placeholder">Try searching for a city above (example: Toronto, London, Tokyo)</div>
        )}
      </main>

      <footer className="footer">
        <span>Data provided by OpenWeatherMap.</span>
        <span className="credit">Made with ❤️ by Faraz Safdar</span>
      </footer>
    </div>
  )
}
