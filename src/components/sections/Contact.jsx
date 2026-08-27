import './Contact.css';

const RESUME_URL = 'https://drive.google.com/file/d/1-ryW-Ycm13d3RWEMUZtK3-7kiUNzW36b/view?usp=sharing';

const LINKS = [
  {
    id: 'email',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
    label: 'Email',
    value: 'sangitabeauty67@gmail.com',
    href: 'mailto:sangitabeauty67@gmail.com',
  },
  {
    id: 'linkedin',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'sangita-as196',
    href: 'https://www.linkedin.com/in/sangita-as196/',
  },
  {
    id: 'github',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    label: 'GitHub',
    value: 'sangita-19bit',
    href: 'https://github.com/sangita-19bit/',
  },
  {
    id: 'phone',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.6 19.79 19.79 0 01.04 4.98 2 2 0 012 2.84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 10.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '7811884298',
    href: 'tel:7811884298',
  },
];

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">

        <div className="contact__card reveal">
          <div className="contact__glow" aria-hidden="true" />

          <div className="contact__content">
            <p className="section-label">Let's Connect</p>
            <h2 className="contact__headline">
              Have an idea<br />worth building?
            </h2>
            <p className="contact__sub">
              I'm actively seeking internship and project opportunities in AI/ML and software engineering.
              If you're building something interesting, I'd love to talk.
            </p>

            <div className="contact__links">
              {LINKS.map(link => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.id !== 'email' && link.id !== 'phone' ? '_blank' : undefined}
                  rel={link.id !== 'email' && link.id !== 'phone' ? 'noreferrer' : undefined}
                  className="contact__link"
                  aria-label={`${link.label}: ${link.value}`}
                >
                  <span className="contact__link-icon">{link.icon}</span>
                  <div>
                    <span className="contact__link-label">{link.label}</span>
                    <span className="contact__link-value">{link.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="contact__actions">
            <a
              href="mailto:sangitabeauty67@gmail.com?subject=Portfolio%20Inquiry"
              className="btn btn-primary contact__cta"
              id="contact-email-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
              Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/sangita-as196/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary contact__cta"
              id="contact-linkedin-btn"
            >
              LinkedIn ↗
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost contact__cta"
              id="contact-resume-btn"
            >
              Download Resume ↗
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
