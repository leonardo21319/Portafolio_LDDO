// src/components/sections/HeroSection.jsx
import { useRef } from 'react';
import { useHero } from '../../hooks/useHero';
import { useTechPopIn } from '../../hooks/useTechPopIn';
import { getIconComponent } from '../../utils/iconMapper';
import MonitorScene from './hero/MonitorScene';
import '../../styles/hero.css';

/* ── Fallback ─────────────────────────────────────────────────── */
const FALLBACK = {
  nameWhite:   'Leonardo',
  nameBlue:    'Daniel',
  roleLine:    'Frontend & Mobile Dev · UX · QA',
  description: 'Apasionado por crear experiencias digitales que combinan **estética** y **funcionalidad**. Especializado en **React**, **Flutter** y **AWS**, con enfoque en calidad y detalle pixel a pixel.',
  heroIcons: [
    'SiFlutter','SiReact','FaAws','SiFirebase',
    'TbBrandAzure','SiTypescript','SiFigma','SiDocker',
    'SiDart','SiNodedotjs','SiPython','SiMysql',
    'TbBrandVscode','SiPostman','SiJira','SiGit',
  ],
};

/* ── Componentes Multicolores Personalizados ─────── */
const CustomFigma = ({ size }) => (
  // ViewBox cuadrado 24x24. Trazos centrados matemáticamente para encajar perfecto.
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#F24E1E"/>
    <path d="M12 4a4 4 0 1 0 8 0 4 4 0 1 0-8 0z" fill="#FF7262"/>
    <path d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#A259FF"/>
    <path d="M12 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0z" fill="#1ABCFE"/>
    <path d="M12 16v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4h4z" fill="#0ACF83"/>
  </svg>
);

const CustomPython = ({ size }) => (
  // ViewBox 110x110 que envuelve el logo al milímetro sin márgenes muertos.
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M53.902.164c-26.49 0-25.18 11.465-25.18 11.465l.04 11.727h25.842v3.692H26.657s-25.18 1.54-25.18 28.227c0 28.176 22.247 27.038 22.247 27.038h11.107v-15.69s-.212-15.045 15.185-15.045h23.606s14.244-.418 14.244-14.085v-17.18s1.496-18.583-32.79-18.583h-1.173zm-13.708 8.69a4.11 4.11 0 1 1 0 8.217 4.11 4.11 0 0 1 0-8.217z" fill="#3776AB"/>
    <path d="M54.568 109.815c26.49 0 25.18-11.465 25.18-11.465l-.04-11.727H53.866v-3.692h27.947s25.18-1.54 25.18-28.227c0-28.176-22.247-27.038-22.247-27.038H73.64v15.69s.21 15.045-15.185 15.045H34.848s-14.244.418-14.244 14.085v17.18s-1.496 18.583 32.79 18.583h1.173zm13.708-8.69a4.11 4.11 0 1 1 0-8.217 4.11 4.11 0 0 1 0 8.217z" fill="#FFD43B"/>
  </svg>
);

