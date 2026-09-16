import { useState, useRef } from 'react';
import { sound } from '../utils/sound.js';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(() => sound.isEnabled());
  const [popping, setPopping] = useState(false);
  const lastTapRef = useRef(0);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    sound.setEnabled(next);
    setPopping(true);
    window.setTimeout(() => setPopping(false), 300);
    if (next) {
      sound.unlock();
      sound.play('click');
    } else {
      // Provide subtle tick even when turning off, then state will block next plays
      // No play when disabling to keep toggle quiet off, but global handler would
      // have already played; dedup in sound.play prevents double.
    }
  };

  const handleToggle = (e) => {
    // Use pointer/touch for immediate unlocking on mobile, dedup click
    const now = Date.now();
    if (now - lastTapRef.current < 500) return;
    lastTapRef.current = now;
    if (e.type === 'touchend') e.preventDefault();
    toggle();
  };

  return (
    <button
      type="button"
      className={`sound-toggle ${enabled ? 'on' : ''} ${popping ? 'pop' : ''}`}
      onClick={handleToggle}
      onTouchEnd={handleToggle}
      onPointerUp={handleToggle}
      aria-label="Toggle sound"
      aria-pressed={enabled}
      title={enabled ? 'Sound on' : 'Sound off'}
    >
      {enabled ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5 6 9H2v6h4l5 4V5z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9.4 9.4 0 0 1 0 13" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5 6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
