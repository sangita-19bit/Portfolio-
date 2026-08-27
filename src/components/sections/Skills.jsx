import { useEffect, useRef } from 'react';
import { skillCategories } from '../../data/skills';
import './Skills.css';

/* Map category index to formatted number */
const toNum = i => String(i + 1).padStart(2, '0');

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
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Technical Expertise</h2>
        </div>

        <div className="skills__list">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.id}
              className="skill-row reveal"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="skill-row__num" aria-hidden="true">{toNum(i)}</span>

              <div className="skill-row__info">
                <h3 className="skill-row__category">{cat.label}</h3>
                <p className="skill-row__desc">{cat.description}</p>
              </div>

              <ul className="skill-row__skills" aria-label={`${cat.label} skills`}>
                {cat.skills.map(skill => (
                  <li key={skill} className="skill-row__skill">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
