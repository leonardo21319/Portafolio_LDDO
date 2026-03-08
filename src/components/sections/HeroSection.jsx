// src/components/sections/HeroSection.jsx
import { useEffect, useRef } from 'react';
import { useHero } from '../../hooks/useHero';
import { getIconComponent } from '../../utils/iconMapper';
import '../../styles/hero.css';

/* ── Fallback ─────────────────────────────────────────────────── */
const FALLBACK = {
  nameWhite:   'Leonardo Daniel',
  nameBlue:    'Dominguez',
  roleLine:    'Frontend & Mobile Dev · UX · QA',
  description: 'Apasionado por crear experiencias digitales que combinan **estética** y **funcionalidad**. Especializado en **React**, **Flutter** y **AWS**, con enfoque en calidad y detalle pixel a pixel.',
  heroIcons: [
    'SiReact','SiFlutter','FaAws','SiFirebase',
    'TbBrandAzure','SiTypescript','SiFigma','SiDocker',
    'SiDart','SiNodedotjs','SiPython','SiMysql',
    'TbBrandVscode','SiPostman','SiJira','SiGit',
  ],
};

/* ── Colores por clave de icono ───────────────────────────────── */
const ICON_COLORS = {
  SiReact:       { ic:'rgba(97,218,251,.5)',   ig:'rgba(97,218,251,.18)'  },
  SiFlutter:     { ic:'rgba(84,197,248,.5)',   ig:'rgba(84,197,248,.18)'  },
  FaAws:         { ic:'rgba(255,153,0,.5)',    ig:'rgba(255,153,0,.15)'   },
  SiFirebase:    { ic:'rgba(255,202,40,.5)',   ig:'rgba(255,202,40,.14)'  },
  TbBrandAzure:  { ic:'rgba(0,120,212,.6)',    ig:'rgba(0,120,212,.2)'    },
  SiTypescript:  { ic:'rgba(49,120,198,.6)',   ig:'rgba(49,120,198,.2)'   },
  SiFigma:       { ic:'rgba(162,89,255,.5)',   ig:'rgba(162,89,255,.16)'  },
  SiDocker:      { ic:'rgba(36,150,237,.5)',   ig:'rgba(36,150,237,.16)'  },
  SiDart:        { ic:'rgba(0,180,216,.5)',    ig:'rgba(0,180,216,.16)'   },
  SiNodedotjs:   { ic:'rgba(104,160,99,.5)',   ig:'rgba(104,160,99,.16)'  },
  SiPython:      { ic:'rgba(55,118,171,.5)',   ig:'rgba(55,118,171,.16)'  },
  SiMysql:       { ic:'rgba(0,117,143,.6)',    ig:'rgba(0,117,143,.18)'   },
  TbBrandVscode: { ic:'rgba(0,120,212,.6)',    ig:'rgba(0,120,212,.2)'    },
  SiPostman:     { ic:'rgba(255,108,55,.5)',   ig:'rgba(255,108,55,.16)'  },
  SiJira:        { ic:'rgba(38,132,255,.5)',   ig:'rgba(38,132,255,.16)'  },
  SiGit:         { ic:'rgba(240,80,50,.5)',    ig:'rgba(240,80,50,.16)'   },
  SiJavascript:  { ic:'rgba(247,223,30,.5)',   ig:'rgba(247,223,30,.14)'  },
  SiHtml5:       { ic:'rgba(228,77,38,.5)',    ig:'rgba(228,77,38,.16)'   },
  FaCss3Alt:     { ic:'rgba(38,77,228,.5)',    ig:'rgba(38,77,228,.16)'   },
  SiTailwindcss: { ic:'rgba(56,189,248,.5)',   ig:'rgba(56,189,248,.16)'  },
  SiAngular:     { ic:'rgba(221,0,49,.5)',     ig:'rgba(221,0,49,.16)'    },
  SiNextdotjs:   { ic:'rgba(255,255,255,.5)',  ig:'rgba(255,255,255,.1)'  },
  SiMongodb:     { ic:'rgba(71,162,72,.5)',    ig:'rgba(71,162,72,.16)'   },
  SiGithub:      { ic:'rgba(255,255,255,.5)',  ig:'rgba(255,255,255,.1)'  },
  SiPhp:         { ic:'rgba(119,123,180,.5)',  ig:'rgba(119,123,180,.16)' },
  SiLinux:       { ic:'rgba(255,213,0,.5)',    ig:'rgba(255,213,0,.14)'   },
  FaWindows:     { ic:'rgba(0,188,212,.5)',    ig:'rgba(0,188,212,.16)'   },
  SiKotlin:      { ic:'rgba(120,70,230,.5)',   ig:'rgba(120,70,230,.16)'  },
  SiSwift:       { ic:'rgba(240,81,56,.5)',    ig:'rgba(240,81,56,.16)'   },
  SiGitlab:      { ic:'rgba(226,67,41,.5)',    ig:'rgba(226,67,41,.16)'   },
  FaJava:        { ic:'rgba(248,152,32,.5)',   ig:'rgba(248,152,32,.16)'  },
  SiVuedotjs:    { ic:'rgba(66,185,131,.5)',   ig:'rgba(66,185,131,.16)'  },
  SiKotlin:      { ic:'rgba(120,70,230,.5)',   ig:'rgba(120,70,230,.16)'  },
};
const DEF_COLOR = { ic:'rgba(255,255,255,.4)', ig:'rgba(255,255,255,.1)' };

