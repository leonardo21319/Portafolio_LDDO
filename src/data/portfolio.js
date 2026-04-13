// src/data/portfolio.js
// ─────────────────────────────────────────────────────────────────────────────
//  FUENTE ÚNICA DE VERDAD — todo el contenido estático del portfolio.
//
//  ¿Por qué este archivo?
//  · Las secciones ya no tienen datos mezclados con lógica de UI.
//  · Para actualizar contenido (bio, proyectos, stack, certs) basta abrir
//    este archivo — sin tocar ningún componente.
//  · Firestore siempre tiene prioridad en runtime; este es el fallback.
// ─────────────────────────────────────────────────────────────────────────────

/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
export const HERO_FALLBACK = {
  nameWhite:   'Leonardo Daniel',
  nameBlue:    'Dominguez',
  roleLine:    'Frontend & Mobile Dev Jr · UX · QA',
  description: 'Estudiante de último semestre en la **ESCOM** y **Técnico Titulado en Redes (CET 1)**, ambas del **IPN**. Desarrollador **Frontend Jr** y **Mobile Jr** con enfoque en **UX & QA**, apasionado por convertir ideas en productos digitales con **impacto real**.',
  heroIcons: [
    'SiFlutter','SiReact','FaAws','SiFirebase',
    'TbBrandAzure','SiTypescript','SiFigma','SiDocker',
    'SiDart','SiNodedotjs','SiPython','SiMysql',
    'TbBrandVscode','SiPostman','SiJira','SiGit',
  ],
};

/* ══════════════════════════════════════════════════════════
   ABOUT — terminal, idiomas y habilidades blandas
══════════════════════════════════════════════════════════ */
export const TERM_LINES = [
  { delay: 0,    parts: [{ c:'t-prompt', t:'❯ ' }, { c:'t-cmd',  t:'whoami' }] },
  { delay: 550,  parts: [{ c:'t-blue',   t:'Leonardo Daniel  ' }, { c:'t-dim', t:'// dev & ux' }] },
  { delay: 1050, parts: [{ c:'t-prompt', t:'❯ ' }, { c:'t-cmd',  t:'cat stack.json' }] },
  { delay: 1650, parts: [{ c:'t-ok',     t:'✓ ' }, { c:'t-dim',  t:'Frontend  ' }, { c:'t-blue', t:' React · JavaScript' }] },
  { delay: 2000, parts: [{ c:'t-ok',     t:'✓ ' }, { c:'t-dim',  t:'Mobile    ' }, { c:'t-blue', t:' Flutter' }] },
  { delay: 2350, parts: [{ c:'t-ok',     t:'✓ ' }, { c:'t-dim',  t:'Cloud     ' }, { c:'t-info', t:' AWS · Azure' }] },
  { delay: 2700, parts: [{ c:'t-ok',     t:'✓ ' }, { c:'t-dim',  t:'Design    ' }, { c:'t-red',  t:' Figma' }] },
  { delay: 3050, parts: [{ c:'t-ok',     t:'✓ ' }, { c:'t-dim',  t:'Test      ' }, { c:'t-blue', t:' Postman · GNS3' }] },
  { delay: 3400, parts: [{ c:'t-ok',     t:'✓ ' }, { c:'t-dim',  t:'DB        ' }, { c:'t-info', t:' MySQL · Firestore' }] },
  { delay: 3800, parts: [{ c:'t-prompt', t:'❯ ' }, { c:'t-cmd',  t:'git log --oneline -2' }] },
  { delay: 4450, parts: [{ c:'t-info',   t:'f2c903a ' }, { c:'t-dim', t:'feat: pixel perfect ✦' }] },
  { delay: 4750, parts: [{ c:'t-info',   t:'a1b8e71 ' }, { c:'t-dim', t:'fix: mobile layout 📱' }] },
  { delay: 5150, parts: [{ c:'t-prompt', t:'❯ ' }, { c:'t-cmd',  t:'flutter build apk --release' }] },
  { delay: 6000, parts: [{ c:'t-ok',     t:'✓ ' }, { c:'t-blue', t:'Build success  ' }, { c:'t-dim', t:'21.14s' }] },
  { delay: 6500, parts: [{ c:'t-prompt', t:'❯ ' }, { c:'t-cursor', t:'' }] },
];

