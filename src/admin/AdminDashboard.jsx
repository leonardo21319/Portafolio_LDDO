// src/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import {
  FiFolder, FiCpu, FiBriefcase, FiArrowRight,
  FiPlus, FiAward, FiActivity,
} from 'react-icons/fi';

/* ─── Inject responsive styles once ─── */
const STYLE_ID = 'adm-dash-styles';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes adm-pulse { 0%,100%{opacity:.35} 50%{opacity:.7} }
    .adm-cards-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.2rem; margin-bottom: 1.4rem; }
    .adm-row2       { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
    @media (max-width: 900px) {
      .adm-cards-grid { grid-template-columns: 1fr 1fr !important; }
    }
    @media (max-width: 600px) {
      .adm-cards-grid { grid-template-columns: 1fr !important; }
      .adm-row2       { grid-template-columns: 1fr !important; }
    }
    .adm-stat-card { background: rgba(255,255,255,.03); border-radius: 16px; padding: 1.35rem; transition: border-color .2s, box-shadow .2s; text-decoration: none; display: block; }
    .adm-action-item { display: flex; align-items: center; gap: 10px; padding: .62rem .75rem; border-radius: 10px; text-decoration: none; transition: background .15s; }
    .adm-action-item:hover { background: rgba(255,255,255,.05) !important; }
  `;
  document.head.appendChild(s);
}

/* ─── Component ─── */
const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats]     = useState({ projects: { total: 0, active: 0 }, technologies: { total: 0, active: 0 } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pSnap, tSnap] = await Promise.all([
          getDocs(collection(db, 'projects')),
          getDocs(collection(db, 'technologies')),
        ]);
        const p = pSnap.docs.map(d => d.data());
        const t = tSnap.docs.map(d => d.data());
        setStats({
          projects:     { total: p.length, active: p.filter(x => x.active !== false).length },
          technologies: { total: t.length, active: t.filter(x => x.active !== false).length },
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
  const firstName = user?.displayName?.split(' ')[0] || 'Admin';

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.25rem' }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,.38)', fontSize: '.83rem', margin: '0 0 4px' }}>
            {greeting}, <span style={{ color: '#fff', fontWeight: 700 }}>{firstName}</span> 👋
          </p>
          <h1 style={{ color: '#fff', fontSize: '1.9rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-.5px' }}>Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,.33)', fontSize: '.83rem', margin: 0 }}>
            Gestiona todo el contenido de tu portafolio.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,.07)', border: '1px solid rgba(34,197,94,.18)', borderRadius: 20, padding: '5px 12px' }}>
          <FiActivity size={13} color="#22c55e" />
          <span style={{ color: '#22c55e', fontSize: '.72rem', fontWeight: 600 }}>Online</span>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="adm-cards-grid">
        <StatCard icon={FiFolder}    label="Proyectos"   color="#3b82f6" glow="rgba(59,130,246,.14)"  to="/admin/projects"     total={stats.projects.total}     active={stats.projects.active}     loading={loading} enabled />
        <StatCard icon={FiCpu}       label="Tecnologías" color="#22c55e" glow="rgba(34,197,94,.14)"   to="/admin/technologies" total={stats.technologies.total} active={stats.technologies.active} loading={loading} enabled />
        <StatCard icon={FiBriefcase} label="Experiencias"color="#a855f7" glow="rgba(168,85,247,.14)"  to="#"                   total={0}                        active={0}                        loading={false}   enabled={false} />
      </div>

      {/* ── Bottom row ── */}
      <div className="adm-row2">

        {/* Quick actions */}
        <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '1.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.1rem' }}>
            <FiPlus size={15} color="rgba(255,255,255,.4)" />
            <h2 style={{ color: '#fff', fontSize: '.88rem', fontWeight: 700, margin: 0 }}>Acciones Rápidas</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[
              { to: '/admin/projects/new',     icon: FiFolder, label: 'Nuevo proyecto',          accent: '#3b82f6' },
              { to: '/admin/technologies/new', icon: FiCpu,    label: 'Nueva tecnología',         accent: '#22c55e' },
              { to: '/admin/projects',         icon: FiFolder, label: 'Ver todos los proyectos',  accent: '#f59e0b' },
              { to: '/admin/technologies',     icon: FiCpu,    label: 'Ver tecnologías',          accent: '#ec4899' },
            ].map(a => (
              <Link key={a.to} to={a.to} className="adm-action-item">
                <div style={{ width: 28, height: 28, borderRadius: 7, background: a.accent + '15', border: `1px solid ${a.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <a.icon size={13} color={a.accent} />
                </div>
                <span style={{ flex: 1, color: 'rgba(255,255,255,.6)', fontSize: '.82rem' }}>{a.label}</span>
                <FiArrowRight size={13} color="rgba(255,255,255,.2)" />
              </Link>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '1.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.1rem' }}>
            <FiActivity size={15} color="rgba(255,255,255,.4)" />
            <h2 style={{ color: '#fff', fontSize: '.88rem', fontWeight: 700, margin: 0 }}>Resumen</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: '1.2rem' }}>
            {[
              { label: 'Proyectos activos',      val: loading ? '…' : stats.projects.active,                              color: '#3b82f6' },
              { label: 'Proyectos inactivos',    val: loading ? '…' : stats.projects.total - stats.projects.active,       color: '#f87171' },
              { label: 'Tecnologías activas',    val: loading ? '…' : stats.technologies.active,                          color: '#22c55e' },
              { label: 'Tecnologías inactivas',  val: loading ? '…' : stats.technologies.total - stats.technologies.active, color: '#f59e0b' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: row.color, flexShrink: 0 }} />
                <span style={{ flex: 1, color: 'rgba(255,255,255,.42)', fontSize: '.81rem' }}>{row.label}</span>
                <span style={{ color: row.color, fontWeight: 700, fontSize: '.88rem' }}>{row.val}</span>
              </div>
            ))}
          </div>

          {/* Upcoming sections */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '1rem' }}>
            <p style={{ color: 'rgba(255,255,255,.2)', fontSize: '.6rem', fontWeight: 700, letterSpacing: '1.5px', marginBottom: '.6rem' }}>PRÓXIMAMENTE</p>
            {['Certificaciones', 'Experiencias', 'Configuración'].map(name => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.35rem 0' }}>
                <FiAward size={12} color="rgba(255,255,255,.18)" />
                <span style={{ flex: 1, color: 'rgba(255,255,255,.22)', fontSize: '.78rem' }}>{name}</span>
                <span style={{ fontSize: '.55rem', fontWeight: 700, background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.18)', padding: '2px 6px', borderRadius: 4, letterSpacing: '.5px' }}>Soon</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

/* ── StatCard sub-component ── */
const StatCard = ({ icon: Icon, label, color, glow, to, total, active, loading, enabled }) => (
  <Link
    to={enabled ? to : '#'}
    className="adm-stat-card"
    style={{ border: `1px solid ${enabled ? color + '1a' : 'rgba(255,255,255,.06)'}`, opacity: enabled ? 1 : .45, pointerEvents: enabled ? 'auto' : 'none' }}
    onMouseEnter={e => { if (enabled) { e.currentTarget.style.borderColor = color + '44'; e.currentTarget.style.boxShadow = `0 8px 28px ${glow}`; } }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = enabled ? color + '1a' : 'rgba(255,255,255,.06)'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: color + '15', border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={19} color={color} />
      </div>
      {!enabled && <span style={{ fontSize: '.58rem', fontWeight: 700, background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.28)', padding: '2px 7px', borderRadius: 5, letterSpacing: '.5px' }}>Soon</span>}
    </div>

    <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.78rem', fontWeight: 600, margin: '0 0 .7rem', letterSpacing: '.3px' }}>{label.toUpperCase()}</p>

    {loading ? (
      <div style={{ height: 38, background: 'rgba(255,255,255,.06)', borderRadius: 8, animation: 'adm-pulse 1.5s ease infinite', marginBottom: '.7rem' }} />
    ) : (
      <div style={{ display: 'flex', gap: '.85rem', alignItems: 'center', marginBottom: '.7rem' }}>
        <div>
          <p style={{ color, fontSize: '1.45rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>{total}</p>
          <p style={{ color: 'rgba(255,255,255,.28)', fontSize: '.62rem', margin: '3px 0 0' }}>Total</p>
        </div>
        <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,.08)' }} />
        <div>
          <p style={{ color: '#22c55e', fontSize: '1.45rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>{active}</p>
          <p style={{ color: 'rgba(255,255,255,.28)', fontSize: '.62rem', margin: '3px 0 0' }}>Activos</p>
        </div>
      </div>
    )}

    {enabled && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color }}>
        <span style={{ fontSize: '.75rem', fontWeight: 600 }}>Gestionar</span>
        <FiArrowRight size={13} />
      </div>
    )}
  </Link>
);

export default AdminDashboard;