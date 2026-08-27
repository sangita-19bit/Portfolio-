/*!
 * Sangita Chowdhury Portfolio — Interaction System
 * =================================================
 * 1. Loader          6. Counters
 * 2. Custom Cursor   7. Scroll Reveal
 * 3. Scroll Progress 8. 3D Card Tilt
 * 4. Navigation      9. Magnetic Buttons
 * 5. Hero Animations 10. Ripple Effect
 */

'use strict';

/* ── Tiny helpers ─────────────────────────────────── */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─────────────────────────────────────────────────── */
/*  1. LOADER                                          */
/* ─────────────────────────────────────────────────── */
function initLoader() {
  const loader = $('#loader');
  if (!loader) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const delay = reducedMotion ? 0 : 1380;

  setTimeout(() => {
    loader.classList.add('hidden');
    initHeroAnimations();
  }, delay);
}

/* ─────────────────────────────────────────────────── */
/*  2. CUSTOM CURSOR                                   */
/* ─────────────────────────────────────────────────── */
function initCursor() {
  const dot  = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!dot || !ring) return;

  // Disable on touch-primary devices
  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX  = mouseX;
  let ringY  = mouseY;

  /* Dot follows instantly */
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  /* Ring follows with inertia */
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  /* Hover state on interactive elements */
  $$('a, button, .project-card, .skill-card, .process-card, .signal-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('is-hovered');
      ring.classList.add('is-hovered');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('is-hovered');
      ring.classList.remove('is-hovered');
    });
  });

  /* Fade when leaving viewport */
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
}

/* ─────────────────────────────────────────────────── */
/*  3. SCROLL PROGRESS                                 */
/* ─────────────────────────────────────────────────── */
function initScrollProgress() {
  const bar = $('#scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  }, { passive: true });
}

/* ─────────────────────────────────────────────────── */
/*  4. NAVIGATION                                      */
/* ─────────────────────────────────────────────────── */
function initNav() {
  const topbar = $('#topbar');
  const toggle = $('#navToggle');
  const nav    = $('#nav');

  /* Scrolled class → stronger glass effect */
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* Mobile hamburger */
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close on link click */
    $$('.nav-link', nav).forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    /* Close on outside click */
    document.addEventListener('click', e => {
      if (nav.classList.contains('open') && !topbar.contains(e.target)) {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* Active section highlight via IntersectionObserver */
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l =>
          l.classList.toggle('active', l.getAttribute('href') === '#' + id)
        );
      }
    });
  }, { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' });

  sections.forEach(s => navObs.observe(s));
}

/* ─────────────────────────────────────────────────── */
/*  5. HERO ANIMATIONS                                 */
/* ─────────────────────────────────────────────────── */
function initHeroAnimations() {
  /* Eyebrow slide in */
  const eyebrow = $('.hero-eyebrow');
  if (eyebrow) setTimeout(() => eyebrow.classList.add('visible'), 80);

  /* H1 word stagger */
  $$('.hero-h1 .word').forEach((word, i) => {
    setTimeout(() => {
      word.style.opacity   = '1';
      word.style.transform = 'translateY(0)';
    }, 190 + i * 52);
  });

  /* Panel elements */
  [
    { sel: '.hero-text',    delay: 870  },
    { sel: '.hero-actions', delay: 1020 },
    { sel: '.hero-metrics', delay: 1180 },
    { sel: '#hero-card',    delay: 680  },
  ].forEach(({ sel, delay }) => {
    const el = $(sel);
    if (el) setTimeout(() => el.classList.add('visible'), delay);
  });

  /* Launch counters after metrics appear */
  setTimeout(initCounters, 1220);
}

/* ─────────────────────────────────────────────────── */
/*  6. COUNTERS (count-up numbers in hero metrics)     */
/* ─────────────────────────────────────────────────── */
function initCounters() {
  $$('.counter').forEach(el => {
    const target   = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || 0);
    const suffix   = el.dataset.suffix || '';
    const duration = 1900;
    const startTs  = performance.now();

    function tick(now) {
      const t = Math.min((now - startTs) / duration, 1);
      /* Ease-out cubic */
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

/* ─────────────────────────────────────────────────── */
/*  7. SCROLL REVEAL                                   */
/* ─────────────────────────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);

      /* Animate skill bar when card becomes visible */
      const bar = entry.target.querySelector('.skill-bar');
      if (bar) {
        setTimeout(() => {
          bar.style.width = (bar.dataset.width || 0) + '%';
        }, 420);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  $$('.reveal').forEach(el => obs.observe(el));
}

/* ─────────────────────────────────────────────────── */
/*  8. 3D CARD TILT                                    */
/* ─────────────────────────────────────────────────── */
function initCardTilt() {
  const MAX = 9; /* degrees */

  $$('[data-tilt]').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.12s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    });

    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = (e.clientX - r.left)  / r.width  - 0.5;
      const y  = (e.clientY - r.top)   / r.height - 0.5;
      card.style.transform =
        `perspective(900px) rotateY(${x * MAX * 2}deg) rotateX(${-y * MAX * 2}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition =
        'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.4s ease';
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

/* ─────────────────────────────────────────────────── */
/*  9. MAGNETIC BUTTONS                                */
/* ─────────────────────────────────────────────────── */
function initMagnetic() {
  /* Only on non-touch devices */
  if (window.matchMedia('(hover: none)').matches) return;

  const PULL = 0.36;

  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.15s ease';
    });

    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * PULL;
      const dy = (e.clientY - r.top  - r.height / 2) * PULL;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)';
      btn.style.transform  = 'translate(0, 0)';
    });
  });
}

/* ─────────────────────────────────────────────────── */
/*  10. RIPPLE EFFECT                                  */
/* ─────────────────────────────────────────────────── */
function initRipple() {
  $$('.button').forEach(btn => {
    btn.addEventListener('mousedown', e => {
      const r    = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      const el   = document.createElement('span');
      el.className = 'ripple';
      el.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `left:${e.clientX - r.left - size / 2}px`,
        `top:${e.clientY - r.top  - size / 2}px`,
      ].join(';');
      btn.appendChild(el);
      setTimeout(() => el.remove(), 680);
    });
  });
}

/* ─────────────────────────────────────────────────── */
/*  BOOT                                               */
/* ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initScrollProgress();
  initNav();
  initReveal();
  initCardTilt();
  initMagnetic();
  initRipple();
});
