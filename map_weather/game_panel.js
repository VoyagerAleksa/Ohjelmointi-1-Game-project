window.addEventListener('load', () => {
  injectPanelStyles();
  injectPanelUI();
  refreshGameView();
});

async function getStartGameParams() {
  let playerName = null;
  let difficultyLevel = null;

  try {
    const gameViewRes = await fetch('/api/game_view');
    const gameViewData = await gameViewRes.json();

    if (gameViewData.success && gameViewData.view?.game) {
      playerName = gameViewData.view.game.player_name || null;
      difficultyLevel = gameViewData.view.game.difficulty_level || null;
    }
  } catch (err) {
    console.warn('Could not read /api/game_view for start params:', err);
  }

  try {
    const meRes = await fetch('/api/me');
    const meData = await meRes.json();

    if (meData.success && meData.username && !playerName) {
      playerName = meData.username;
    }
  } catch (err) {
    console.warn('Could not read /api/me for start params:', err);
  }

  return {
    player_name: playerName || 'Guest',
    level: difficultyLevel || 'level2'
  };
}

async function refreshGameView() {
  try {
    const res = await fetch('/api/game_view');
    const data = await res.json();

    const noView = !data.success || !data.view;
    const noQuestion = !noView && (!data.view.panel || !data.view.panel.question);
    const noSetup =
      !noView &&
      data.view.game &&
      !data.view.game.game_started &&
      !data.view.game.setup_stage;

    if (noView || noQuestion || noSetup) {
      await startNewGame();
      return;
    }

    renderGameView(data.view, false);
  } catch (err) {
    console.error('refreshGameView error:', err);
  }
}

async function startNewGame() {
  try {
    const startParams = await getStartGameParams();

    const startRes = await fetch('/api/start_game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(startParams)
    });

    const startData = await startRes.json();

    if (!startData.success || !startData.view) {
      console.error('Failed to start game:', startData);
      return;
    }

    renderGameView(startData.view, true);
  } catch (err) {
    console.error('startNewGame error:', err);
  }
}

function renderGameView(view, clearInput = true) {
  const questionEl = document.getElementById('gp-question');
  const optionsEl = document.getElementById('gp-options');
  const inputEl = document.getElementById('gp-input');

  if (questionEl) {
    questionEl.textContent = view.panel?.question || 'Waiting for question...';
  }

  if (optionsEl) {
    const options = Array.isArray(view.panel?.options) ? view.panel.options : [];

    optionsEl.innerHTML = options.map((opt, idx) => {
      const safeIndex = opt.index ?? (idx + 1);
      const safeLabel = opt.label ?? opt.value ?? 'Unknown option';

      return `
        <div class="gp-option-line">
          <span class="gp-option-index">${safeIndex}.</span>
          <span class="gp-option-label">${escapeHtml(String(safeLabel))}</span>
        </div>
      `;
    }).join('');
  }

  if (inputEl && clearInput) {
    inputEl.value = '';
    inputEl.focus();
  }
}

async function submitNumericAnswer() {
  const input = document.getElementById('gp-input');
  if (!input) return;

  const rawValue = input.value.trim();

  if (!rawValue) {
    console.warn('Empty input');
    input.focus();
    return;
  }

  const numericValue = Number(rawValue);

  if (!Number.isInteger(numericValue) || numericValue < 1) {
    console.warn('Invalid option number:', rawValue);
    input.focus();
    input.select();
    return;
  }

  try {
    const res = await fetch('/api/submit_answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: numericValue })
    });

    const data = await res.json();
    console.log('submit_answer response:', data);

    if (!data.success && !data.view) {
      console.error('Answer failed:', data);
      input.focus();
      input.select();
      return;
    }

    if (data.view) {
      renderGameView(data.view, true);
    }

    if (data.won) {
      try {
        const finishResponse = await fetch('/api/finish_game', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        const finishData = await finishResponse.json();

        if (finishData.success) {
          await fetch('/api/save_score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              player_name: finishData.player_name,
              difficulty_level: finishData.difficulty_level,
              score: finishData.score
            })
          });
        }
      } catch (e) {
        console.error('finish/save score error:', e);
      }

      window.location.href = data.victory_url || '/victory/victory.html';
      return;
    }
  } catch (err) {
    console.error('submitNumericAnswer error:', err);
  }
}

