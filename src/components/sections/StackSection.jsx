// src/components/sections/StackSection.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTechStack } from '../../hooks/useTechStack';
import { getIconComponent } from '../../utils/iconMapper';
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

/* ── Fallback: datos del CV — iconNames alineados con iconMapper.js ── */
const FALLBACK_TECHS = [
  // ── Frontend ──
  { id:'react',     name:'React',      category:'Frontend',      color:'#61DAFB', iconName:'SiReact',      description:'Interfaces dinámicas con componentes reutilizables.',     projects:['SIGC'],                                       tags:['Hooks','JSX','Context API']        },
  { id:'js',        name:'JavaScript', category:'Frontend',      color:'#F7DF1E', iconName:'SiJavascript', description:'Lenguaje principal de la web. DOM, eventos y APIs.',     projects:['SIGC','Bellamaps','Flipbook'],             tags:['ES2023','Async/Await','Fetch API']  },
  { id:'ts',        name:'TypeScript', category:'Frontend',      color:'#3178C6', iconName:'SiTypescript', description:'Superset tipado de JS. Detecta errores en compilación.',  projects:['SIGC'],                                       tags:['Tipos','Interfaces','Generics']     },
  { id:'html5',     name:'HTML5',      category:'Frontend',      color:'#E34F26', iconName:'SiHtml5',      description:'Marcado semántico y estructuración de interfaces.',       projects:['SIGC','Bellamaps','Flipbook'],             tags:['Semántico','Accesibilidad','SEO']   },
  { id:'css3',      name:'CSS3',       category:'Frontend',      color:'#264DE4', iconName:'FaCss3Alt',    description:'Estilos, animaciones, Flexbox y Grid.',                   projects:['SIGC','Bellamaps'],                           tags:['Flexbox','Grid','Animations']       },
  { id:'tailwind',  name:'Tailwind',   category:'Frontend',      color:'#38BDF8', iconName:'SiTailwindcss',description:'Framework CSS utility-first para diseño rápido.',         projects:[],                                             tags:['Utility','Responsive','Dark Mode']  },
  { id:'angular',   name:'Angular',    category:'Frontend',      color:'#DD0031', iconName:'SiAngular',    description:'Framework de Google para SPAs con TypeScript.',           projects:[],                                             tags:['Módulos','Servicios','RxJS']        },
  { id:'figma',     name:'Figma',      category:'Frontend',      color:'#A259FF', iconName:'SiFigma',      description:'Diseño UI/UX colaborativo y sistemas de diseño.',         projects:['Ixelo','Nutricom'],                          tags:['Prototipado','Design System']       },

  // ── Mobile ──
  { id:'flutter',   name:'Flutter',    category:'Mobile',        color:'#54C5F8', iconName:'SiFlutter',    description:'Apps nativas multiplataforma con un solo código Dart.',   projects:['Ixelo','Nutricom'],                          tags:['Widgets','Navigator','Null Safety'] },
  { id:'dart',      name:'Dart',       category:'Mobile',        color:'#00B4D8', iconName:'SiDart',       description:'Lenguaje compilado de Google, base de Flutter.',          projects:['Ixelo','Nutricom'],                          tags:['Null Safety','Async','OOP']         },

  // ── Backend ──
  { id:'nodejs',    name:'Node.js',    category:'Backend',       color:'#68A063', iconName:'SiNodedotjs',  description:'JavaScript en el servidor. APIs REST y middlewares.',     projects:['Bellamaps'],                              tags:['Express','REST API','Middleware']   },
  { id:'php',       name:'PHP',        category:'Backend',       color:'#777BB4', iconName:'SiPhp',        description:'Sistemas web y generación de reportes en PDF.',           projects:['Sistema de Gestión Escolar'],             tags:['MVC','PDF','MySQL']                 },
  { id:'python',    name:'Python',     category:'Backend',       color:'#3776AB', iconName:'SiPython',     description:'IA, procesamiento de señales y automatización.',          projects:['Ixelo','Filtrado de Señales'],            tags:['YOLOv8','CNN','Scripts']            },
  { id:'java',      name:'Java',       category:'Backend',       color:'#F89820', iconName:'FaJava',       description:'OOP con tipado fuerte para aplicaciones robustas.',       projects:[],                                             tags:['OOP','POO','Estructuras']           },

  // ── Cloud ──
  { id:'aws',       name:'AWS',        category:'Cloud',         color:'#FF9900', iconName:'FaAws',        description:'S3, Lambda, EC2 y CloudFront para despliegue.',           projects:['SIGC'],                                   tags:['S3','Lambda','EC2','CloudFront']    },
  { id:'azure',     name:'Azure',      category:'Cloud',         color:'#0078D4', iconName:'TbBrandAzure', description:'VMs, VNets, SSH, SQL y Disaster Recovery.',               projects:['Infraestructura Cloud'],                  tags:['VMs','VNets','SSH']                 },
  { id:'docker',    name:'Docker',     category:'Cloud',         color:'#2496ED', iconName:'SiDocker',     description:'Contenedorización para entornos reproducibles.',          projects:['SIGC','Infraestructura Cloud'],            tags:['Containers','Images','Compose']     },

  // ── Base de datos ──
  { id:'mysql',     name:'MySQL',      category:'Base de datos', color:'#00758F', iconName:'SiMysql',      description:'BD relacional. Consultas optimizadas y reportes.',        projects:['Bellamaps','Flipbook','Sistema de Gestión Escolar'], tags:['SQL','Joins','Stored Procedures'] },
  { id:'firebase',  name:'Firebase',   category:'Base de datos', color:'#FFCA28', iconName:'SiFirebase',   description:'Firestore en tiempo real, auth, storage y hosting.',      projects:['Nutricom','Portfolio'],                   tags:['Firestore','Auth','Storage']        },

  // ── Herramientas ──
  { id:'git',       name:'Git',        category:'Herramientas',  color:'#F05032', iconName:'SiGit',        description:'Control de versiones distribuido y flujos colaborativos.',projects:['Todos'],                                  tags:['Branching','Merge','GitHub']        },
  { id:'github',    name:'GitHub',     category:'Herramientas',  color:'#FFFFFF', iconName:'SiGithub',     description:'Repositorios remotos, PR y colaboración en equipo.',      projects:['Todos'],                                  tags:['PRs','Actions','Repos']             },
  { id:'postman',   name:'Postman',    category:'Herramientas',  color:'#FF6C37', iconName:'SiPostman',    description:'Pruebas y documentación de APIs REST.',                   projects:['SIGC','Bellamaps'],                       tags:['REST','Testing','Collections']      },
  { id:'vscode',    name:'VS Code',    category:'Herramientas',  color:'#007ACC', iconName:'TbBrandVscode',description:'Editor principal con extensiones, debug y terminal.',     projects:['Todos'],                                  tags:['Extensions','Debug','Terminal']     },
  { id:'jira',      name:'Jira',       category:'Herramientas',  color:'#2684FF', iconName:'SiJira',       description:'Gestión ágil. Sprints, Kanban y seguimiento de tareas.',  projects:['Ixelo'],                                  tags:['Scrum','Kanban','Sprints']          },
  { id:'linux',     name:'Linux',      category:'Herramientas',  color:'#FCC624', iconName:'SiLinux',      description:'Administración, scripting Bash y configuración servers.', projects:['Infraestructura Cloud'],                  tags:['Bash','SSH','Servidores']           },
];
function buildCardVars(color = 'rgba(0,123,255,.55)', idx = 0) {
  // Extraer canal RGB del color para construir variantes
  // Soporta '#RRGGBB' y 'rgba(r,g,b,...)'
  let r = 0, g = 123, b = 255;

  const hexMatch = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (hexMatch) {
    r = parseInt(hexMatch[1], 16);
    g = parseInt(hexMatch[2], 16);
    b = parseInt(hexMatch[3], 16);
  } else {
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) { r = +rgbMatch[1]; g = +rgbMatch[2]; b = +rgbMatch[3]; }
  }

  return {
    '--hc':   `rgba(${r},${g},${b},.6)`,
    '--hg':   `rgba(${r},${g},${b},.14)`,
    '--hbg':  `rgba(${r},${g},${b},.07)`,
    '--lc':   `rgba(${r},${g},${b},.9)`,
    '--lbg':  `rgba(${r},${g},${b},.18)`,
    '--fd':   `${3.2 + (idx % 4) * 0.4}s`,
    '--fdel': `${(idx % 6) * 0.3}s`,
    '--sd':   `${5 + (idx % 3) * 1.5}s`,
    '--sdel': `${(idx % 5) * 0.8}s`,
  };
}

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