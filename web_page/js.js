// ── STARS ──
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

// ── TRANSLATIONS ──
const T = {
  en: {
    gameName: 'Find the Bag!',
    start: 'START',
    continue: 'CONTINUE',
    leaderboard: 'LEADERBOARD',
    gameRules: 'GAME RULES',
    settings: 'SETTINGS',
    exit: 'EXIT',
    chooseLevel: 'CHOOSE LEVEL',
    level1: 'Level 1',
    desc1: 'Large airports only',
    level2: 'Level 2',
    desc2: 'Large and medium airports',
    level3: 'Level 3',
    desc3: 'Large, medium and small',
    easy: 'EASY',
    medium: 'MEDIUM',
    hard: 'HARD',
    sound: 'Sound',
    hints: 'Hints',
    on: 'ON',
    off: 'OFF',
    topPlayers: 'TOP PLAYERS',
    back: '← Back',
    tabLogin: 'LOG IN',
    tabRegister: 'REGISTER',
    labelUsername: 'Username',
    labelPassword: 'Password',
    labelConfirm: 'Confirm Password',
    placeholderUser: 'Your username',
    placeholderPass: 'Min 6 characters',
    placeholderConfirm: 'Repeat password',
    btnLogin: 'LOG IN',
    btnRegister: 'CREATE ACCOUNT',
    btnGuest: 'Continue as Guest',
    or: 'or',
    errRequired: 'This field is required',
    errPassShort: 'Password must be at least 6 characters',
    errPassMatch: 'Passwords do not match',
    welcomeBack: 'WELCOME BACK,',
    welcomeNew: 'WELCOME,',
    preparingMsg: 'Preparing your runway...',
    loggedInAs: 'Logged in',
    logoutTitle: 'LOG OUT?',
    logoutMsg: 'Are you sure you want to log out?<br>Your progress will be saved.',
    cancel: 'CANCEL',
    confirmLogout: 'LOG OUT',
    noScores: 'No scores yet',
    failedLeaderboard: 'Failed to load leaderboard',

    playerLabel: 'Player:',
    difficultyLabel: 'Difficulty Level:',
    scoreLabel: 'Score:',
    difficultyEasy: 'Easy',
    difficultyMedium: 'Medium',
    difficultyHard: 'Hard',
    difficultyUnknown: 'Unknown',

    rulesText:
      `<p>Find the lost suitcase hidden somewhere in Europe. Move between airports, use clues, and track the distance to locate it.</p> <p>You start in your chosen airport. Type the code or name of another airport to fly there. Each flight increases your flight count.</p> <p>After every move, you'll see:</p><br><p> -the distance to the suitcase</p><br> <p>-a hot/cold hint showing whether you're getting closer or farther</p> <br> <p>Choose your level before starting:</p> <ul> <li><strong style="color:#3ddc84">Level 1</strong> uses only major international airports.</li> <li><strong style="color:#ffb347">Level 2</strong> adds regional airports.</li> <li><strong style="color:#ff5c5c">Level 3</strong> includes small and private airfields.</li> </ul> <p>Find the suitcase to win and see your score.<br>Fewer flights mean more points.</p>`
  },

  fi: {
    gameName: 'Löydä laukku!',
    start: 'ALOITA',
    continue: 'JATKA',
    leaderboard: 'TULOSTAULUKKO',
    gameRules: 'PELISÄÄNNÖT',
    settings: 'ASETUKSET',
    exit: 'POISTU',
    chooseLevel: 'VALITSE TASO',
    level1: 'Taso 1',
    desc1: 'Vain suuret lentokentät',
    level2: 'Taso 2',
    desc2: 'Suuret ja keskikokoiset',
    level3: 'Taso 3',
    desc3: 'Kaikki lentokentät',
    easy: 'HELPPO',
    medium: 'KESKI',
    hard: 'VAIKEA',
    sound: 'Ääni',
    hints: 'Vihjeet',
    on: 'PÄÄLLE',
    off: 'POIS',
    topPlayers: 'PARHAAT PELAAJAT',
    back: '← Takaisin',
    tabLogin: 'KIRJAUDU',
    tabRegister: 'REKISTERÖIDY',
    labelUsername: 'Käyttäjänimi',
    labelPassword: 'Salasana',
    labelConfirm: 'Vahvista salasana',
    placeholderUser: 'Käyttäjänimesi',
    placeholderPass: 'Vähintään 6 merkkiä',
    placeholderConfirm: 'Toista salasana',
    btnLogin: 'KIRJAUDU',
    btnRegister: 'LUO TILI',
    btnGuest: 'Jatka vieraana',
    or: 'tai',
    errRequired: 'Tämä kenttä on pakollinen',
    errPassShort: 'Salasanan on oltava vähintään 6 merkkiä',
    errPassMatch: 'Salasanat eivät täsmää',
    welcomeBack: 'TERVETULOA TAKAISIN,',
    welcomeNew: 'TERVETULOA,',
    preparingMsg: 'Valmistellaan kiitotietäsi...',
    loggedInAs: 'Kirjautunut',
    logoutTitle: 'KIRJAUDUTAAN ULOS?',
    logoutMsg: 'Haluatko varmasti kirjautua ulos?<br>Edistymisesi tallennetaan.',
    cancel: 'PERUUTA',
    confirmLogout: 'KIRJAUDU ULOS',
    noScores: 'Ei vielä pisteitä',
    failedLeaderboard: 'Tulostaulukon lataus epäonnistui',

    playerLabel: 'Pelaaja:',
    difficultyLabel: 'Vaikeustaso:',
    scoreLabel: 'Pisteet:',
    difficultyEasy: 'Helppo',
    difficultyMedium: 'Keskitaso',
    difficultyHard: 'Vaikea',
    difficultyUnknown: 'Tuntematon',

    rulesText:
      '<p>Löydä Eurooppaan piilotettu kadonnut matkalaukku. Liiku lentokenttien välillä, käytä vihjeitä ja seuraa etäisyyttä löytääksesi sen.</p> <p>Aloitat valitsemaltasi lentokentältä. Kirjoita toisen lentokentän koodi tai nimi lentääksesi sinne. Jokainen lento kasvattaa lentojen määrääsi.</p> <p>Jokaisen siirron jälkeen näet:</p><br><p> -etäisyyden matkalaukkuun</p><br> <p>- kuuma/kylmä -vihjeen, joka kertoo, lähestytkö vai loittonetko</p> <br> <p>Valitse taso ennen aloittamista:</p> <ul> <li><strong style="color:#3ddc84">Taso 1</strong> käyttää vain suuria kansainvälisiä lentokenttiä.</li> <li><strong style="color:#ffb347">Taso 2</strong> lisää alueellisia lentokenttiä.</li> <li><strong style="color:#ff5c5c">Taso 3</strong> sisältää myös pieniä ja yksityisiä lentokenttiä.</li> </ul> <p>Löydä matkalaukku voittaaksesi ja nähdäksesi pisteesi.<br>Mitä vähemmän lentoja, sitä enemmän pisteitä.</p>'
  }
};

