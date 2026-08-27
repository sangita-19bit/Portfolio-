import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__brand">Sangita Chowdhury</p>
        <p className="footer__copy">
          © {year} · AI/ML Developer · Built with React & Vite
        </p>
        <div className="footer__links">
          <a href="https://github.com/sangita-19bit/" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/sangita-as196/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:sangitabeauty67@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
