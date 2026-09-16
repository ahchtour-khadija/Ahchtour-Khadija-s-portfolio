import SectionTitle from '../components/SectionTitle.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import PageDecor from '../components/PageDecor.jsx';
import AboutLens from '../components/AboutLens.jsx';

const aboutServices = [
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
    title: 'UI Design',
    description: 'Polished, structured, user-friendly interfaces designed with Figma and Canva before implementation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
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
];

const techStack = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'PHP', 'Laravel',
  'Node.js', 'Express.js', 'REST APIs', 'SQL', 'MySQL', 'MongoDB', 'Figma', 'Canva', 'Git', 'GitHub'
];

export default function AboutPage() {
  return (
    <div className="page-decor">
      <header className="page-header">
        <PageDecor variant="about" count={3} />
        <div className="container">
          <p className="page-kicker" aria-hidden="true">{'// about-me'}</p>
          <h1 className="page-title">About Me</h1>
          <p className="page-description">Get to know the developer behind the code</p>
        </div>
      </header>

      <main>
        <section className="content-section about-hero">
          <div className="container">
            <div className="about-hero-grid">
              <AboutLens />
              <div className="about-content">
                <h2 className="about-name">Khadija Ahchtour</h2>
                <p className="about-role">Full Stack Web Developer</p>
                <div className="about-text">
                  <p>
                    I’m Khadija Ahchtour, a Full-Stack Web Developer with a two-year background in web development
                    and hands-on professional experience. I build complete web applications from polished interfaces
                    to reliable backend systems, with a strong focus on UI design, structure, performance, and
                    usability. I also enjoy turning ideas into clean visual concepts using tools like Figma and
                    Canva before bringing them to life in code.
                  </p>
                </div>
                <div className="about-tech">
                  <h3 className="about-tech-title">Technologies</h3>
                  <div className="about-tech-list">
                    {techStack.map((tech) => (
                      <span key={tech} className="tech-pill">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section services-section" aria-labelledby="about-services-title">
          <PageDecor variant="about" count={2} />
          <div className="container">
            <SectionTitle title="What I Do" subtitle="Services built on practical experience with modern web technologies" id="about-services-title" />
            <div className="services-grid">
              {aboutServices.map((service, index) => (
                <ServiceCard key={service.title} {...service} className={`fade-in stagger-${(index % 6) + 1}`} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}