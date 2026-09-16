import { useRef } from 'react';

export default function ProjectCard({ project, index = 0, onView }) {
  const { title, shortDescription, image, technologies = [] } = project;
  const lastTapRef = useRef(0);
  const touchRef = useRef({ x: 0, y: 0, t: 0 });

  const isCoarse = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const handleTouchStart = (e) => {
    const t = e.touches && e.touches[0];
    if (t) touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };

  const handlePointerDown = (e) => {
    // Track pointer start for tap vs scroll/long-press (covers touch and mouse)
    touchRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
  };

  const isTap = (e) => {
    // For touchend/pointerup, verify small movement and short duration (not scroll/long-press)
    const isTouchEnd = e.type === 'touchend';
    const isPointerUp = e.type === 'pointerup';
    if (isTouchEnd && e.changedTouches && e.changedTouches[0]) {
      const c = e.changedTouches[0];
      const dx = Math.abs(c.clientX - touchRef.current.x);
      const dy = Math.abs(c.clientY - touchRef.current.y);
      const dt = Date.now() - touchRef.current.t;
      if (dx > 10 || dy > 10 || dt > 500 || dt < 0) return false;
    } else if (isPointerUp) {
      const dx = Math.abs(e.clientX - touchRef.current.x);
      const dy = Math.abs(e.clientY - touchRef.current.y);
      const dt = Date.now() - touchRef.current.t;
      // If pointer started recently and moved little, it's a tap
      if (touchRef.current.t !== 0) {
        if (dx > 10 || dy > 10 || dt > 500) return false;
      }
    }
    return true;
  };

  const handleCardView = (e) => {
    const now = Date.now();
    if (now - lastTapRef.current < 500) return;
    // Distinguish tap vs scroll/long-press on touch/pointer
    if ((e.type === 'touchend' || e.type === 'pointerup') && !isTap(e)) return;
    lastTapRef.current = now;
    if (e.type === 'touchend') e.preventDefault();
    onView();
  };

  const handleButtonView = (e) => {
    const now = Date.now();
    if (now - lastTapRef.current < 500) return;
    // For touch/pointer, ensure it's a tap not scroll/long-press
    if ((e.type === 'touchend' || e.type === 'pointerup') && !isTap(e)) return;
    lastTapRef.current = now;
    if (e.type === 'touchend') e.preventDefault();
    e.stopPropagation();
    onView();
  };

  return (
    <article
      className={`card project-card fade-in stagger-${(index % 6) + 1}`}
      tabIndex="0"
      onClick={handleCardView}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleCardView}
      onPointerDown={handlePointerDown}
      onPointerUp={handleCardView}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onView()}
      role="button"
      aria-label={`View ${title} project details`}
    >
      {image && (
        <div className="browser-window">
          <div className="browser-bar" aria-hidden="true">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
          </div>
          <div className="project-card-image">
            <img src={image} alt={`Screenshot of ${title}`} loading="lazy" />
            <span className="project-card-hint" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
              View Project
            </span>
          </div>
        </div>
      )}
      <div className="project-card-content">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{shortDescription}</p>
        {technologies.length > 0 && (
          <div className="project-card-tags" aria-label="Technologies used">
            {technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="project-tag">{tech}</span>
            ))}
            {technologies.length > 4 && (
              <span className="project-tag more-tag">+{technologies.length - 4}</span>
            )}
          </div>
        )}
        <button className="btn btn-primary project-view-btn" onClick={handleButtonView} onTouchStart={handleTouchStart} onTouchEnd={handleButtonView} onPointerDown={handlePointerDown} onPointerUp={handleButtonView}>
          View Project
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </button>
      </div>
    </article>
  );
}