let lang = 'en';
let currentUser = '';
let currentGame = null;
let hintsEnabled = true;

// ── LANGUAGE ──
function setLang(l) {
  lang = l;

  document.querySelectorAll('.lang-btn').forEach((b) => {
    b.classList.toggle('active', b.textContent.trim().toLowerCase() === l);
  });

  document.querySelectorAll('[data-t]').forEach((el) => {
    const key = el.getAttribute('data-t');
    if (T[l][key] !== undefined) el.textContent = T[l][key];
  });

  document.querySelectorAll('[data-t-html]').forEach((el) => {
    const key = el.getAttribute('data-t-html');
    if (T[l][key] !== undefined) el.innerHTML = T[l][key];
  });

  document.querySelectorAll('[data-t-ph]').forEach((el) => {
    const key = el.getAttribute('data-t-ph');
    if (T[l][key] !== undefined) el.placeholder = T[l][key];
  });

  const logoName = document.querySelector('.auth-logo-name');
  if (logoName) logoName.textContent = T[l].gameName;

  const leaderboardScreen = document.getElementById('screen-leaderboard');
  if (leaderboardScreen && leaderboardScreen.classList.contains('active')) {
    loadLeaderboard();
  }
}

// init
setLang('en');

// ── AUTH ──
function switchTab(tab) {
  ['login', 'register'].forEach((t) => {
    document.getElementById('tab-' + t)?.classList.toggle('active', t === tab);
    document.getElementById('panel-' + t)?.classList.toggle('active', t === tab);
  });
  clearErrors();
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach((e) => {
    e.classList.remove('show');
    e.textContent = '';
  });
  document.querySelectorAll('.field-input').forEach((i) => i.classList.remove('error'));
}

function showErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return false;

  el.textContent = msg;
  el.classList.add('show');

  const input = document.getElementById(id.replace('-err', ''));
  if (input) input.classList.add('error');

  return false;
}

function showServerErr(panel, msg) {
  const errId = panel === 'login' ? 'login-pass-err' : 'reg-user-err';
  showErr(errId, msg);
}

