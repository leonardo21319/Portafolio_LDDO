// src/admin/AdminLayout.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  FiLogOut, FiHome, FiFolder, FiCpu,
  FiBriefcase, FiSettings, FiUser, FiMenu, FiX,
  FiAward, FiChevronRight, FiExternalLink,
} from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';

/* ─── Inject global styles once ─── */
const STYLE_ID = 'adm-layout-styles';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes adm-spin { to { transform: rotate(360deg); } }
    .adm-sidebar {
      position: fixed; top: 0; left: 0; bottom: 0; width: 240px;
      background: rgba(8,13,24,.97);
      border-right: 1px solid rgba(255,255,255,.07);
      backdrop-filter: blur(20px);
      display: flex; flex-direction: column;
      z-index: 200;
      transition: transform .25s ease;
    }
    .adm-sidebar.open { transform: translateX(0) !important; }
    .adm-main   { margin-left: 240px; min-height: 100vh; display: flex; flex-direction: column; position: relative; z-index: 1; }
    .adm-topbar { display: none; align-items: center; gap: 12px; padding: .75rem 1rem;
      background: rgba(8,13,24,.95); border-bottom: 1px solid rgba(255,255,255,.07);
      backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 100; }
    .adm-content { flex: 1; padding: 2rem 2.5rem; }
    @media (max-width: 768px) {
      .adm-sidebar  { transform: translateX(-100%); }
      .adm-main     { margin-left: 0 !important; }
      .adm-topbar   { display: flex !important; }
      .adm-content  { padding: 1.25rem !important; }
    }
    .adm-navlink:hover { background: rgba(255,255,255,.04) !important; color: rgba(255,255,255,.7) !important; }
  `;
  document.head.appendChild(s);
}

/* ─── Nav ─── */
const NAV = [
  { to: '/admin',              label: 'Dashboard',    icon: FiHome,      exact: true,  enabled: true  },
  { to: '/admin/projects',     label: 'Proyectos',    icon: FiFolder,    exact: false, enabled: true  },
  { to: '/admin/technologies', label: 'Tecnologías',  icon: FiCpu,       exact: false, enabled: true  },
  { to: '/admin/experiences',  label: 'Experiencias', icon: FiBriefcase, exact: false, enabled: false },
  { to: '/admin/certs',        label: 'Certificados', icon: FiAward,     exact: false, enabled: false },
  { to: '/admin/settings',     label: 'Configuración',icon: FiSettings,  exact: false, enabled: false },
];

const AdminLayout = () => {
  const { user, logout, loading } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      console.log('🚫 No autorizado, redirigiendo a login...');
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#080d18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(59,130,246,.2)', borderTopColor: '#3b82f6', animation: 'adm-spin .8s linear infinite' }} />
      <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '.8rem' }}>Cargando panel...</p>
    </div>
  );

  if (!user) return null;

  const isActive = (item) => item.exact
    ? location.pathname === item.to
    : location.pathname === item.to || location.pathname.startsWith(item.to + '/');

  const currentLabel = NAV.find(n => isActive(n))?.label || 'Dashboard';

  const avatar = user.photoURL
    ? <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
    : <FiUser size={15} color="#3b82f6" />;

  return (
    <div style={{ minHeight: '100vh', background: '#080d18', display: 'flex', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <AnimatedBackground />

      {/* SIDEBAR */}
      <aside className={`adm-sidebar${open ? ' open' : ''}`}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '1.35rem 1.2rem 1rem', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#3b82f6,#ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '.85rem' }}>LD</span>
          </div>
          <div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '.88rem', margin: 0 }}>Admin Panel</p>
            <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '.65rem', margin: 0 }}>Portfolio CMS</p>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '1.2rem .75rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <p style={{ color: 'rgba(255,255,255,.18)', fontSize: '.58rem', fontWeight: 700, letterSpacing: '2px', padding: '0 .5rem', marginBottom: '.5rem' }}>MENÚ</p>

          {NAV.map(item => {
            const active = isActive(item);
            const Icon   = item.icon;
            if (!item.enabled) return (
              <div key={item.to} title="Próximamente"
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '.6rem .75rem', borderRadius: 9, color: 'rgba(255,255,255,.18)', fontSize: '.84rem', cursor: 'not-allowed' }}>
                <Icon size={16} />
                <span style={{ flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: '.56rem', fontWeight: 700, background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.2)', padding: '2px 6px', borderRadius: 4, letterSpacing: '.5px' }}>Soon</span>
              </div>
            );
            return (
              <Link key={item.to} to={item.to} className="adm-navlink"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '.6rem .75rem', borderRadius: 9, textDecoration: 'none',
                  fontSize: '.84rem', fontWeight: 500, transition: 'all .15s ease',
                  background: active ? 'rgba(59,130,246,.14)' : 'transparent',
                  border: active ? '1px solid rgba(59,130,246,.22)' : '1px solid transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,.42)',
                }}>
                <Icon size={16} color={active ? '#60a5fa' : 'rgba(255,255,255,.4)'} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {active && <FiChevronRight size={13} color="rgba(255,255,255,.4)" />}
              </Link>
            );
          })}
        </nav>

        {/* Back to portfolio */}
        <div style={{ padding: '0 .75rem .75rem' }}>
          <a href="/"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.55rem .75rem', borderRadius: 9, color: 'rgba(255,255,255,.25)', fontSize: '.78rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,.06)', background: 'rgba(255,255,255,.02)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,.55)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.25)'}
          >
            <FiExternalLink size={13} />
            <span>Ver portafolio</span>
          </a>
        </div>

        {/* User box */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '.9rem 1rem 1.1rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(59,130,246,.12)', border: '1px solid rgba(59,130,246,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
            {avatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: '#fff', fontWeight: 600, fontSize: '.78rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.displayName || 'Admin'}</p>
            <p style={{ color: 'rgba(255,255,255,.28)', fontSize: '.63rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
          </div>
          <button onClick={logout} title="Cerrar sesión"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 5, borderRadius: 7, display: 'flex', alignItems: 'center' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <FiLogOut size={15} color="#f87171" />
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 199, backdropFilter: 'blur(3px)' }} />}

      {/* MAIN */}
      <div className="adm-main">
        <div className="adm-topbar">
          <button onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
            {open ? <FiX size={20} color="#fff" /> : <FiMenu size={20} color="#fff" />}
          </button>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '.88rem', flex: 1 }}>{currentLabel}</span>
          <a href="/" style={{ color: 'rgba(255,255,255,.3)', fontSize: '.75rem', textDecoration: 'none' }}>← Inicio</a>
        </div>
        <div className="adm-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;