window.showVictory = function({
  airports = [],
  time = '00:00',
  points = 0,
  flightsCount = 0,
  playerName = 'Guest',
  difficultyLevel = 'level2'
} = {}) {
  injectVictoryStyles();

  const old = document.getElementById('victory-overlay');
  if (old) old.remove();

  const airportListHTML = airports.length
    ? airports.map((airport, i) => {
        const label = typeof airport === 'string'
          ? airport
          : `${airport.icao || '----'} — ${airport.name || 'Unknown airport'}`;
        return `
          <div class="vic-airport-row">
            <span class="vic-airport-num">${i + 1}</span>
            <span class="vic-airport-code">${escapeHtml(label)}</span>
          </div>
        `;
      }).join('')
    : `<div class="vic-empty">No airports recorded</div>`;

  const overlay = document.createElement('div');
  overlay.id = 'victory-overlay';
  overlay.innerHTML = `
    <div class="vic-modal" id="vic-modal">
      <div class="vic-header">
        <div class="vic-title-row">
          <img src="/assets/pepega.jpg" alt="victory" class="vic-avatar">
          <div>
            <div class="vic-title">LUGGAGE FOUND!</div>
            <div class="vic-subtitle">Mission accomplished</div>
          </div>
        </div>
        <button class="vic-close-btn" id="vic-close-btn" title="Close">×</button>
      </div>

      <div class="vic-gif-block">
        <div class="vic-gif-wrap">
          <img src="/assets/giphy.gif" alt="Win animation">
        </div>
        <div class="vic-congrats-text">
          <p>You successfully tracked down the lost luggage across Europe.</p>
          <div class="vic-congrats-small">Final stats from current Flask session</div>
        </div>
      </div>

      <div class="vic-stats-row">
        <div class="vic-stat-card">
          <div class="vic-stat-val vic-stat-points">${Number(points || 0)}</div>
          <div class="vic-stat-lbl">Points</div>
        </div>
        <div class="vic-stat-card">
          <div class="vic-stat-val vic-stat-time">${escapeHtml(String(time || '00:00'))}</div>
          <div class="vic-stat-lbl">Time</div>
        </div>
        <div class="vic-stat-card">
          <div class="vic-stat-val vic-stat-flights">${Number(flightsCount || 0)}</div>
          <div class="vic-stat-lbl">Flights</div>
        </div>
      </div>

      <div class="vic-section">
        <div class="vic-section-title">Visited airports</div>
        <div class="vic-airport-list">${airportListHTML}</div>
      </div>

      <div class="vic-buttons">
        <button class="vic-btn vic-btn-new" id="vic-newgame-btn">New game</button>
        <button class="vic-btn vic-btn-route" id="vic-route-btn">Show route</button>
        <button class="vic-btn vic-btn-leaders" id="vic-leaderboard-btn">Leaderboard</button>
        <button class="vic-btn vic-btn-close" id="vic-main-btn">Main menu</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('vic-close-btn')?.addEventListener('click', closeVictoryToMain);
  document.getElementById('vic-main-btn')?.addEventListener('click', closeVictoryToMain);
  document.getElementById('vic-route-btn')?.addEventListener('click', onShowRoute);
  document.getElementById('vic-leaderboard-btn')?.addEventListener('click', onShowLeaderboard);
  document.getElementById('vic-newgame-btn')?.addEventListener('click', () => {
    startNewGameFromVictory(playerName, difficultyLevel);
  });

  requestAnimationFrame(() => overlay.classList.add('vic-show'));
};

async function startNewGameFromVictory(playerName = 'Guest', difficultyLevel = 'level2') {
  try {
    const newGameBtn = document.getElementById('vic-newgame-btn');
    if (newGameBtn) {
      newGameBtn.disabled = true;
      newGameBtn.textContent = 'Starting...';
    }

    await fetch('/api/reset_game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const startResponse = await fetch('/api/start_game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        player_name: playerName,
        level: difficultyLevel
      })
    });

    const startData = await startResponse.json();

    if (!startData.success) {
      showVictoryError(startData.error || 'Failed to start new game');
      return;
    }

    const overlay = document.getElementById('victory-overlay');
    if (overlay) overlay.remove();

    if (typeof window.applyGameView === 'function' && startData.view) {
      window.applyGameView(startData.view);
    }

    if (typeof go === 'function') {
      go('screen-game');
    } else {
      window.location.href = '/index.html';
    }
  } catch (error) {
    console.error('startNewGameFromVictory error:', error);
    showVictoryError('Failed to start new game');
  }
}

function closeVictoryToMain() {
  const overlay = document.getElementById('victory-overlay');
  if (!overlay) {
    fallbackMainMenu();
    return;
  }

  overlay.classList.remove('vic-show');
  overlay.classList.add('vic-hide');

  setTimeout(() => {
    overlay.remove();
    fallbackMainMenu();
  }, 350);
}

function onShowRoute() {
  const routeBtn = document.getElementById('showroute');
  if (routeBtn) routeBtn.click();
}

function onShowLeaderboard() {
  const overlay = document.getElementById('victory-overlay');
  if (overlay) {
    overlay.classList.remove('vic-show');
    overlay.classList.add('vic-hide');
  }

  setTimeout(() => {
    if (overlay) overlay.remove();
    if (typeof go === 'function') {
      go('screen-leaderboard');
    } else {
      window.location.href = '/index.html';
    }
  }, 350);
}

function fallbackMainMenu() {
  if (typeof go === 'function') {
    go('screen-main');
  } else {
    window.location.href = '/index.html';
  }
}

function showVictoryError(message) {
  const old = document.getElementById('victory-overlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.id = 'victory-overlay';
  overlay.className = 'vic-show';
  overlay.innerHTML = `
    <div class="vic-modal">
      <div class="vic-header">
        <div class="vic-title-row">
          <div>
            <div class="vic-title">VICTORY ERROR</div>
            <div class="vic-subtitle">Could not complete action</div>
          </div>
        </div>
      </div>
      <div class="vic-section">
        <div class="vic-empty">${escapeHtml(String(message))}</div>
      </div>
      <div class="vic-buttons">
        <button class="vic-btn vic-btn-close" id="vic-error-main-btn">Main menu</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('vic-error-main-btn')?.addEventListener('click', closeVictoryToMain);
}

