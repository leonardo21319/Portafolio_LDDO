// src/components/sections/AboutSection.jsx
// Recreación fiel del diseño HTML v7 — 2 columnas: foto+terminal | bio+soft skills
import { useEffect, useRef } from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import '../../styles/about.css';

const TERM_LINES = [
  { delay: 0,    parts: [{ c:'t-prompt', t:'❯ ' }, { c:'t-cmd', t:'whoami' }] },
  { delay: 550,  parts: [{ c:'t-blue',  t:'Leonardo Daniel  ' }, { c:'t-dim', t:'// dev & ux' }] },
  { delay: 1050, parts: [{ c:'t-prompt', t:'❯ ' }, { c:'t-cmd', t:'cat stack.json' }] },
  { delay: 1650, parts: [{ c:'t-ok', t:'✓ ' }, { c:'t-dim', t:'Frontend  ' }, { c:'t-blue', t:' React · JavaScript' }] },
  { delay: 2000, parts: [{ c:'t-ok', t:'✓ ' }, { c:'t-dim', t:'Mobile    ' }, { c:'t-blue', t:' Flutter' }] },
  { delay: 2350, parts: [{ c:'t-ok', t:'✓ ' }, { c:'t-dim', t:'Cloud     ' }, { c:'t-info', t:' AWS · Azure' }] },
  { delay: 2700, parts: [{ c:'t-ok', t:'✓ ' }, { c:'t-dim', t:'Design    ' }, { c:'t-red',  t:' Figma' }] },
  { delay: 3050, parts: [{ c:'t-ok', t:'✓ ' }, { c:'t-dim', t:'Test        ' }, { c:'t-blue', t:' Postman · Jest' }] },
  { delay: 3400, parts: [{ c:'t-ok', t:'✓ ' }, { c:'t-dim', t:'DB        ' }, { c:'t-info', t:' MySQL · Firestore' }] },
  { delay: 3800, parts: [{ c:'t-prompt', t:'❯ ' }, { c:'t-cmd', t:'git log --oneline -2' }] },
  { delay: 4450, parts: [{ c:'t-info', t:'f2c903a ' }, { c:'t-dim', t:'feat: pixel perfect ✦' }] },
  { delay: 4750, parts: [{ c:'t-info', t:'a1b8e71 ' }, { c:'t-dim', t:'fix: mobile layout 📱' }] },
  { delay: 5150, parts: [{ c:'t-prompt', t:'❯ ' }, { c:'t-cmd', t:'flutter build apk --release' }] },
  { delay: 6000, parts: [{ c:'t-ok', t:'✓ ' }, { c:'t-blue', t:'Build success  ' }, { c:'t-dim', t:'21.14s' }] },
  { delay: 6500, parts: [{ c:'t-prompt', t:'❯ ' }, { c:'t-cursor', t:'' }] },
];

const SOFT_SKILLS = [
  { icon: '🧩', cls: 'si-blue', name: 'Resolución de Problemas', desc: 'Descompongo retos complejos en pasos claros.', delay: '.06s' },
  { icon: '🎯', cls: 'si-red',  name: 'Atención al Detalle',    desc: 'Preciso en lógica de negocio y la cordialidad con el cliente.', delay: '.12s' },
  { icon: '🤝', cls: 'si-cyan', name: 'Trabajo en Equipo',      desc: 'Comunicación clara, code reviews constructivos y colaboración ágil.', delay: '.18s' },
  { icon: '⚡', cls: 'si-mix',  name: 'Adaptabilidad',           desc: 'Aprendo tecnologías nuevas de forma constante y me ajusto a cualquier stack.', delay: '.24s' },
  { icon: '🗣️',cls: 'si-blue', name: 'Comunicación',            desc: 'Transmito ideas técnicas a perfiles no técnicos.', delay: '.30s' },
  { icon: '🔁', cls: 'si-red',  name: 'Mentalidad Iterativa',   desc: 'Itero con feedback y mejoro constantemente.', delay: '.36s' },
];

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
                  <img src="src\assets\leo_foto.jpg" style={{width:'90%',height:'90%',objectFit:'cover',borderRadius:'14px'}} />
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