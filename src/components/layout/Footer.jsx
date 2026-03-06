// src/components/layout/Footer.jsx
// ── Footer limpio — el "hecho con" vive SOLO aquí ──
const Footer = () => {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const year = new Date().getFullYear();

  const LINKS = [
    { label: 'Inicio',          id: 'hero' },
    { label: 'Sobre Mí',        id: 'about' },
    { label: 'Tecnologías',     id: 'tecnologias' },
    { label: 'Certificaciones', id: 'certificaciones' },
    { label: 'Proyectos',       id: 'proyectos' },
    { label: 'Experiencia',     id: 'experiencia' },
    { label: 'Contacto',        id: 'contacto' },
  ];

  return (
    <>
      <style>{`
        .footer {
          border-top: 1px solid rgba(255,255,255,.07);
          background: rgba(4,7,15,.95);
          padding: 3.5rem 1.5rem 2rem;
        }
        .footer-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2.5rem;
        }
        .footer-logo { display: flex; align-items: center; gap: .75rem; margin-bottom: .85rem; }
        .footer-logo-icon {
          width: 38px; height: 38px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.04);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.05rem; font-weight: 800;
        }
        .footer-logo-name { font-size: 1rem; font-weight: 700; color: #fff; }
        .footer-desc { font-size: .78rem; color: rgba(255,255,255,.35); line-height: 1.7; margin-bottom: 1rem; }
        .footer-socials { display: flex; gap: .7rem; }
        .footer-social {
          width: 34px; height: 34px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,.4); text-decoration: none;
          transition: border-color .25s, color .25s, background .25s;
        }
        .footer-social:hover { border-color: rgba(0,123,255,.5); color: #007bff; background: rgba(0,123,255,.07); }
        .footer-social svg { width: 16px; height: 16px; }

        .footer-col-title {
          font-size: .7rem; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(255,255,255,.25);
          margin-bottom: .9rem; font-family: 'JetBrains Mono', monospace;
        }
        .footer-links { display: flex; flex-direction: column; gap: .35rem; }
        .footer-link {
          background: none; border: none; cursor: pointer; text-align: left;
          font-size: .8rem; color: rgba(255,255,255,.38); padding: .18rem 0;
          transition: color .22s; font-family: 'Inter', sans-serif;
        }
        .footer-link:hover { color: #fff; }

        .footer-contact-row { display: flex; align-items: center; gap: .55rem; margin-bottom: .55rem; }
        .footer-contact-row svg { width: 15px; height: 15px; color: #007bff; flex-shrink: 0; }
        .footer-contact-link { font-size: .78rem; color: rgba(255,255,255,.38); text-decoration: none; transition: color .22s; }
        .footer-contact-link:hover { color: #fff; }

        .footer-bottom {
          max-width: 1100px; margin: 2.5rem auto 0;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,.06);
          text-align: center;
          font-size: .73rem; color: rgba(255,255,255,.22);
        }
        .footer-bottom span { color: rgba(255,255,255,.45); }

        @media (max-width: 680px) { .footer-inner { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 420px) { .footer-inner { grid-template-columns: 1fr; } }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">

          {/* Col 1 — Marca */}
          <div>
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <span style={{ color: '#fff' }}>L</span>
                <span style={{ color: '#007bff' }}>D</span>
              </div>
              <span className="footer-logo-name">Leonardo Daniel</span>
            </div>
            <p className="footer-desc">
              Mobile &amp; Frontend Developer Jr · React, Flutter, AWS · enfocado en UX y calidad.
            </p>
            <div className="footer-socials">
              <a className="footer-social" href="https://github.com/leodanieldom" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a className="footer-social" href="https://www.linkedin.com/in/leodanieldom" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a className="footer-social" href="mailto:leo14dany2011@gmail.com" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Nav */}
          <div>
            <div className="footer-col-title">// nav</div>
            <div className="footer-links">
              {LINKS.map(l => (
                <button key={l.id} className="footer-link" onClick={() => go(l.id)}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3 — Contacto */}
          <div>
            <div className="footer-col-title">// contacto</div>
            <div className="footer-contact-row">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a className="footer-contact-link" href="mailto:leo14dany2011@gmail.com">leo14dany2011@gmail.com</a>
            </div>
            <div className="footer-contact-row">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63a19.79 19.79 0 01-3.07-8.73A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
              <a className="footer-contact-link" href="tel:+525618497690">56 1849 7690</a>
            </div>
            <div className="footer-contact-row">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span className="footer-contact-link">Ciudad de México, México</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Leonardo Daniel Domínguez Olvera</span>
          {' '}· Hecho con ❤️ en React + Firebase
        </div>
      </footer>
    </>
  );
};

export default Footer;