import { useState, useEffect } from 'react';
import { skills, skillIcons, skillCategories, categoryIcons } from '../data/skills.jsx';
import PageDecor from '../components/PageDecor.jsx';
import { useInView, useStaggeredInView } from '../hooks/useInView.js';

function SkillBar({ skill, isVisible, delay = 0 }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Reset width when visibility changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWidth(0);
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(skill.proficiency);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.proficiency, delay]);

  const Icon = skillIcons[skill.icon] || skillIcons.database;

  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-icon-wrapper" aria-hidden="true">
          <span className="skill-icon">{Icon}</span>
        </span>
        <div className="skill-info">
          <span className="skill-name">{skill.name}</span>
          <span className="skill-percent" aria-hidden="true">{skill.proficiency}%</span>
        </div>
      </div>
      <div className="skill-progress-track" role="progressbar" aria-valuenow={skill.proficiency} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
        <div
          className="skill-progress-fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function SkillCategory({ category, skills: categorySkills }) {
  const [ref, isVisible] = useInView();
  const [skillsRef, visibleItems] = useStaggeredInView(categorySkills.length);

  const CategoryIcon = categoryIcons[category.key] || categoryIcons.tools;

  return (
    <section
      ref={(el) => {
        ref.current = el;
        skillsRef.current = el;
      }}
      className="skill-category-section"
      aria-labelledby={`category-${category.key}`}
    >
      <div className="category-header">
        <span className="category-icon-wrapper" aria-hidden="true">
          <span className="category-icon">{CategoryIcon}</span>
        </span>
        <h2 id={`category-${category.key}`} className="category-title">
          {category.label}
        </h2>
      </div>
      <div className="skills-list" role="list" aria-label={`${category.label} skills`}>
        {categorySkills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            isVisible={isVisible && visibleItems.has(i)}
            delay={i * 80}
          />
        ))}
      </div>
    </section>
  );
}

export default function SkillsPage() {
  const [ref] = useInView();

  return (
    <div className="page-decor">
      <header className="page-header">
        <PageDecor variant="skills" count={3} />
        <div className="container">
          <p className="page-kicker" aria-hidden="true">{'// my-stack'}</p>
          <h1 className="page-title">Skills</h1>
          <p className="page-description">
            Technologies and tools I work with — proficiency reflects practical experience
          </p>
        </div>
      </header>

      <main>
        <section className="content-section skills-page" ref={ref} aria-labelledby="skills-intro">
          <PageDecor variant="skills" count={2} />
          <div className="container">
            <p id="skills-intro" className="skills-intro">
              These proficiency levels represent my practical working experience with each technology.
              I'm continuously learning and improving across all areas.
            </p>

            <div className="skills-grid">
              {skillCategories.map((category, catIndex) => (
                <SkillCategory
                  key={category.key}
                  category={category}
                  skills={skills[category.key]}
                  index={catIndex}
                />
              ))}
            </div>

            <div className="skills-legend">
              <p><strong>Legend:</strong> Proficiency is self-assessed based on project experience, not formal certification.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}