import { useState, useEffect, useRef } from 'react';
import { projects } from '../../data/projects';
import './Projects.css';

/* ── Abstract SVG visuals per project — no blue/purple ──── */
const PROJECT_VISUALS = {
  'rentflow': ({ className }) => (
    <svg className={className} viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="560" height="480" fill="#1A1814"/>
      {/* Grid */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="480" stroke="rgba(201,178,124,0.04)" strokeWidth="0.5"/>
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 40} x2="560" y2={i * 40} stroke="rgba(201,178,124,0.04)" strokeWidth="0.5"/>
      ))}
      {/* Abstract property/rental geometry */}
      <rect x="140" y="120" width="120" height="140" fill="none" stroke="rgba(201,178,124,0.2)" strokeWidth="1"/>
      <rect x="300" y="80" width="120" height="180" fill="none" stroke="rgba(201,178,124,0.14)" strokeWidth="0.75"/>
      <rect x="80" y="200" width="80" height="80" fill="rgba(201,178,124,0.04)" stroke="rgba(201,178,124,0.1)" strokeWidth="0.5"/>
      {/* Roof lines */}
      <path d="M130 120 L200 80 L270 120" stroke="rgba(201,178,124,0.25)" strokeWidth="1" fill="none"/>
      <path d="M290 80 L360 40 L430 80" stroke="rgba(201,178,124,0.18)" strokeWidth="0.75" fill="none"/>
      {/* Connection lines */}
      <line x1="200" y1="120" x2="360" y2="80" stroke="rgba(201,178,124,0.1)" strokeWidth="0.5" strokeDasharray="6 6"/>
      <line x1="200" y1="260" x2="360" y2="260" stroke="rgba(201,178,124,0.08)" strokeWidth="0.5" strokeDasharray="4 8"/>
      {/* Dots */}
      <circle cx="200" cy="120" r="3" fill="rgba(201,178,124,0.5)"/>
      <circle cx="360" cy="80" r="3" fill="rgba(201,178,124,0.4)"/>
      <circle cx="200" cy="260" r="2.5" fill="rgba(201,178,124,0.3)"/>
      <circle cx="360" cy="260" r="2.5" fill="rgba(201,178,124,0.3)"/>
      {/* Data flow arrows */}
      <path d="M380 320 L440 320" stroke="rgba(201,178,124,0.2)" strokeWidth="1"/>
      <path d="M430 313 L440 320 L430 327" stroke="rgba(201,178,124,0.2)" strokeWidth="1" fill="none"/>
      <circle cx="380" cy="320" r="4" fill="rgba(201,178,124,0.15)" stroke="rgba(201,178,124,0.3)" strokeWidth="0.75"/>
      {/* Tech label */}
      <text x="140" y="400" fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(201,178,124,0.3)" letterSpacing="2">REACT · NEXT.JS · SPRING BOOT · MONGODB</text>
    </svg>
  ),

  'blinkexam': ({ className }) => (
    <svg className={className} viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="560" height="480" fill="#1C1A17"/>
      {/* Grid base */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="480" stroke="rgba(201,178,124,0.03)" strokeWidth="0.5"/>
      ))}
      {/* Table / data structure motif (repurposed as exam dashboard) */}
      <rect x="100" y="100" width="360" height="260" fill="none" stroke="rgba(201,178,124,0.14)" strokeWidth="1"/>
      {/* Header row */}
      <rect x="100" y="100" width="360" height="44" fill="rgba(201,178,124,0.04)" stroke="none"/>
      <line x1="100" y1="144" x2="460" y2="144" stroke="rgba(201,178,124,0.15)" strokeWidth="0.75"/>
      {/* Row dividers */}
      {[1, 2, 3, 4].map(r => (
        <line key={r} x1="100" y1={144 + r * 54} x2="460" y2={144 + r * 54} stroke="rgba(201,178,124,0.07)" strokeWidth="0.5"/>
      ))}
      {/* Col dividers */}
      <line x1="220" y1="100" x2="220" y2="360" stroke="rgba(201,178,124,0.08)" strokeWidth="0.5"/>
      <line x1="330" y1="100" x2="330" y2="360" stroke="rgba(201,178,124,0.08)" strokeWidth="0.5"/>
      {/* Header labels hint */}
      <rect x="116" y="116" width="72" height="10" rx="1" fill="rgba(201,178,124,0.15)"/>
      <rect x="236" y="116" width="56" height="10" rx="1" fill="rgba(201,178,124,0.12)"/>
      <rect x="346" y="116" width="64" height="10" rx="1" fill="rgba(201,178,124,0.12)"/>
      {/* Row content hints (quiz scores, statuses) */}
      {[0, 1, 2, 3].map(r => (
        <g key={r}>
          <circle cx="124" cy={168 + r * 54} r="10" fill="rgba(201,178,124,0.06)" stroke="rgba(201,178,124,0.1)" strokeWidth="0.5"/>
          <rect x="144" y={163 + r * 54} width="56" height="8" rx="1" fill="rgba(201,178,124,0.1)"/>
          <rect x="240" y={163 + r * 54} width="48" height="8" rx="1" fill="rgba(201,178,124,0.07)"/>
          <rect x="350" y={163 + r * 54} width="42" height="8" rx="1" fill="rgba(201,178,124,0.07)"/>
        </g>
      ))}
      {/* API endpoint hint */}
      <text x="100" y="400" fontFamily="Inter, sans-serif" fontSize="7" fill="rgba(201,178,124,0.25)" letterSpacing="1.5">WSS // REAL-TIME EVALUATION // SECURE EXAM SESSION</text>
      <text x="100" y="430" fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(201,178,124,0.25)" letterSpacing="2">NEXT.JS · REACT · SPRING BOOT · MONGODB</text>
    </svg>
  ),

  'swan-botanics': ({ className }) => (
    <svg className={className} viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="560" height="480" fill="#181613"/>
      {/* Organic + grid composition */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="480" stroke="rgba(201,178,124,0.03)" strokeWidth="0.5"/>
      ))}
      {/* Product card outlines */}
      <rect x="80" y="80" width="160" height="200" fill="rgba(201,178,124,0.03)" stroke="rgba(201,178,124,0.15)" strokeWidth="0.75"/>
      <rect x="260" y="60" width="160" height="220" fill="rgba(201,178,124,0.04)" stroke="rgba(201,178,124,0.2)" strokeWidth="1"/>
      <rect x="440" y="90" width="60" height="160" fill="rgba(201,178,124,0.02)" stroke="rgba(201,178,124,0.1)" strokeWidth="0.5"/>
      {/* Product image areas */}
      <rect x="88" y="88" width="144" height="130" fill="rgba(201,178,124,0.06)"/>
      <rect x="268" y="68" width="144" height="145" fill="rgba(201,178,124,0.07)"/>
      {/* Price labels */}
      <rect x="88" y="232" width="48" height="10" rx="1" fill="rgba(201,178,124,0.2)"/>
      <rect x="268" y="228" width="52" height="10" rx="1" fill="rgba(201,178,124,0.2)"/>
      {/* Product title hints */}
      <rect x="88" y="250" width="120" height="7" rx="1" fill="rgba(201,178,124,0.09)"/>
      <rect x="268" y="246" width="128" height="7" rx="1" fill="rgba(201,178,124,0.09)"/>
      {/* Add to cart */}
      <rect x="88" y="268" width="88" height="22" rx="1" fill="rgba(201,178,124,0.08)" stroke="rgba(201,178,124,0.18)" strokeWidth="0.75"/>
      <rect x="268" y="264" width="88" height="22" rx="1" fill="rgba(201,178,124,0.1)" stroke="rgba(201,178,124,0.22)" strokeWidth="1"/>
      {/* Botanical element — abstract leaf-like curves */}
      <path d="M440 240 Q480 200 500 280 Q480 300 440 280 Z" fill="rgba(201,178,124,0.05)" stroke="rgba(201,178,124,0.12)" strokeWidth="0.75"/>
      <path d="M100 380 Q140 350 160 390 Q140 410 100 400 Z" fill="rgba(201,178,124,0.04)" stroke="rgba(201,178,124,0.1)" strokeWidth="0.5"/>
      <text x="80" y="440" fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(201,178,124,0.25)" letterSpacing="2">REACT · CUSTOM CSS · RESPONSIVE DESIGN</text>
    </svg>
  ),
};

