// src/admin/HeroManager.jsx
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { iconMap, getLabel } from '../utils/iconMapper';

/* ── Defaults (CV) ────────────────────────────────────────────── */
const DEFAULTS = {
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

const ALL_ICONS = Object.keys(iconMap);

/* ── Inject CSS ────────────────────────────────────────────────── */
const SID = 'adm-hero-mgr';
if (typeof document !== 'undefined' && !document.getElementById(SID)) {
  const s = document.createElement('style');
  s.id = SID;
  s.textContent = `
    @keyframes hm-spin { to { transform:rotate(360deg); } }

    .hm-card {
      background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 14px;
      padding: 1.25rem;
      margin-bottom: 1rem;
    }
    .hm-card-title {
      color: rgba(255,255,255,.28);
      font-size: .67rem;
      font-weight: 700;
      letter-spacing: .09em;
      text-transform: uppercase;
      margin: 0 0 1rem;
      padding-bottom: .65rem;
      border-bottom: 1px solid rgba(255,255,255,.05);
    }
    .hm-label {
      color: rgba(255,255,255,.38);
      font-size: .74rem;
      font-weight: 500;
      margin-bottom: 5px;
      display: block;
    }
    .hm-input, .hm-textarea {
      width: 100%; box-sizing: border-box;
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 9px;
      color: #e2e8f0;
      font-size: .85rem;
      font-family: inherit;
      padding: 9px 12px;
      outline: none;
      transition: border-color .2s;
    }
    .hm-input:focus, .hm-textarea:focus {
      border-color: rgba(59,130,246,.6);
    }
    .hm-textarea {
      resize: vertical;
      line-height: 1.6;
      min-height: 90px;
    }
    .hm-preview {
      background: rgba(0,0,0,.25);
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 10px;
      padding: 10px 14px;
      margin-bottom: .9rem;
      font-size: .9rem;
    }
    .hm-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .hm-field { display: flex; flex-direction: column; }

    /* icon chips */
    .hm-chip {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 11px; border-radius: 8px;
      border: 1px solid rgba(255,255,255,.09);
      background: rgba(255,255,255,.04);
      color: rgba(255,255,255,.45);
      font-size: .76rem; font-family: inherit;
      cursor: pointer; user-select: none;
      transition: all .15s;
    }
    .hm-chip:hover {
      background: rgba(255,255,255,.09);
      color: rgba(255,255,255,.75);
      border-color: rgba(255,255,255,.18);
    }
    .hm-chip.on {
      background: rgba(59,130,246,.15);
      border-color: rgba(59,130,246,.4);
      color: #93c5fd;
    }
    .hm-chip.on:hover { background: rgba(59,130,246,.22); }

    /* selected order chips */
    .hm-sel-chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px; border-radius: 7px;
      background: rgba(59,130,246,.1);
      border: 1px solid rgba(59,130,246,.22);
      color: #93c5fd; font-size: .76rem;
    }
    .hm-sel-chip .num { color: rgba(255,255,255,.25); font-size: .63rem; }
    .hm-sel-chip button {
      background: none; border: none; cursor: pointer;
      color: rgba(255,255,255,.25); padding: 0; line-height: 1;
      font-size: .72rem; transition: color .15s;
    }
    .hm-sel-chip button:hover { color: #f87171; }

    /* search */
    .hm-search {
      width: 100%; box-sizing: border-box;
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.09);
      border-radius: 9px; color: #e2e8f0;
      font-size: .83rem; font-family: inherit;
      padding: 8px 12px; outline: none;
      transition: border-color .2s;
    }
    .hm-search:focus { border-color: rgba(59,130,246,.5); }

    /* save button */
    .hm-save {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 26px; border-radius: 10px;
      background: linear-gradient(135deg,#3b82f6,#1d4ed8);
      border: none; color: #fff;
      font-size: .875rem; font-weight: 700;
      font-family: inherit; cursor: pointer;
      transition: opacity .2s, transform .15s;
    }
    .hm-save:hover:not(:disabled) { opacity: .9; transform: translateY(-1px); }
    .hm-save:disabled { opacity: .5; cursor: not-allowed; }

    .hm-hint {
      color: rgba(255,255,255,.22);
      font-size: .74rem;
      line-height: 1.5;
      margin: 0 0 .8rem;
    }
  `;
  document.head.appendChild(s);
}

/* ── Component ────────────────────────────────────────────────── */
export default function HeroManager() {
  const [form,    setForm]    = useState(DEFAULTS);
  const [search,  setSearch]  = useState('');
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [status,  setStatus]  = useState(null); // { type:'success'|'error', msg }

  /* Load */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'hero', 'main'));
        if (!cancelled && snap.exists()) {
          setForm({ ...DEFAULTS, ...snap.data() });
        }
      } catch (e) {
        console.error('HeroManager load:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  /* Toggle icon */
  const toggle = (key) => {
    const cur = form.heroIcons || [];
    set('heroIcons', cur.includes(key) ? cur.filter(k => k !== key) : [...cur, key]);
  };

  /* Remove from order */
  const remove = (key) =>
    set('heroIcons', (form.heroIcons || []).filter(k => k !== key));

  /* Save */
  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      await setDoc(
        doc(db, 'hero', 'main'),
        {
          nameWhite:   form.nameWhite.trim(),
          nameBlue:    form.nameBlue.trim(),
          roleLine:    form.roleLine.trim(),
          description: form.description.trim(),
          heroIcons:   form.heroIcons || [],
          updatedAt:   serverTimestamp(),
        },
        { merge: true }
      );
      setStatus({ type: 'success', msg: '✓ Guardado correctamente' });
    } catch (e) {
      setStatus({ type: 'error', msg: 'Error: ' + e.message });
    } finally {
      setSaving(false);
    }
  };

  const filtered = search.trim()
    ? ALL_ICONS.filter(k => getLabel(k).toLowerCase().includes(search.toLowerCase()))
    : ALL_ICONS;

  /* Loading */
  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center', padding:'5rem', fontFamily:"'Inter',system-ui" }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:34, height:34, border:'3px solid rgba(255,255,255,.07)', borderTopColor:'#3b82f6', borderRadius:'50%', animation:'hm-spin .7s linear infinite', margin:'0 auto 12px' }}/>
        <p style={{ color:'rgba(255,255,255,.3)', fontSize:'.82rem' }}>Cargando hero/main…</p>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:740, fontFamily:"'Inter',system-ui,sans-serif", color:'#e2e8f0' }}>

      {/* Header */}
      <div style={{ marginBottom:'1.75rem' }}>
        <h2 style={{ fontSize:'1.35rem', fontWeight:800, color:'#f1f5f9', margin:'0 0 4px' }}>
          Hero Section
        </h2>
        <p style={{ fontSize:'.82rem', color:'rgba(255,255,255,.3)', margin:0 }}>
          Documento <code style={{ color:'rgba(96,165,250,.7)', fontSize:'.78rem' }}>hero/main</code> en Firestore
        </p>
      </div>

      {/* ── NOMBRE ─────────────────────────────────────────────── */}
      <div className="hm-card">
        <p className="hm-card-title">Nombre</p>
        <p className="hm-hint">
          El nombre se divide en dos partes: <strong style={{ color:'rgba(255,255,255,.55)' }}>parte blanca</strong> y{' '}
          <strong style={{ background:'linear-gradient(90deg,#3b82f6,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>parte azul</strong>.
        </p>

        {/* Preview */}
        <div className="hm-preview">
          <span style={{ fontWeight:800, color:'#fff', fontSize:'1.05rem' }}>
            {form.nameWhite || '…'}{' '}
          </span>
          <span style={{ fontWeight:800, fontSize:'1.05rem', background:'linear-gradient(90deg,#3b82f6,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            {form.nameBlue || '…'}
          </span>
        </div>

        <div className="hm-grid-2">
          <div className="hm-field">
            <label className="hm-label">Parte blanca</label>
            <input className="hm-input" value={form.nameWhite} onChange={e => set('nameWhite', e.target.value)} placeholder="Leonardo Daniel" />
          </div>
          <div className="hm-field">
            <label className="hm-label">Parte azul (gradiente)</label>
            <input className="hm-input" value={form.nameBlue} onChange={e => set('nameBlue', e.target.value)} placeholder="Dominguez" />
          </div>
        </div>
      </div>

      {/* ── LÍNEA DE ROL ───────────────────────────────────────── */}
      <div className="hm-card">
        <p className="hm-card-title">Línea de rol</p>
        <p className="hm-hint">
          Se muestra como <code style={{ color:'rgba(96,165,250,.7)' }}>&lt; Frontend &amp; Mobile Dev · UX · QA /&gt;</code>
        </p>

        {/* Preview */}
        <div className="hm-preview">
          <span style={{ color:'rgba(255,255,255,.4)' }}>&lt; </span>
          <span style={{ color:'#e2e8f0', fontWeight:600 }}>{form.roleLine || '…'}</span>
          <span style={{ color:'rgba(255,255,255,.4)' }}> /&gt;</span>
        </div>

        <div className="hm-field">
          <label className="hm-label">Texto</label>
          <input
            className="hm-input"
            value={form.roleLine}
            onChange={e => set('roleLine', e.target.value)}
            placeholder="Frontend & Mobile Dev · UX · QA"
          />
        </div>
      </div>

      {/* ── DESCRIPCIÓN ────────────────────────────────────────── */}
      <div className="hm-card">
        <p className="hm-card-title">Descripción</p>
        <p className="hm-hint">
          Usa <code style={{ color:'rgba(96,165,250,.7)' }}>**palabra**</code> para negrita.
        </p>
        <div className="hm-field">
          <label className="hm-label">Párrafo</label>
          <textarea
            className="hm-textarea"
            value={form.description}
            onChange={e => set('description', e.target.value)}
            placeholder="Apasionado por crear experiencias digitales…"
          />
        </div>
      </div>

      {/* ── ICONOS DEL GRID ────────────────────────────────────── */}
      <div className="hm-card">
        <p className="hm-card-title">
          Iconos del grid &nbsp;·&nbsp;
          <span style={{ color:'rgba(96,165,250,.7)' }}>{(form.heroIcons || []).length} seleccionados</span>
        </p>
        <p className="hm-hint">
          Los iconos se muestran en el orden de selección. Haz clic para agregar o quitar.
        </p>

        {/* Orden actual */}
        {(form.heroIcons || []).length > 0 && (
          <div style={{ marginBottom:'1rem' }}>
            <p style={{ color:'rgba(255,255,255,.28)', fontSize:'.68rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'.07em', margin:'0 0 8px' }}>
              Orden actual
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {form.heroIcons.map((key, i) => {
                const Ic = iconMap[key];
                return (
                  <span key={key} className="hm-sel-chip">
                    <span className="num">{i + 1}</span>
                    {Ic && <Ic size={12} />}
                    {getLabel(key)}
                    <button onClick={() => remove(key)}>✕</button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Buscador */}
        <input
          className="hm-search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar: React, Java, Flutter, AWS…"
          style={{ marginBottom:'.75rem' }}
        />

        {/* Todos los iconos disponibles */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {filtered.map(key => {
            const Ic  = iconMap[key];
            const sel = (form.heroIcons || []).includes(key);
            return (
              <button key={key} className={`hm-chip${sel ? ' on' : ''}`} onClick={() => toggle(key)}>
                {Ic && <Ic size={13} />}
                {getLabel(key)}
                {sel && <span style={{ fontSize:'.62rem', opacity:.6 }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── GUARDAR ────────────────────────────────────────────── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, paddingTop:4 }}>
        <span style={{
          fontSize:'.84rem',
          color: status?.type === 'success' ? '#4ade80' : status?.type === 'error' ? '#f87171' : 'transparent',
          minHeight: 20,
        }}>
          {status?.msg || '·'}
        </span>
        <button className="hm-save" onClick={save} disabled={saving}>
          {saving
            ? <><HmSpin /> Guardando…</>
            : '💾 Guardar Hero'
          }
        </button>
      </div>

    </div>
  );
}

function HmSpin() {
  return (
    <svg style={{ animation:'hm-spin .7s linear infinite', width:14, height:14, flexShrink:0 }} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="3" strokeOpacity=".2"/>
      <path d="M12 2a10 10 0 0110 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}