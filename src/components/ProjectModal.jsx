import { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/sound.js';

const BUBBLE_MESSAGES = {
  video: 'No walkthrough yet — ask me for a preview.',
  live: 'Not deployed yet — contact me for a demo.',
  github: "Source code isn't public — contact me for details.",
};

export default function ProjectModal({ project, onClose }) {
  const [bubble, setBubble] = useState(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);
  const dismissTimer = useRef(null);
  const lastCloseRef = useRef(0);

  // State resets per project via key={project.id} on the parent.
  useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(dismissTimer.current);
    };
  }, []);

  if (!project) return null;

  const handleClose = (e) => {
    const now = Date.now();
    if (now - lastCloseRef.current < 500) {
      if (e) e.preventDefault();
      return;
    }
    lastCloseRef.current = now;
    if (e && e.type === 'touchend') e.preventDefault();
    // Play close sound synchronously within the tap/click gesture
    // (iOS blocks audio if delayed via setTimeout outside gesture)
    sound.play('close');
    setClosing(true);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(onClose, 220);
  };

  const showBubble = (key) => {
    clearTimeout(dismissTimer.current);
    setBubble(key);
    // Auto-hide after ~5s
    dismissTimer.current = setTimeout(() => setBubble(null), 5000);
  };

  const handleUnavailable = (key) => (e) => {
    e.preventDefault();
    showBubble(key);
  };

  const renderAction = (key, label, url, { primary = false, icon }) => {
    const available = Boolean(url);
    return (
      <span className="modal-action-wrap">
        {bubble === key && (
          <span className="action-bubble" aria-hidden="true">
            {BUBBLE_MESSAGES[key]}
          </span>
        )}
        {available ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${primary ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setBubble(null)}
          >
            {icon}
            {label}
          </a>
        ) : (
          <button
            type="button"
            className={`btn ${primary ? 'btn-primary' : 'btn-secondary'} btn-muted`}
            onClick={handleUnavailable(key)}
            aria-describedby="project-bubble-announcer"
          >
            {icon}
            {label}
          </button>
        )}
      </span>
    );
  };

  const videoIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  const externalIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );

  const githubIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );

  return (
    <div
      className={`project-modal-overlay ${closing ? 'closing' : ''}`}
      onClick={handleClose}
      onTouchEnd={handleClose}
      onPointerUp={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`project-modal project-modal-stacked ${closing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={handleClose}
          onTouchEnd={handleClose}
          onPointerUp={handleClose}
          aria-label="Close project details"
          autoFocus
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="modal-showcase">
          <div className="browser-window modal-browser">
            <div className="browser-bar" aria-hidden="true">
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span className="browser-url">{project.title}</span>
            </div>
            <div className="modal-image-scroll">
              <img
                src={project.image}
                alt={`Full screenshot of ${project.title}`}
                className="modal-image"
              />
            </div>
          </div>
        </div>
        <div className="modal-info">
          <p className="modal-kicker" aria-hidden="true">
            {'<project />'}
          </p>
          <h2 id="modal-title" className="modal-title">
            {project.title}
          </h2>
          <p className="modal-full-description">{project.fullDescription}</p>
          <div className="modal-tech" aria-label="Technologies used">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>
          {project.designTools && project.designTools.length > 0 && (
            <div className="modal-design" aria-label="Design tools used">
              <span className="modal-design-label">Designed with</span>
              {project.designTools.map((tool) => (
                <span key={tool} className="design-tool-chip">
                  {tool}
                </span>
              ))}
            </div>
          )}
          <span id="project-bubble-announcer" className="visually-hidden" aria-live="polite">
            {bubble ? BUBBLE_MESSAGES[bubble] : ''}
          </span>
          <div className="modal-actions">
            {renderAction('video', 'Video Walkthrough', project.videoUrl, { icon: videoIcon })}
            {renderAction('live', 'Live Demo', project.liveUrl, { primary: true, icon: externalIcon })}
            {renderAction('github', 'Source Code', project.githubUrl, { icon: githubIcon })}
          </div>
        </div>
      </div>
    </div>
  );
}
