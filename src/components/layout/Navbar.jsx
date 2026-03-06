// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  // ── Orden exacto del HTML v7 ──
  const LINKS = [
    { label: 'Sobre Mí',        id: 'about' },
    { label: 'Tecnologías',     id: 'tecnologias' },
    { label: 'Certificaciones', id: 'certificaciones' },
    { label: 'Proyectos',       id: 'proyectos' },
    { label: 'Experiencia',     id: 'experiencia' },
  ];

  return (
    <>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 70px; padding: 0 2.5rem;
          display: flex; align-items: center; justify-content: space-between;
          transition: background .3s, backdrop-filter .3s, border-color .3s;
        }
        .navbar.scrolled {
          background: rgba(10,10,10,.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,.07);
        }

        /* Logo */
        .nav-logo {
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1.6rem; font-weight: 900;
          letter-spacing: -2px; user-select: none;
          padding: 4px; background: none; border: none;
          transition: all .3s ease;
        }
        .nav-logo .l-w { color: #fff; transition: color .3s; }
        .nav-logo .l-b { color: #007bff; transition: color .3s; }
        .nav-logo:hover .l-w { color: #007bff; }
        .nav-logo:hover .l-b { color: #fff; }

        /* Links desktop */
        .nav-links {
          display: flex; align-items: center; gap: 1.8rem;
        }
        .nav-link {
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: .84rem; font-weight: 500;
          color: rgba(255,255,255,.6); padding: 2px 0;
          position: relative; transition: color .3s ease; white-space: nowrap;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -1px; left: 0;
          width: 0; height: 2px; background: #007bff;
          border-radius: 2px; transition: width .3s ease;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }

        /* Botón Contacto — rojo sólido */
        .nav-contacto {
          display: flex; align-items: center; gap: 6px;
          background: #ff3b30; color: #fff !important;
          padding: .55rem 1.2rem; border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: .84rem; font-weight: 600;
          border: none; cursor: pointer; white-space: nowrap;
          transition: all .3s ease;
          box-shadow: 0 0 16px rgba(255,59,48,.25);
        }
        .nav-contacto:hover {
          transform: scale(1.04);
          box-shadow: 0 0 28px rgba(255,59,48,.5);
        }

        /* Hamburger */
        .nav-hamburger {
          display: none; background: none; border: none; cursor: pointer;
          padding: .4rem; border-radius: 7px; color: rgba(255,255,255,.7);
        }
        .nav-hamburger:hover { background: rgba(255,255,255,.07); }

        /* Mobile menu */
        .nav-mobile {
          display: none;
          position: absolute; top: 70px; left: 0; right: 0;
          border-top: 1px solid rgba(255,255,255,.07);
          background: rgba(10,10,10,.97);
          backdrop-filter: blur(20px);
          padding: .75rem 1.5rem 1rem;
          flex-direction: column; gap: .25rem;
        }
        .nav-mobile.open { display: flex; }
        .nav-mobile-link {
          background: none; border: none; cursor: pointer; text-align: left;
          font-family: 'Inter', sans-serif; font-size: .88rem;
          color: rgba(255,255,255,.55); padding: .6rem .85rem; border-radius: 8px;
          transition: background .2s, color .2s;
        }
        .nav-mobile-link:hover { background: rgba(255,255,255,.06); color: #fff; }
        .nav-mobile-contacto {
          display: flex; align-items: center; justify-content: center; gap: .5rem;
          margin-top: .4rem; padding: .65rem 1.2rem; border-radius: 9px;
          border: none; cursor: pointer;
          background: #ff3b30; color: #fff;
          font-family: 'Inter', sans-serif;
          font-weight: 700; font-size: .85rem;
          transition: opacity .25s;
        }
        .nav-mobile-contacto:hover { opacity: .85; }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .nav-hamburger { display: block; }
        }
      `}</style>

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <button className="nav-logo" onClick={() => go('hero')}>
          <span className="l-w">L</span><span className="l-b">D</span>
        </button>

        {/* Desktop */}
        <div className="nav-links">
          {LINKS.map(l => (
            <button key={l.id} className="nav-link" onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <button className="nav-contacto" onClick={() => go('contacto')}>
            Contacto ↗
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Menu"
        >
          {mobileOpen
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          }
        </button>

        {/* Mobile */}
        <div className={`nav-mobile${mobileOpen ? ' open' : ''}`}>
          {LINKS.map(l => (
            <button key={l.id} className="nav-mobile-link" onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <button className="nav-mobile-contacto" onClick={() => go('contacto')}>
            Contacto ↗
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;