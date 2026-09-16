import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Brand from './Brand.jsx';
import SoundToggle from './SoundToggle.jsx';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/contacts', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const lastToggleRef = useRef(0);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const handleNav = () => {
    closeMenu();
  };

  const handleToggle = (e) => {
    const now = Date.now();
    if (now - lastToggleRef.current < 500) return;
    lastToggleRef.current = now;
    if (e && e.type === 'touchend') e.preventDefault();
    toggleMenu();
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="banner">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <div className="navbar-container container">
          <Brand onClick={handleNav} />

          <nav
            id="navbar-menu"
            className={`navbar-nav ${isOpen ? 'open' : ''}`}
            role="navigation"
            aria-label="Main navigation"
          >
            <ul className="navbar-list">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                    onClick={handleNav}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-actions">
            <SoundToggle />
            <button
              className="navbar-toggle"
              onClick={handleToggle}
              onTouchEnd={handleToggle}
              onPointerUp={handleToggle}
              aria-expanded={isOpen}
              aria-controls="navbar-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="hamburger" aria-hidden="true">
                <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
              </span>
            </button>
          </div>
        </div>
      </header>
      <div
        className={`navbar-backdrop ${isOpen ? 'visible' : ''}`}
        aria-hidden="true"
        onClick={closeMenu}
        onTouchEnd={closeMenu}
        onPointerUp={closeMenu}
      />
    </>
  );
}
