import { useEffect, useRef } from 'react';
import './About.css';

const FOCUS_ITEMS = [
  {
    icon: '⬡',
    title: 'AI-Augmented Development',
    desc: 'Using AI tools and structured reasoning to accelerate ideation, debug faster, and explore better solutions.',
  },
  {
    icon: '◈',
    title: 'Full-Stack Engineering',
    desc: 'Building end-to-end systems with React, Spring Boot, REST APIs, and MongoDB — from interface to database.',
  },
  {
    icon: '◎',
    title: 'Systems & Algorithms',
    desc: 'Grounding every project in strong CS fundamentals: data structures, OOP, distributed systems, and scalable design.',
  },
];

export default function About() {
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section about-section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about__grid">

          {/* Bio */}
          <div className="about__bio reveal">
            <p className="section-label">About</p>
            <h2 className="section-title">
              CS student building at the edge of software and intelligence.
            </h2>
            <p className="about__text">
              I'm Sangita Chowdhury, a Computer Science undergraduate at Chandigarh University
              with a strong interest in AI/ML systems, software engineering, and the way
              intelligent tools are reshaping how we build.
            </p>
            <p className="about__text">
              My approach combines solid CS fundamentals — data structures, OOP, algorithms —
              with hands-on full-stack development. I'm driven by curiosity about
              machine learning, cloud systems, and building products that are both
              technically sound and genuinely useful.
            </p>

            <div className="about__links">
              <a
                href="https://github.com/sangita-19bit/"
                target="_blank"
                rel="noreferrer"
                className="about__link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub — sangita-19bit
              </a>
              <a
                href="https://www.linkedin.com/in/sangita-as196/"
                target="_blank"
                rel="noreferrer"
                className="about__link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn — sangita-as196
              </a>
            </div>
          </div>

          {/* Focus cards */}
          <div className="about__focus">
            <p className="about__focus-label">✦ Currently Building</p>
            {FOCUS_ITEMS.map((item, i) => (
              <article
                key={i}
                className="about__focus-card reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="about__focus-icon" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
