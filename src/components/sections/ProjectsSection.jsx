// src/components/sections/ProjectsSection.jsx
import { useRef, useState, useEffect, useCallback } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { useIntersection } from '../../hooks/useIntersection';
import '../../styles/projects.css';

export default function ProjectsSection() {
  const { projects, loading } = useProjects();
  const sectionRef = useIntersection(['.section-label', '.section-title', '.pj-wrap']);

  const trackRef    = useRef(null);
  const viewportRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const dragging    = useRef(false);
  const startX      = useRef(0);
  const startOff    = useRef(0);
  const liveOff     = useRef(0);

  const cardW = useCallback(() => {
    const card = trackRef.current?.querySelector('.pj');
    if (!card) return 344;
    return card.getBoundingClientRect().width + 22;
  }, []);

  const goTo = useCallback((i, instant = false) => {
    if (!trackRef.current || !projects.length) return;
    const n = Math.max(0, Math.min(i, projects.length - 1));
    setIdx(n);
    liveOff.current = n * cardW();
    if (instant) {
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform  = `translateX(-${liveOff.current}px)`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.transition = '';
      }));
    } else {
      trackRef.current.style.transform = `translateX(-${liveOff.current}px)`;
    }
  }, [projects.length, cardW]);

  // Mouse drag
  const onMouseDown = e => {
    e.preventDefault();
    dragging.current = true;
    startX.current   = e.clientX;
    startOff.current = liveOff.current;
    viewportRef.current?.classList.add('is-dragging');
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };
  const onMouseMove = useCallback(e => {
    if (!dragging.current) return;
    const max = (projects.length - 1) * cardW();
    liveOff.current = Math.max(-40, Math.min(startOff.current - (e.clientX - startX.current), max + 40));
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${liveOff.current}px)`;
  }, [projects.length, cardW]);
  const onMouseUp = useCallback(e => {
    if (!dragging.current) return;
    dragging.current = false;
    viewportRef.current?.classList.remove('is-dragging');
    if (trackRef.current) trackRef.current.style.transition = '';
    const dx  = e.clientX - startX.current;
    const thr = cardW() * 0.2;
    goTo(dx < -thr ? idx + 1 : dx > thr ? idx - 1 : idx);
  }, [idx, cardW, goTo]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // Touch
  const onTouchStart = e => {
    startX.current   = e.touches[0].clientX;
    startOff.current = liveOff.current;
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };
  const onTouchMove = e => {
    const max = (projects.length - 1) * cardW();
    liveOff.current = Math.max(-40, Math.min(startOff.current - (e.touches[0].clientX - startX.current), max + 40));
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${liveOff.current}px)`;
  };
  const onTouchEnd = e => {
    if (trackRef.current) trackRef.current.style.transition = '';
    const dx  = e.changedTouches[0].clientX - startX.current;
    const thr = cardW() * 0.2;
    goTo(dx < -thr ? idx + 1 : dx > thr ? idx - 1 : idx);
  };

  // Resize
  useEffect(() => {
    let t;
    const handle = () => { clearTimeout(t); t = setTimeout(() => goTo(idx, true), 120); };
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [idx, goTo]);

  // Keyboard
  useEffect(() => {
    const handle = e => {
      if (e.key === 'ArrowRight') goTo(idx + 1);
      if (e.key === 'ArrowLeft')  goTo(idx - 1);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [idx, goTo]);

  if (loading) return (
    <section id="proyectos">
      <div className="section">
        <p style={{ color: 'rgba(255,255,255,.3)', fontFamily: 'var(--mono)', fontSize: '.7rem' }}>
          // cargando proyectos...
        </p>
      </div>
    </section>
  );

  if (!projects.length) return (
    <section id="proyectos">
      <div className="section">
        <div className="section-label">// proyectos</div>
        <h2 className="section-title">Mi <span>Trabajo</span></h2>
        <p style={{ color: 'rgba(255,255,255,.3)', fontFamily: 'var(--mono)', fontSize: '.7rem' }}>
          // sin proyectos aún — agrégalos desde el panel admin
        </p>
      </div>
    </section>
  );

  return (
    <section id="proyectos" ref={sectionRef}>
      <div className="section">
        <div className="section-label">// proyectos</div>
        <h2 className="section-title">Mi <span>Trabajo</span></h2>

        <div className="pj-wrap">
          <div
            className="pj-viewport"
            ref={viewportRef}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="pj-track" ref={trackRef}>
              {projects.map((p, i) => (
                <div
                  key={p.id}
                  className="pj"
                  style={{
                    '--pcolor': p.color      || 'rgba(0,123,255,.85)',
                    '--pbg':    p.bgGradient || 'linear-gradient(135deg,#0d1f40,#0a0d1a)',
                    '--pglow':  p.glowColor  || 'rgba(0,123,255,.15)',
                    '--rdur':   `${4.6 + i * 0.2}s`,
                    '--rdel':   `${i * 0.4}s`,
                  }}
                >
                  <div className="pj-inner">
                    <div className="pj-banner">
                      <div className="pj-radar" />
                      <div className="pj-mock">
                        <div className="pj-mock-bar">
                          <div className="pj-mock-dot" style={{ background: '#ff5f57' }} />
                          <div className="pj-mock-dot" style={{ background: '#febc2e' }} />
                          <div className="pj-mock-dot" style={{ background: '#28c840' }} />
                        </div>
                        <div className="pj-mock-screen">{p.emoji || '💻'}</div>
                      </div>
                      {p.type && <div className="pj-type">{p.type}</div>}
                    </div>
                    <div className="pj-body">
                      <div className="pj-name">{p.title || p.nombre || p.name}</div>
                      <div className="pj-desc">{p.description || p.descripcion}</div>
                      <div className="pj-footer">
                        <div className="pj-tags">
                          {(p.tags || []).slice(0, 3).map(t => (
                            <span key={t} className="pj-tag">{t}</span>
                          ))}
                        </div>
                        <div className="pj-links">
                          {p.liveUrl && (
                            <a className="pj-btn live" href={p.liveUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                              Live ↗
                            </a>
                          )}
                          {p.repoUrl && (
                            <a className="pj-btn repo" href={p.repoUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pj-nav">
            <button className="pj-arrow" onClick={() => goTo(idx - 1)} disabled={idx === 0}>←</button>
            <div className="pj-dots">
              {projects.map((_, i) => (
                <div key={i} className={`pj-dot${i === idx ? ' on' : ''}`} onClick={() => goTo(i)} />
              ))}
            </div>
            <div className="pj-counter"><span>{idx + 1}</span> / {projects.length}</div>
            <button className="pj-arrow" onClick={() => goTo(idx + 1)} disabled={idx === projects.length - 1}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}