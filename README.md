# 100775883_comp3123_labtest2 — Weather App (COMP3123 Lab Test 2)

This is my submission for COMP3123 — Lab Test 2.

Student ID: 100775883

I built a small React application that fetches current weather data for any city and displays a simple, user-friendly single-card UI with a 5-day forecast summary.

## Project summary
- The app is built with Vite + React and uses the OpenWeatherMap Current Weather API.
- Main components I implemented: `SearchBar` (search by city), `UnitToggle` (Celsius / Fahrenheit), `WeatherCard` (main single-card UI showing current weather and a 5-day forecast).
- The UI shows: location, current temperature, weather condition text, current weather icon, sunrise & sunset times, daylight hours, humidity, wind, pressure, high/low, and a horizontal 5-day forecast.

## Tech stack
- React (function components, `useState`, `useEffect`) via Vite
- Plain CSS for styling (`src/styles.css`)
- OpenWeatherMap API for weather data

## How to run locally
1. Clone the repository and open a terminal in the project root.
2. Install dependencies:

```powershell
npm install
```

3. Add your OpenWeatherMap API key to a local `.env` file (do NOT commit this file). Create `.env` and add:

```
VITE_OPENWEATHER_KEY=YOUR_API_KEY_HERE
```

4. Start the dev server:

```powershell
npm run dev
```

5. Open the local URL shown by Vite (commonly `http://localhost:5173`).

Notes: If you do not provide an API key the app will fall back to locally generated mock forecasts for demonstration.

## API endpoints used
- Current weather: `https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={APIKEY}&units={units}`

## Screenshots and Postman
- I will include screenshots of the running app and Postman responses in the submission `.docx` (the repo contains placeholders for screenshots).

## Deployment / Live demo
- Deployed to Vercel. Live demo URL: **https://100775883-comp3123-labtest2-q56soz8f0-farazs-projects-5ee494a0.vercel.app/**

## Notes, assumptions, and known limitations
- The app expects a valid OpenWeatherMap API key stored in `VITE_OPENWEATHER_KEY`.
- When the API key is missing or rate-limited, the app shows mock forecast data so the UI remains testable.