// ── LOGIN ──
function doLogin() {
  if (typeof Sound !== 'undefined' && Sound.playAmbient) Sound.playAmbient();
  clearErrors();

  const user = document.getElementById('login-user')?.value.trim() || '';
  const pass = document.getElementById('login-pass')?.value || '';

  let ok = true;
  if (!user) ok = showErr('login-user-err', T[lang].errRequired);
  if (!pass) ok = showErr('login-pass-err', T[lang].errRequired);
  if (!ok) return;

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user, password: pass })
  })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        showSuccess(T[lang].welcomeBack + ' ' + data.username.toUpperCase(), data.username);
      } else {
        showServerErr('login', data.error || 'Login failed');
      }
    })
    .catch(() => showServerErr('login', 'Server error, please try again'));
}

// ── REGISTER ──
function doRegister() {
  clearErrors();
  if (typeof Sound !== 'undefined' && Sound.playAmbient) Sound.playAmbient();

  const user    = document.getElementById('reg-user')?.value.trim() || '';
  const pass    = document.getElementById('reg-pass')?.value || '';
  const confirm = document.getElementById('reg-confirm')?.value || '';

  let ok = true;
  if (!user)               ok = showErr('reg-user-err',    T[lang].errRequired);
  if (!pass)               ok = showErr('reg-pass-err',    T[lang].errRequired);
  else if (pass.length < 6) ok = showErr('reg-pass-err',   T[lang].errPassShort);
  if (!confirm)            ok = showErr('reg-confirm-err', T[lang].errRequired);
  else if (pass !== confirm) ok = showErr('reg-confirm-err', T[lang].errPassMatch);
  if (!ok) return;

  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user, password: pass })
  })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        showSuccess(T[lang].welcomeNew + ' ' + data.username.toUpperCase(), data.username);
      } else {
        if (data.error && data.error.toLowerCase().includes('taken')) {
          showErr('reg-user-err', data.error);
        } else {
          showServerErr('reg', data.error || 'Registration failed');
        }
      }
    })
    .catch(() => showServerErr('reg', 'Server error, please try again'));
}

// ── GUEST ──
function doGuest() {
  if (typeof Sound !== 'undefined' && Sound.playAmbient) Sound.playAmbient();
  const name = lang === 'fi' ? 'VIERAS' : 'GUEST';
  showSuccess((lang === 'fi' ? 'TERVETULOA, ' : 'WELCOME, ') + name, name);
}

function showSuccess(nameMsg, username) {
  currentUser = username || nameMsg.split(' ').pop();

  document.querySelectorAll('.auth-panel').forEach((p) => p.classList.remove('active'));

  const successBlock = document.getElementById('auth-success');
  const successName = document.getElementById('success-name');
  const successMsg = document.getElementById('success-msg');

  if (successName) successName.textContent = nameMsg;
  if (successMsg) successMsg.textContent = T[lang].preparingMsg;
  if (successBlock) successBlock.classList.add('show');

  setTimeout(() => {
    const ov = document.getElementById('auth-overlay');
    if (ov) {
      ov.classList.add('hide');
      setTimeout(() => {
        ov.style.display = 'none';
        const menuUsername = document.getElementById('menu-username');
        if (menuUsername) menuUsername.textContent = currentUser;
      }, 350);
    }
  }, 1600);
}

// ── LOGOUT ──
function showLogout() {
  document.getElementById('logout-overlay')?.classList.add('show');
}

function hideLogout() {
  document.getElementById('logout-overlay')?.classList.remove('show');
}

function doLogout() {
  if (typeof Sound !== 'undefined' && Sound.stopMusic) Sound.stopMusic();

  fetch('/api/logout', { method: 'POST' }).catch(() => {});

  hideLogout();
  currentUser = '';

  ['login-user', 'login-pass', 'reg-user', 'reg-pass', 'reg-confirm'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  clearErrors();

  document.getElementById('auth-success')?.classList.remove('show');
  document.querySelectorAll('.auth-panel').forEach((p) => p.classList.remove('active'));
  document.getElementById('panel-login')?.classList.add('active');

  switchTab('login');

  const ov = document.getElementById('auth-overlay');
  if (ov) {
    ov.style.display = 'flex';
    ov.classList.remove('hide');
    ov.style.animation = 'none';
    void ov.offsetWidth;
    ov.style.animation = 'fadeIn 0.35s ease';
  }

  go('screen-main');
}

// ── АВТОЛОГИН при загрузке страницы ──
(function checkExistingSession() {
  fetch('/api/me')
    .then(r => r.json())
    .then(data => {
      if (data.success && data.username) {
        currentUser = data.username;
        const ov = document.getElementById('auth-overlay');
        if (ov) ov.style.display = 'none';
        const menuUsername = document.getElementById('menu-username');
        if (menuUsername) menuUsername.textContent = currentUser;
      }
    })
    .catch(() => {});
})();

// ── NAVIGATION ──
function go(id) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

// ── GAME ──
async function startGame(level) {
  const levelMap = {
    1: {
      level: 'level1',
      airport_types: ['large_airport']
    },
    2: {
      level: 'level2',
      airport_types: ['large_airport', 'medium_airport']
    },
    3: {
      level: 'level3',
      airport_types: ['large_airport', 'medium_airport', 'small_airport']
    }
  };

  const config = levelMap[level];

  if (!config) {
    alert('Invalid level selected');
    return;
  }

  try {
    if (typeof Sound !== 'undefined' && Sound.playGameTheme) {
      Sound.playGameTheme();
    }

    const startRes = await fetch('/api/start_game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        player_name: currentUser || 'Guest',
        level: config.level,
        airport_types: config.airport_types
      })
    });

    const data = await startRes.json();

    if (!data.success) {
      console.error('Error starting game:', data.error);
      alert(data.error || 'Failed to start game');
      return;
    }

    currentGame = data.view || null;
    window.location.href = '/map.html';
  } catch (error) {
    console.error('startGame error:', error);
    alert('Failed to start game. Please try again.');
  }
}