async function resetGameSession() {
  try {
    const resetRes = await fetch('/api/reset_game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const resetData = await resetRes.json();

    if (!resetData.success) {
      console.error('Failed to reset game:', resetData);
      return;
    }

    await startNewGame();
  } catch (err) {
    console.error('resetGameSession error:', err);
  }
}

function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function injectPanelUI() {
  const existing = document.getElementById('game-panel');
  if (existing) existing.remove();

  const div = document.createElement('div');
  div.id = 'game-panel';
  div.innerHTML = `
    <div class="gp-main-block">
      <div class="gp-question-block">
        <div class="gp-question" id="gp-question">Loading...</div>
        <div id="gp-options" class="gp-options-list"></div>
      </div>
    </div>

    <div class="gp-input-row">
      <input
        id="gp-input"
        class="gp-input"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        placeholder="Type option number..."
      >
      <button id="gp-submit" class="gp-submit" type="button">→</button>
    </div>
  `;

  document.body.appendChild(div);

  const input = document.getElementById('gp-input');
  const submit = document.getElementById('gp-submit');

  if (input) {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitNumericAnswer();
      }
    });
  }

  if (submit) {
    submit.addEventListener('click', (event) => {
      event.preventDefault();
      submitNumericAnswer();
    });
  }
}

function injectPanelStyles() {
  const existing = document.getElementById('game-panel-inline-style');
  if (existing) existing.remove();

  const s = document.createElement('style');
  s.id = 'game-panel-inline-style';
  s.textContent = `
    #game-panel {
      position: fixed;
      right: 0;
      bottom: 2rem;
      z-index: 9998;
      width: 14.5%;
      height: 61.5%;
      margin: 0;
      padding: 8px 0 8px 14px;
      background: transparent;
      border: none;
      border-radius: 0;
      box-shadow: none;
      backdrop-filter: none;
      font-family: 'Segoe UI', system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      gap: 0.5%;
      overflow: hidden;
    }

    .gp-main-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      min-height: 0;
    }

    .gp-question-block {
      background: #0d1e35;
      border: 1px solid #1e4070;
      border-right: none;
      border-radius: 8px 0 0 8px;
      padding: 10px 12px 10px 12px;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .gp-question {
      font-size: 15px;
      font-weight: 600;
      color: #e8f4ff;
      line-height: 1.45;
      margin-bottom: 5px;
      flex-shrink: 0;
      padding-right: 4px;
    }

    .gp-options-list {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      column-count: 2;
      column-gap: 10px;
      column-fill: auto;
      padding: 1px 2px 1px 0;
      font-size: 12.5px;
      color: #dcecff;
      scrollbar-width: thin;
      scrollbar-color: #29527a #0d1e35;
    }

    .gp-options-list::-webkit-scrollbar {
      width: 8px;
    }

    .gp-options-list::-webkit-scrollbar-track {
      background: #0d1e35;
    }

    .gp-options-list::-webkit-scrollbar-thumb {
      background: #29527a;
      border-radius: 8px;
    }

    .gp-option-line {
      break-inside: avoid;
      margin-bottom: 2px;
      line-height: 1.2;
      word-break: break-word;
    }

    .gp-option-index {
      color: #4db8ff;
      font-weight: 700;
      margin-right: 3px;
    }

    .gp-option-label {
      color: #dcecff;
    }

    .gp-input-row {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
      padding-right: 0;
    }

    .gp-input {
      flex: 1;
      min-width: 0;
      background: #0d1e35;
      border: 1px solid #1e4070;
      border-right: none;
      border-radius: 8px 0 0 8px;
      color: #e8f4ff;
      font-size: 12px;
      padding: 10px 12px;
      outline: none;
      margin-bottom: 7%;
      font-family: inherit;
      transition: border-color 0.2s, background 0.2s;
    }

    .gp-input::placeholder {
      color: #54789d;
    }

    .gp-input:focus {
      border-color: #4db8ff;
      background: #10233c;
    }

    .gp-submit {
      width: 42px;
      flex-shrink: 0;
      background: #4db8ff;
      color: #08111d;
      border: none;
      margin-bottom: 7%;
      border-radius: 8px 0 0 8px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.18s, transform 0.12s;
    }

    .gp-submit:hover {
      background: #7dd3ff;
    }

    .gp-submit:active {
      transform: scale(0.96);
    }

    @media (max-width: 1500px) {
      #game-panel {
        width: 32rem;
      }

      .gp-options-list {
        column-count: 3;
        column-gap: 6px;
      }
    }

    @media (max-width: 1280px) {
      #game-panel {
        width: 28rem;
      }

      .gp-options-list {
        column-count: 2;
        column-gap: 8px;
      }
    }

    @media (max-width: 980px) {
      #game-panel {
        width: 24rem;
        height: calc(100vh - 140px);
      }

      .gp-options-list {
        column-count: 2;
        column-gap: 8px;
      }
    }
  `;
  document.head.appendChild(s);
}