/* ── Colores por clave de icono ───────────────────────────────── */
const ICON_COLORS = {
  SiFlutter:     { color:'#54C5F8', ic:'rgba(84,197,248,.5)',   ig:'rgba(84,197,248,.18)'  },
  SiReact:       { color:'#61DAFB', ic:'rgba(97,218,251,.5)',   ig:'rgba(97,218,251,.18)'  },
  FaAws:         { color:'#FF9900', ic:'rgba(255,153,0,.5)',    ig:'rgba(255,153,0,.15)'   },
  SiFirebase:    { color:'#FFCA28', ic:'rgba(255,202,40,.5)',   ig:'rgba(255,202,40,.14)'  },
  TbBrandAzure:  { color:'#0078D4', ic:'rgba(0,120,212,.6)',    ig:'rgba(0,120,212,.2)'    },
  SiTypescript:  { color:'#3178C6', ic:'rgba(49,120,198,.6)',   ig:'rgba(49,120,198,.2)'   },
  SiFigma:       { color:'#A259FF', ic:'rgba(162,89,255,.5)',   ig:'rgba(162,89,255,.16)'  },
  SiDocker:      { color:'#2496ED', ic:'rgba(36,150,237,.5)',   ig:'rgba(36,150,237,.16)'  },
  SiDart:        { color:'#00B4D8', ic:'rgba(0,180,216,.5)',    ig:'rgba(0,180,216,.16)'   },
  SiNodedotjs:   { color:'#68A063', ic:'rgba(104,160,99,.5)',   ig:'rgba(104,160,99,.16)'  },
  SiPython:      { color:'#3776AB', ic:'rgba(55,118,171,.5)',   ig:'rgba(55,118,171,.16)'  },
  SiMysql:       { color:'#00758F', ic:'rgba(0,117,143,.6)',    ig:'rgba(0,117,143,.18)'   },
  TbBrandVscode: { color:'#007ACC', ic:'rgba(0,120,212,.6)',    ig:'rgba(0,120,212,.2)'    },
  SiPostman:     { color:'#FF6C37', ic:'rgba(255,108,55,.5)',   ig:'rgba(255,108,55,.16)'  },
  SiJira:        { color:'#2684FF', ic:'rgba(38,132,255,.5)',   ig:'rgba(38,132,255,.16)'  },
  SiGit:         { color:'#F05032', ic:'rgba(240,80,50,.5)',    ig:'rgba(240,80,50,.16)'   },
  SiJavascript:  { color:'#F7DF1E', ic:'rgba(247,223,30,.5)',   ig:'rgba(247,223,30,.14)'  },
  SiHtml5:       { color:'#E44D26', ic:'rgba(228,77,38,.5)',    ig:'rgba(228,77,38,.16)'   },
  FaCss3Alt:     { color:'#264DE4', ic:'rgba(38,77,228,.5)',    ig:'rgba(38,77,228,.16)'   },
  SiTailwindcss: { color:'#38BDF8', ic:'rgba(56,189,248,.5)',   ig:'rgba(56,189,248,.16)'  },
  SiAngular:     { color:'#DD0031', ic:'rgba(221,0,49,.5)',     ig:'rgba(221,0,49,.16)'    },
  SiNextdotjs:   { color:'#FFFFFF', ic:'rgba(255,255,255,.5)',  ig:'rgba(255,255,255,.1)'  },
  SiMongodb:     { color:'#47A248', ic:'rgba(71,162,72,.5)',    ig:'rgba(71,162,72,.16)'   },
  SiGithub:      { color:'#FFFFFF', ic:'rgba(255,255,255,.5)',  ig:'rgba(255,255,255,.1)'  },
  SiKotlin:      { color:'#7846EE', ic:'rgba(120,70,230,.5)',   ig:'rgba(120,70,230,.16)'  },
  SiSwift:       { color:'#F05138', ic:'rgba(240,81,56,.5)',    ig:'rgba(240,81,56,.16)'   },
  FaJava:        { color:'#F89820', ic:'rgba(248,152,32,.5)',   ig:'rgba(248,152,32,.16)'  },
  SiVuedotjs:    { color:'#42B883', ic:'rgba(66,185,131,.5)',   ig:'rgba(66,185,131,.16)'  },
};
const DEF_COLOR = { color:'#FFFFFF', ic:'rgba(255,255,255,.4)', ig:'rgba(255,255,255,.1)' };

/* ── Float timing (16 entradas, cíclico) ─────────────────────── */
const FLOATS = [
  {dur:'3.4s',del:'0s'    },{dur:'3.8s',del:'.25s' },{dur:'3.2s',del:'.5s'  },{dur:'4.1s',del:'.75s' },
  {dur:'3.6s',del:'1s'    },{dur:'3.3s',del:'1.25s'},{dur:'3.5s',del:'1.5s' },{dur:'3.9s',del:'1.75s'},
  {dur:'3.7s',del:'2s'    },{dur:'3.6s',del:'2.25s'},{dur:'4.2s',del:'2.5s' },{dur:'3.4s',del:'2.75s'},
  {dur:'3.3s',del:'3s'    },{dur:'4.0s',del:'3.25s'},{dur:'3.8s',del:'3.5s' },{dur:'3.6s',del:'3.75s'},
];

