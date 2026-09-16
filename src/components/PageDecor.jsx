import { useMemo } from 'react';

function pseudoRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const SYMBOLS = ['{ }', '</>', '01', ';'];

const CHIP_SYMBOLS = {
  about: ['{ }', '01'],
  projects: ['</>', '#'],
  skills: ['=>', ';'],
  contact: ['>_', ';'],
  default: ['{ }', '</>'],
};

export default function PageDecor({ variant = 'default', count = 3 }) {
  const seedMap = { about: 11, projects: 22, skills: 33, contact: 44, default: 7 };
  const seed = seedMap[variant] ?? 7;

  const symbols = useMemo(() => {
    const rand = pseudoRandom(seed + 100);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      text: SYMBOLS[i % SYMBOLS.length],
      left: `${8 + rand() * 84}%`,
      top: `${12 + rand() * 68}%`,
      duration: (8 + rand() * 6).toFixed(2),
      delay: (-rand() * 8).toFixed(2),
    }));
  }, [seed, count]);

  const stars = useMemo(() => {
    const rand = pseudoRandom(seed + 200);
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: `${10 + rand() * 80}%`,
      top: `${15 + rand() * 70}%`,
      size: rand() > 0.5 ? 2 : 3,
      duration: (3 + rand() * 3).toFixed(2),
      delay: (-rand() * 4).toFixed(2),
    }));
  }, [seed]);

  const bubbles = useMemo(() => {
    const rand = pseudoRandom(seed + 300);
    return Array.from({ length: 2 }, (_, i) => ({
      id: i,
      left: `${15 + rand() * 70}%`,
      size: 7 + Math.round(rand() * 8),
      duration: (14 + rand() * 10).toFixed(2),
      delay: (-rand() * 12).toFixed(2),
    }));
  }, [seed]);

  const chips = useMemo(() => {
    const rand = pseudoRandom(seed + 400);
    const pool = CHIP_SYMBOLS[variant] || CHIP_SYMBOLS.default;
    return Array.from({ length: 2 }, (_, i) => ({
      id: i,
      text: pool[i % pool.length],
      // Keep chips near the edges, away from central text
      left: i === 0 ? `${6 + rand() * 12}%` : `${88 - rand() * 14}%`,
      top: `${18 + rand() * 58}%`,
      duration: (6 + rand() * 4).toFixed(2),
      delay: (-rand() * 6).toFixed(2),
    }));
  }, [seed, variant]);

  const mascotSpot = useMemo(() => {
    const rand = pseudoRandom(seed + 500);
    return {
      left: `${78 + rand() * 10}%`,
      top: `${42 + rand() * 28}%`,
      delay: (-rand() * 5).toFixed(2),
      duration: (5 + rand() * 3).toFixed(2),
    };
  }, [seed]);

  return (
    <div className="page-cute-decor" aria-hidden="true">
      <div className="page-cute-stars">
        {stars.map((s) => (
          <span
            key={s.id}
            className="page-cute-star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="page-cute-symbols">
        {symbols.map((s) => (
          <span
            key={s.id}
            className="page-cute-symbol"
            style={{
              left: s.left,
              top: s.top,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          >
            {s.text}
          </span>
        ))}
      </div>
      <div className="page-cute-bubbles">
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="page-cute-bubble"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="page-cute-chips">
        {chips.map((c) => (
          <span
            key={c.id}
            className={`page-cute-chip page-cute-chip-${c.id + 1}`}
            style={{
              left: c.left,
              top: c.top,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          >
            {c.text}
          </span>
        ))}
      </div>
      <span
        className="page-cute-mascot"
        style={{
          left: mascotSpot.left,
          top: mascotSpot.top,
          animationDuration: `${mascotSpot.duration}s`,
          animationDelay: `${mascotSpot.delay}s`,
        }}
      >
        <span className="page-cute-mascot-body" aria-hidden="true">
          <span className="page-cute-mascot-ear page-cute-mascot-ear-left" />
          <span className="page-cute-mascot-ear page-cute-mascot-ear-right" />
          <span className="page-cute-mascot-head">
            <span className="page-cute-mascot-eye page-cute-mascot-eye-left" />
            <span className="page-cute-mascot-eye page-cute-mascot-eye-right" />
          </span>
        </span>
      </span>
    </div>
  );
}
