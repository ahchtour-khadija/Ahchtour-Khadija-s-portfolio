import { useEffect, useRef } from 'react';
import profileImg from '../assets/profile-img.jpeg';

export default function AboutLens() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return undefined;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // very subtle tilt - keep professional
      targetX = ((e.clientX - cx) / r.width) * 3.2;
      targetY = ((e.clientY - cy) / r.height) * 3.2;
      const tick = () => {
        curX += (targetX - curX) * 0.08;
        curY += (targetY - curY) * 0.08;
        el.style.setProperty('--hx', curX.toFixed(2));
        el.style.setProperty('--hy', curY.toFixed(2));
        if (Math.abs(targetX - curX) > 0.01 || Math.abs(targetY - curY) > 0.01) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = 0;
        }
      };
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onEnter = () => el.classList.add('is-hover');
    const onLeave = () => {
      el.classList.remove('is-hover');
      targetX = 0;
      targetY = 0;
      el.style.setProperty('--hx', '0');
      el.style.setProperty('--hy', '0');
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="about-image-wrapper about-premium">
      <div className="about-premium-backdrop" aria-hidden="true">
        <div className="about-aurora" />
        <div className="about-glass" />
        <div className="about-back-glow" />
        <div className="about-ambient" />
      </div>

      <div className="about-premium-card">
        <div className="about-card-back" aria-hidden="true" />
        <div className="about-card-main">
          <img src={profileImg} alt="Khadija Ahchtour" className="about-image" />
          <span className="about-image-tint" aria-hidden="true" />
          <span className="about-card-glow" aria-hidden="true" />
          <span className="about-card-corners" aria-hidden="true">
            <i className="about-corner about-corner-tl" />
            <i className="about-corner about-corner-tr" />
            <i className="about-corner about-corner-bl" />
            <i className="about-corner about-corner-br" />
          </span>
          <span className="about-sweep" aria-hidden="true" />
        </div>
      </div>

      <div className="about-premium-decor" aria-hidden="true">
        <span className="about-deco about-deco-1">{'{ }'}</span>
        <span className="about-deco about-deco-2">{'</>'}</span>
        <span className="about-dot" />
      </div>

      <span className="about-chip" aria-hidden="true">
        <span className="about-chip-dot" />
        Available for work
      </span>
    </div>
  );
}
