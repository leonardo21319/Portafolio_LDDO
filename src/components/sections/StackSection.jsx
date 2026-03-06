// src/components/sections/StackSection.jsx
import { useEffect, useRef, useState } from 'react';
import { useTechStack } from '../../hooks/useTechStack';
import { getIconComponent } from '../../utils/iconMapper';
import '../../styles/stack.css';

// ── Categorías en orden y sus íconos/colores de encabezado ──
const CAT_META = {
  Frontend:     { icon: '🖥️',  line: 'rgba(97,218,251,.5)' },
  Mobile:       { icon: '📱',  line: 'rgba(84,197,248,.5)' },
  Backend:      { icon: '⚙️',  line: 'rgba(104,160,99,.5)' },
  Cloud:        { icon: '☁️',  line: 'rgba(255,153,0,.5)'  },
  Herramientas: { icon: '🔧',  line: 'rgba(162,89,255,.5)' },
  'Base de datos': { icon: '🗄️', line: 'rgba(0,117,143,.5)' },
};
const CAT_ORDER = ['Frontend','Mobile','Backend','Cloud','Base de datos','Herramientas'];

export default function StackSection() {
  // ✅ useTechStack devuelve { techStack }, lo renombramos
  const { techStack: technologies = [], loading } = useTechStack();
  const [popup, setPopup]   = useState(null);
  const sectionRef          = useRef(null);
  const headersRef          = useRef([]);

  // ── Agrupar por categoría ──
  const grouped = CAT_ORDER.reduce((acc, cat) => {
    const items = technologies.filter(t => (t.category || t.categoria) === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});
  // Categorías que no estén en CAT_ORDER
  technologies.forEach(t => {
    const cat = t.category || t.categoria || 'Herramientas';
    if (!grouped[cat]) grouped[cat] = [];
    if (!grouped[cat].find(x => x.id === t.id)) grouped[cat].push(t);
  });

  // ── Animate headers cuando el section entra ──
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        // Anima labels y títulos de sección
        sectionRef.current.querySelectorAll('.section-label, .section-title')
          .forEach(el => el.classList.add('vis'));
        // Anima cat-headers con stagger
        headersRef.current.forEach((h, i) => {
          if (h) setTimeout(() => h.classList.add('vis'), i * 120);
        });
        obs.unobserve(e.target);
      });
    }, { threshold: 0.05 });
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [technologies]);

  // ── Animate cards — espera dos frames + 150ms para que React pinte ──
  useEffect(() => {
    if (!technologies.length) return;
    let t1, t2;
    // requestAnimationFrame doble para asegurar que el DOM está pintado
    t1 = requestAnimationFrame(() => {
      t2 = setTimeout(() => {
        const cards = document.querySelectorAll('#tecnologias .tc');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('vis');
            setTimeout(() => card.classList.add('floating'), 600);
          }, i * 60);
        });
      }, 150);
    });
    return () => { cancelAnimationFrame(t1); clearTimeout(t2); };
  }, [technologies]);

  // ── Escape cierra popup ──
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') setPopup(null); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  // ── Loading state ──
  if (loading) return (
    <section id="tecnologias">
      <div className="section" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,.3)', fontFamily: 'var(--mono)', fontSize: '.75rem' }}>
          // cargando tecnologías...
        </p>
      </div>
    </section>
  );

  const cats = Object.keys(grouped);

  return (
    <>
      <section id="tecnologias" ref={sectionRef}>
        <div className="section">
          <div className="section-label">// stack</div>
          <h2 className="section-title">Mi <span>Stack</span></h2>

          {cats.map((cat, ci) => {
            const items = grouped[cat];
            const meta  = CAT_META[cat] || { icon: '🔧', line: 'rgba(255,255,255,.3)' };

            return (
              <div className="tech-cat" key={cat}>
                {/* Header de categoría */}
                <div
                  className="cat-header"
                  ref={el => headersRef.current[ci] = el}
                >
                  <span className="cat-icon">{meta.icon}</span>
                  <span className="cat-name">{cat}</span>
                  <div className="cat-line" />
                  <div className="cat-count">
                    <span className="cat-count-num">
                      {String(items.length).padStart(2, '0')}
                    </span>&nbsp;techs
                  </div>
                </div>

                {/* Grid de cards */}
                <div className="tc-grid">
                  {items.map((tech, ti) => {
                    const hc  = tech.color     || 'rgba(0,123,255,.55)';
                    const hg  = tech.glowColor || tech.color || 'rgba(0,123,255,.12)';
                    const IconComp = tech.iconName ? getIconComponent(tech.iconName) : null;

                    return (
                      <div
                        key={tech.id}
                        className="tc"
                        title={tech.name || tech.nombre}
                        style={{
                          '--hc':  hc,
                          '--hg':  `${hg.replace(')', ', .12)').replace('rgba', 'rgba')}`,
                          '--hbg': hc.replace(/[\d.]+\)$/, '.06)'),
                          '--lc':  hc.replace(/[\d.]+\)$/, '.9)'),
                          '--lbg': hc.replace(/[\d.]+\)$/, '.15)'),
                          '--fd':  `${3.5 + (ti % 4) * 0.4}s`,
                          '--fdel':`${(ti % 6) * 0.3}s`,
                          '--sd':  `${5 + (ti % 3) * 1.5}s`,
                          '--sdel':`${(ti % 5) * 0.8}s`,
                        }}
                        onClick={() => setPopup(tech)}
                      >
                        <div className="tc-logo">
                          {/* Prioridad: svgContent → iconUrl → react-icons → emoji */}
                          {tech.svgContent
                            ? <span dangerouslySetInnerHTML={{ __html: tech.svgContent }} />
                            : tech.iconUrl
                            ? <img src={tech.iconUrl} alt={tech.name || tech.nombre} />
                            : IconComp
                            ? <IconComp size={28} color={tech.color || '#fff'} />
                            : <span style={{ fontSize: '1.4rem' }}>{tech.emoji || '🔧'}</span>
                          }
                        </div>
                        <div className="tc-name">{tech.name || tech.nombre}</div>
                        {tech.level && (
                          <div className="tc-level">{tech.level}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── POPUP ── */}
      <div
        className={`tc-popup-overlay${popup ? ' open' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) setPopup(null); }}
      >
        {popup && (
          <div className="tc-popup">
            <button className="tc-popup-close" onClick={() => setPopup(null)}>✕</button>

            <div className="tc-popup-header">
              <div
                className="tc-popup-icon"
                style={{ color: popup.color || '#fff' }}
              >
                {popup.svgContent
                  ? <span dangerouslySetInnerHTML={{ __html: popup.svgContent }} />
                  : popup.iconUrl
                  ? <img src={popup.iconUrl} alt={popup.name} style={{ width: 36, height: 36 }} />
                  : popup.iconName
                  ? (() => { const I = getIconComponent(popup.iconName); return <I size={36} color={popup.color || '#fff'} />; })()
                  : <span style={{ fontSize: '2rem' }}>{popup.emoji || '🔧'}</span>
                }
              </div>
              <div className="tc-popup-meta">
                <div className="tc-popup-name">{popup.name || popup.nombre}</div>
                <div className="tc-popup-cat">
                  {popup.category || popup.categoria}
                  {(popup.level || popup.nivel) && ` · ${popup.level || popup.nivel}`}
                </div>
              </div>
            </div>

            {(popup.description || popup.desc) && (
              <p className="tc-popup-desc">{popup.description || popup.desc}</p>
            )}

            {popup.tags?.length > 0 && (
              <>
                <div className="tc-popup-label">Tags</div>
                <div className="tc-popup-tags">
                  {popup.tags.map(t => (
                    <span key={t} className="tc-popup-tag">{t}</span>
                  ))}
                </div>
              </>
            )}

            {popup.projects?.length > 0 && (
              <>
                <div className="tc-popup-label">Proyectos donde la usé</div>
                <div className="tc-popup-projects">
                  {popup.projects.map(p => (
                    <div key={p} className="tc-popup-project">→ {p}</div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}