/* ── External link icon ───────────────────────────────────── */
const ExternalIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M2 9 L9 2 M9 2 H5 M9 2 V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── GitHub icon ──────────────────────────────────────────── */
const GitHubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

/* ── Chevron icon ─────────────────────────────────────────── */
const ChevronIcon = ({ open }) => (
  <svg
    className="project-item__toggle-icon"
    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Project item component ───────────────────────────────── */
function ProjectItem({ project, index, isOpen, onToggle }) {
  const isReverse = index % 2 === 1;
  const VisualComp = PROJECT_VISUALS[project.id];
  const className = isOpen
    ? `project-item ${isReverse ? 'project-item--reverse' : ''} project-item--expanded`
    : `project-item ${isReverse ? 'project-item--reverse' : ''}`;

  return (
    <div className="reveal" style={{ transitionDelay: `${index * 80}ms` }}>
      <article className={className}>

        {/* Visual */}
        <div className="project-item__visual" aria-hidden="true">
          <div className="project-item__visual-inner">
            {VisualComp && <VisualComp className="project-item__svg" />}
          </div>
          <span className="project-item__num" aria-hidden="true">{project.number}</span>
          <span className="project-item__chip">{project.label}</span>
        </div>

        {/* Content */}
        <div className="project-item__content">
          <p className="project-item__type">Project {project.number}</p>
          <h3 className="project-item__title">{project.title}</h3>
          <p className="project-item__tagline">{project.tagline}</p>

          {/* Tags */}
          <div className="project-item__tags" aria-label="Technologies used">
            {project.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {/* Links */}
          <div className="project-item__links">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="project-item__link project-item__link--primary"
                aria-label={`View live demo of ${project.title}`}
              >
                Live Demo <ExternalIcon />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="project-item__link"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GitHubIcon /> GitHub
              </a>
            )}
          </div>

          {/* Toggle */}
          <button
            className={`project-item__toggle ${isOpen ? 'project-item__toggle--open' : ''}`}
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`case-${project.id}`}
          >
            {isOpen ? 'Hide Case Study' : 'Case Study'}
            <ChevronIcon open={isOpen} />
          </button>
        </div>

        {/* Expandable case study — full width */}
        {isOpen && (
          <div
            className="project-item__case project-item__case--open"
            id={`case-${project.id}`}
            role="region"
            aria-label={`${project.title} case study`}
          >
            {[
              { label: 'Problem',  text: project.caseStudy.problem },
              { label: 'Approach', text: project.caseStudy.approach },
              { label: 'Tech',     text: project.caseStudy.tech },
              { label: 'Outcome',  text: project.caseStudy.outcome },
            ].map(col => (
              <div key={col.label}>
                <span className="case-col__label">{col.label}</span>
                <p className="case-col__text">{col.text}</p>
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}

/* ── Main Projects section ────────────────────────────────── */
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
      { threshold: 0.06, rootMargin: '0px 0px -60px 0px' }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section projects-section" id="projects" ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className="projects__header reveal">
          <div>
            <p className="section-label">Featured Work</p>
            <h2 className="section-title">Selected Work</h2>
          </div>
          <div className="projects__header-right">
            <p className="section-subtitle">
              Real applications designed and developed with a clear problem, deliberate approach, and working outcome.
            </p>
          </div>
        </div>

        {/* Projects */}
        <div>
          {projects.map((project, i) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={i}
              isOpen={expanded === project.id}
              onToggle={() => setExpanded(prev => prev === project.id ? null : project.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
