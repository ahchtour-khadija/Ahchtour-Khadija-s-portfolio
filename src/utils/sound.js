const STORAGE_KEY = 'portfolioSoundEnabled';

let audioCtx = null;
let unlockInstalled = false;
let memoryEnabled = null;
let lastPlayName = null;
let lastPlayTime = 0;

function ensureContext() {
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) {
    try {
      audioCtx = new Ctor();
    } catch {
      return null;
    }
  }
  if (audioCtx.state === 'suspended') {
    // Called from user gestures only, so resume is allowed.
    // Resume synchronously within the gesture; catch keeps it optional.
    try {
      const p = audioCtx.resume();
      if (p && p.catch) p.catch(() => {});
    } catch {
      // ignore
    }
  }
  return audioCtx;
}

function tone(ctx, { freq = 600, endFreq = null, duration = 0.09, type = 'triangle', volume = 0.09, delay = 0 }) {
  const startAt = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startAt);
  if (endFreq) {
    osc.frequency.exponentialRampToValueAtTime(endFreq, startAt + duration);
  }
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.03);
}

const PATTERNS = {
  // Cute little pop for generic buttons.
  click: [{ freq: 620, endFreq: 930, duration: 0.09 }],
  // Softer pop for navigation.
  nav: [{ freq: 520, endFreq: 700, duration: 0.08, volume: 0.07 }],
  // Happy rising two-note for modal open.
  open: [
    { freq: 523, duration: 0.09 },
    { freq: 784, duration: 0.12, delay: 0.08 },
  ],
  // Gentle falling two-note for modal close.
  close: [
    { freq: 587, duration: 0.09 },
    { freq: 392, duration: 0.12, delay: 0.08 },
  ],
  // Playful squeak for the mascot easter egg.
  boop: [{ freq: 700, endFreq: 1250, duration: 0.12 }],
};

export const sound = {
  storageKey: STORAGE_KEY,

  isEnabled() {
    if (memoryEnabled !== null) return memoryEnabled;
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value !== null) return value === '1' || value === 'true';
    } catch {
      // fall through to memory
    }
    return false;
  },

  setEnabled(value) {
    const boolVal = Boolean(value);
    memoryEnabled = boolVal;
    try {
      localStorage.setItem(STORAGE_KEY, boolVal ? '1' : '0');
    } catch {
      // Storage unavailable — keep memory fallback.
    }
  },

  /**
   * Warm up the AudioContext on the first user gesture so later plays
   * never hit browser autoplay blocks. Safe to call multiple times.
   */
  unlock() {
    if (!this.isEnabled()) return;
    try {
      ensureContext();
    } catch {
      // Sounds must never break the site.
    }
  },

  play(name) {
    if (!this.isEnabled()) return;
    // Deduplicate same sound from touch + click for same tap (~350ms)
    const now = Date.now();
    if (name === lastPlayName && now - lastPlayTime < 350) return;
    lastPlayName = name;
    lastPlayTime = now;
    try {
      const ctx = ensureContext();
      if (!ctx) return;
      const pattern = PATTERNS[name];
      if (!pattern) return;
      // If still suspended (iOS needs resume to settle), schedule slightly delayed
      const run = () => pattern.forEach((step) => tone(ctx, step));
      if (ctx.state === 'suspended') {
        // resume already kicked in ensureContext; schedule after microtask
        // but also attempt immediate – suspended tones will still play after resume
        try {
          ctx.resume().then(run).catch(run);
          return;
        } catch {
          run();
          return;
        }
      }
      run();
    } catch {
      // Sounds must never break the site.
    }
  },
};

/**
 * Browsers (especially iOS/Android) block audio until a real user gesture.
 * Prime the AudioContext on the first tap/click/pointer/key interaction
 * (only when the visitor opted into sound). Keeps listening until the
 * context is actually running, so enabling sound later on mobile still
 * unlocks correctly. No autoplay, low volume, no background music.
 */
export function initAudioUnlock() {
  if (unlockInstalled || typeof window === 'undefined') return;
  unlockInstalled = true;

  const events = ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'click', 'keydown'];

  const warmUp = () => {
    // Only attempt when sound is enabled – but keep listeners so a later
    // enable + next tap can still unlock on mobile.
    if (!sound.isEnabled()) return;
    try {
      const ctx = ensureContext();
      // If already running, we can stop listening.
      if (ctx && ctx.state === 'running') {
        events.forEach((evt) => window.removeEventListener(evt, warmUp));
      } else if (ctx && ctx.state === 'suspended') {
        // resume() was already kicked inside ensureContext(); keep listeners
        // for the next gesture in case the browser still blocks.
      }
    } catch {
      // ignore
    }
  };

  // Use passive for touch for better scrolling, but still counts as gesture.
  events.forEach((evt) => {
    const opts = evt === 'touchstart' || evt === 'touchend' ? { passive: true } : undefined;
    window.addEventListener(evt, warmUp, opts);
  });
}
