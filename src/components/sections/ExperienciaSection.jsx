// src/components/sections/ExperienciaSection.jsx
// Lee la colección 'experiences' — necesita reglas de lectura pública en Firestore
// Si no hay permisos, muestra sección vacía sin crashear
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useIntersection } from '../../hooks/useIntersection';
import '../../styles/experiencia.css';

const DEFAULT_COLORS = [
  { color: 'rgba(0,212,255,.85)',  bg: 'linear-gradient(135deg,#001828,#001018)' },
  { color: 'rgba(162,89,255,.85)', bg: 'linear-gradient(135deg,#100820,#080412)' },
  { color: 'rgba(52,211,153,.85)', bg: 'linear-gradient(135deg,#041a10,#020e08)' },
  { color: 'rgba(255,165,0,.85)',  bg: 'linear-gradient(135deg,#1a1000,#0e0800)' },
];

const PARTICLES = [
  { ps:'3px', pd:'3.2s', pdel:'0s',   left:'10%', top:'30%' },
  { ps:'5px', pd:'4.1s', pdel:'.8s',  left:'25%', top:'65%' },
  { ps:'2px', pd:'2.8s', pdel:'.3s',  left:'55%', top:'20%' },
  { ps:'4px', pd:'3.6s', pdel:'1.1s', left:'75%', top:'55%' },
  { ps:'3px', pd:'5s',   pdel:'.5s',  left:'88%', top:'40%' },
];

export default function ExperienciaSection() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [permError, setPermError]     = useState(false);
  const sectionRef = useIntersection(['.section-label', '.section-title', '.exp-wrap']);

  useEffect(() => {
    getDocs(query(collection(db, 'experiences'), orderBy('order', 'asc')))
      .then(snap => setExperiences(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
      .catch(err => {
        // Si es error de permisos, mostrar sección vacía silenciosamente
        if (err.code === 'permission-denied') {
          setPermError(true);
          console.warn('ExperienciaSection: agrega reglas de lectura pública en Firestore para la colección "experiences"');
        } else {
          console.error('Error fetching experiences:', err);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = ts => {
    if (!ts) return '';
    if (ts.toDate) return ts.toDate().toLocaleDateString('es-MX', { month: 'short', year: 'numeric' });
    if (typeof ts === 'string') return ts;
    return '';
  };

  // Stagger nodes
  useEffect(() => {
    if (!experiences.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.exp-node').forEach((node, i) => {
            setTimeout(() => node.classList.add('vis'), i * 150);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    const wrap = document.querySelector('.exp-wrap');
    if (wrap) obs.observe(wrap);
    return () => obs.disconnect();
  }, [experiences]);

  // Si no hay datos ni permisos, no mostrar la sección
  if (permError || (!loading && !experiences.length)) return null;

  if (loading) return (
    <section id="experiencia">
      <div className="section">
        <p style={{ color: 'rgba(255,255,255,.3)', fontFamily: 'var(--mono)', fontSize: '.7rem' }}>
          // cargando experiencia...
        </p>
      </div>
    </section>
  );

  return (
    <section id="experiencia" ref={sectionRef}>
      <div className="section">
        <div className="section-label">// experiencia</div>
        <h2 className="section-title">Mi <span>Trayectoria</span></h2>

        <div className="exp-wrap">
          <div className="exp-timeline">
            {experiences.map((exp, i) => {
              const def      = DEFAULT_COLORS[i % DEFAULT_COLORS.length];
              const color    = exp.color      || def.color;
              const bg       = exp.bgGradient || def.bg;
              const isCurrent = exp.isCurrentJob || exp.isCurrent || !exp.endDate;

              return (
                <div
                  key={exp.id}
                  className={`exp-node${isCurrent ? ' current' : ''}`}
                  style={{ '--ecolor': color, '--ebg': bg }}
                >
                  <div className="exp-dot" />
                  <div className="exp-card">
                    <div className="exp-banner">
                      <div className="exp-particles">
                        {PARTICLES.map((p, pi) => (
                          <div key={pi} className="exp-particle" style={{ '--ps':p.ps,'--pd':p.pd,'--pdel':p.pdel, left:p.left, top:p.top }} />
                        ))}
                      </div>
                      <div className="exp-logo">{exp.emoji || '💼'}</div>
                      <div className="exp-company-info">
                        <div className="exp-company">{exp.company || exp.empresa}</div>
                        <div className="exp-role">{exp.position || exp.cargo}</div>
                        <div className="exp-period">
                          <div className="exp-period-dot" />
                          {formatDate(exp.startDate || exp.fechaInicio)}
                          {' — '}
                          {isCurrent ? 'Presente' : formatDate(exp.endDate || exp.fechaFin)}
                        </div>
                      </div>
                      {isCurrent && <div className="exp-badge">● Actual</div>}
                    </div>
                    <div className="exp-body">
                      {(exp.description || exp.descripcion) && (
                        <div className="exp-desc">{exp.description || exp.descripcion}</div>
                      )}
                      {(exp.achievements || exp.logros)?.length > 0 && (
                        <div className="exp-achievements">
                          {(exp.achievements || exp.logros).map((a, ai) => (
                            <div key={ai} className="exp-achievement">
                              <div className="exp-ach-icon">{['⚡','📱','🎯','🤝','⭐'][ai % 5]}</div>
                              {a}
                            </div>
                          ))}
                        </div>
                      )}
                      {(exp.skills || exp.tecnologias)?.length > 0 && (
                        <div className="exp-skills">
                          {(exp.skills || exp.tecnologias).map(s => (
                            <span key={s} className="exp-skill">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}