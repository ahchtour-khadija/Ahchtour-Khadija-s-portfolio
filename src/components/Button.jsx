export default function Button({
  children,
  variant = 'primary',
  size = 'base',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  as: Component = 'button',
  ...props
}) {
  const baseClasses = 'btn';
  const variantClasses = `btn-${variant}`;
  const sizeClasses = size !== 'base' ? `btn-${size}` : '';

  const isLink = Component === 'a';

  return (
    <Component
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim()}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      type={isLink ? undefined : type}
      {...props}
    >
      {loading && (
        <span className="btn-spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4">
              <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        </span>
      )}
      <span className={loading ? 'btn-text-hidden' : ''}>{children}</span>
    </Component>
  );
}