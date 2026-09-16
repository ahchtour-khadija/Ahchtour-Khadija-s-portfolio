import { useState, useEffect, useCallback, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import { projects, projectNotice } from '../data/projects.js';
import { sound } from '../utils/sound.js';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'fullstack', label: 'Full Stack' },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const counts = useMemo(() => {
    const result = { all: projects.length };
    for (const { key } of FILTERS) {
      if (key === 'all') continue;
      result[key] = projects.filter((project) => project.type === key).length;
    }
    return result;
  }, []);

  const visibleProjects = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((project) => project.type === filter),
    [filter]
  );

  const activeFilterLabel = FILTERS.find(({ key }) => key === filter)?.label ?? 'All';

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const openProject = (project) => {
    setSelectedProject(project);
    sound.play('open');
  };

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    sound.play('close');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        closeProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, closeProject]);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <p className="page-kicker" aria-hidden="true">{'// selected-work'}</p>
          <h1 className="page-title">My Projects</h1>
          <p className="page-description">A selection of my recent work and side projects</p>
        </div>
      </header>

      <main>
        <section className="content-section projects-intro">
          <div className="container">
            <div className="project-notice" role="note">
              <svg className="notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <div className="notice-content">
                <strong>{projectNotice.title}</strong>
                <p>{projectNotice.message}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section projects-grid-section" aria-labelledby="projects-grid-title">
          <div className="container">
            <div className="project-filters" role="group" aria-label="Filter projects by type">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  className={`filter-chip ${filter === key ? 'active' : ''}`}
                  aria-pressed={filter === key}
                  onClick={() => setFilter(key)}
                >
                  <span className="filter-label">{label}</span>
                  <span className="filter-count" aria-hidden="true">
                    {counts[key]}
                  </span>
                </button>
              ))}
            </div>
            <span className="visually-hidden" aria-live="polite">
              Showing {visibleProjects.length} of {projects.length} projects
            </span>
            <div
              key={filter}
              className="projects-grid projects-grid-animated"
              role="list"
              aria-label="Projects"
            >
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onView={() => openProject(project)}
                />
              ))}
            </div>
            {visibleProjects.length === 0 && (
              <div className="projects-empty" role="status">
                <p className="projects-empty-title">No {activeFilterLabel.toLowerCase()}-only projects available yet.</p>
                <p className="projects-empty-text">
                  Try another filter to explore the available work.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedProject && (
        <ProjectModal key={selectedProject.id} project={selectedProject} onClose={closeProject} />
      )}
    </>
  );
}