/* ── Float timing ─────────────────────────────────────────────── */
const FLOATS = [
  {dur:'3.4s',del:'0s'    },{dur:'3.8s',del:'.25s' },{dur:'3.2s',del:'.5s'  },{dur:'4.1s',del:'.75s' },
  {dur:'3.6s',del:'1s'    },{dur:'3.3s',del:'1.25s'},{dur:'3.5s',del:'1.5s' },{dur:'3.9s',del:'1.75s'},
  {dur:'3.7s',del:'2s'    },{dur:'3.6s',del:'2.25s'},{dur:'4.2s',del:'2.5s' },{dur:'3.4s',del:'2.75s'},
  {dur:'3.3s',del:'3s'    },{dur:'4.0s',del:'3.25s'},{dur:'3.8s',del:'3.5s' },{dur:'3.6s',del:'3.75s'},
];

/* ── IDE lines ────────────────────────────────────────────────── */
const IDE_LINES = [
  { raw:"import React,{useState} from 'react'",
    html:`<span class="cb">import</span> <span class="cw">React</span><span class="cgr">,{useState}</span> <span class="cb">from</span> <span class="cg">'react'</span>` },
  { raw:"import { db } from './firebase'",
    html:`<span class="cb">import</span> <span class="cw">{ db }</span> <span class="cb">from</span> <span class="cg">'./firebase'</span>` },
  { raw:"// ✦ Portfolio · Leonardo Daniel",
    html:`<span class="cgr">// ✦ Portfolio · Leonardo Daniel</span>` },
  { raw:"", html:`` },
  { raw:"const HeroSection = () => {",
    html:`<span class="cb">const</span> <span class="co">HeroSection</span> <span class="cw">= () => {</span>` },
  { raw:"  return (",
    html:`&nbsp;&nbsp;<span class="cp">return</span> <span class="cw">(</span>` },
  { raw:'    <section id="hero">',
    html:`&nbsp;&nbsp;&nbsp;&nbsp;<span class="cr2">&lt;section</span> <span class="cy">id</span><span class="cw">=</span><span class="cg">"hero"</span><span class="cr2">&gt;</span>` },
  { raw:'      <Dev name="Leonardo"/>',
    html:`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cr2">&lt;Dev</span> <span class="cy">name</span><span class="cw">=</span><span class="cg">"Leonardo"</span><span class="cr2">/&gt;</span>`,
    active:true },
];

