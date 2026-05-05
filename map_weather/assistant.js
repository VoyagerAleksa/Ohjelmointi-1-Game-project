const API_BASE = 'http://127.0.0.1:5000/api';
const REQUIRED_MOVES = 3;

let luggage = null;
let fogCircle = null;
let currentMoves = 0;
let assistantUnlocked = false;
let assistantEnabled = true;
let assistantUsed = false;

window.addEventListener('load', () => {
  injectStyles();
  injectUI();
  refreshAssistantState();
});

async function refreshAssistantState() {
  setFabState('loading');

  try {
    const res = await fetch(`${API_BASE}/game_view`, {
      method: 'GET',
      credentials: 'same-origin'
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'No active game');
    }

    currentMoves = Number(data.view?.game?.moves ?? 0);
    assistantUnlocked = currentMoves >= REQUIRED_MOVES;

    const coords = data.view?.flight?.target_coordinates;

    if (coords && coords.length >= 2) {
      luggage = {
        lat: coords[0],
        lng: coords[1]
      };
    } else {
      luggage = null;
    }

    if (assistantUsed) {
      setFabState('used');
    } else {
      setFabState(assistantUnlocked ? 'ready' : 'locked');
    }
  } catch (err) {
    console.error('[LugAssistant] Failed to load assistant state:', err);
    luggage = null;
    assistantUnlocked = false;
    setFabState('error');
  }

  syncAssistantVisibility();
}

async function showFog() {
  if (!assistantEnabled) return;
  if (typeof map === 'undefined') return;
  if (assistantUsed) return;

  await refreshAssistantState();

  if (assistantUsed) return;
  if (!assistantUnlocked) return;
  if (!luggage) return;

  assistantUsed = true;
  setFabState('used');

  if (fogCircle) {
    fogCircle.remove();
    fogCircle = null;
  }

  fogCircle = L.circle([luggage.lat, luggage.lng], {
    radius: 800 * 1000,
    color: 'transparent',
    fillColor: '#ffe066',
    fillOpacity: 0,
    interactive: false,
  }).addTo(map);

  let op = 0;

  const fadeIn = setInterval(() => {
    op = Math.min(op + 0.03, 0.30);

    if (!fogCircle) {
      clearInterval(fadeIn);
      return;
    }

    fogCircle.setStyle({ fillOpacity: op });

    if (op >= 0.30) {
      clearInterval(fadeIn);
    }
  }, 35);

  setTimeout(() => {
    const fadeOut = setInterval(() => {
      op = Math.max(op - 0.02, 0);

      if (!fogCircle) {
        clearInterval(fadeOut);
        return;
      }

      fogCircle.setStyle({ fillOpacity: op });

      if (op === 0) {
        fogCircle.remove();
        fogCircle = null;
        clearInterval(fadeOut);
      }
    }, 50);
  }, 7000);

  map.flyTo([luggage.lat, luggage.lng], 5, {
    animate: true,
    duration: 1.5
  });
}

function setFabState(state) {
  const fab = document.getElementById('lug-fab');
  if (!fab) return;

  if (state === 'loading') {
    fab.style.opacity = '0.65';
    fab.style.borderColor = '#1e4a7a';
    fab.title = 'Loading...';
    fab.dataset.state = 'loading';
    return;
  }

  if (state === 'locked') {
    fab.style.opacity = '0.45';
    fab.style.borderColor = '#6b7280';
    fab.title = `Assistant unlocks after ${REQUIRED_MOVES} flights. Current: ${currentMoves}`;
    fab.dataset.state = 'locked';
    return;
  }

  if (state === 'used') {
    fab.style.opacity = '0.4';
    fab.style.borderColor = '#6b7280';
    fab.title = 'Assistant already used in this session';
    fab.dataset.state = 'used';
    return;
  }

  if (state === 'error') {
    fab.style.opacity = '0.65';
    fab.style.borderColor = '#ff5c5c';
    fab.title = 'Load error — check console';
    fab.dataset.state = 'error';
    return;
  }

  fab.style.opacity = '1';
  fab.style.borderColor = '#1e4a7a';
  fab.title = 'Show hint zone';
  fab.dataset.state = 'ready';
}

function setAssistantEnabled(enabled) {
  assistantEnabled = !!enabled;
  syncAssistantVisibility();
}

function syncAssistantVisibility() {
  const fab = document.getElementById('lug-fab');
  if (!fab) return;

  fab.style.display = assistantEnabled ? 'flex' : 'none';

  if (!assistantEnabled && fogCircle) {
    fogCircle.remove();
    fogCircle = null;
  }
}

function injectUI() {
  if (document.getElementById('lug-fab')) {
    syncAssistantVisibility();
    return;
  }

  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button id="lug-fab" type="button" title="Show hint zone">
      <img src="/assets/mem_cat.jpg" alt="Assistant" style="width:80px;height:80px;object-fit:cover;border-radius:50%;">
    </button>
  `;

  document.body.appendChild(wrap);

  const fab = document.getElementById('lug-fab');
  fab.addEventListener('click', showFog);

  syncAssistantVisibility();
}

function injectStyles() {
  if (document.getElementById('assistant-style')) return;

  const s = document.createElement('style');
  s.id = 'assistant-style';

  s.textContent = `
    #lug-fab {
      position: fixed;
      left: 24px;
      bottom: 190px;
      z-index: 10001;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #0e2040;
      border: 2px solid #1e4a7a;
      box-shadow: 0 4px 20px rgba(0,0,0,0.45);
      cursor: pointer;
      padding: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, opacity 0.3s;
      outline: none;
    }

    #lug-fab:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 24px rgba(255,224,102,0.35);
      border-color: #ffe066;
    }

    #lug-fab:active {
      transform: scale(0.95);
    }

    #lug-fab[data-state="locked"]:hover,
    #lug-fab[data-state="loading"]:hover,
    #lug-fab[data-state="error"]:hover,
    #lug-fab[data-state="used"]:hover {
      transform: none;
      box-shadow: 0 4px 20px rgba(0,0,0,0.45);
      border-color: inherit;
    }

    @media (max-width: 700px) {
      #lug-fab {
        left: 16px;
        bottom: 132px;
        width: 68px;
        height: 68px;
      }
    }
  `;

  document.head.appendChild(s);
}