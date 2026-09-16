export default function SectionTitle({ title, subtitle, id, kicker, className = '' }) {
  return (
    <div className={`section-header ${className}`.trim()}>
      {kicker && (
        <p className="section-kicker" aria-hidden="true">
          {kicker}
        </p>
      )}
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