export const LANGUAGES = [
  { flag: '🇺🇸', lang: 'Inglés',  level: 'Intermedio' },
  { flag: '🇯🇵', lang: 'Japonés', level: 'Básico · En formación' },
];

export const SOFT_SKILLS = [
  { icon: '🚀', cls: 'si-blue', name: 'Proactividad',               desc: 'Iniciativa para anticipar necesidades y proponer soluciones técnicas eficientes.',       delay: '.06s' },
  { icon: '🧠', cls: 'si-red',  name: 'Pensamiento Crítico',        desc: 'Análisis profundo para la resolución de problemas complejos y toma de decisiones.',     delay: '.12s' },
  { icon: '🤝', cls: 'si-cyan', name: 'Comunicación Asertiva',      desc: 'Transmisión clara de ideas técnicas tanto a equipos como a perfiles no técnicos.',      delay: '.18s' },
  { icon: '⚡', cls: 'si-mix',  name: 'Resiliencia y Adaptabilidad',desc: 'Capacidad de aprendizaje continuo y ajuste ágil a nuevos stacks tecnológicos.',        delay: '.24s' },
  { icon: '🎯', cls: 'si-blue', name: 'Compromiso y Disciplina',    desc: 'Enfoque en la calidad del software y cumplimiento riguroso de objetivos.',               delay: '.30s' },
  { icon: '🌍', cls: 'si-red',  name: 'Enfoque Humano y Empatía',   desc: 'Desarrollo de software centrado en el usuario con una mentalidad colaborativa.',        delay: '.36s' },
];

/* ══════════════════════════════════════════════════════════
   CERTIFICATIONS
══════════════════════════════════════════════════════════ */
export const CERTS = [
  {
    id:        'google-ux',
    iconName:  'SiGoogle',
    iconColor: '#4285F4',
    color:     'rgba(66,133,244,.85)',
    bgColor:   'rgba(66,133,244,.1)',
    issuer:    'Google',
    title:     'Foundations of User Experience (UX) Design',
    year:      '2026',
    level:     'Professional Certificate',
    url:       'https://www.coursera.org/account/accomplishments/verify/Y9HKMETU18DX',
    delay:     '0s',
  },
  {
    id:        'cisco-pt',
    iconName:  'SiCisco',
    iconColor: '#1BA0D7',
    color:     'rgba(1,168,228,.85)',
    bgColor:   'rgba(1,168,228,.1)',
    issuer:    'Cisco Networking Academy',
    title:     'Introduction to Packet Tracer',
    year:      '2021',
    level:     'Networking',
    url:       '',
    delay:     '.15s',
  },
];

