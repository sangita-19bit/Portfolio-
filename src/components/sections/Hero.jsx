import { useEffect, useRef } from 'react';
import './Hero.css';

const RESUME_URL = 'https://drive.google.com/file/d/1-ryW-Ycm13d3RWEMUZtK3-7kiUNzW36b/view?usp=sharing';

/* ── Neural network visualization nodes ─────────────── */
const NET_NODES = [
  { id: 'a', x: 80,  y: 60  },
  { id: 'b', x: 200, y: 40  },
  { id: 'c', x: 300, y: 100 },
  { id: 'd', x: 60,  y: 160 },
  { id: 'e', x: 170, y: 150 },
  { id: 'f', x: 290, y: 190 },
  { id: 'g', x: 110, y: 250 },
  { id: 'h', x: 240, y: 270 },
  { id: 'i', x: 350, y: 240 },
];

const NET_EDGES = [
  ['a','b'],['a','d'],['b','c'],['b','e'],
  ['c','f'],['d','e'],['d','g'],['e','f'],
  ['e','g'],['e','h'],['f','i'],['g','h'],['h','i'],
];

function getNode(id) {
  return NET_NODES.find(n => n.id === id);
}

export default function Hero() {
  const heroRef = useRef(null);

  /* ── Entrance animation trigger ─────────────────── */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const items = el.querySelectorAll('[data-hero-item]');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      items.forEach(item => item.classList.add('hero-item--visible'));
      return;
    }

    items.forEach((item, i) => {
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

        {/* Left — copy */}
        <div className="hero__copy">
          <p
            className="hero__eyebrow hero-item"
            data-hero-item="100"
          >
            AI/ML Developer · Software Engineer · CSE Student
          </p>

          <h1 className="hero__headline">
            {['Building', 'intelligent', 'systems', 'at the', 'intersection of'].map((word, i) => (
              <span
                key={i}
                className="hero__word hero-item"
                data-hero-item={200 + i * 60}
              >
                {word}&nbsp;
              </span>
            ))}
            <span className="hero__word hero__word--gradient hero-item" data-hero-item={500}>
              AI, data & code.
            </span>
          </h1>

          <p
            className="hero__desc hero-item"
            data-hero-item="680"
          >
            Computer Science student at Chandigarh University building full-stack systems
            and AI-augmented applications. Skilled in Java, Python, React, Spring Boot,
            and applied machine learning workflows — with a focus on building things
            that are functional, intelligent, and well-crafted.
          </p>

          {/* CTAs */}
          <div className="hero__actions hero-item" data-hero-item="820">
            <button
              className="btn btn-primary"
              onClick={() => scrollTo('#projects')}
              id="cta-projects"
            >
              View Projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              id="cta-resume"
            >
              Resume ↗
            </a>
            <a
              href="mailto:sangitabeauty67@gmail.com"
              className="btn btn-ghost"
              id="cta-email"
            >
              Email Me
            </a>
          </div>

          {/* Stats */}
          <ul className="hero__stats hero-item" data-hero-item="960">
            <li>
              <strong>2023–27</strong>
              <span>B.E. CSE, Chandigarh University</span>
            </li>
            <li>
              <strong>6.79</strong>
              <span>Current CGPA</span>
            </li>
            <li>
              <strong>3+</strong>
              <span>Full-stack Projects</span>
            </li>
          </ul>
        </div>

        {/* Right — Neural network visualization */}
        <div className="hero__visual hero-item" data-hero-item="400" aria-hidden="true">
          <div className="hero__visual-inner">
            <div className="hero__visual-glow" />

            {/* SVG network */}
            <svg
              className="hero__network"
              viewBox="0 0 400 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Edges */}
              {NET_EDGES.map(([a, b], i) => {
                const na = getNode(a);
                const nb = getNode(b);
                return (
                  <line
                    key={i}
                    x1={na.x} y1={na.y}
                    x2={nb.x} y2={nb.y}
                    stroke="rgba(99,102,241,0.2)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Animated packets */}
              {NET_EDGES.slice(0, 6).map(([a, b], i) => {
                const na = getNode(a);
                const nb = getNode(b);
                const dur = `${1.5 + i * 0.3}s`;
                const delay = `${i * 0.4}s`;
                return (
                  <circle key={`pkt-${i}`} r="2" fill="#818cf8" opacity="0">
                    <animateMotion
                      dur={dur} begin={delay}
                      repeatCount="indefinite"
                      path={`M ${na.x} ${na.y} L ${nb.x} ${nb.y}`}
                    />
                    <animate attributeName="opacity" values="0;0.9;0.9;0" dur={dur} begin={delay} repeatCount="indefinite" />
                  </circle>
                );
              })}

              {/* Nodes */}
              {NET_NODES.map((node, i) => (
                <g key={node.id}>
                  <circle
                    cx={node.x} cy={node.y} r="14"
                    fill="rgba(99,102,241,0.07)"
                    style={{
                      animationName: 'node-ring-pulse',
                      animationDuration: `${2 + i * 0.25}s`,
                      animationDelay: `${i * 0.15}s`,
                      animationTimingFunction: 'ease-out',
                      animationIterationCount: 'infinite',
                    }}
                  />
                  <circle
                    cx={node.x} cy={node.y} r="5"
                    fill={i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#818cf8' : '#38bdf8'}
                    style={{
                      animationName: 'node-inner-glow',
                      animationDuration: `${2.5 + i * 0.2}s`,
                      animationDelay: `${i * 0.18}s`,
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                    }}
                  />
                </g>
              ))}

              {/* Outer orbit ring */}
              <ellipse
                cx="200" cy="160" rx="160" ry="130"
                stroke="rgba(99,102,241,0.1)"
                strokeWidth="0.75"
                strokeDasharray="20 10"
                className="hero__orbit"
              />
            </svg>

            {/* Status badge */}
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              <span>Open to opportunities</span>
            </div>

            {/* Social links */}
            <div className="hero__socials">
              <a
                href="https://github.com/sangita-19bit/"
                target="_blank"
                rel="noreferrer"
                className="hero__social-link"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/sangita-as196/"
                target="_blank"
                rel="noreferrer"
                className="hero__social-link"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint hero-item" data-hero-item="1100" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
