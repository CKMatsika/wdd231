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

  async function fetchCurrentWeather(city, countryCode) {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.set('q', `${city},${countryCode}`);
    url.searchParams.set('units', UNITS);
    url.searchParams.set('lang', LANG);
    url.searchParams.set('appid', API_KEY);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Current weather failed: ${res.status}`);
    return res.json();
  }

  async function fetchForecast(city, countryCode) {
    // 5 day / 3 hour forecast
    const url = new URL('https://api.openweathermap.org/data/2.5/forecast');
    url.searchParams.set('q', `${city},${countryCode}`);
    url.searchParams.set('units', UNITS);
    url.searchParams.set('lang', LANG);
    url.searchParams.set('appid', API_KEY);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Forecast failed: ${res.status}`);
    return res.json();
  }

  function formatDay(ts, locale = 'en-US') {
    return new Date(ts * 1000).toLocaleDateString(locale, { weekday: 'short' });
  }

  function renderWeather(current, dailySummaries) {
    // current comes from /weather
    if (tempEl) tempEl.textContent = Math.round(current.main?.temp ?? current.temp ?? 0);
    if (descEl) descEl.textContent = current.weather?.[0]?.description ?? '';

    if (extraEl) {
      const feels = Math.round(current.main?.feels_like ?? current.feels_like ?? 0);
      const hum = current.main?.humidity ?? current.humidity ?? '';
      extraEl.innerHTML = `<div>Feels like: ${feels}°</div><div>Humidity: ${hum}%</div>`;
    }

    if (forecastContainer) {
      forecastContainer.innerHTML = '';
      dailySummaries.forEach(day => {
        const card = document.createElement('div');
        card.className = 'day';
        const max = Math.round(day.max);
        const min = Math.round(day.min);
        const icon = day.icon;
        const alt = day.description || '';
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

  function summarizeForecast(list) {
    // Group by date (local). Pick min/max and representative icon/desc around midday
    const byDate = new Map();
    list.forEach(entry => {
      const date = new Date(entry.dt * 1000);
      const key = date.toLocaleDateString('en-CA'); // YYYY-MM-DD
      const group = byDate.get(key) || [];
      group.push(entry);
      byDate.set(key, group);
    });

    const summaries = [];
    for (const [key, entries] of byDate.entries()) {
      let min = Infinity, max = -Infinity, chosen = entries[0];
      entries.forEach(e => {
        min = Math.min(min, e.main.temp_min);
        max = Math.max(max, e.main.temp_max);
        const hour = new Date(e.dt * 1000).getHours();
        if (Math.abs(hour - 12) < Math.abs(new Date(chosen.dt * 1000).getHours() - 12)) {
          chosen = e;
        }
      });
      summaries.push({
        dt: Math.floor(new Date(key).getTime() / 1000),
        min, max,
        icon: chosen.weather?.[0]?.icon,
        description: chosen.weather?.[0]?.description,
      });
    }

    // We want the next 3 days excluding today
    const todayKey = new Date().toLocaleDateString('en-CA');
    const future = summaries
      .filter(s => new Date(s.dt * 1000).toLocaleDateString('en-CA') !== todayKey)
      .sort((a, b) => a.dt - b.dt)
      .slice(0, 3);
    return future;
  }

  async function init() {
    try {
      if (!API_KEY) {
        if (descEl) descEl.textContent = 'Add your OpenWeather API key in JavaScript/config.js';
        return;
      }
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(CITY, COUNTRY),
        fetchForecast(CITY, COUNTRY),
      ]);
      const daily3 = summarizeForecast(forecast.list || []);
      renderWeather(current, daily3);
    } catch (err) {
      console.error(err);
      if (descEl) descEl.textContent = 'Unable to load weather data';
    }
  }

  init();
});
