import { useState, useRef, useEffect } from 'react';
import { sound } from '../utils/sound.js';

const MESSAGES = [
  'meow == hello',
  'All tests passing.',
  'I approve this commit.',
  'Purr… deploy succeeded.',
];

export default function PixelCat({ className = '', fixedMessage }) {
  const [boops, setBoops] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const timers = useRef([]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
  }, []);

  const lastTapRef = useRef(0);
  const handleBoop = (e) => {
    const now = Date.now();
    if (now - lastTapRef.current < 500) {
      if (e) e.preventDefault();
      return;
    }
    lastTapRef.current = now;
    if (e && e.type === 'touchend') e.preventDefault();
    // For fixedMessage (footer mascot), toggle hide on second tap
    if (fixedMessage && showBubble) {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setShowBubble(false);
      setJumping(false);
      return;
    }
    timers.current.forEach(clearTimeout);
    timers.current = [];
    sound.play('boop');
    if (!fixedMessage) setBoops((count) => count + 1);
    setJumping(true);
    setShowBubble(true);
    timers.current.push(setTimeout(() => setJumping(false), 550));
    timers.current.push(setTimeout(() => setShowBubble(false), 4000));
  };

  const bubbleText = fixedMessage || MESSAGES[(boops - 1 + MESSAGES.length) % MESSAGES.length];

  return (
    <button
      type="button"
      className={`pixel-cat ${jumping ? 'jump' : ''} ${className}`.trim()}
      onClick={handleBoop}
      onTouchEnd={handleBoop}
      onPointerUp={handleBoop}
      aria-label={fixedMessage ? 'About this portfolio' : 'Pet the pixel cat'}
      title={fixedMessage ? 'Click for info' : 'Psst… click me'}
      aria-expanded={showBubble}
      aria-haspopup="dialog"
    >
      {showBubble && (
        <span key={fixedMessage ? 'fixed' : boops} className={`pixel-cat-bubble ${fixedMessage ? 'pixel-cat-bubble--footer' : ''}`} role="status" aria-live="polite">
          {bubbleText}
        </span>
      )}
      <span className="pixel-cat-body" aria-hidden="true">
        <span className="pixel-cat-ear pixel-cat-ear-left" />
        <span className="pixel-cat-ear pixel-cat-ear-right" />
        <span className="pixel-cat-head">
          <span className="pixel-cat-eye pixel-cat-eye-left" />
          <span className="pixel-cat-eye pixel-cat-eye-right" />
          <span className="pixel-cat-nose" />
        </span>
        <span className="pixel-cat-tail" />
      </span>
    </button>
  );
}
