// src/admin/AdminLogin.jsx
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SNIPS = [
  'const dev="Leonardo"', 'import React', '<HeroSection />',
  'git commit -m "feat"', 'flutter run', 'useEffect(()=>{',
  'borderRadius:12', 'await fetch(api)', 'export default',
  '// pixel perfect', 'npm run build', 'firebase deploy',
];

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { user, isAuthorized } = useAuth();
  const bgRef = useRef(null);

  const authorizedEmail = import.meta.env.VITE_AUTHORIZED_ADMIN_EMAIL;

  // Redirigir si ya está autorizado
  useEffect(() => {
    if (user && isAuthorized) {
      navigate('/admin');
    }
  }, [user, isAuthorized, navigate]);

  // ── Fondo animado ────────────────────────────────────────────────
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    bg.querySelectorAll('.al-particle, .al-code-fly').forEach(el => el.remove());

    // 26 partículas
    for (let i = 0; i < 26; i++) {
      const el = document.createElement('div');
      el.className = 'al-particle';
      const size = 1.5 + Math.random() * 3;
      const left = Math.random() * 100;
      const dur  = 10 + Math.random() * 18;
      const del  = Math.random() * 16;
      const dx   = (Math.random() - 0.5) * 140;
      const col  = i % 5 === 0
        ? 'rgba(255,80,60,.42)'
        : ['rgba(0,123,255,.65)','rgba(0,212,255,.55)','rgba(0,180,255,.6)','rgba(0,123,255,.45)'][i % 4];
      el.style.cssText = `left:${left}%;width:${size}px;height:${size}px;background:${col};--dx:${dx}px;animation-duration:${dur}s;animation-delay:-${del}s;`;
      bg.appendChild(el);
    }

    // 10 snippets de código
    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div');
      el.className = 'al-code-fly';
      el.textContent = SNIPS[i % SNIPS.length];
      const left = 3 + Math.random() * 80;
      const dur  = 16 + Math.random() * 22;
      const del  = Math.random() * 22;
      const col  = i % 3 === 2 ? 'rgba(255,80,60,.42)' : 'rgba(0,140,255,.35)';
      el.style.cssText = `left:${left}%;color:${col};animation-duration:${dur}s;animation-delay:-${del}s;`;
      bg.appendChild(el);
    }
  }, []);

  // ── Lógica de login (sin cambios) ────────────────────────────────
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      const result = await signInWithPopup(auth, googleProvider);
      const loggedInEmail = result.user.email;

      if (loggedInEmail !== authorizedEmail) {
        await auth.signOut();
        setLoginAttempts(prev => prev + 1);
        setError(
          `⛔ Acceso denegado. El correo "${loggedInEmail}" no está autorizado.\n` +
          `Solo el administrador con correo "${authorizedEmail}" puede acceder.`
        );
        return;
      }
    } catch (error) {
      console.error('Error de login:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Ventana cerrada. Intenta de nuevo.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Ventana bloqueada. Permite ventanas emergentes e intenta de nuevo.');
      } else {
        setError('Error al iniciar sesión. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .al-root {
          position: fixed; inset: 0;
          background: #060c18;
          font-family: 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }
        /* Grid */
        .al-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,123,255,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,123,255,.07) 1px, transparent 1px);
          background-size: 55px 55px;
          animation: alGrid 20s linear infinite;
          pointer-events: none;
        }
        @keyframes alGrid {
          0%   { background-position: 0 0; }
          100% { background-position: 55px 55px; }
        }
        /* Orbes */
        .al-orb-blue {
          position: absolute; top: -15%; right: -8%;
          width: 680px; height: 680px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,123,255,.18) 0%, transparent 65%);
          animation: alOrb 6s ease-in-out infinite; pointer-events: none;
        }
        .al-orb-red {
          position: absolute; bottom: -10%; left: -8%;
          width: 540px; height: 540px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255,59,48,.13) 0%, transparent 65%);
          animation: alOrb 7s 1s ease-in-out infinite; pointer-events: none;
        }
        .al-orb-cyan {
          position: absolute; top: 35%; right: 15%;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,212,255,.08) 0%, transparent 65%);
          animation: alOrb 5s 2s ease-in-out infinite; pointer-events: none;
        }
        @keyframes alOrb {
          0%,100% { opacity: .55; transform: scale(1); }
          50%     { opacity: 1;   transform: scale(1.1); }
        }
        /* Partículas */
        .al-particle {
          position: absolute; border-radius: 50%;
          pointer-events: none;
          animation: alParticle linear infinite;
        }
        @keyframes alParticle {
          0%   { transform: translateY(105vh) translateX(0); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: .8; }
          100% { transform: translateY(-15vh) translateX(var(--dx,0px)); opacity: 0; }
        }
        /* Snippets */
        .al-code-fly {
          position: absolute;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: .65rem; white-space: nowrap;
          pointer-events: none;
          animation: alFly linear infinite;
        }
        @keyframes alFly {
          0%   { transform: translateY(105vh); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: .7; }
          100% { transform: translateY(-15vh); opacity: 0; }
        }
        /* Quote */
        .al-quote {
          position: absolute; bottom: 2.5rem; left: 3rem;
          pointer-events: none; z-index: 1;
        }
        .al-quote blockquote {
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 800; line-height: 1.2;
          color: #fff; margin: 0 0 .5rem;
          max-width: 420px;
        }
        .al-quote cite {
          font-size: .85rem; font-style: italic;
          color: rgba(255,255,255,.4);
        }
        /* Layout */
        .al-layout {
          position: absolute; inset: 0; z-index: 10;
          display: flex; align-items: center;
          justify-content: flex-end;
          padding: 2rem 4rem 2rem 2rem;
        }
        /* Card */
        .al-card {
          background: rgba(15,22,40,.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          width: 100%; max-width: 380px;
          box-shadow: 0 24px 80px rgba(0,0,0,.45);
          display: flex; flex-direction: column;
          align-items: center; gap: 1.25rem;
          animation: alCardIn .5s ease both;
          color: #e2e8f0;
        }
        @keyframes alCardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .al-lock {
          width: 64px; height: 64px;
          background: linear-gradient(135deg, #1d6ff5, #0d4ecf);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 28px rgba(29,111,245,.45);
        }
        .al-card h2 {
          font-size: 1.6rem; font-weight: 800;
          text-align: center; margin: 0; color: #f1f5f9;
        }
        .al-card p {
          font-size: .875rem; color: rgba(255,255,255,.5);
          text-align: center; margin: 0; line-height: 1.5;
        }
        /* Error */
        .al-error {
          width: 100%;
          background: rgba(239,68,68,.1);
          border: 1px solid rgba(239,68,68,.25);
          border-radius: 10px; padding: .75rem 1rem;
          font-size: .8rem; color: #fca5a5;
        }
        .al-error-inner { display: flex; gap: .5rem; align-items: flex-start; }
        /* Warning */
        .al-warn {
          width: 100%;
          background: rgba(234,179,8,.08);
          border: 1px solid rgba(234,179,8,.2);
          border-radius: 10px; padding: .6rem 1rem;
          font-size: .75rem; color: #fde047; text-align: center;
        }
        /* Google btn */
        .al-google-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: .75rem;
          background: #fff; color: #1f2937;
          border: none; border-radius: 12px;
          padding: .85rem 1.5rem;
          font-size: .95rem; font-weight: 600;
          font-family: inherit; cursor: pointer;
          transition: background .2s, transform .1s, box-shadow .2s;
          box-shadow: 0 2px 12px rgba(0,0,0,.2);
        }
        .al-google-btn:hover:not(:disabled) {
          background: #f3f4f6;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(0,0,0,.3);
        }
        .al-google-btn:disabled { opacity: .6; cursor: not-allowed; }
        /* Auth info box */
        .al-auth-box {
          width: 100%; text-align: center;
        }
        .al-auth-box p { font-size: .75rem; color: rgba(255,255,255,.4); margin-bottom: .5rem; }
        .al-auth-email {
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 8px; padding: .6rem 1rem;
          font-size: .85rem; font-family: monospace;
          color: #60a5fa;
        }
        /* Back btn */
        .al-back-btn {
          background: none; border: none; cursor: pointer;
          font-size: .875rem; color: rgba(255,255,255,.4);
          font-family: inherit;
          transition: color .2s;
        }
        .al-back-btn:hover { color: #60a5fa; }
        /* Spinner */
        .al-spin {
          width: 18px; height: 18px;
          border: 2px solid rgba(0,0,0,.15);
          border-top-color: #1f2937;
          border-radius: 50%;
          animation: alSpin .7s linear infinite; display: inline-block;
        }
        @keyframes alSpin { to { transform: rotate(360deg); } }
        /* Security badges */
        .al-sec { width: 100%; display: flex; flex-direction: column; gap: .4rem; }
        .al-sec-item {
          display: flex; align-items: center; gap: .5rem;
          font-size: .73rem; color: rgba(255,255,255,.3);
        }
        @media (max-width: 640px) {
          .al-layout { justify-content: center; padding: 1.5rem; }
          .al-quote  { display: none; }
        }
      `}</style>

      <div className="al-root" ref={bgRef}>
        <div className="al-grid" />
        <div className="al-orb-blue" />
        <div className="al-orb-red" />
        <div className="al-orb-cyan" />

        {/* Quote esquina inferior izquierda */}
        <div className="al-quote">
          <blockquote>"Build things<br />worth remembering."</blockquote>
          <cite>— Portfolio Admin</cite>
        </div>

        {/* Card de login */}
        <div className="al-layout">
          <div className="al-card">

            {/* Lock icon */}
            <div className="al-lock">
              <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <h2>Admin Access</h2>
            <p>Inicia sesión con tu cuenta de Google para gestionar tu portafolio</p>

            {/* Error */}
            {error && (
              <div className="al-error">
                <div className="al-error-inner">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{flexShrink:0,marginTop:1}}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p style={{margin:0, whiteSpace:'pre-line'}}>{error}</p>
                </div>
              </div>
            )}

            {/* Múltiples intentos */}
            {loginAttempts > 2 && (
              <div className="al-warn">
                Múltiples intentos fallidos detectados. Asegúrate de usar la cuenta correcta.
              </div>
            )}

            {/* Botón Google */}
            <button
              className="al-google-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? (
                <span className="al-spin" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {loading ? 'Iniciando sesión…' : 'Continuar con Google'}
            </button>

            {/* Email autorizado */}
            <div className="al-auth-box">
              <p>Autenticación segura</p>
              <div className="al-auth-email">{authorizedEmail}</div>
            </div>

            {/* Security badges */}
            <div className="al-sec">
              <div className="al-sec-item">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Protegido por Google OAuth 2.0
              </div>
              <div className="al-sec-item">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Tus credenciales nunca se almacenan en nuestros servidores
              </div>
            </div>

            {/* Volver */}
            <button className="al-back-btn" onClick={() => navigate('/')}>
              ← Volver al inicio
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;