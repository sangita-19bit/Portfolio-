import { useEffect, useRef } from 'react';
import { education, achievements, profiles } from '../../data/education';
import './Education.css';

export default function Education() {
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
    <section className="section education-section" id="education" ref={sectionRef}>
      <div className="container">

        <div className="edu__header reveal">
          <p className="section-label">Education & Achievements</p>
          <h2 className="section-title">Academic background & recognitions.</h2>
        </div>

        <div className="edu__grid">

          {/* Education timeline */}
          <div className="edu__timeline">
            <h3 className="edu__col-title reveal">Education</h3>
            <div className="edu__entries">
              {education.map((edu, i) => (
                <article
                  key={edu.id}
                  className="edu__entry reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="edu__entry-icon" aria-hidden="true">{edu.icon}</div>
                  <div className="edu__entry-content">
                    <div className="edu__entry-header">
                      <h4 className="edu__entry-degree">{edu.degree}</h4>
                      <span className="edu__entry-score">{edu.score}</span>
                    </div>
                    <p className="edu__entry-inst">{edu.institution}</p>
                    <p className="edu__entry-period">{edu.period}</p>
                    {edu.description && (
                      <p className="edu__entry-desc">{edu.description}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Achievements + Profiles */}
          <div className="edu__right">
            <h3 className="edu__col-title reveal">Achievements</h3>
            <div className="edu__achievements">
              {achievements.map((ach, i) => (
                <article
                  key={ach.id}
                  className="ach-card reveal"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div className="ach-card__icon" aria-hidden="true">{ach.icon}</div>
                  <div>
                    <div className="ach-card__header">
                      <strong className="ach-card__title">{ach.title}</strong>
                      <span
                        className={`ach-card__badge ${ach.type === 'certification' ? 'ach-card__badge--cert' : 'ach-card__badge--hack'}`}
                      >
                        {ach.subtitle}
                      </span>
                    </div>
                    <p className="ach-card__desc">{ach.description}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Coding profiles */}
            <h3 className="edu__col-title reveal" style={{ marginTop: '32px' }}>Profiles</h3>
            <div className="edu__profiles reveal">
              {profiles.map(p => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-card"
                >
                  <div className="profile-card__icon">
                    {p.id === 'github' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="profile-card__label">{p.label}</p>
                    <p className="profile-card__handle">@{p.handle}</p>
                    <p className="profile-card__desc">{p.description}</p>
                  </div>
                  <svg className="profile-card__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