/* ── Animated keyboard ────────────────────────────────────────── */
const BLUE_KEYS=[3,9,16,22,30], RED_KEYS=[12,17,19,37];
function AnimatedKeyboard() {
  const keysRef = useRef([]);
  useEffect(() => {
    const all=[...BLUE_KEYS,...RED_KEYS], timers=[];
    const press = idx => {
      const el = keysRef.current[idx]; if (!el) return;
      el.classList.add('key-pressed');
      timers.push(setTimeout(() => el.classList.remove('key-pressed'), 180));
    };
    const loop = () => {
      const sh = [...all].sort(() => Math.random() - .5);
      const n  = Math.random() > .55 ? 2 : 1;
      for (let i=0; i<n; i++) timers.push(setTimeout(() => press(sh[i]), i*110));
      timers.push(setTimeout(loop, 380 + Math.random()*620));
    };
    timers.push(setTimeout(loop, 1400));
    return () => timers.forEach(clearTimeout);
  }, []);
  const cls = i => RED_KEYS.includes(i) ? 'key key-red' : BLUE_KEYS.includes(i) ? 'key key-blue' : [0,6,13,26,27,33].includes(i) ? 'key key-lit' : 'key';
  return (
    <div className="d-kbd">
      {Array.from({length:39}, (_,i) => (
        <div key={i} className={cls(i)} ref={el => keysRef.current[i] = el} />
      ))}
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────── */
export default function HeroSection() {
  const { hero, loading } = useHero();

  /* Merge Firebase + fallback */
  const d = {
    nameWhite:   hero?.nameWhite   || FALLBACK.nameWhite,
    nameBlue:    hero?.nameBlue    || FALLBACK.nameBlue,
    roleLine:    hero?.roleLine    || FALLBACK.roleLine,
    description: hero?.description || FALLBACK.description,
    heroIcons:   (hero?.heroIcons?.length > 0) ? hero.heroIcons : FALLBACK.heroIcons,
  };

  /* Typewriter */
  const codeRef  = useRef(null);
  const lnumsRef = useRef(null);
  const timerRef = useRef(null);

  const scrollTo = id =>
    document.getElementById(id.replace('#',''))?.scrollIntoView({ behavior:'smooth' });

  const escHtml = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  const sliceHTML = (html, n) => {
    const div = document.createElement('div'); div.innerHTML = html;
    let vis=0, res='';
    const proc = node => {
      if (vis >= n) return;
      if (node.nodeType === 3) {
        const sl = node.textContent.slice(0, n - vis);
        res += escHtml(sl); vis += sl.length;
      } else if (node.nodeType === 1) {
        const t=node.tagName.toLowerCase(), c=node.getAttribute('class')||'';
        res += `<${t}${c?` class="${c}"`:''}>`;
        node.childNodes.forEach(proc);
        res += `</${t}>`;
      }
    };
    div.childNodes.forEach(proc);
    return res;
  };

  const typewriteAll = () => {
    clearTimeout(timerRef.current);
    if (!codeRef.current) return;
    codeRef.current.innerHTML = '';
    if (lnumsRef.current) {
      lnumsRef.current.innerHTML = '';
      for (let i=1; i<=IDE_LINES.length; i++) {
        const d=document.createElement('div'); d.textContent=i;
        lnumsRef.current.appendChild(d);
      }
    }
    const rows=[]; let li=0, ci=0;
    IDE_LINES.forEach(l => {
      const r=document.createElement('div');
      r.className='cl'+(l.active?' aline':'');
      codeRef.current.appendChild(r); rows.push(r);
    });
    const SPEED=28;
    const tick = () => {
      if (!codeRef.current || li >= IDE_LINES.length) return;
      const line=IDE_LINES[li], rl=line.raw.length;
      if (rl===0) { li++; ci=0; timerRef.current=setTimeout(tick,SPEED*3); return; }
      ci++;
      if (ci<=rl) {
        rows[li].innerHTML = sliceHTML(line.html,ci)+'<span class="hcursor"></span>';
        timerRef.current=setTimeout(tick,SPEED);
      } else {
        rows[li].innerHTML = line.html;
        li++; ci=0; timerRef.current=setTimeout(tick,SPEED*8);
      }
    };
    timerRef.current=setTimeout(tick,400);
  };

  useEffect(() => {
    typewriteAll();
    const iv = setInterval(() => {
      if (!codeRef.current || !lnumsRef.current) return;
      codeRef.current.style.cssText  += 'transition:opacity .35s;opacity:0';
      lnumsRef.current.style.cssText += 'transition:opacity .35s;opacity:0';
      setTimeout(() => {
        if (!codeRef.current || !lnumsRef.current) return;
        codeRef.current.style.opacity='1';
        lnumsRef.current.style.opacity='1';
        typewriteAll();
      }, 380);
    }, 9000);
    return () => { clearTimeout(timerRef.current); clearInterval(iv); };
  }, []);

  /* Render description con **bold** */
  const renderDesc = txt =>
    txt.split(/(\*\*[^*]+\*\*)/).map((p,i) =>
      p.startsWith('**') && p.endsWith('**')
        ? <strong key={i}>{p.slice(2,-2)}</strong>
        : p
    );

  /* Parse roleLine → spans con clases originales
     Formato esperado: "A & B · C · D"  (& y · como separadores) */
  const renderRole = (line) => {
    const tokens = line.split(/(\s*&\s*|\s*·\s*)/);
    const cls    = ['r-fe','r-mob','r-ux','r-qa'];
    let   segIdx = 0;
    return tokens.map((t, i) => {
      const trimmed = t.trim();
      if (trimmed === '&') return <span key={i} className="r-amp"> &amp; </span>;
      if (trimmed === '·') return <span key={i} className="r-dot"> · </span>;
      if (trimmed === '')  return null;
      const c = cls[segIdx] || 'r-fe';
      segIdx++;
      return <span key={i} className={c}>{trimmed}</span>;
    });
  };

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
            <div className="role-underline">
              <div className="role-underline-track"/>
            </div>
          </div>

          <div className="role-divider"/>

          {/* Descripción */}
          <p className="hero-desc">
            {loading
              ? <span style={{opacity:.3}}>Cargando…</span>
              : renderDesc(d.description)
            }
          </p>

          {/* CTAs */}
          <div className="cta-group">
            <button className="btn-projects" onClick={() => scrollTo('proyectos')}>
              🚀 Ver Proyectos
            </button>
            <button className="btn-contact" onClick={() => scrollTo('certificaciones')}>
              ✔ Certificaciones
            </button>
          </div>

          {/* Icon grid — desde heroIcons de Firebase */}
          <div className="tech-grid">
            {d.heroIcons.map((iconName, i) => {
              const Ic     = getIconComponent(iconName);
              const anim   = FLOATS[i % FLOATS.length];
              const colors = ICON_COLORS[iconName] || DEF_COLOR;
              return (
                <div
                  key={iconName + i}
                  className="ti"
                  title={iconName.replace(/^(Si|Fa|Tb)(?:Brand)?/, '')}
                  style={{ '--dur':anim.dur, '--del':anim.del, '--ic':colors.ic, '--ig':colors.ig }}
                >
                  <div className="ti-icon">
                    <Ic size={22}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ RIGHT — monitor scene ══ */}
        <div className="hero-right">
          <div className="mon-glow"/>
          <div className="scene">
            <div className="mon-wrap">
              <div className="mon-3d">
                <div className="mon-screen">
                  <div className="ide-top">
                    <div className="dot2 dr"/><div className="dot2 dy"/><div className="dot2 dg"/>
                    <div className="ide-tabs">
                      <div className="tab2 tab-a">App.jsx</div>
                      <div className="tab2">firebase.js</div>
                    </div>
                  </div>
                  <div className="ide-body">
                    <div className="lnums" ref={lnumsRef}/>
                    <div className="ide-code" ref={codeRef}/>
                  </div>
                  <div className="ide-status">
                    <span><span className="s-err">✓</span> 0 errors</span>
                    <span className="s-br">main ⎇</span>
                    <span>JSX · UTF-8</span>
                  </div>
                </div>
                <div className="mon-neck"/>
                <div className="mon-base"/>
              </div>
            </div>

            {/* Desk objects */}
            <div className="d-lamp">
              <div className="lamp-cone"/>
              <svg viewBox="0 0 48 80" fill="none" width="42">
                <rect x="21" y="38" width="6" height="36" rx="3" fill="#2a3450"/>
                <ellipse cx="24" cy="74" rx="10" ry="4" fill="#1e2840"/>
                <path d="M8 8 L40 8 L32 34 L16 34 Z" fill="#f0c040" opacity=".9"/>
                <path d="M8 8 L40 8 L36 12 L12 12 Z" fill="#e0a020"/>
                <rect x="10" y="4" width="28" height="5" rx="2.5" fill="#333d55"/>
              </svg>
            </div>
            <div className="d-hp">
              <svg viewBox="0 0 52 52" fill="none" width="44">
                <path d="M8 28a18 18 0 0136 0" stroke="#4a5568" strokeWidth="3" fill="none"/>
                <rect x="4" y="26" width="8" height="14" rx="4" fill="#2563eb"/>
                <rect x="40" y="26" width="8" height="14" rx="4" fill="#2563eb"/>
                <rect x="2" y="30" width="6" height="8" rx="3" fill="#1d4ed8"/>
                <rect x="44" y="30" width="6" height="8" rx="3" fill="#1d4ed8"/>
              </svg>
            </div>
            <div className="d-sticky">
              <svg viewBox="0 0 52 52" fill="none" width="44">
                <rect x="4" y="4" width="44" height="44" rx="4" fill="#fde68a"/>
                <rect x="4" y="4" width="44" height="8" rx="4" fill="#fbbf24"/>
                <rect x="10" y="18" width="28" height="2.5" rx="1.2" fill="#92400e" opacity=".5"/>
                <rect x="10" y="25" width="22" height="2.5" rx="1.2" fill="#92400e" opacity=".4"/>
                <rect x="10" y="32" width="18" height="2.5" rx="1.2" fill="#92400e" opacity=".3"/>
              </svg>
            </div>
            <div className="d-phone">
              <svg viewBox="0 0 32 56" fill="none" width="28">
                <rect x="1" y="1" width="30" height="54" rx="5" fill="#1e293b" stroke="rgba(120,160,255,.4)" strokeWidth="1.5"/>
                <rect x="3" y="6" width="26" height="40" rx="2" fill="#0f172a"/>
                <rect x="9" y="2" width="14" height="3" rx="1.5" fill="#334155"/>
                <circle cx="16" cy="50" r="3" fill="#334155"/>
                <rect x="5" y="8" width="22" height="36" rx="1.5" fill="#1e3a5f" opacity=".8"/>
                <rect x="7" y="10" width="18" height="3" rx="1" fill="rgba(97,218,251,.4)"/>
                <rect x="7" y="16" width="14" height="2" rx="1" fill="rgba(255,255,255,.15)"/>
              </svg>
            </div>
            <div className="d-plant">
              <svg viewBox="0 0 70 75" fill="none" width="68">
                <rect x="24" y="54" width="22" height="16" rx="3" fill="#6D4C41"/>
                <rect x="22" y="50" width="26" height="7" rx="2" fill="#5D4037"/>
                <rect x="33" y="36" width="3" height="17" fill="#388E3C"/>
                <ellipse cx="34" cy="32" rx="8" ry="14" fill="#2E7D32" transform="rotate(-18 34 32)"/>
                <ellipse cx="34" cy="32" rx="8" ry="14" fill="#43A047" transform="rotate(18 34 32)"/>
                <ellipse cx="34" cy="26" rx="6" ry="10" fill="#66BB6A"/>
                <ellipse cx="28" cy="38" rx="5" ry="8" fill="#388E3C" transform="rotate(-30 28 38)"/>
                <ellipse cx="40" cy="38" rx="5" ry="8" fill="#43A047" transform="rotate(30 40 38)"/>
              </svg>
            </div>
            <div className="d-mug">
              <div className="stgrp">
                <div className="st"/><div className="st"/><div className="st"/>
              </div>
              <svg viewBox="0 0 58 58" fill="none" width="58">
                <rect x="6" y="20" width="32" height="28" rx="5" fill="#1565C0"/>
                <rect x="6" y="20" width="32" height="8" rx="4" fill="#1E88E5"/>
                <path d="M38 26h6a6 6 0 010 12h-6" stroke="#1976D2" strokeWidth="2.5" strokeLinecap="round"/>
                <rect x="4" y="48" width="36" height="5" rx="2" fill="#0D47A1"/>
                <ellipse cx="22" cy="36" rx="8" ry="3.2" stroke="#61DAFB" strokeWidth="1" fill="none"/>
                <ellipse cx="22" cy="36" rx="8" ry="3.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 22 36)"/>
                <ellipse cx="22" cy="36" rx="8" ry="3.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 22 36)"/>
                <circle cx="22" cy="36" r="1.6" fill="#61DAFB"/>
              </svg>
            </div>
            <AnimatedKeyboard/>
            <div style={{ position:'absolute', top:'-10px', left:'50%', transform:'translateX(-50%)' }}>
              <div className="d-bug">🐛</div>
              <div className="d-bugx">×</div>
            </div>
            <div className="desk-surface"/>
          </div>
        </div>

      </div>

      {/* Scroll hint */}
      <div className="scroll-hint" onClick={() => scrollTo('proyectos')}>
        <span className="sh-t">scroll</span>
        <div className="sh-a">↓</div>
      </div>
    </section>
  );
}