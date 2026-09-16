import { useMemo } from 'react';

function pseudoRandom(seed) {
  // Deterministic so server/client markup never disagrees and layout is stable.
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const SYMBOLS = ['{ }', '</>', '>_', '01', ';', '#', '=>', '( )'];

export default function AmbientBackground() {
  const stars = useMemo(() => {
    const rand = pseudoRandom(42);
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(rand() * 100).toFixed(2)}%`,
      top: `${(rand() * 100).toFixed(2)}%`,
      size: rand() > 0.7 ? 3 : 2,
      duration: (3 + rand() * 4).toFixed(2),
      delay: (-rand() * 6).toFixed(2),
    }));
  }, []);

  const bubbles = useMemo(() => {
    const rand = pseudoRandom(1337);
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${(4 + rand() * 92).toFixed(2)}%`,
      size: 6 + Math.round(rand() * 14),
      duration: (16 + rand() * 14).toFixed(2),
      delay: (-rand() * 28).toFixed(2),
    }));
  }, []);

  const symbols = useMemo(() => {
    const rand = pseudoRandom(9001);
    return SYMBOLS.map((text, i) => ({
      text,
      id: i,
      left: `${(6 + rand() * 88).toFixed(2)}%`,
      top: `${(8 + rand() * 84).toFixed(2)}%`,
      duration: (9 + rand() * 8).toFixed(2),
      delay: (-rand() * 12).toFixed(2),
    }));
  }, []);

  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
      <div className="ambient-stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className="ambient-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="ambient-symbols">
        {symbols.map((symbol) => (
          <span
            key={symbol.id}
            className="ambient-symbol"
            style={{
              left: symbol.left,
              top: symbol.top,
              animationDuration: `${symbol.duration}s`,
              animationDelay: `${symbol.delay}s`,
            }}
          >
            {symbol.text}
          </span>
        ))}
      </div>
      <div className="ambient-bubbles">
        {bubbles.map((bubble) => (
          <span
            key={bubble.id}
            className="ambient-bubble"
            style={{
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
