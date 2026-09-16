import { Link } from 'react-router-dom';

export default function Brand({ className = '', label = 'AK — Home', onClick, onTouchEnd, onPointerUp }) {
  return (
    <Link
      to="/"
      className={`brand ${className}`.trim()}
      aria-label={label}
      onClick={onClick}
      onTouchEnd={onTouchEnd}
      onPointerUp={onPointerUp}
    >
      <span className="brand-logo" aria-hidden="true">
        <span className="brand-bracket brand-bracket-open">{'<'}</span>
        <span className="brand-letter brand-letter-a">A</span>
        <span className="brand-letter brand-letter-k">K</span>
        <span className="brand-bracket brand-bracket-close">{'/>'}</span>
      </span>
      <span className="brand-tagline">
        <span className="brand-slash" aria-hidden="true">{'//'}</span>
        {' Full Stack Web Developer'}
        <span className="brand-cursor" aria-hidden="true" />
      </span>
    </Link>
  );
}