function updateGameUI(gameData) {
  console.log('Game started:', gameData);
}

function toggle(setting, val) {
  const on = document.getElementById(setting + '-on');
  const off = document.getElementById(setting + '-off');

  if (on) on.classList.toggle('active', val === 'on');
  if (off) off.classList.toggle('active', val === 'off');

  if (setting === 'sound' && typeof Sound !== 'undefined' && Sound.setSound) {
    Sound.setSound(val === 'on');
  }

  if (setting === 'hints') {
    hintsEnabled = val === 'on';
    const fab = document.getElementById('lug-fab');
    if (fab) fab.style.display = hintsEnabled ? 'flex' : 'none';
  }
}

// ── LEADERBOARD HELPERS ──
function getDifficultyLabel(level) {
  if (level === 'level1') return T[lang].difficultyEasy;
  if (level === 'level2') return T[lang].difficultyMedium;
  if (level === 'level3') return T[lang].difficultyHard;
  return T[lang].difficultyUnknown;
}

function getDifficultyClass(level) {
  if (level === 'level1') return 'diff-easy';
  if (level === 'level2') return 'diff-medium';
  if (level === 'level3') return 'diff-hard';
  return '';
}

// ── LEADERBOARD ──
function openLeaderboard(level = '') {
  go('screen-leaderboard');
  loadLeaderboard(level);
}

function loadLeaderboard(level = '') {
  const url = level
    ? `/api/leaderboard?level=${encodeURIComponent(level)}`
    : '/api/leaderboard';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById('leaders-list');
      if (!container) return;

      container.innerHTML = '';

      if (!data.success || !data.leaders || data.leaders.length === 0) {
        container.innerHTML = `
          <div class="leader-row">
            <span class="lname">${T[lang].noScores}</span>
          </div>
        `;
        return;
      }

      data.leaders.forEach((player, index) => {
        const isTop = index < 3;
        const rankClass =
          index === 0 ? 'r1' :
          index === 1 ? 'r2' :
          index === 2 ? 'r3' : 'rn';

        const difficultyLabel = getDifficultyLabel(player.difficulty_level);
        const difficultyClass = getDifficultyClass(player.difficulty_level);

        const row = document.createElement('div');
        row.className = isTop ? 'leader-row top' : 'leader-row';

        row.innerHTML = `
          <span class="rank ${rankClass}">${player.rank}</span>
          <span class="lname">
            <span class="label-text">${T[lang].playerLabel}</span> ${player.player_name}
            <span class="label-text">${T[lang].difficultyLabel}</span>
            <span class="${difficultyClass}">${difficultyLabel}</span>
          </span>
          <span class="lscore">
            <span class="label-text">${T[lang].scoreLabel}</span> ${player.score}
          </span>
        `;

        container.appendChild(row);
      });
    })
    .catch((error) => {
      console.error('Error loading leaderboard:', error);

      const container = document.getElementById('leaders-list');
      if (container) {
        container.innerHTML = `
          <div class="leader-row">
            <span class="lname">${T[lang].failedLeaderboard}</span>
          </div>
        `;
      }
    });
}

function saveScoreToBackend(score, difficultyLevel) {
  fetch('/api/save_score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      player_name: currentUser || 'Guest',
      difficulty_level: difficultyLevel || 'level2',
      score: Number(score)
    })
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        console.error('Save failed:', data.error);
      }
    })
    .catch((error) => {
      console.error('Error saving score:', error);
    });
}
