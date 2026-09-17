import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Reveal from '../components/Reveal.jsx';
import PixelCat from '../components/PixelCat.jsx';
import { SiReact, SiJavascript, SiPhp, SiLaravel, SiMongodb } from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';
import profileImg from '../assets/profile-img.jpeg';
import cvFile from '../assets/CV-Ahchtour-Khadija.pdf';

const ROLE_TEXT = 'Full Stack Web Developer';

const services = [
  {
    title: 'Full-Stack Web Development',
    description: 'Complete frontend, backend, API, and database development for structured web applications.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Frontend & UI Development',
    description: 'Responsive interfaces implemented with React, JavaScript, Tailwind CSS, Bootstrap, HTML, and CSS.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'Backend & API Development',
    description: 'Structured backend applications and APIs using Laravel/PHP and Node.js/Express.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Database Design',
    description: 'SQL, MySQL, and MongoDB schemas, relationships, and application data structure.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: 'Application Architecture & Improvement',
    description: 'Application structure, maintainability, performance, and organized development workflows.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2v4" />
        <path d="m8 14 4 4 4-4" />
        <path d="M8 10h8" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
      </svg>
    ),
  },
  {
    title: 'UI Design',
    description: 'Polished, structured, user-friendly interfaces designed with Figma and Canva before implementation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
];

const techIcons = [
  { name: 'React.js', Icon: SiReact },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'PHP', Icon: SiPhp },
  { name: 'Laravel', Icon: SiLaravel },
  { name: 'SQL', Icon: FaDatabase },
  { name: 'MongoDB', Icon: SiMongodb },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedRole, setTypedRole] = useState(() => (prefersReducedMotion() ? ROLE_TEXT : ''));
  const [typingDone, setTypingDone] = useState(() => prefersReducedMotion());
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // One-shot typing reveal for the role line (never loops).
  useEffect(() => {
    if (typingDone) return undefined;
    let interval = null;
    const starter = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        index += 1;
        setTypedRole(ROLE_TEXT.slice(0, index));
        if (index >= ROLE_TEXT.length) {
          clearInterval(interval);
          setTypingDone(true);
        }
      }, 55);
    }, 900);
    return () => {
      clearTimeout(starter);
      if (interval) clearInterval(interval);
    };
  }, [typingDone]);

  // Gentle mouse parallax on the hero (fine pointers only, no reduced motion).
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const apply = (clientX, clientY) => {
      const rect = hero.getBoundingClientRect();
      const px = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const py = ((clientY - rect.top) / rect.height - 0.5) * 2;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.style.setProperty('--px', Math.max(-1, Math.min(1, px)).toFixed(3));
        hero.style.setProperty('--py', Math.max(-1, Math.min(1, py)).toFixed(3));
      });
    };
    const handleMove = (event) => apply(event.clientX, event.clientY);
    const handleLeave = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.style.setProperty('--px', '0');
        hero.style.setProperty('--py', '0');
      });
    };
    hero.addEventListener('mousemove', handleMove);
    hero.addEventListener('mouseleave', handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener('mousemove', handleMove);
      hero.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div className="page-decor">
      <section ref={heroRef} className="hero section" aria-labelledby="hero-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-code" aria-hidden="true">
          {'const developer = {\n  passion: "clean code",\n  focus: "web experiences"\n};'}
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <p className={`hero-greeting ${isVisible ? 'slide-up' : ''}`}>Hi, I&apos;m</p>
              <h1 id="hero-title" className={`hero-name ${isVisible ? 'slide-up stagger-1' : ''}`}>
                Khadija Ahchtour
                <span className="hero-role" aria-label={ROLE_TEXT}>
                  <span aria-hidden="true">{typedRole}</span>
                  <span className={`role-caret ${typingDone ? 'idle' : ''}`} aria-hidden="true" />
                </span>
              </h1>
              <p className={`hero-description ${isVisible ? 'slide-up stagger-2' : ''}`}>
                I build responsive and maintainable web applications, from intuitive user interfaces
                to structured backend systems and databases. I enjoy turning ideas into practical
                digital experiences using modern web technologies.
              </p>
              <div className={`hero-actions ${isVisible ? 'slide-up stagger-3' : ''}`}>
                <Button variant="primary" size="lg" as={Link} to="/about">
                  Learn More About Me
                </Button>
                <Button variant="secondary" size="lg" as="a" href={cvFile} download="Khadija-Ahchtour-CV.pdf">
                  Download CV
                </Button>
                <span className="hero-cat hero-cat--inline" aria-hidden="true">
                  <PixelCat />
                </span>
              </div>
              <div className={`hero-tech ${isVisible ? 'slide-up stagger-4' : ''}`} aria-label="Technologies">
                {techIcons.map(({ name, Icon }, index) => (
                  <span key={name} title={name} className="tech-badge" style={{ animationDelay: `${360 + index * 80}ms` }}>
                    <span className="tech-badge-icon" aria-hidden="true"><Icon size={18} /></span>
                    <span className="tech-badge-label">{name}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-floaties" aria-hidden="true">
                <span className="float-chip float-chip-1">{'{ }'}</span>
                <span className="float-chip float-chip-2">{'</>'}</span>
                <span className="float-chip float-chip-3">{';'}</span>
              </div>
              <div className={`hero-portrait ${isVisible ? 'fade-slide-right stagger-2' : ''}`}>
                <span className="hero-portrait-tag" aria-hidden="true">
                  <span className="dot" />
                  Available for work
                </span>
                <div className="hero-image-frame">
                  <img src={profileImg} alt="Khadija Ahchtour" className="hero-image" />
                </div>
                <div className="hero-terminal" aria-hidden="true">
                  <div className="hero-terminal-bar">
                    <span className="browser-dot" />
                    <span className="browser-dot" />
                    <span className="browser-dot" />
                    <span className="hero-terminal-title">terminal</span>
                  </div>
                  <div className="hero-terminal-body">
                    <p>
                      <span className="term-prompt">&gt; whoami</span>
                    </p>
                    <p className="term-output">Khadija Ahchtour</p>
                    <p>
                      <span className="term-prompt">&gt; role</span>
                    </p>
                    <p className="term-output">Full Stack Web Developer<span className="term-cursor" /></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <Reveal>
            <SectionTitle
              kicker="// what-i-do"
              title="What I Do"
              subtitle="Services I offer to bring your ideas to life"
              id="services-title"
            />
          </Reveal>
          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={(index % 3) * 90}>
                <ServiceCard {...service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="cta-title">
        <div className="container">
          <Reveal>
            <div className="cta-card card">
              <div className="cta-content">
                <span className="cta-eyebrow">{'// let\u2019s-connect'}</span>
                <h2 id="cta-title" className="cta-title">Ready to work together?</h2>
                <p className="cta-description">I&apos;m currently available for freelance projects and full-time opportunities. Let&apos;s build something great.</p>
                <div className="cta-actions">
                  <Button variant="primary" size="lg" as={Link} to="/contacts">
                    Start a Project
                  </Button>
                  <Button variant="ghost" size="lg" as={Link} to="/about">
                    Learn More About Me
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
