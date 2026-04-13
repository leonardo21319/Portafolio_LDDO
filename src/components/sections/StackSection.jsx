// src/components/sections/StackSection.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTechStack } from '../../hooks/useTechStack';
import { getIconComponent } from '../../utils/iconMapper';
import { TECH_FALLBACK as FALLBACK_TECHS } from '../../data/portfolio';
import { buildCardVars } from '../../utils/uiHelpers';
import '../../styles/stack.css';

/* ── Orden y metadata de categorías ──────────────────────────── */
const CAT_ORDER = ['Frontend', 'Mobile', 'Backend', 'Cloud', 'Base de datos', 'Herramientas'];

const CAT_META = {
  Frontend:        { icon: '🖥️',  line: 'rgba(97,218,251,.5)'  },
  Mobile:          { icon: '📱',  line: 'rgba(84,197,248,.5)'  },
  Backend:         { icon: '⚙️',  line: 'rgba(104,160,99,.5)'  },
  Cloud:           { icon: '☁️',  line: 'rgba(255,153,0,.5)'   },
  'Base de datos': { icon: '🗄️', line: 'rgba(0,117,143,.5)'   },
  Herramientas:    { icon: '🔧',  line: 'rgba(162,89,255,.5)'  },
};

/* ── Componente de icono dentro de la card ────────────────────── */
function TechIcon({ tech }) {
  if (tech.svgContent) {
    return <span dangerouslySetInnerHTML={{ __html: tech.svgContent }} />;
  }
  if (tech.iconUrl) {
    return <img src={tech.iconUrl} alt={tech.name} />;
  }
  if (tech.iconName) {
    const Ic = getIconComponent(tech.iconName);
    return <Ic size={28} color={tech.color || '#ffffff'} />;
  }
  return <span style={{ fontSize: '1.4rem' }}>{tech.emoji || '🔧'}</span>;
}

/* ── Popup ────────────────────────────────────────────────────── */
function TechPopup({ tech, onClose }) {
  if (!tech) return null;

  const Ic = tech.iconName ? getIconComponent(tech.iconName) : null;

  return (
    <div className="tc-popup" style={buildCardVars(tech.color)}>
      <button className="tc-popup-close" onClick={onClose}>✕</button>

      <div className="tc-popup-header">
        <div className="tc-popup-icon">
          {tech.svgContent
            ? <span dangerouslySetInnerHTML={{ __html: tech.svgContent }} />
            : tech.iconUrl
            ? <img src={tech.iconUrl} alt={tech.name} style={{ width: 36, height: 36 }} />
            : Ic
            ? <Ic size={36} color={tech.color || '#fff'} />
            : <span style={{ fontSize: '2rem' }}>{tech.emoji || '🔧'}</span>
          }
        </div>
        <div>
          <div className="tc-popup-name">{tech.name || tech.nombre}</div>
          <div className="tc-popup-cat">{tech.category || tech.categoria}</div>
        </div>
      </div>

      <div className="tc-popup-divider" />

      <div className="tc-popup-body">
        {(tech.description || tech.desc) && (
          <p className="tc-popup-desc">{tech.description || tech.desc}</p>
        )}

        {tech.tags?.length > 0 && (
          <>
            <div className="tc-popup-label">Keywords</div>
            <div className="tc-popup-tags">
              {tech.tags.map(t => (
                <span key={t} className="tc-popup-tag">{t}</span>
              ))}
            </div>
          </>
        )}

        {tech.projects?.length > 0 && (
          <>
            <div className="tc-popup-label">Proyectos donde la usé</div>
            <div className="tc-popup-projects">
              {tech.projects.map(p => (
                <div key={p} className="tc-popup-project">{p}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Componente principal ─────────────────────────────────────── */
export default function StackSection() {
  const { techStack: firebaseTechs = [] } = useTechStack();

  const technologies = useMemo(() => {
    // Normaliza cada doc de Firebase para asegurar campos consistentes
    const normalized = firebaseTechs.map(t => ({
      ...t,
      // Soporta tanto 'name' como 'nombre'
      name:     t.name     || t.nombre     || '',
      category: t.category || t.categoria  || 'Herramientas',
      color:    t.color    || '#ffffff',
      iconName: t.iconName || t.icon       || '',
    }));

    // Deduplica por nombre (case-insensitive) — Firebase tiene prioridad
    const firebaseNames = new Set(
      normalized.map(t => t.name.toLowerCase().trim())
    );
    const uniqueFallback = FALLBACK_TECHS.filter(
      t => !firebaseNames.has(t.name.toLowerCase().trim())
    );

    return [...normalized, ...uniqueFallback];
  }, [firebaseTechs]);
  const [popup, setPopup]   = useState(null);
  const sectionRef          = useRef(null);
  const headersRef          = useRef([]);

  /* ── Agrupar por categoría respetando CAT_ORDER ── */
  const grouped = CAT_ORDER.reduce((acc, cat) => {
    const items = technologies.filter(
      t => (t.category || t.categoria) === cat
    );
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  /* Categorías extra que vengan de Firebase pero no estén en CAT_ORDER */
  technologies.forEach(t => {
    const cat = t.category || t.categoria || 'Herramientas';
    if (!grouped[cat]) grouped[cat] = [];
    if (!grouped[cat].find(x => x.id === t.id)) grouped[cat].push(t);
  });

  const cats = Object.keys(grouped);

  /* ── Reveal de headers al hacer scroll ── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        sectionRef.current
          .querySelectorAll('.section-label, .section-title')
          .forEach(el => el.classList.add('vis'));
        headersRef.current.forEach((h, i) => {
          if (h) setTimeout(() => h.classList.add('vis'), i * 120);
        });
        obs.unobserve(e.target);
      });
    }, { threshold: 0.05 });
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [technologies.length]);

  // IDs que ya han sido animados — persiste entre re-renders
  const animatedIds = useRef(new Set());

  /* ── Animar cards nuevas cuando technologies cambia ── */
  useEffect(() => {
    if (!technologies.length) return;

    const t = setTimeout(() => {
      document.querySelectorAll('#tecnologias .tc[data-id]').forEach((card, i) => {
        const id = card.dataset.id;
        if (!animatedIds.current.has(id)) {
          animatedIds.current.add(id);
          card.style.transitionDelay = `${i * 0.04}s`;
          card.classList.add('vis');
          setTimeout(() => {
            card.classList.add('floating');
            card.style.transitionDelay = '';
          }, 500);
        }
      });
    }, 100);

    return () => clearTimeout(t);
  }, [technologies]);

  /* ── Escape cierra popup ── */
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') setPopup(null); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

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
                    </span>
                    &nbsp;techs
                  </div>
                </div>

                {/* Grid de cards */}
                <div className="tc-grid">
                  {items.map((tech, ti) => (
                    <div
                      key={tech.id}
                      className="tc"
                      data-id={tech.id}
                      title={tech.name}
                      style={buildCardVars(tech.color, ti)}
                      onClick={() => setPopup(tech)}
                    >
                      <div className="tc-logo">
                        <TechIcon tech={tech} />
                      </div>
                      <div className="tc-name">{tech.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popup */}
      <div
        className={`tc-popup-overlay${popup ? ' open' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) setPopup(null); }}
      >
        <TechPopup tech={popup} onClose={() => setPopup(null)} />
      </div>
    </>
  );
}