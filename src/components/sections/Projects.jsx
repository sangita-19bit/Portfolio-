import { useState, useEffect, useRef } from 'react';
import { projects } from '../../data/projects';
import './Projects.css';

const GRADIENT_STYLES = {
  'gradient-indigo': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #1e1b4b 100%)',
  'gradient-sky':    'linear-gradient(135deg, #0ea5e9 0%, #0284c7 40%, #0c1a2e 100%)',
  'gradient-violet': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 40%, #1e1b4b 100%)',
};

export default function Projects() {
  const [expanded, setExpanded] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleExpand = id => setExpanded(prev => (prev === id ? null : id));

  return (
    <section className="section projects-section" id="projects" ref={sectionRef}>
      <div className="container">

        <div className="projects__header reveal">
          <p className="section-label">Featured Work</p>
          <h2 className="section-title">Projects built with purpose.</h2>
          <p className="section-subtitle">
            Real applications I've designed and developed — each with a clear problem, deliberate approach, and working outcome.
          </p>
        </div>

        <div className="projects__list">
          {projects.map((project, i) => {
            const isOpen = expanded === project.id;
            return (
              <article
                key={project.id}
                className={`project-card reveal ${isOpen ? 'project-card--expanded' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Visual header */}
                <div
                  className="project-card__visual"
                  style={{ background: GRADIENT_STYLES[project.gradient] }}
                >
                  <div className="project-card__visual-overlay" aria-hidden="true" />
                  <span className="project-card__label">{project.label}</span>
                  <span className="project-card__number">{project.number}</span>
                </div>

                {/* Content */}
                <div className="project-card__body">
                  <div className="project-card__meta">
                    <p className="project-card__type">Project {project.number}</p>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__tagline">{project.tagline}</p>
                  </div>

                  {/* Tags */}
                  <div className="project-card__tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="project-card__links">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link-btn project-link-btn--primary"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link-btn project-link-btn--ghost"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    <button
                      className="project-link-btn project-link-btn--toggle"
                      onClick={() => toggleExpand(project.id)}
                      aria-expanded={isOpen}
                      aria-controls={`case-${project.id}`}
                    >
                      {isOpen ? 'Hide Details ↑' : 'Case Study ↓'}
                    </button>
                  </div>

                  {/* Expandable case study */}
                  <div
                    className={`project-card__case ${isOpen ? 'project-card__case--open' : ''}`}
                    id={`case-${project.id}`}
                  >
                    {[
                      { label: 'Problem',  text: project.caseStudy.problem },
                      { label: 'Approach', text: project.caseStudy.approach },
                      { label: 'Tech',     text: project.caseStudy.tech },
                      { label: 'Outcome',  text: project.caseStudy.outcome },
                    ].map(item => (
                      <div key={item.label} className="project-case-row">
                        <span className="project-case-label">{item.label}</span>
                        <p className="project-case-text">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
