import { useEffect, useRef } from 'react';
import { skillCategories } from '../../data/skills';
import './Skills.css';

const ACCENT_COLORS = {
  indigo: { bg: 'rgba(99,102,241,0.07)', border: 'rgba(99,102,241,0.2)', text: '#818cf8' },
  violet: { bg: 'rgba(139,92,246,0.07)', border: 'rgba(139,92,246,0.2)', text: '#a78bfa' },
  sky:    { bg: 'rgba(56,189,248,0.07)', border: 'rgba(56,189,248,0.2)', text: '#7dd3fc' },
};

export default function Skills() {
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

  return (
    <section className="section skills-section" id="skills" ref={sectionRef}>
      <div className="container">

        <div className="skills__header reveal">
          <p className="section-label">Tech Stack</p>
          <h2 className="section-title">
            Technical foundations with modern AI fluency.
          </h2>
          <p className="section-subtitle">
            A curated set of technologies I actively use across projects — organized by domain.
          </p>
        </div>

        <div className="skills__grid">
          {skillCategories.map((cat, i) => {
            const colors = ACCENT_COLORS[cat.accent] || ACCENT_COLORS.indigo;
            return (
              <article
                key={cat.id}
                className="skill-card reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div
                  className="skill-card__icon"
                  style={{ color: colors.text }}
                  aria-hidden="true"
                >
                  {cat.icon}
                </div>
                <h3 className="skill-card__title">{cat.label}</h3>
                <p className="skill-card__desc">{cat.description}</p>

                <div className="skill-card__tags">
                  {cat.skills.map(skill => (
                    <span
                      key={skill}
                      className="skill-pill"
                      style={{
                        background: colors.bg,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
