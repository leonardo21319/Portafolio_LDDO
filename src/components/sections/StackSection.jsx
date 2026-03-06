// src/components/sections/StackSection.jsx
import { useEffect, useState } from 'react';
import { useTechStack } from '../../hooks/useTechStack';
import { useIntersection } from '../../hooks/useIntersection';
import '../../styles/stack.css';

export default function StackSection() {
  const { technologies, loading } = useTechStack();
  const sectionRef = useIntersection(['.section-label', '.section-title', '.tc-grid']);
  const [popup, setPopup] = useState(null);

  // Stagger cards
  useEffect(() => {
    if (!technologies.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.tc').forEach((card, i) => {
            setTimeout(() => card.classList.add('vis'), i * 40);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    const grid = document.querySelector('.tc-grid');
    if (grid) obs.observe(grid);
    return () => obs.disconnect();
  }, [technologies]);

  // Escape key closes popup
  useEffect(() => {
    const handle = e => { if (e.key === 'Escape') setPopup(null); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  if (loading) return (
    <section id="tecnologias">
      <div className="section">
        <p style={{ color: 'rgba(255,255,255,.3)', fontFamily: 'var(--mono)', fontSize: '.7rem' }}>
          // cargando tecnologías...
        </p>
      </div>
    </section>
  );

  return (
    <>
      <section id="tecnologias" ref={sectionRef}>
        <div className="section">
          <div className="section-label">// stack</div>
          <h2 className="section-title">Mis <span>Tecnologías</span></h2>

          <div className="tc-grid">
            {technologies.map(tech => (
              <div
                key={tech.id}
                className="tc"
                style={{
                  '--tc': tech.color     || 'rgba(255,255,255,.3)',
                  '--tg': tech.glowColor || tech.color || 'rgba(255,255,255,.15)',
                }}
                onClick={() => setPopup(tech)}
              >
                <div className="tc-logo">
                  {tech.svgContent
                    ? <span dangerouslySetInnerHTML={{ __html: tech.svgContent }} />
                    : tech.iconUrl
                    ? <img src={tech.iconUrl} alt={tech.name || tech.nombre} />
                    : tech.Icon
                    ? <tech.Icon size={28} color={tech.color} />
                    : <span style={{ fontSize: '1.4rem' }}>{tech.emoji || '🔧'}</span>
                  }
                </div>
                <div className="tc-name">{tech.name || tech.nombre}</div>
                {tech.level && <div className="tc-level">{tech.level}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup */}
      <div
        className={`tc-popup-overlay${popup ? ' open' : ''}`}
        onClick={e => { if (e.target.classList.contains('tc-popup-overlay')) setPopup(null); }}
      >
        {popup && (
          <div className="tc-popup">
            <button className="tc-popup-close" onClick={() => setPopup(null)}>✕</button>
            <div className="tc-popup-header">
              <div className="tc-popup-icon">
                {popup.svgContent
                  ? <span dangerouslySetInnerHTML={{ __html: popup.svgContent }} />
                  : popup.iconUrl
                  ? <img src={popup.iconUrl} alt={popup.name || popup.nombre} />
                  : popup.Icon
                  ? <popup.Icon size={36} color={popup.color} />
                  : <span style={{ fontSize: '2rem' }}>{popup.emoji || '🔧'}</span>
                }
              </div>
              <div className="tc-popup-meta">
                <div className="tc-popup-name">{popup.name || popup.nombre}</div>
                <div className="tc-popup-cat">{popup.category || popup.categoria} · {popup.level || popup.nivel}</div>
              </div>
            </div>
            {(popup.description || popup.desc) && (
              <p className="tc-popup-desc">{popup.description || popup.desc}</p>
            )}
            {popup.tags?.length > 0 && (
              <>
                <div className="tc-popup-label">Tags</div>
                <div className="tc-popup-tags">
                  {popup.tags.map(t => <span key={t} className="tc-popup-tag">{t}</span>)}
                </div>
              </>
            )}
            {popup.projects?.length > 0 && (
              <>
                <div className="tc-popup-label">Proyectos donde la usé</div>
                <div className="tc-popup-projects">
                  {popup.projects.map(p => <div key={p} className="tc-popup-project">→ {p}</div>)}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}