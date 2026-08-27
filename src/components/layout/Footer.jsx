import './Footer.css';

const FOOTER_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/sangita-19bit/',         external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sangita-as196/', external: true },
  { label: 'LeetCode', href: 'https://leetcode.com/u/Schowdhury85/',       external: true },
  { label: 'Email',    href: 'mailto:sangitabeauty67@gmail.com',            external: false },
];

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <span className="footer__name">Sangita Chowdhury</span>
          <span className="footer__role">AI / ML Developer</span>
        </div>

        {/* Links */}
        <nav className="footer__links" aria-label="Footer navigation">
          {FOOTER_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="footer__link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="footer__right">
          © {new Date().getFullYear()}
        </p>

      </div>
    </footer>
  );
}
