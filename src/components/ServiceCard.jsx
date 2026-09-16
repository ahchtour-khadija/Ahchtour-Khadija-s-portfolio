export default function ServiceCard({
  title,
  description,
  icon,
  className = '',
}) {
  return (
    <article className={`card service-card ${className}`}>
      {icon && <div className="service-icon" aria-hidden="true">{icon}</div>}
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
    </article>
  );
}