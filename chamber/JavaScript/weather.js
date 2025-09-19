document.addEventListener('DOMContentLoaded', () => {
  const tempEl = document.getElementById('weather-temp');
  const descEl = document.getElementById('weather-desc');
  const extraEl = document.getElementById('weather-extra');
  const forecastContainer = document.getElementById('forecast-container');

  // Expect a global CONFIG from config.js. Provide sensible defaults if missing.
  const cfg = window.CONFIG || {};
  const API_KEY = cfg.OPENWEATHER_API_KEY || '';
  const CITY = cfg.CITY || 'Harare';
  const COUNTRY = cfg.COUNTRY_CODE || 'ZW';
  const UNITS = cfg.UNITS || 'metric'; // 'metric' or 'imperial'
  const LANG = cfg.LANG || 'en';

  async function geocodeCity(city, countryCode) {
    const url = new URL('https://api.openweathermap.org/geo/1.0/direct');
    url.searchParams.set('q', `${city},${countryCode}`);
    url.searchParams.set('limit', '1');
    url.searchParams.set('appid', API_KEY);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);
    const data = await res.json();
    if (!data || !data.length) throw new Error('Location not found');
    return { lat: data[0].lat, lon: data[0].lon };
  }

  async function getOneCall(lat, lon) {
    // One Call API 2.5 still widely available
    const url = new URL('https://api.openweathermap.org/data/2.5/onecall');
    url.searchParams.set('lat', lat);
    url.searchParams.set('lon', lon);
    url.searchParams.set('exclude', 'minutely,hourly,alerts');
    url.searchParams.set('units', UNITS);
    url.searchParams.set('lang', LANG);
    url.searchParams.set('appid', API_KEY);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
    return res.json();
  }

  function formatDay(ts, locale = 'en-US') {
    return new Date(ts * 1000).toLocaleDateString(locale, { weekday: 'short' });
  }

  function renderWeather(current, daily) {
    if (tempEl) tempEl.textContent = Math.round(current.temp);
    if (descEl) descEl.textContent = current.weather?.[0]?.description ?? '';

    if (extraEl) {
      const feels = Math.round(current.feels_like);
      const hum = current.humidity;
      extraEl.innerHTML = `<div>Feels like: ${feels}°</div><div>Humidity: ${hum}%</div>`;
    }

    if (forecastContainer) {
      forecastContainer.innerHTML = '';
      // Next 3 days: daily[1], [2], [3]
      const next3 = daily.slice(1, 4);
      next3.forEach(day => {
        const card = document.createElement('div');
        card.className = 'day';
        const max = Math.round(day.temp.max);
        const min = Math.round(day.temp.min);
        const icon = day.weather?.[0]?.icon;
        const alt = day.weather?.[0]?.description || '';
        const img = icon ? `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${alt}" loading="lazy"/>` : '';
        card.innerHTML = `
          <div class="weekday">${formatDay(day.dt)}</div>
          ${img}
          <div class="hi-lo">${max}° / ${min}°</div>
        `;
        forecastContainer.appendChild(card);
      });
    }
  }

  async function init() {
    try {
      if (!API_KEY) {
        if (descEl) descEl.textContent = 'Add your OpenWeather API key in JavaScript/config.js';
        return;
      }
      const { lat, lon } = await geocodeCity(CITY, COUNTRY);
      const data = await getOneCall(lat, lon);
      renderWeather(data.current, data.daily || []);
    } catch (err) {
      console.error(err);
      if (descEl) descEl.textContent = 'Unable to load weather data';
    }
  }

  init();
});
