// src/components/sections/AboutSection.jsx
// Recreación fiel del diseño HTML v7 — 2 columnas: foto+terminal | bio+soft skills
import { useEffect, useRef } from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import '../../styles/about.css';
import miImagen from '../../assets/leo_foto.jpg';

import { TERM_LINES, LANGUAGES, SOFT_SKILLS } from '../../data/portfolio';

export default function AboutSection() {
  const sectionRef    = useIntersection(['.section-label', '.section-title']);
  const leftRef       = useRef(null);
  const contentRef    = useRef(null);
  const softGridRef   = useRef(null);
  const termBodyRef   = useRef(null);
  const termStarted   = useRef(false);

  // Reveal left + right on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    if (leftRef.current)    obs.observe(leftRef.current);
    if (contentRef.current) obs.observe(contentRef.current);
    return () => obs.disconnect();
  }, []);

  // Stagger soft cards
  useEffect(() => {
    if (!softGridRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.soft-card').forEach(c => c.classList.add('vis'));
        obs.unobserve(e.target);
      }
    }, { threshold: 0.08 });
    obs.observe(softGridRef.current);
    return () => obs.disconnect();
  }, []);

  // Animated terminal
  useEffect(() => {
    if (!termBodyRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !termStarted.current) {
        termStarted.current = true;
        runTerminal();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(termBodyRef.current);
    return () => obs.disconnect();
  }, []);

  function runTerminal() {
    TERM_LINES.forEach(({ delay, parts }) => {
      setTimeout(() => {
        if (!termBodyRef.current) return;
        const line = document.createElement('div');
        line.className = 't-line';
        parts.forEach(({ c, t }) => {
          const span = document.createElement('span');
          span.className = c;
          if (c === 't-cursor') {
            // blinking cursor — handled by CSS
          } else {
            span.textContent = t;
          }
          line.appendChild(span);
        });
        termBodyRef.current.appendChild(line);
        termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
      }, delay);
    });
  }

  return (
    <section id="about" ref={sectionRef}>
      <div className="section">

        <div className="section-label">// sobre_mi</div>
        <h2 className="section-title">Sobre <span>Mí</span></h2>

        <div className="about-grid">

          {/* ══ COLUMNA IZQUIERDA ══ */}
          <div className="about-left" ref={leftRef}>

            {/* Foto */}
            <div style={{ position: 'relative' }}>
              <div className="photo-frame">
                <div className="photo-inner">
                  {/* Reemplaza con: <img src="tu-foto.jpg" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'14px'}} /> */}
                  {/*<svg className="avatar-svg" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="38" r="22" fill="rgba(0,123,255,.2)" stroke="rgba(0,123,255,.4)" strokeWidth="1.5"/>
                    <circle cx="50" cy="36" r="13" fill="rgba(0,123,255,.35)"/>
                    <ellipse cx="50" cy="82" rx="28" ry="18" fill="rgba(0,123,255,.15)" stroke="rgba(0,123,255,.3)" strokeWidth="1.5"/>
                    <circle cx="50" cy="36" r="8" fill="rgba(255,255,255,.15)"/>
                  </svg>*/}
                  <img src={miImagen} style={{width:'90%',height:'90%',objectFit:'cover',borderRadius:'14px'}} />
                </div>
                <div className="corner corner-tl" />
                <div className="corner corner-tr" />
                <div className="corner corner-bl" />
                <div className="corner corner-br" />
              </div>
              <div className="about-badge">
                <div className="badge-dot" />
                <span className="badge-txt"><strong>Disponible</strong></span>
              </div>
            </div>

            {/* Terminal animado */}
            <div className="term-wrap">
              <div className="term-top">
                <div className="td td-r" />
                <div className="td td-y" />
                <div className="td td-g" />
                <span className="term-fname">ld@portfolio ~ zsh</span>
              </div>
              <div className="term-body" ref={termBodyRef} />
            </div>

          </div>

          {/* ══ COLUMNA DERECHA ══ */}
          <div className="about-content" ref={contentRef}>

            <p className="about-bio">
              Soy un estudiante de último semestre en la <strong>Escuela Superior de Cómputo (ESCOM)</strong>
              y <strong>Técnico Titulado en Redes de cómputo (CET 1),</strong> ambas instituciones del <strong>IPN</strong>
              . <strong>Desarrollador mobile y web</strong> con enfoque en{' '}
              <span className="hl">Frontend &amp; Mobile</span>, apasionado por convertir ideas
              en productos digitales a traves de <span className="hlr">estándares de UX y QA.</span>
            </p>
            <p className="about-bio">
              Mi formación abarca la <strong>infraestructura en la nube</strong>, <strong> sistemas web </strong> y <strong>aplicaciones móviles</strong>
              , disfruto cada etapa: desde el primer wireframe
              hasta el <span className="hl">deploy en producción</span>. Siempre buscando el balance
              entre rendimiento, accesibilidad y ese{' '}
              <span className="hlr">detalle visual</span> que marca la diferencia.
            </p>
          
            {/* Idiomas */}
            <div className="soft-label" style={{ marginTop: '1.4rem' }}>// idiomas</div>
            <div style={{ display:'flex', gap:'.6rem', marginBottom:'1.2rem', flexWrap:'wrap' }}>
              {LANGUAGES.map(({ flag, lang, level }) => (
                <div key={lang} style={{
                  display:'flex', alignItems:'center', gap:'.5rem',
                  background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)',
                  borderRadius:'10px', padding:'.35rem .9rem',
                }}>
                  <span style={{ fontSize:'1rem' }}>{flag}</span>
                  <span style={{ fontSize:'.75rem', fontWeight:700, color:'rgba(255,255,255,.8)' }}>{lang}</span>
                  <span style={{ fontSize:'.62rem', fontFamily:'var(--mono)', color:'rgba(255,255,255,.35)' }}>{level}</span>
                </div>
              ))}
            </div>

            <div className="about-divider" />
            <div className="soft-label">// habilidades_blandas</div>

            <div className="soft-grid" ref={softGridRef}>
              {SOFT_SKILLS.map((s, i) => (
                <div key={i} className="soft-card" style={{ transitionDelay: s.delay }}>
                  <div className={`soft-icon ${s.cls}`}>{s.icon}</div>
                  <div>
                    <div className="soft-name">{s.name}</div>
                    <div className="soft-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}