/* ══════════════════════════════════════════════════════════
   PROJECTS — fallback CV (Firestore tiene prioridad)
══════════════════════════════════════════════════════════ */
export const PROJECTS_FALLBACK = [
  {
    id: 'sigc',
    title: 'SIGC — Sistema de Invitaciones de Graduación',
    subtitle: 'Cecyt 2 | React · AWS',
    description: 'Sistema de acceso a ceremonia de graduación por QR, información del evento al público y automatización de impresión de certificados.',
    category: 'Web & Cloud',
    status: 'Producción',
    technologies: ['React', 'AWS', 'S3', 'CloudFront', 'JavaScript'],
    emoji: '🎓', color: '#007BFF',
    demoUrl: 'https://d30wuesxiia7af.cloudfront.net/', githubUrl: '',
    order: 1,
  },
  {
    id: 'ixelo',
    title: 'Ixelo',
    subtitle: 'App móvil | Flutter · YOLOv8 · Cloud',
    description: 'Sistema móvil con integración de IA (YOLOv8) y servicios de nube para la clasificación y reconocimiento de residuos sólidos.',
    category: 'Mobile & IA',
    status: 'En Desarrollo',
    technologies: ['Flutter', 'Dart', 'YOLOv8', 'Python', 'Cloud'],
    emoji: '♻️', color: '#4CAF50',
    demoUrl: '', githubUrl: '',
    order: 2,
  },
  {
    id: 'nutricom',
    title: 'Nutricom',
    subtitle: 'App móvil | Flutter · Firebase',
    description: 'Aplicación móvil integrada con Firebase para la gestión de planes alimenticios y contacto directo con nutriólogos y psicólogos.',
    category: 'Mobile',
    status: 'Completado',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Firestore'],
    emoji: '🥗', color: '#00B4D8',
    demoUrl: '', githubUrl: '',
    order: 3,
  },
  {
    id: 'bellamaps',
    title: 'Bellamaps',
    subtitle: 'Web | Node.js · Leaflet.js · MySQL',
    description: 'Aplicación web de rutas e itinerarios turísticos interactivos con mapas en tiempo real.',
    category: 'Web',
    status: 'Completado',
    technologies: ['Node.js', 'Leaflet.js', 'MySQL', 'JavaScript'],
    emoji: '🗺️', color: '#2ecc71',
    demoUrl: '', githubUrl: '',
    order: 4,
  },
  {
    id: 'flipbook',
    title: 'Flipbook',
    subtitle: 'Web | Gestión de libros',
    description: 'Plataforma web para la gestión de compra, venta y donación de libros, enfocada en la optimización de bases de datos.',
    category: 'Web',
    status: 'Completado',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'MySQL'],
    emoji: '📚', color: '#FF9500',
    demoUrl: '', githubUrl: '',
    order: 5,
  },
  {
    id: 'sge',
    title: 'Sistema de Gestión Escolar',
    subtitle: 'Web | PHP · MySQL',
    description: 'Desarrollo en PHP y MySQL para la automatización de consultas académicas y generación de reportes técnicos en PDF.',
    category: 'Web',
    status: 'Completado',
    technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3'],
    emoji: '🏫', color: '#9B59B6',
    demoUrl: '', githubUrl: '',
    order: 6,
  },
  {
    id: 'azure-infra',
    title: 'Infraestructura Cloud & E-commerce',
    subtitle: 'Azure | VMs · VNets · SQL',
    description: 'Despliegue de sistema web transaccional con SQL, VMs, VNets/VLANs, SSH y estrategias de Disaster Recovery.',
    category: 'Cloud',
    status: 'Completado',
    technologies: ['Azure', 'SQL', 'SSH', 'VNets', 'VLANs'],
    emoji: '☁️', color: '#0078D4',
    demoUrl: '', githubUrl: '',
    order: 7,
  },
  {
    id: 'filtrado-senales',
    title: 'Filtrado de Señales',
    subtitle: 'Hardware & Software | Arduino · Python',
    description: 'Sistema de procesamiento de señales analógicas (0 a 5V) con filtrado digital y visualización de datos en tiempo real.',
    category: 'Hardware',
    status: 'Completado',
    technologies: ['Arduino', 'Python', 'Señales Analógicas'],
    emoji: '📡', color: '#FF3B30',
    demoUrl: '', githubUrl: '',
    order: 8,
  },
  {
    id: 'compiladores',
    title: 'Compiladores y Estructuras de Datos',
    subtitle: 'C · Python',
    description: 'Implementación de analizadores léxicos/sintácticos y optimización de algoritmos de memoria.',
    category: 'Algoritmos',
    status: 'Completado',
    technologies: ['C', 'C++', 'Python', 'Estructuras de Datos'],
    emoji: '⚙️', color: '#6B7280',
    demoUrl: '', githubUrl: '',
    order: 9,
  },
  {
    id: 'redes-cisco',
    title: 'Redes Cisco / GNS3',
    subtitle: 'Cisco · GNS3 | Topologías de Red',
    description: 'Creación de topologías de red, configuración de VLANs, enrutamiento, NAT, despliegue de servidores y asignación de IPs.',
    category: 'Redes',
    status: 'Completado',
    technologies: ['Cisco', 'GNS3', 'VLANs', 'NAT', 'Routing'],
    emoji: '🌐', color: '#1BA0D7',
    demoUrl: '', githubUrl: '',
    order: 10,
  },
];

