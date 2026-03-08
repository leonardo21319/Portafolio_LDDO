// src/admin/AdminLayout.jsx
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

const STYLE_ID = 'adm-layout-styles';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    .adm-nav-link {
      display: inline-flex; align-items: center;
      padding: 0 4px;
      height: 64px;
      font-size: .875rem; font-weight: 500;
      color: rgba(255,255,255,.45);
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: color .2s, border-color .2s;
      white-space: nowrap;
    }
    .adm-nav-link:hover  { color: #60a5fa; border-bottom-color: rgba(96,165,250,.4); }
    .adm-nav-link.active { color: #60a5fa; border-bottom-color: #3b82f6; }

    .adm-logout-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 14px;
      background: rgba(239,68,68,.08);
      border: 1px solid rgba(239,68,68,.2);
      border-radius: 9px;
      color: #f87171;
      font-size: .82rem; font-weight: 600;
      font-family: inherit; cursor: pointer;
      transition: background .2s, border-color .2s;
    }
    .adm-logout-btn:hover:not(:disabled) {
      background: rgba(239,68,68,.15);
      border-color: rgba(239,68,68,.35);
    }
    .adm-logout-btn:disabled { opacity: .5; cursor: not-allowed; }

    @keyframes adm-spin { to { transform: rotate(360deg); } }
    .adm-spin {
      width: 14px; height: 14px;
      border: 2px solid rgba(248,113,113,.3);
      border-top-color: #f87171;
      border-radius: 50%;
      animation: adm-spin .7s linear infinite;
    }

    @media (max-width: 640px) {
      .adm-nav-links { display: none !important; }
      .adm-email     { display: none !important; }
    }
  `;
  document.head.appendChild(s);
}

const AdminLayout = () => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const { user }   = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut(auth);
      navigate('/admin/login');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinks = [
    { to: '/admin',              label: 'Dashboard'   },
    { to: '/admin/projects',     label: 'Proyectos'   },
    { to: '/admin/technologies', label: 'Tecnologías' },
    { to: '/admin/hero',         label: 'Hero'        },
  ];

  const isActive = (to) =>
    to === '/admin'
      ? location.pathname === '/admin'
      : location.pathname.startsWith(to);

  return (
    <div style={{ minHeight: '100vh', background: '#060b18', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Navbar ── */}
      <nav style={{
        background: 'rgba(6,11,24,.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,.07)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

          {/* Left: logo + links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/admin" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <span style={{
                fontSize: '1.05rem', fontWeight: 800,
                background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Admin Panel
              </span>
            </Link>

            <div className="adm-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`adm-nav-link${isActive(to) ? ' active' : ''}`}
                  style={{ marginRight: '1.5rem' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: email + logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span
              className="adm-email"
              style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.3)', fontFamily: 'monospace' }}
            >
              {user?.email}
            </span>

            <button className="adm-logout-btn" onClick={handleLogout} disabled={loggingOut}>
              {loggingOut ? (
                <span className="adm-spin" />
              ) : (
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              )}
              {loggingOut ? 'Saliendo…' : 'Cerrar Sesión'}
            </button>
          </div>

        </div>
      </nav>

      {/* ── Main content ── */}
      <main style={{ padding: '2rem 1.5rem' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          background: 'rgba(255,255,255,.02)',
          border: '1px solid rgba(255,255,255,.06)',
          borderRadius: 18,
          padding: '1.75rem',
        }}>
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;