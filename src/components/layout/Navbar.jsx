import { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About',     href: '#about'     },
  { label: 'Work',      href: '#projects'  },
  { label: 'Skills',    href: '#skills'    },
  { label: 'Education', href: '#education' },
  { label: 'Contact',   href: '#contact'   },
];

const RESUME_URL = 'https://drive.google.com/file/d/1-ryW-Ycm13d3RWEMUZtK3-7kiUNzW36b/view?usp=sharing';

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeId,  setActiveId]  = useState('');

  /* ── Scroll detection ─────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ──────────── */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { threshold: 0.25, rootMargin: '-68px 0px -40% 0px' }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMenu();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
        <div className="navbar__inner">

          {/* Brand */}
          <a
            href="#hero"
            className="navbar__brand"
            aria-label="Sangita Chowdhury — Home"
            onClick={e => handleNavClick(e, '#hero')}
          >
            <span className="navbar__monogram" aria-hidden="true">SC</span>
            <span className="navbar__name">Sangita Chowdhury</span>
          </a>

          {/* Desktop nav */}
          <nav className="navbar__nav" aria-label="Primary navigation">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`navbar__link ${activeId === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary navbar__resume"
              aria-label="View Resume (opens in new tab)"
            >
              Resume ↗
            </a>
          </nav>

          {/* Hamburger */}
          <button
            className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
      >
        <nav className="mobile-menu__nav">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-menu__link ${activeId === link.href.slice(1) ? 'mobile-menu__link--active' : ''}`}
              onClick={e => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mobile-menu__resume"
            onClick={closeMenu}
          >
            View Resume ↗
          </a>
        </nav>
      </div>

      {menuOpen && (
        <div className="mobile-overlay" onClick={closeMenu} aria-hidden="true" />
      )}
    </>
  );
}
