document.addEventListener('DOMContentLoaded', async () => {
  bindVictoryButtons();
  await loadVictoryData();
});

(function () {
  const c = document.getElementById('stars');
  if (!c) return;

  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 0.5;

    s.style.cssText = `
      left:${Math.random() * 100}vw;
      top:${Math.random() * 100}vh;
      width:${size}px;
      height:${size}px;
      --d:${(Math.random() * 4 + 2).toFixed(1)}s;
      --delay:${(Math.random() * 5).toFixed(1)}s;
      --op:${(Math.random() * 0.6 + 0.1).toFixed(2)};
    `;

    c.appendChild(s);
  }
})();

let victoryDataLoaded = false;
let victoryPlayerName = null;
let victoryDifficultyLevel = null;

async function loadVictoryData() {
  try {
    const response = await fetch('/api/victory_data');
    const data = await response.json();

    if (!data.success) {
      showVictoryError(data.error || 'Could not load session results');
      return;
    }

    victoryPlayerName = data.player_name || null;
    victoryDifficultyLevel = data.difficulty_level || null;
    victoryDataLoaded = true;

    setText('victory-player-name', victoryPlayerName || 'Guest');
    setText('victory-points', String(data.points ?? 0));
    setText('victory-flights', String(data.moves ?? 0));
    setText('victory-time', data.time || '00:00');
  } catch (error) {
    console.error('loadVictoryData error:', error);
    showVictoryError('Could not load session results');
  }
}

function bindVictoryButtons() {
  //const restartBtn = document.getElementById('victory-restart-btn');
  //const leaderboardBtn = document.getElementById('victory-leaderboard-btn');
  const menuBtn = document.getElementById('victory-menu-btn');

  /*if (restartBtn) {
    restartBtn.addEventListener('click', startNewGame);
  }

  if (leaderboardBtn) {
    leaderboardBtn.addEventListener('click', () => {
      window.location.href = '/index.html';
    });
  }*/

  if (menuBtn) {
    menuBtn.addEventListener('click', async () => {
      try {
        await fetch('/api/reset_game', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('reset_game error:', error);
      }

      window.location.href = '/index.html';
    });
  }
}

/*async function startNewGame() {
  try {
    if (!victoryDataLoaded) {
      showVictoryError('Victory data not loaded yet');
      return;
    }

    const playerName = victoryPlayerName || 'Guest';
    const difficultyLevel = victoryDifficultyLevel || 'level2';

    const resetRes = await fetch('/api/reset_game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const resetData = await resetRes.json();

    if (!resetData.success) {
      showVictoryError(resetData.error || 'Could not reset game');
      return;
    }

    const startRes = await fetch('/api/start_game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        player_name: playerName,
        level: difficultyLevel
      })
    });

    const startData = await startRes.json();

    if (!startData.success) {
      showVictoryError(startData.error || 'Could not start new game');
      return;
    }

    window.location.href = '/index.html';
  } catch (error) {
    console.error('startNewGame error:', error);
    showVictoryError('Could not start new game');
  }
}*/

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

function showVictoryError(message) {
  const box = document.getElementById('victory-error-box');
  const text = document.getElementById('victory-error-text');

  if (box && text) {
    text.textContent = message;
    box.hidden = false;
  }
}