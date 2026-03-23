// src/components/sections/hero/MonitorScene.jsx
import { useRef } from 'react';
import AnimatedKeyboard from './AnimatedKeyboard';
import { useTypewriter } from '../../../hooks/useTypewriter';

/* ── Objetos de escritorio ──────────────────────────────────── */
function Lamp() {
  return (
    <div className="d-lamp">
      <div className="lamp-cone" />
      <svg viewBox="0 0 48 80" fill="none" width="42">
        <rect x="21" y="38" width="6" height="36" rx="3" fill="#2a3450"/>
        <ellipse cx="24" cy="74" rx="10" ry="4" fill="#1e2840"/>
        <path d="M8 8 L40 8 L32 34 L16 34 Z" fill="#f0c040" opacity=".9"/>
        <path d="M8 8 L40 8 L36 12 L12 12 Z" fill="#e0a020"/>
        <rect x="10" y="4" width="28" height="5" rx="2.5" fill="#333d55"/>
      </svg>
    </div>
  );
}

function Headphones() {
  return (
    <div className="d-hp">
      <svg viewBox="0 0 44 40" fill="none" width="44">
        <path d="M4 24 Q4 4 22 4 Q40 4 40 24" stroke="#2a3550" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <rect x="1"  y="22" width="9" height="14" rx="4.5" fill="#1e2840"/>
        <rect x="2.5" y="23.5" width="6" height="11" rx="3" fill="#253045"/>
        <rect x="34" y="22" width="9" height="14" rx="4.5" fill="#1e2840"/>
        <rect x="35.5" y="23.5" width="6" height="11" rx="3" fill="#253045"/>
        <rect x="3.5" y="25" width="3" height="2.5" rx="1" fill="rgba(255,59,48,.6)"/>
        <rect x="36.5" y="25" width="3" height="2.5" rx="1" fill="rgba(0,123,255,.6)"/>
      </svg>
    </div>
  );
}

function StickyNote() {
  return (
    <div className="d-sticky">
      <svg viewBox="0 0 52 52" fill="none" width="44">
        <rect x="4" y="4" width="44" height="44" rx="4" fill="#fde68a"/>
        <rect x="4" y="4" width="44" height="8"  rx="4" fill="#fbbf24"/>
        <rect x="10" y="18" width="28" height="2.5" rx="1.2" fill="#92400e" opacity=".5"/>
        <rect x="10" y="25" width="22" height="2.5" rx="1.2" fill="#92400e" opacity=".4"/>
        <rect x="10" y="32" width="18" height="2.5" rx="1.2" fill="#92400e" opacity=".3"/>
      </svg>
    </div>
  );
}

function Phone() {
  return (
    <div className="d-phone">
      <svg viewBox="0 0 32 56" fill="none" width="28">
        <rect x="1" y="1" width="30" height="54" rx="5" fill="#1e293b" stroke="rgba(120,160,255,.4)" strokeWidth="1.5"/>
        <rect x="3" y="6" width="26" height="40" rx="2" fill="#0f172a"/>
        <rect x="9" y="2" width="14" height="3"  rx="1.5" fill="#334155"/>
        <circle cx="16" cy="50" r="3" fill="#334155"/>
        <rect x="5" y="8"  width="22" height="36" rx="1.5" fill="#1e3a5f" opacity=".8"/>
        <rect x="7" y="10" width="18" height="3"  rx="1"   fill="rgba(97,218,251,.4)"/>
        <rect x="7" y="16" width="14" height="2"  rx="1"   fill="rgba(255,255,255,.15)"/>
      </svg>
    </div>
  );
}

function Plant() {
  return (
    <div className="d-plant">
      <svg viewBox="0 0 70 75" fill="none" width="68">
        <rect x="24" y="54" width="22" height="16" rx="3"  fill="#6D4C41"/>
        <rect x="22" y="50" width="26" height="7"  rx="2"  fill="#5D4037"/>
        <rect x="33" y="36" width="3"  height="17"         fill="#388E3C"/>
        <ellipse cx="34" cy="32" rx="8" ry="14" fill="#2E7D32" transform="rotate(-18 34 32)"/>
        <ellipse cx="34" cy="32" rx="8" ry="14" fill="#43A047" transform="rotate(18 34 32)"/>
        <ellipse cx="34" cy="26" rx="6" ry="10" fill="#66BB6A"/>
        <ellipse cx="28" cy="38" rx="5" ry="8"  fill="#388E3C" transform="rotate(-30 28 38)"/>
        <ellipse cx="40" cy="38" rx="5" ry="8"  fill="#43A047" transform="rotate(30 40 38)"/>
      </svg>
    </div>
  );
}

function Mug() {
  return (
    <div className="d-mug">
      <div className="stgrp">
        <div className="st"/><div className="st"/><div className="st"/>
      </div>
      <svg viewBox="0 0 58 58" fill="none" width="58">
        <rect x="6"  y="20" width="32" height="28" rx="5" fill="#1565C0"/>
        <rect x="6"  y="20" width="32" height="8"  rx="4" fill="#1E88E5"/>
        <path d="M38 26h6a6 6 0 010 12h-6" stroke="#1976D2" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="4"  y="48" width="36" height="5"  rx="2" fill="#0D47A1"/>
        <ellipse cx="22" cy="36" rx="8" ry="3.2" stroke="#61DAFB" strokeWidth="1" fill="none"/>
        <ellipse cx="22" cy="36" rx="8" ry="3.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 22 36)"/>
        <ellipse cx="22" cy="36" rx="8" ry="3.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 22 36)"/>
        <circle  cx="22" cy="36" r="1.6" fill="#61DAFB"/>
      </svg>
    </div>
  );
}

/* ── Monitor principal ──────────────────────────────────────── */
export default function MonitorScene() {
  const codeRef  = useRef(null);
  const lnumsRef = useRef(null);

  /* Hook de typewriter — toda la lógica vive aquí */
  useTypewriter(codeRef, lnumsRef);

  return (
    <div className="hero-right">
      <div className="mon-glow" />

      <div className="scene">
        {/* Monitor */}
        <div className="mon-wrap">
          <div className="mon-3d">
            <div className="mon-screen">
              {/* Barra superior del IDE */}
              <div className="ide-top">
                <div className="dot2 dr"/><div className="dot2 dy"/><div className="dot2 dg"/>
                <div className="ide-tabs">
                  <div className="tab2 tab-a">App.jsx</div>
                  <div className="tab2">firebase.js</div>
                </div>
              </div>

              {/* Cuerpo del IDE */}
              <div className="ide-body">
                <div className="lnums"    ref={lnumsRef} />
                <div className="ide-code" ref={codeRef}  />
              </div>

              {/* Status bar */}
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

        {/* Objetos de escritorio */}
        <Lamp />
        <Headphones />
        <StickyNote />
        <Phone />
        <Plant />
        <Mug />

        {/* Bug flotante */}
        <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)' }}>
          <div className="d-bug">🐛</div>
          <div className="d-bugx">×</div>
        </div>

        {/* Teclado */}
        <AnimatedKeyboard />

        {/* Superficie del escritorio */}
        <div className="desk-surface" />
      </div>
    </div>
  );
}