// src/components/sections/ProjectsSection.jsx
import { useEffect, useRef } from 'react';
import { useProjects } from '../../hooks/useProjects';
import '../../styles/projects.css';

/* ── status color ── */
const getStatusColor = (s) => {
  if (!s) return '#60a5fa';
  const lc = s.toLowerCase();
  if (lc.includes('producc') || lc.includes('complet')) return '#4ade80';
  if (lc.includes('desarroll') || lc.includes('progres')) return '#fbbf24';
  if (lc.includes('pause')    || lc.includes('pausa'))   return '#f87171';
  return '#60a5fa';
};

/* grid size pattern */
const getSize = (index, total) => {
  if (total === 1) return 'full';
  if (total === 2) return 'half';
  const pattern = ['wide', 'tall', 'normal', 'normal', 'wide'];
  return pattern[index % pattern.length];
};

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

/*
  Placeholder visual para cards sin imagen.
  Reproduce las dos animaciones del carrusel original:
  - Línea radar giratoria (pj-radar → bento-radar)
  - Ícono/emoji central (pj-center-icon → bento-center-icon)
*/
const ProjectPlaceholder = ({ emoji, color, radarDur, radarDel }) => (
  <div className="bento-placeholder" style={{ '--pc': color }}>

    {/* dot grid de fondo */}
    <div className="bento-placeholder__dots" />

    {/* glow radial del color del proyecto */}
    <div
      className="bento-placeholder__glow"
      style={{ background: `radial-gradient(circle at 50% 50%, ${color}38 0%, transparent 65%)` }}
    />

    {/* ── RADAR: línea giratoria ── */}
    <div
      className="bento-radar"
      style={{
        '--rdur': radarDur,
        '--rdel': radarDel,
        borderColor: `${color}55`,
      }}
    >
      <div className="bento-radar__line" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
    </div>

    {/* ── ÍCONO CENTRAL ── */}
    <div
      className="bento-center-icon"
      style={{ background: `${color}1c`, border: `1px solid ${color}50` }}
    >
      {emoji
        ? <span className="bento-emoji">{emoji}</span>
        : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"
            className="bento-svg-icon" style={{ color }}>
            <rect x="2" y="3" width="20" height="14" rx="2.5"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
        )
      }
    </div>
  </div>
);

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
export default function ProjectsSection() {
  const { projects, loading } = useProjects();
  const sectionRef = useRef(null);

  /* Agrega .vis para animar section-label y section-title */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.section-label, .section-title').forEach(n => n.classList.add('vis'));
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Loading */
  if (loading) return (
    <section id="proyectos" ref={sectionRef}>
      <div className="section">
        <div className="section-label">// proyectos</div>
        <h2 className="section-title">Mi <span>Trabajo</span></h2>
        <div className="bento-grid bento-grid--3">
          {['wide','tall','normal','normal'].map((s,i) => (
            <div key={i} className={`bento-card bento-card--${s} bento-skeleton`} />
          ))}
        </div>
      </div>
    </section>
  );

  /* Empty */
  if (!projects.length) return (
    <section id="proyectos" ref={sectionRef}>
      <div className="section">
        <div className="section-label">// proyectos</div>
        <h2 className="section-title">Mi <span>Trabajo</span></h2>
        <p style={{ color:'rgba(255,255,255,.28)', fontFamily:'monospace', fontSize:'.72rem', marginTop:'1.5rem' }}>
          // sin proyectos — agrégalos desde el panel admin
        </p>
      </div>
    </section>
  );

  const gridClass = projects.length === 1 ? 'bento-grid--1'
                  : projects.length === 2 ? 'bento-grid--2'
                  : 'bento-grid--3';

  return (
    <section id="proyectos" ref={sectionRef}>
      <div className="section">

        <div className="section-label">// proyectos</div>
        <h2 className="section-title">Mi <span>Trabajo</span></h2>
        <p className="bento-count">
          {projects.length} proyecto{projects.length !== 1 ? 's' : ''}
        </p>

        <div className={`bento-grid ${gridClass}`}>
          {projects.map((p, i) => {
            const size    = getSize(i, projects.length);
            const color   = p.color || '#3b82f6';
            const sc      = p.statusColor || getStatusColor(p.status);
            const tags    = Array.isArray(p.tags)         ? p.tags
                          : Array.isArray(p.technologies) ? p.technologies : [];
            const maxTags = size === 'normal' ? 3 : 5;
            const hasLinks = p.demoUrl || p.liveUrl || p.githubUrl || p.repoUrl;

            return (
              <article
                key={p.id}
                className={`bento-card bento-card--${size}`}
                style={{ '--c': color, '--glow': color + '44' }}
              >
                {/* BG: imagen real o placeholder con radar */}
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.title || ''} className="bento-bg-img" />
                ) : (
                  <ProjectPlaceholder
                    emoji={p.emoji}
                    color={color}
                    radarDur={`${4.6 + i * 0.2}s`}
                    radarDel={`${i * 0.4}s`}
                  />
                )}

                {/* Overlay */}
                <div className="bento-overlay" />

                {/* Badge categoría */}
                {(p.category || p.type) && (
                  <span className="bento-badge bento-badge--left">
                    {p.category || p.type}
                  </span>
                )}

                {/* Badge status */}
                {p.status && (
                  <span className="bento-badge bento-badge--right" style={{ color: sc }}>
                    <i style={{
                      background: sc, width: 6, height: 6, borderRadius: '50%',
                      display: 'inline-block', marginRight: 5, flexShrink: 0
                    }} />
                    {p.status}
                  </span>
                )}

                {/* Contenido — siempre visible */}
                <div className="bento-body">
                  <h3 className="bento-title">{p.title || p.name || 'Sin título'}</h3>

                  {p.subtitle && <p className="bento-sub">{p.subtitle}</p>}

                  {(p.description || p.descripcion) && (
                    <p className="bento-desc">
                      {p.description || p.descripcion}
                    </p>
                  )}

                  {tags.length > 0 && (
                    <div className="bento-tags">
                      {tags.slice(0, maxTags).map(t => (
                        <span key={t} className="bento-tag">{t}</span>
                      ))}
                      {tags.length > maxTags && (
                        <span className="bento-tag bento-tag--more">+{tags.length - maxTags}</span>
                      )}
                    </div>
                  )}

                  {hasLinks && (
                    <div className="bento-links">
                      {(p.demoUrl || p.liveUrl) && (
                        <a href={p.demoUrl || p.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="bento-btn bento-btn--live" onClick={e => e.stopPropagation()}>
                          Demo ↗
                        </a>
                      )}
                      {(p.githubUrl || p.repoUrl) && (
                        <a href={p.githubUrl || p.repoUrl} target="_blank" rel="noopener noreferrer"
                          className="bento-btn bento-btn--repo" onClick={e => e.stopPropagation()}>
                          <GithubIcon /> GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}