/* ══════════════════════════════════════════════════════════
   TECH STACK — fallback CV (Firestore tiene prioridad)
══════════════════════════════════════════════════════════ */
export const TECH_FALLBACK = [
  // ── Frontend ──
  { id:'react',        name:'React',       category:'Frontend',      color:'#61DAFB', iconName:'SiReact',       description:'Interfaces dinámicas con componentes reutilizables.',                               projects:['SIGC'],                                              tags:['Hooks','JSX','Context API']        },
  { id:'js',           name:'JavaScript',  category:'Frontend',      color:'#F7DF1E', iconName:'SiJavascript',  description:'Lenguaje principal de la web. DOM, eventos y APIs.',                               projects:['SIGC','Bellamaps','Flipbook'],                        tags:['ES2023','Async/Await','Fetch API']  },
  { id:'ts',           name:'TypeScript',  category:'Frontend',      color:'#3178C6', iconName:'SiTypescript',  description:'Superset tipado de JS. Detecta errores en compilación.',                           projects:['SIGC'],                                              tags:['Tipos','Interfaces','Generics']     },
  { id:'html5',        name:'HTML5',       category:'Frontend',      color:'#E34F26', iconName:'SiHtml5',       description:'Marcado semántico y estructuración de interfaces.',                                projects:['SIGC','Bellamaps','Flipbook'],                        tags:['Semántico','Accesibilidad','SEO']   },
  { id:'css3',         name:'CSS3',        category:'Frontend',      color:'#264DE4', iconName:'FaCss3Alt',     description:'Estilos, animaciones, Flexbox y Grid.',                                           projects:['SIGC','Bellamaps'],                                   tags:['Flexbox','Grid','Animations']       },
  { id:'tailwind',     name:'Tailwind',    category:'Frontend',      color:'#38BDF8', iconName:'SiTailwindcss', description:'Framework CSS utility-first para diseño rápido.',                                  projects:[],                                                    tags:['Utility','Responsive','Dark Mode']  },
  { id:'angular',      name:'Angular',     category:'Frontend',      color:'#DD0031', iconName:'SiAngular',     description:'Framework de Google para SPAs con TypeScript.',                                   projects:[],                                                    tags:['Módulos','Servicios','RxJS']        },
  { id:'bootstrap',    name:'Bootstrap',   category:'Frontend',      color:'#7952B3', iconName:'SiBootstrap',   description:'Framework CSS para diseño responsivo rápido.',                                    projects:[],                                                    tags:['Grid','Componentes','Responsive']   },
  { id:'figma',        name:'Figma',       category:'Frontend',      color:'#A259FF', iconName:'SiFigma',       description:'Diseño UI/UX colaborativo y sistemas de diseño.',                                 projects:['Ixelo','Nutricom'],                                  tags:['Prototipado','Design System']       },

  // ── Mobile ──
  { id:'flutter',      name:'Flutter',     category:'Mobile',        color:'#54C5F8', iconName:'SiFlutter',     description:'Apps nativas multiplataforma con un solo código Dart.',                           projects:['Ixelo','Nutricom'],                                  tags:['Widgets','Navigator','Null Safety'] },
  { id:'dart',         name:'Dart',        category:'Mobile',        color:'#00B4D8', iconName:'SiDart',        description:'Lenguaje compilado de Google, base de Flutter.',                                  projects:['Ixelo','Nutricom'],                                  tags:['Null Safety','Async','OOP']         },

  // ── Backend ──
  { id:'nodejs',       name:'Node.js',     category:'Backend',       color:'#68A063', iconName:'SiNodedotjs',   description:'JavaScript en el servidor. APIs REST y middlewares.',                             projects:['Bellamaps'],                                         tags:['Express','REST API','Middleware']   },
  { id:'php',          name:'PHP',         category:'Backend',       color:'#777BB4', iconName:'SiPhp',         description:'Sistemas web y generación de reportes en PDF.',                                   projects:['Sistema de Gestión Escolar'],                        tags:['MVC','PDF','MySQL']                 },
  { id:'python',       name:'Python',      category:'Backend',       color:'#3776AB', iconName:'SiPython',      description:'IA, procesamiento de señales y automatización.',                                  projects:['Ixelo','Filtrado de Señales'],                       tags:['YOLOv8','CNN','Scripts']            },
  { id:'java',         name:'Java',        category:'Backend',       color:'#F89820', iconName:'FaJava',        description:'OOP con tipado fuerte para aplicaciones robustas.',                               projects:[],                                                    tags:['OOP','POO','Estructuras']           },
  { id:'cpp',          name:'C / C++',     category:'Backend',       color:'#00599C', iconName:'SiCplusplus',   description:'OOP y programación de bajo nivel. Estructuras de datos y algoritmos.',            projects:['Compiladores y Estructuras de Datos'],               tags:['OOP','Punteros','STL']              },

  // ── Cloud ──
  { id:'aws',          name:'AWS',         category:'Cloud',         color:'#FF9900', iconName:'FaAws',         description:'S3, Lambda, EC2 y CloudFront para despliegue.',                                   projects:['SIGC'],                                              tags:['S3','Lambda','EC2','CloudFront']    },
  { id:'azure',        name:'Azure',       category:'Cloud',         color:'#0078D4', iconName:'TbBrandAzure',  description:'VMs, VNets, SSH, SQL y Disaster Recovery.',                                       projects:['Infraestructura Cloud'],                             tags:['VMs','VNets','SSH']                 },
  { id:'docker',       name:'Docker',      category:'Cloud',         color:'#2496ED', iconName:'SiDocker',      description:'Contenedorización para entornos reproducibles.',                                  projects:['SIGC','Infraestructura Cloud'],                      tags:['Containers','Images','Compose']     },

  // ── Base de datos ──
  { id:'mysql',        name:'MySQL',       category:'Base de datos', color:'#00758F', iconName:'SiMysql',       description:'BD relacional. Consultas optimizadas y reportes.',                                projects:['Bellamaps','Flipbook','Sistema de Gestión Escolar'], tags:['SQL','Joins','Stored Procedures']   },
  { id:'firebase',     name:'Firebase',    category:'Base de datos', color:'#FFCA28', iconName:'SiFirebase',    description:'Firestore en tiempo real, auth, storage y hosting.',                              projects:['Nutricom','Portfolio'],                              tags:['Firestore','Auth','Storage']        },
  { id:'postgresql',   name:'PostgreSQL',  category:'Base de datos', color:'#336791', iconName:'SiPostgresql',  description:'BD relacional avanzada con soporte para JSON, índices y alta disponibilidad.',     projects:[],                                                    tags:['SQL','JSONB','Índices']             },

  // ── Herramientas ──
  { id:'git',          name:'Git',         category:'Herramientas',  color:'#F05032', iconName:'SiGit',         description:'Control de versiones distribuido y flujos colaborativos.',                        projects:['Todos'],                                             tags:['Branching','Merge','GitHub']        },
  { id:'github',       name:'GitHub',      category:'Herramientas',  color:'#FFFFFF', iconName:'SiGithub',      description:'Repositorios remotos, PR y colaboración en equipo.',                              projects:['Todos'],                                             tags:['PRs','Actions','Repos']             },
  { id:'postman',      name:'Postman',     category:'Herramientas',  color:'#FF6C37', iconName:'SiPostman',     description:'Pruebas y documentación de APIs REST.',                                           projects:['SIGC','Bellamaps'],                                  tags:['REST','Testing','Collections']      },
  { id:'vscode',       name:'VS Code',     category:'Herramientas',  color:'#007ACC', iconName:'TbBrandVscode', description:'Editor principal con extensiones, debug y terminal.',                             projects:['Todos'],                                             tags:['Extensions','Debug','Terminal']     },
  { id:'jira',         name:'Jira',        category:'Herramientas',  color:'#2684FF', iconName:'SiJira',        description:'Gestión ágil. Sprints, Kanban y seguimiento de tareas.',                          projects:['Ixelo'],                                             tags:['Scrum','Kanban','Sprints']          },
  { id:'linux',        name:'Linux',       category:'Herramientas',  color:'#FCC624', iconName:'SiLinux',       description:'Administración, scripting Bash y configuración servers.',                         projects:['Infraestructura Cloud'],                             tags:['Bash','SSH','Servidores']           },
  { id:'packettracer', name:'Packet Tracer',category:'Herramientas', color:'#1BA0D7', iconName:'SiCisco',       description:'Simulador de redes Cisco para VLANs, enrutamiento y NAT.',                        projects:['Redes Cisco/GNS3'],                                  tags:['VLAN','Routing','NAT']              },
];

/* ══════════════════════════════════════════════════════════
   CONTACT — mensajes del chat animado
══════════════════════════════════════════════════════════ */
export const CHAT_MSGS = [
  { side: 'left',  avatar: '👋', text: '¡Hola! Vi tu portfolio y me pareció increíble...' },
  { side: 'right', avatar: '😄', text: '¡Gracias! ¿En qué puedo ayudarte?' },
  { side: 'left',  avatar: '👋', text: 'Tengo un proyecto en mente y creo que eres la persona indicada.' },
  { side: 'right', avatar: '😄', text: '¡Con gusto! Cuéntame más, estoy disponible ahora mismo 🚀' },
];
