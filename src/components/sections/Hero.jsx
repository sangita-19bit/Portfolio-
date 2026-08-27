import { useEffect, useRef } from 'react';
import './Hero.css';

const RESUME_URL = 'https://drive.google.com/file/d/1-ryW-Ycm13d3RWEMUZtK3-7kiUNzW36b/view?usp=sharing';

/* ── Elegant geometric SVG portrait placeholder ─────────── */
function PortraitSVG() {
  return (
    <svg
      className="hero__portrait-svg"
      viewBox="0 0 360 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sangita Chowdhury — portrait placeholder"
    >
      {/* Background */}
      <rect width="360" height="480" fill="#141210"/>

      {/* Fine grid */}
      {Array.from({ length: 18 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 20} y1="0"
          x2={i * 20} y2="480"
          stroke="rgba(201,178,124,0.04)"
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0" y1={i * 20}
          x2="360" y2={i * 20}
          stroke="rgba(201,178,124,0.04)"
          strokeWidth="0.5"
        />
      ))}

      {/* Outer ring */}
      <circle cx="180" cy="220" r="140" stroke="rgba(201,178,124,0.08)" strokeWidth="0.75" fill="none" strokeDasharray="12 8"/>
      <circle cx="180" cy="220" r="110" stroke="rgba(201,178,124,0.06)" strokeWidth="0.5" fill="none"/>

      {/* Inner geometric — abstract portrait silhouette hint */}
      <ellipse cx="180" cy="168" rx="42" ry="48" fill="rgba(201,178,124,0.05)" stroke="rgba(201,178,124,0.15)" strokeWidth="0.75"/>
      <path d="M120 310 Q120 255 180 248 Q240 255 240 310 L240 340 Q240 360 220 360 L140 360 Q120 360 120 340 Z"
        fill="rgba(201,178,124,0.04)" stroke="rgba(201,178,124,0.12)" strokeWidth="0.75"/>

      {/* Decorative geometry — data/network motif */}
      <line x1="60" y1="80" x2="180" y2="140" stroke="rgba(201,178,124,0.12)" strokeWidth="0.5"/>
      <line x1="300" y1="80" x2="180" y2="140" stroke="rgba(201,178,124,0.12)" strokeWidth="0.5"/>
      <line x1="60" y1="380" x2="180" y2="320" stroke="rgba(201,178,124,0.08)" strokeWidth="0.5"/>
      <line x1="300" y1="380" x2="180" y2="320" stroke="rgba(201,178,124,0.08)" strokeWidth="0.5"/>

      {/* Node dots */}
      <circle cx="60" cy="80" r="3" fill="rgba(201,178,124,0.3)"/>
      <circle cx="300" cy="80" r="3" fill="rgba(201,178,124,0.3)"/>
      <circle cx="180" cy="140" r="4" fill="rgba(201,178,124,0.4)"/>
      <circle cx="60" cy="380" r="3" fill="rgba(201,178,124,0.2)"/>
      <circle cx="300" cy="380" r="3" fill="rgba(201,178,124,0.2)"/>
      <circle cx="180" cy="320" r="4" fill="rgba(201,178,124,0.3)"/>

      {/* Central monogram */}
      <text
        x="180" y="232"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="52"
        fontWeight="300"
        fill="rgba(201,178,124,0.35)"
        letterSpacing="4"
      >
        SC
      </text>

      {/* Bottom label */}
      <text
        x="180" y="440"
        textAnchor="middle"
        fontFamily="'Inter', sans-serif"
        fontSize="8"
        fontWeight="400"
        fill="rgba(169,162,152,0.5)"
        letterSpacing="3"
      >
        PHOTO COMING SOON
      </text>

      {/* Corner marks */}
      <path d="M20 20 L40 20 L40 22 L22 22 L22 40 L20 40 Z" fill="rgba(201,178,124,0.25)"/>
      <path d="M340 20 L320 20 L320 22 L338 22 L338 40 L340 40 Z" fill="rgba(201,178,124,0.25)"/>
      <path d="M20 460 L40 460 L40 458 L22 458 L22 440 L20 440 Z" fill="rgba(201,178,124,0.25)"/>
      <path d="M340 460 L320 460 L320 458 L338 458 L338 440 L340 440 Z" fill="rgba(201,178,124,0.25)"/>
    </svg>
  );
}

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const items = el.querySelectorAll('[data-hero-item]');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      items.forEach(item => item.classList.add('hero-item--visible'));
      return;
    }

    items.forEach(item => {
      const delay = parseInt(item.dataset.heroItem || '0', 10);
      setTimeout(() => item.classList.add('hero-item--visible'), delay);
    });
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="container hero__container">

        {/* Left — editorial copy */}
        <div className="hero__copy">

          {/* Eyebrow */}
          <p
            className="hero__eyebrow hero-item"
            data-hero-item="100"
            aria-label="Role"
          >
            AI / ML Developer · Software Engineer
          </p>

          {/* Headline */}
          <h1 className="hero__headline" aria-label="Building intelligence through data, models and code">
            {[
              { text: 'Building', gold: false },
              { text: 'intelligence', gold: false },
              { text: 'through', gold: false },
              { text: 'data,', gold: false },
              { text: 'models', gold: true },
              { text: '&', gold: false },
              { text: 'code.', gold: true },
            ].map((item, i) => (
              <span
                key={i}
                className={`hero__word ${item.gold ? 'hero__word--gold' : ''} hero-item`}
                data-hero-item={180 + i * 55}
              >
                {item.text}&nbsp;
              </span>
            ))}
          </h1>

          {/* Description */}
          <p
            className="hero__desc hero-item"
            data-hero-item="600"
          >
            Computer Science student at Chandigarh University — building full-stack systems
            and AI-augmented applications. Skilled in Java, Python, React, Spring Boot,
            and applied machine learning workflows, with a focus on building things
            that are functional, intelligent, and well-crafted.
          </p>

          {/* CTAs */}
          <div className="hero__actions hero-item" data-hero-item="780">
            <button
              className="btn btn-primary"
              onClick={() => scrollTo('#projects')}
              id="cta-explore-work"
            >
              Explore My Work
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              id="cta-resume"
            >
              View Resume ↗
            </a>
          </div>

          {/* Stats */}
          <ul className="hero__stats hero-item" data-hero-item="960">
            <li>
              <strong>2023–27</strong>
              <span>B.E. CSE, CU</span>
            </li>
            <li>
              <strong>6.79</strong>
              <span>Current CGPA</span>
            </li>
            <li>
              <strong>3+</strong>
              <span>Projects Built</span>
            </li>
          </ul>
        </div>

        {/* Right — portrait / visual */}
        <div
          className="hero__visual hero-item"
          data-hero-item="350"
          aria-hidden="false"
        >
          <div className="hero__visual-inner">
            <div className="hero__glow" aria-hidden="true" />

            <div className="hero__portrait-frame">
              <PortraitSVG />
            </div>

            {/* Status badge */}
            <div className="hero__badge" aria-label="Availability status">
              <span className="hero__badge-dot" aria-hidden="true" />
              <span>Open to opportunities</span>
            </div>

            {/* Metadata tag */}
            <div className="hero__meta-tag" aria-hidden="true">
              <span className="hero__meta-label">Focus</span>
              <span className="hero__meta-value">AI / ML</span>
            </div>

            {/* Social links */}
            <div className="hero__socials">
              <a
                href="https://github.com/sangita-19bit/"
                target="_blank"
                rel="noreferrer"
                className="hero__social-link"
                aria-label="GitHub profile"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sangita-as196/"
                target="_blank"
                rel="noreferrer"
                className="hero__social-link"
                aria-label="LinkedIn profile"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll hero-item" data-hero-item="1200" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">scroll</span>
      </div>
    </section>
  );
}
