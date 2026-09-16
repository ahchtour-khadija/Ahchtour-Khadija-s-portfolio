import { useInView } from '../hooks/useInView.js';

/**
 * Reusable scroll-reveal wrapper using IntersectionObserver.
 * Animates once when entering the viewport (400-700ms via CSS).
 * Respects prefers-reduced-motion through CSS.
 *
 * @param {string} variant - '' | 'left' | 'right'
 * @param {number} delay - stagger delay in ms (0, 80, 160, ...)
 * @param {string} as - element type
 */
export default function Reveal({
  children,
  variant = '',
  delay = 0,
  as: Tag = 'div',
  className = '',
  ...props
}) {
  const [ref, isInView] = useInView({ threshold: 0.12 });

  const variantClass = variant ? `reveal-${variant}` : '';
  const classes = `reveal ${variantClass} ${isInView ? 'visible' : ''} ${className}`.trim();

  return (
    <Tag ref={ref} className={classes} style={{ '--reveal-delay': `${delay}ms` }} {...props}>
      {children}
    </Tag>
  );
}
