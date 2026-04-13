// src/components/sections/CertificacionesSection.jsx
import { useIntersection } from '../../hooks/useIntersection';
import { getIconComponent } from '../../utils/iconMapper';
import { CERTS } from '../../data/portfolio';
import '../../styles/certificaciones.css';

export default function CertificacionesSection() {
  const sectionRef = useIntersection(['.section-label', '.section-title', '.cert-card']);

  return (
    <section id="certificaciones" ref={sectionRef}>
      <div className="section">
        <div className="section-label">// certificaciones</div>
        <h2 className="section-title">Mis <span>Credenciales</span></h2>

        <div className="cert-grid">
          {CERTS.map((cert) => {
            const Ic = getIconComponent(cert.iconName);
            return (
              <div
                key={cert.id}
                className="cert-card"
                style={{ '--cc': cert.color, '--cbg': cert.bgColor, transitionDelay: cert.delay }}
              >
                <div className="cert-trace">
                  <div className="cert-trace-top" />
                  <div className="cert-trace-bot" />
                </div>

                <div className="cert-icon">
                  <Ic size={22} color={cert.iconColor} />
                </div>

                <div className="cert-info">
                  <div className="cert-issuer">{cert.issuer}</div>
                  <div className="cert-title">{cert.title}</div>
                  <div className="cert-meta">
                    <span>{cert.year}</span>
                    <span className="cert-dot">·</span>
                    <span>{cert.level}</span>
                  </div>
                  {cert.url && (
                    <a className="cert-link" href={cert.url} target="_blank" rel="noopener noreferrer">
                      Ver credencial ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