/* ── Helpers de render ────────────────────────────────────────── */

/** Convierte **texto** → <strong>texto</strong> */
const renderDesc = txt =>
  txt.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : p
  );

/** Parsea "A & B · C · D" → spans con clases de color */
const renderRole = line => {
  const tokens = line.split(/(\s*&\s*|\s*·\s*)/);
  const cls    = ['r-fe', 'r-mob', 'r-ux', 'r-qa'];
  let segIdx   = 0;
  return tokens.map((t, i) => {
    const trimmed = t.trim();
    if (trimmed === '&')  return <span key={i} className="r-amp"> &amp; </span>;
    if (trimmed === '·')  return <span key={i} className="r-dot"> · </span>;
    if (trimmed === '')   return null;
    const c = cls[segIdx] || 'r-fe';
    segIdx++;
    return <span key={i} className={c}>{trimmed}</span>;
  });
};

/* ── Componente principal ─────────────────────────────────────── */
export default function HeroSection() {
  const { hero, loading } = useHero();
  const techGridRef       = useRef(null);

  /* Pop-in escalonado de iconos */
  useTechPopIn(techGridRef);

  /* Merge Firebase + fallback */
  const d = {
    nameWhite:   hero?.nameWhite   || FALLBACK.nameWhite,
    nameBlue:    hero?.nameBlue    || FALLBACK.nameBlue,
    roleLine:    hero?.roleLine    || FALLBACK.roleLine,
    description: hero?.description || FALLBACK.description,
    heroIcons:   (hero?.heroIcons?.length > 0) ? hero.heroIcons : FALLBACK.heroIcons,
  };

  const scrollTo = id =>
    document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero">
      <div className="hero-inner">

        {/* ══ LEFT ══ */}
        <div>
          {/* Nombre */}
          <h1 className="hero-name">
            <span className="n-white">{d.nameWhite} </span>
            <span className="n-grad">{d.nameBlue}</span>
          </h1>

          {/* Role line */}
          <div className="hero-role-wrap">
            <div className="hero-role">
              <span className="r-br">&lt;</span>
              {renderRole(d.roleLine)}
              <span className="r-br"> /&gt;</span>
            </div>
            <div className="role-underline" />
          </div>

          <div className="role-divider" />

          {/* Descripción */}
          <p className="hero-desc">
            {loading
              ? <span style={{ opacity: .3 }}>Cargando…</span>
              : renderDesc(d.description)
            }
          </p>

          {/* CTAs */}
          <div className="cta-group">
            <button className="btn-projects"      onClick={() => scrollTo('proyectos')}>
              🚀 Ver Proyectos
            </button>
            <button className="btn-certifications" onClick={() => scrollTo('certificaciones')}>
              ✔ Certificaciones
            </button>
          </div>

          {/* Icon grid */}
          <div className="tech-grid" ref={techGridRef}>
            {d.heroIcons.map((iconName, i) => {
              // 1. Permite que la variable cambie
              let Ic = getIconComponent(iconName);
              
              // 2. Intercepta Figma y Python
              if (iconName === 'SiFigma') Ic = CustomFigma;
              if (iconName === 'SiPython') Ic = CustomPython;

              const anim   = FLOATS[i % FLOATS.length];
              const colors = ICON_COLORS[iconName] || DEF_COLOR;
              return (
                <div
                  key={iconName + i}
                  className="ti"
                  title={iconName.replace(/^(Si|Fa|Tb)(?:Brand)?/, '')}
                  style={{
                    '--dur': anim.dur,
                    '--del': anim.del,
                    '--ic':  colors.ic, // El brillo de fondo sigue funcionando
                    '--ig':  colors.ig,
                  }}
                >
                  <div className="ti-icon">
                    <Ic size={22} color={colors.color} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ RIGHT — toda la escena del monitor ══ */}
        <MonitorScene />

      </div>

      {/* Scroll hint */}
      <div className="scroll-hint" onClick={() => scrollTo('about')}>
        <span className="sh-t">scroll</span>
        <div className="sh-a">↓</div>
      </div>
    </section>
  );
}