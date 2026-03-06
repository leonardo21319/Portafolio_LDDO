// src/components/sections/CertificacionesSection.jsx
import { useIntersection } from '../../hooks/useIntersection';
import '../../styles/certificaciones.css';

// ── Datos estáticos — reemplaza con los tuyos ──
const FEATURED = {
  emoji: '☁️',
  title: 'AWS Certified Cloud Practitioner',
  issuer: 'Amazon Web Services',
  year: '2024',
  level: 'Foundational',
  url: 'https://aws.amazon.com/certification/',
};
const COMPACT = [
  { id:1, title:'React - The Complete Guide', issuer:'Udemy', year:'2024', color:'rgba(97,218,251,.8)',  delay:'0s'  },
  { id:2, title:'Flutter & Dart – Bootcamp',  issuer:'Udemy', year:'2023', color:'rgba(84,197,248,.8)', delay:'.3s' },
  { id:3, title:'Node.js Developer Course',   issuer:'Udemy', year:'2023', color:'rgba(104,160,99,.8)', delay:'.6s' },
  { id:4, title:'Firebase Masterclass',        issuer:'Udemy', year:'2023', color:'rgba(255,202,40,.8)', delay:'.9s' },
];
const MEDIUM = [
  { id:1, title:'CS50x: Intro to Computer Science', issuer:'Harvard / edX', year:'2022', level:'University-level', color:'rgba(161,0,0,.9)',    delay:'0s'  },
  { id:2, title:'Google UX Design Certificate',      issuer:'Google',        year:'2023', level:'Professional',    color:'rgba(66,133,244,.9)', delay:'.4s' },
];

export default function CertificacionesSection() {
  const sectionRef = useIntersection(['.section-label', '.section-title', '.cf-wrap']);

  return (
    <section id="certificaciones" ref={sectionRef}>
      <div className="section">
        <div className="section-label">// certificaciones</div>
        <h2 className="section-title">Mis <span>Credenciales</span></h2>

        <div className="cf-wrap">
          {/* Featured */}
          <div className="cf-banner">
            <div className="banner-trace">
              <div className="banner-trace-top" />
              <div className="banner-trace-bot" />
            </div>
            <div className="cf-badge">{FEATURED.emoji}</div>
            <div className="cf-info">
              <div className="cf-issuer">{FEATURED.issuer}</div>
              <div className="cf-title">{FEATURED.title}</div>
              <div className="cf-meta">
                <span className="cf-year">{FEATURED.year}</span>
                <span>{FEATURED.level}</span>
              </div>
            </div>
            {FEATURED.url && (
              <a className="cf-link" href={FEATURED.url} target="_blank" rel="noopener noreferrer">
                Ver credencial ↗
              </a>
            )}
          </div>

          {/* Compact 4-col grid */}
          <div className="cc-grid">
            {COMPACT.map(c => (
              <div key={c.id} className="cc" style={{ '--ccolor': c.color, '--ccdel': c.delay }}>
                <div className="cc-issuer">{c.issuer}</div>
                <div className="cc-name">{c.title}</div>
                <div className="cc-year">{c.year}</div>
              </div>
            ))}
          </div>

          {/* Medium 2-col grid */}
          <div className="cm-grid">
            {MEDIUM.map(m => (
              <div key={m.id} className="cm-top" style={{ '--cmcolor': m.color }}>
                <div className="cm-trace">
                  <div className="cm-trace-top" />
                  <div className="cm-trace-bot" />
                </div>
                <div className="cm-issuer">{m.issuer}</div>
                <div className="cm-title">{m.title}</div>
                <div className="cm-meta">
                  <span>{m.year}</span>
                  {m.level && <span>{m.level}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}