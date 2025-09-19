document.addEventListener('DOMContentLoaded', () => {
  const spotlightsContainer = document.getElementById('spotlights-container');

  function updateFooter() {
    const yearEl = document.getElementById('copyright-year');
    const modEl = document.getElementById('last-modified');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modEl) modEl.textContent = document.lastModified;
  }

  function pickRandom(arr, count) {
    const pool = arr.slice();
    const chosen = [];
    count = Math.min(count, pool.length);
    while (chosen.length < count) {
      const idx = Math.floor(Math.random() * pool.length);
      chosen.push(pool.splice(idx, 1)[0]);
    }
    return chosen;
  }

  async function fetchMembersWithFallback() {
    // Try relative first, then absolute fallback to work with different dev server roots
    const paths = ['data/members.json', '/chamber/data/members.json'];
    let lastErr;
    for (const p of paths) {
      try {
        const res = await fetch(p, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${p}`);
        return await res.json();
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr || new Error('Unable to fetch members.json');
  }

  async function loadSpotlights() {
    if (!spotlightsContainer) return;
    try {
      const members = await fetchMembersWithFallback();
      const premium = members.filter(m => Number(m.membershipLevel) >= 2); // 2: Silver, 3: Gold

      // Randomly select 2 or 3
      const count = Math.random() < 0.5 ? 2 : 3;
      const chosen = pickRandom(premium, count);

      spotlightsContainer.innerHTML = '';
      chosen.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        if (member.membershipLevel === 3) card.classList.add('gold-member');
        if (member.membershipLevel === 2) card.classList.add('silver-member');
        card.innerHTML = `
          <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
          <h3>${member.name}</h3>
          ${member.description ? `<p class="description">${member.description}</p>` : ''}
          <p class="address">${member.address}</p>
          <p class="phone">${member.phone}</p>
          <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
          <p class="level">Membership: ${member.membershipLevel === 3 ? 'Gold' : member.membershipLevel === 2 ? 'Silver' : 'Member'}</p>
        `;
        spotlightsContainer.appendChild(card);
      });
    } catch (err) {
      console.error('Error loading spotlights', err);
      spotlightsContainer.innerHTML = `<p class="error">Unable to load spotlights right now. ${err && err.message ? '(' + err.message + ')' : ''}</p>`;
    }
  }

  updateFooter();
  loadSpotlights();
});
