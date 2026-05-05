"use strict";

const STORAGE_KEYS = {
  soundEnabled: "ftb_sound_enabled"
};

const audioSoundHover = new Audio("../audio/button_hover.wav");
const audioSoundClick = new Audio("../audio/button_click.wav");
const audioAmbient = new Audio("../audio/ambient.wav");
const audioGameTheme = new Audio("../audio/game_theme.wav");

audioSoundHover.volume = 0.7;
audioSoundClick.volume = 0.5;
audioAmbient.volume = 0.35;
audioGameTheme.volume = 0.2;

audioAmbient.loop = true;
audioGameTheme.loop = true;

let soundEnabled = sessionStorage.getItem(STORAGE_KEYS.soundEnabled);
soundEnabled = soundEnabled === null ? true : soundEnabled === "true";

function saveSoundState() {
  sessionStorage.setItem(STORAGE_KEYS.soundEnabled, String(soundEnabled));
}

function stopHover() {
  audioSoundHover.pause();
  audioSoundHover.currentTime = 0;
}

function stopClick() {
  audioSoundClick.pause();
  audioSoundClick.currentTime = 0;
}

function stopAmbient() {
  audioAmbient.pause();
  audioAmbient.currentTime = 0;
}

function stopGameTheme() {
  audioGameTheme.pause();
  audioGameTheme.currentTime = 0;
}

function stopMusic() {
  stopAmbient();
  stopGameTheme();
}

function stopAllSounds() {
  stopHover();
  stopClick();
  stopMusic();
}

function playHover() {
  if (!soundEnabled) return;
  audioSoundHover.currentTime = 0;
  audioSoundHover.play().catch(() => {});
}

function playClick() {
  if (!soundEnabled) return;
  audioSoundClick.currentTime = 0;
  audioSoundClick.play().catch(() => {});
}

function playAmbient() {
  if (!soundEnabled) return;
  if (audioAmbient.paused) {
    audioAmbient.play().catch(() => {});
  }
}

function playGameTheme() {
  if (!soundEnabled) return;
  if (audioGameTheme.paused) {
    audioGameTheme.play().catch(() => {});
  }
}

function playMapMusic() {
  if (!soundEnabled) return;
  playAmbient();
  playGameTheme();
}

function setSound(state) {
  soundEnabled = !!state;
  saveSoundState();

  if (!soundEnabled) {
    stopAllSounds();
    return;
  }

  syncSoundToggles();
}

function syncSoundToggles() {
  const soundOn = document.getElementById("sound-on");
  const soundOff = document.getElementById("sound-off");

  if (soundOn && soundOff) {
    soundOn.classList.toggle("active", soundEnabled);
    soundOff.classList.toggle("active", !soundEnabled);
  }
}

function bindInteractiveSounds() {
  const selector = [
    "button",
    "[role='button']",
    "a",
    "input[type='button']",
    "input[type='submit']",
    ".lvl-card",
    ".mbtn",
    ".back-btn",
    ".tog",
    ".auth-tab",
    ".guest-btn",
    ".auth-submit",
    ".logout-cancel",
    ".logout-confirm-btn",
    "#menu-btn"
  ].join(",");

  document.addEventListener("mouseover", (event) => {
    const target = event.target.closest(selector);
    if (!target) return;
    playHover();
  });

  document.addEventListener("mouseout", (event) => {
    const target = event.target.closest(selector);
    if (!target) return;
    stopHover();
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest(selector);
    if (!target) return;
    playClick();
  });
}

window.Sound = {
  playAmbient,
  playGameTheme,
  playMapMusic,
  stopAmbient,
  stopGameTheme,
  stopMusic,
  stopAllSounds,
  setSound,
  syncSoundToggles,
  isEnabled: () => soundEnabled
};

document.addEventListener("DOMContentLoaded", () => {
  bindInteractiveSounds();
  syncSoundToggles();
});