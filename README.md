# 100775883_comp3123_labtest2 — Weather App (COMP3123 Lab Test 2)

Simple React app that fetches current weather from OpenWeatherMap and shows temperature, description, icon and other details.

## What I built
- Vite + React app with a `SearchBar` and `WeatherCard` components.
- Fetches current weather via OpenWeatherMap `weather` endpoint.

## Features added
- Search by city name.
- Unit toggle between Celsius and Fahrenheit (persists selection).
- Use browser geolocation to fetch weather for current location.
- Recent searches (clickable, saved to `localStorage`).
- Expanded weather details: feels like, humidity, pressure, visibility, wind, sunrise/sunset, last updated timestamp.
- Responsive UI and theming with weather icons from OpenWeatherMap.

## Additional notes
- API key is read from `VITE_OPENWEATHER_KEY` in a `.env` file. The repository contains `.env.example`.
- For Postman screenshot requirement you can call the same endpoint used by the app. Example curl:

```bash
curl "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=YOUR_KEY&units=metric"
```

## Setup (local)
1. Install Node.js (v16+ recommended)
2. Clone or copy this project folder to your machine.
3. Copy `.env.example` to `.env` or create `.env.local` and set your API key:

```
VITE_OPENWEATHER_KEY=8582538eb72d4df6ef74e8f488e60b5b
```

4. Install and run:

```powershell
cd "c:/Users/Raz/Desktop/Comp3123 Lab Test 2/100775883_comp3123_labtest2"
npm install
npm run dev
```

Open the dev URL shown by Vite (usually `http://localhost:5173`).

## API used
OpenWeatherMap — Current Weather Data endpoint (https://openweathermap.org/current)

## Notes
- The app reads the key from `VITE_OPENWEATHER_KEY` (Vite env var).
- For submission, ZIP the folder (remove `node_modules`) and include screenshots and Postman/curl responses as the assignment requests.
