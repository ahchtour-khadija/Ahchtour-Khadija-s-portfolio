import { NavLink } from 'react-router-dom';
import Brand from './Brand.jsx';
import PixelCat from './PixelCat.jsx';
import { FaHome, FaUser, FaFolder, FaTools, FaEnvelope } from 'react-icons/fa';

const footerLinks = [
  { path: '/', label: 'Home', icon: <FaHome size={16} aria-hidden="true" /> },
  { path: '/about', label: 'About', icon: <FaUser size={16} aria-hidden="true" /> },
  { path: '/projects', label: 'Projects', icon: <FaFolder size={16} aria-hidden="true" /> },
  { path: '/skills', label: 'Skills', icon: <FaTools size={16} aria-hidden="true" /> },
  { path: '/contacts', label: 'Contact', icon: <FaEnvelope size={16} aria-hidden="true" /> },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/ahchtour-khadija',
    ariaLabel: 'GitHub profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=ahchtourkhadija@gmail.com',
    ariaLabel: 'Send email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
  {
    label: 'Call',
    href: 'tel:+212656835258',
    text: '06 56 83 52 58',
    ariaLabel: 'Call',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/212656835258',
    text: '06 56 83 52 58',
    ariaLabel: 'WhatsApp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.05 4.94A9.82 9.82 0 0 0 12.04 2C6.54 2 2.06 6.47 2.06 11.97c0 1.75.46 3.47 1.34 4.98L2 22l5.19-1.36a9.97 9.97 0 0 0 4.84 1.23h.01c5.5 0 9.98-4.47 9.98-9.97 0-2.67-1.04-5.18-2.92-7.06l-.05-.06Zm-7.01 15.12h-.01a8.17 8.17 0 0 1-4.17-1.14l-.3-.18-3.08.81.82-3-.2-.31a8.15 8.15 0 0 1-1.26-4.36c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.39a8.11 8.11 0 0 1 2.39 5.77c0 4.5-3.66 8.16-8.13 8.16Zm6.59-6.11c-.36-.18-2.14-.98-2.48-1.09-.34-.12-.58-.18-.83.18-.24.36-.95 1.09-1.17 1.31-.21.22-.42.25-.78.08-.36-.18-1.52-.64-2.89-1.72-.98-.81-1.64-1.82-1.83-2.12-.2-.3-.02-.46.15-.62.15-.14.36-.36.53-.54.18-.18.24-.31.36-.52.12-.22.06-.41-.03-.58-.09-.18-.83-2-.91-2.14-.24-.35-.5-.34-.69-.34h-.59c-.2 0-.52.07-.8.35-.27.28-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.21 5.08 4.5.7.32 1.25.5 1.68.64.7.23 1.34.2 1.85.12.57-.09 1.74-.61 1.99-1.38.24-.77.24-1.33.17-1.53-.07-.2-.31-.31-.67-.5Z" />
      </svg>
    ),
  },
  {
    label: 'Location',
    href: null,
    text: 'Agadir, Morocco',
    ariaLabel: 'Location',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s-6-5.373-6-10a6 6 0 1 1 12 0c0 4.627-6 10-6 10z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand className="brand-footer" />
            <p className="footer-description">
              Crafting modern web experiences with clean code and creative solutions.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-links">
              {footerLinks.map(({ path, label, icon }) => (
                <li key={path}>
                  <NavLink to={path} className="footer-link">
                    <span className="footer-nav-icon" aria-hidden="true">{icon}</span>
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-social" aria-label="Social links">
            <h3 className="footer-heading">Connect</h3>
            <ul className="footer-links">
              {socialLinks.map(({ label, href, ariaLabel, icon, text }) => {
                const displayText = text || label;
                const isLink = Boolean(href);
                const isExternal = href && /^https?:\/\//i.test(href);
                return (
                  <li key={label}>
                    {isLink ? (
                      <a
                        href={href}
                        className="footer-link"
                        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        aria-label={ariaLabel}
                      >
                        {icon}
                        {displayText}
                      </a>
                    ) : (
                      <span className="footer-link" aria-label={ariaLabel} role="text">
                        {icon}
                        {displayText}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {currentYear} AK. All rights reserved.</p>
        </div>
        <div className="footer-cat">
          <PixelCat fixedMessage="This portfolio was built with React & Vite." className="footer-mascot" />
        </div>
      </div>
    </footer>
  );
}
