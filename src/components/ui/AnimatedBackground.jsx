// src/components/ui/AnimatedBackground.jsx
import { useEffect, useRef } from 'react';

const SNIPS = [
  'const dev="Leonardo"', 'import React', '<HeroSection />',
  'git commit -m "feat"', 'flutter run', 'useEffect(()=>{',
  'borderRadius:12', 'await fetch(api)', 'export default',
  '// pixel perfect', 'npm run build', 'firebase deploy',
];

const COLORS = [
  'rgba(0,123,255,.65)', 'rgba(0,212,255,.55)', 'rgba(255,59,48,.5)',
  'rgba(0,123,255,.45)', 'rgba(255,255,255,.45)', 'rgba(0,180,255,.6)',
];

export default function AnimatedBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    // Limpiar hijos anteriores (excepto grid + orbs que ya están en el JSX)
    const existing = bg.querySelectorAll('.particle, .code-fly');
    existing.forEach(el => el.remove());

    // ── 26 partículas ──
    for (let i = 0; i < 26; i++) {
      const el = document.createElement('div');
      el.className = 'particle';
      const c    = COLORS[i % COLORS.length];
      const size = 1.5 + Math.random() * 3;
      const left = Math.random() * 100;
      const dur  = 10 + Math.random() * 18;
      const del  = Math.random() * 16;
      const dx   = (Math.random() - .5) * 140;
      el.style.cssText = `left:${left}%;width:${size}px;height:${size}px;background:${c};--dx:${dx}px;animation-duration:${dur}s;animation-delay:-${del}s;`;
      bg.appendChild(el);
    }

    // ── 10 snippets de código voladores ──
    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div');
      el.className = 'code-fly';
      el.textContent = SNIPS[i % SNIPS.length];
      const left = 3 + Math.random() * 80;
      const dur  = 16 + Math.random() * 22;
      const del  = Math.random() * 22;
      const col  = i % 3 === 2 ? 'rgba(255,80,60,.42)' : 'rgba(0,140,255,.35)';
      el.style.cssText = `left:${left}%;color:${col};animation-duration:${dur}s;animation-delay:-${del}s;`;
      bg.appendChild(el);
    }
  }, []);

  return (
    <>
      <style>{`
        .bg-canvas {
          position: fixed; inset: 0; z-index: 0;
          pointer-events: none; overflow: hidden;
        }
        .bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,123,255,.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,123,255,.09) 1px, transparent 1px);
          background-size: 55px 55px;
          animation: gridShift 20s linear infinite;
        }
        @keyframes gridShift {
          0%   { background-position: 0 0; }
          100% { background-position: 55px 55px; }
        }
        .orb-blue {
          position: absolute; top: -15%; right: -8%;
          width: 680px; height: 680px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,123,255,.18) 0%, transparent 65%);
          animation: orbPulse 6s ease-in-out infinite;
        }
        .orb-red {
          position: absolute; bottom: -10%; left: -8%;
          width: 540px; height: 540px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255,59,48,.13) 0%, transparent 65%);
          animation: orbPulse 7s 1s ease-in-out infinite;
        }
        .orb-cyan {
          position: absolute; top: 35%; right: 15%;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,212,255,.08) 0%, transparent 65%);
          animation: orbPulse 5s 2s ease-in-out infinite;
        }
        @keyframes orbPulse {
          0%,100% { opacity: .55; transform: scale(1); }
          50%     { opacity: 1;   transform: scale(1.1); }
        }
        /* Partículas que suben */
        .particle {
          position: absolute; border-radius: 50%;
          pointer-events: none;
          animation: pDrift linear infinite;
        }
        @keyframes pDrift {
          0%   { transform: translateY(105vh) translateX(0); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: .8; }
          100% { transform: translateY(-15vh) translateX(var(--dx, 0px)); opacity: 0; }
        }
        /* Snippets de código voladores */
        .code-fly {
          position: absolute;
          font-family: 'JetBrains Mono', monospace;
          font-size: .65rem;
          white-space: nowrap;
          pointer-events: none;
          animation: flyUp linear infinite;
        }
        @keyframes flyUp {
          0%   { transform: translateY(105vh); opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: .7; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }
      `}</style>

      <div className="bg-canvas" ref={bgRef}>
        <div className="bg-grid" />
        <div className="orb-blue" />
        <div className="orb-red" />
        <div className="orb-cyan" />
        {/* partículas y snippets se inyectan en useEffect */}
      </div>
    </>
  );
}