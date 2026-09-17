import { useEffect, useState, useRef, useCallback } from 'react';

const STORAGE_KEY = 'mobile-recommend-dismissed';
const MOBILE_QUERY = '(max-width: 768px)';

export default function MobileRecommendModal() {
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const dismissTimerRef = useRef(null);

  const dismiss = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // sessionStorage unavailable (e.g. private mode) — still close for this render
    }
    // allow exit animation
    clearTimeout(dismissTimerRef.current);
    dismissTimerRef.current = setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
    }, 220);
  }, [isClosing]);

  useEffect(() => {
    return () => clearTimeout(dismissTimerRef.current);
  }, []);

  useEffect(() => {
    // Do not show again in this session
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // ignore
    }

    const mql = window.matchMedia(MOBILE_QUERY);
    if (!mql.matches) return;

    // Small delay so it feels intentional, not jarring on load
    const id = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(id);
  }, []);

  // Focus management, ESC handling, scroll lock while visible
  useEffect(() => {
    if (!visible) return;

    // Focus the CTA button for accessibility
    const focusId = setTimeout(() => closeBtnRef.current?.focus(), 100);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(focusId);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible, dismiss]);

  if (!visible) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) dismiss();
  };

  return (
    <div
      ref={overlayRef}
      className={`mobile-recommend-overlay ${isClosing ? 'closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-recommend-title"
      aria-describedby="mobile-recommend-desc"
      onClick={handleOverlayClick}
    >
      <div className={`mobile-recommend-card ${isClosing ? 'closing' : ''}`} role="document">
        <div className="mobile-recommend-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" width="28" height="28">
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <path d="M8 20h8" strokeLinecap="round" />
            <path d="M12 16v4" strokeLinecap="round" />
            <path d="M2 18h20" strokeLinecap="round" opacity="0.9" />
          </svg>
        </div>

        <p className="mobile-recommend-kicker">Quick note</p>

        <h2 id="mobile-recommend-title" className="mobile-recommend-title">
          For the best experience, we recommend viewing this portfolio on a desktop or laptop.
        </h2>

        <p id="mobile-recommend-desc" className="mobile-recommend-desc">
          Some interactive details and visual effects are designed to be experienced more fully on a larger screen. You can still continue on mobile.
        </p>

        <button
          ref={closeBtnRef}
          type="button"
          className="btn btn-primary mobile-recommend-btn"
          onClick={dismiss}
        >
          Continue on mobile
        </button>
      </div>
    </div>
  );
}
