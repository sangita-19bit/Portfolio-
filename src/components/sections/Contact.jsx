import { useEffect, useRef } from 'react';
import './Contact.css';

const RESUME_URL = 'https://drive.google.com/file/d/1-ryW-Ycm13d3RWEMUZtK3-7kiUNzW36b/view?usp=sharing';

const CONTACT_LINKS = [
  {
    id: 'email',
    label: 'Email',
    value: 'sangitabeauty67@gmail.com',
    href: 'mailto:sangitabeauty67@gmail.com',
    external: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'sangita-as196',
    href: 'https://www.linkedin.com/in/sangita-as196/',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'sangita-19bit',
    href: 'https://github.com/sangita-19bit/',
    external: true,
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    value: 'Schowdhury85',
    href: 'https://leetcode.com/u/Schowdhury85/',
    external: true,
  },
];

export default function Contact() {
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section contact-section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact__inner">

          {/* Left — headline */}
          <div className="contact__left reveal">
            <p className="section-label">Contact</p>

            <h2 className="contact__headline">
              Let's build something{' '}
              <em>intelligent.</em>
            </h2>

            <p className="contact__sub">
              I'm actively seeking internship and project opportunities in AI/ML and
              software engineering. If you're building something meaningful, I'd love to talk.
            </p>

            <div className="contact__status">
              <span className="contact__status-dot" aria-hidden="true" />
              <span>Open to internships & collaborations</span>
            </div>
          </div>

          {/* Right — links + CTAs */}
          <div className="contact__right">
            {/* Contact links */}
            <nav
              className="contact__links reveal"
              style={{ transitionDelay: '80ms' }}
              aria-label="Contact links"
            >
              {CONTACT_LINKS.map(link => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="contact__link"
                  aria-label={`${link.label}: ${link.value}`}
                >
                  <div className="contact__link-left">
                    <span className="contact__link-label">{link.label}</span>
                    <span className="contact__link-value">{link.value}</span>
                  </div>
                  <span className="contact__link-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="contact__actions reveal" style={{ transitionDelay: '160ms' }}>
              <a
                href="mailto:sangitabeauty67@gmail.com?subject=Portfolio%20Inquiry"
                className="btn btn-primary"
                id="contact-email-cta"
              >
                Send Email
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M1 6h10M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                id="contact-resume-cta"
              >
                View Resume ↗
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