function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function injectVictoryStyles() {
  if (document.getElementById('vic-styles')) return;

  const s = document.createElement('style');
  s.id = 'vic-styles';
  s.textContent = `
    #victory-overlay {
      position: fixed;
      inset: 0;
      z-index: 20000;
      background: rgba(4, 10, 22, 0.82);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      transition: opacity 0.35s ease;
      font-family: Segoe UI, system-ui, sans-serif;
    }
    #victory-overlay.vic-show { opacity: 1; }
    #victory-overlay.vic-hide { opacity: 0; }

    .vic-modal {
      background: #07101e;
      border: 1px solid #1e4070;
      border-radius: 18px;
      width: 100%;
      max-width: 480px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(77,184,255,0.13);
      transform: translateY(24px) scale(0.96);
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    #victory-overlay.vic-show .vic-modal { transform: translateY(0) scale(1); }

    .vic-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px 14px;
      border-bottom: 1px solid #1e4070;
    }

    .vic-title-row { display: flex; align-items: center; gap: 12px; }

    .vic-avatar {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: 50%;
      border: 1px solid #1e4070;
      flex-shrink: 0;
    }

    .vic-title {
      font-family: Bebas Neue, Impact, sans-serif;
      font-size: 28px;
      letter-spacing: 3px;
      color: #ffe066;
      line-height: 1;
    }

    .vic-subtitle {
      font-size: 12px;
      color: #3d6a99;
      margin-top: 3px;
      letter-spacing: 0.5px;
    }

    .vic-close-btn {
      background: transparent;
      border: 1px solid #1e4070;
      border-radius: 8px;
      color: #7aaed6;
      font-size: 20px;
      width: 32px;
      height: 32px;
      cursor: pointer;
    }

    .vic-gif-block {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border-bottom: 1px solid #1e4070;
      background: #080f1e;
    }

    .vic-gif-wrap {
      width: 80px;
      height: 80px;
      flex-shrink: 0;
      border-radius: 12px;
      border: 1px solid #1e4070;
      background: #0e2040;
      overflow: hidden;
    }

    .vic-gif-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .vic-congrats-text {
      font-size: 14px;
      color: #a0c4e8;
      line-height: 1.6;
    }

    .vic-congrats-text p {
      margin: 0 0 4px;
    }

    .vic-congrats-small {
      font-size: 12px;
      color: #3d6a99;
    }

    .vic-stats-row {
      display: flex;
      border-bottom: 1px solid #1e4070;
    }

    .vic-stat-card {
      flex: 1;
      text-align: center;
      padding: 14px 8px;
      border-right: 1px solid #1e4070;
    }

    .vic-stat-card:last-child {
      border-right: none;
    }

    .vic-stat-val {
      font-family: Bebas Neue, Impact, sans-serif;
      font-size: 30px;
      letter-spacing: 1px;
      line-height: 1;
    }

    .vic-stat-points { color: #ffe066; }
    .vic-stat-time { color: #4db8ff; }
    .vic-stat-flights { color: #3ddc84; }

    .vic-stat-lbl {
      font-size: 10px;
      color: #3d6a99;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-top: 4px;
    }

    .vic-section {
      padding: 14px 20px;
      border-bottom: 1px solid #1e4070;
    }

    .vic-section-title {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #3d6a99;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .vic-airport-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      max-height: 220px;
      overflow-y: auto;
    }

    .vic-airport-row {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #0d1e35;
      border: 1px solid #1e4070;
      border-radius: 8px;
      padding: 7px 12px;
    }

    .vic-airport-num {
      font-size: 11px;
      color: #3d6a99;
      font-weight: 600;
      width: 18px;
      text-align: center;
      flex-shrink: 0;
    }

    .vic-airport-code {
      font-size: 13px;
      color: #4db8ff;
      font-weight: 600;
      letter-spacing: 0.2px;
    }

    .vic-empty {
      color: #7aaed6;
      font-size: 13px;
      padding: 8px 0;
    }

    .vic-buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px 20px 20px;
    }

    .vic-btn {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid #1e4070;
    }

    .vic-btn-new {
      background: rgba(61,220,132,0.12);
      border-color: rgba(61,220,132,0.3);
      color: #3ddc84;
    }

    .vic-btn-route {
      background: rgba(77,184,255,0.12);
      border-color: rgba(77,184,255,0.3);
      color: #4db8ff;
    }

    .vic-btn-leaders {
      background: rgba(255,215,0,0.1);
      border-color: rgba(255,215,0,0.25);
      color: #ffd700;
    }

    .vic-btn-close {
      background: transparent;
      color: #7aaed6;
    }
  `;
  document.head.appendChild(s);
}