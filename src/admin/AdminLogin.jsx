// src/admin/AdminLogin.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FiLock, FiAlertCircle, FiCheckCircle, FiArrowLeft, FiShield } from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';

/* ─── Inject styles once ─── */
const STYLE_ID = 'adm-login-styles';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes adm-login-spin { to { transform: rotate(360deg); } }
    @keyframes adm-progress { from { width:0 } to { width:100% } }
    .adm-login-left { flex: 0 0 42%; display: flex; flex-direction: column; padding: 2rem 3rem; position: relative; z-index: 1; }
    .adm-login-right { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; position: relative; z-index: 1; }
    .adm-google-btn:hover:not(:disabled) { background: #f3f4f6 !important; }
    .adm-google-btn:active:not(:disabled) { transform: scale(.98); }
    @media (max-width: 700px) {
      .adm-login-left { display: none !important; }
    }
  `;
  document.head.appendChild(s);
}

const AdminLogin = () => {
  const { user, loginWithGoogle, loading, error } = useAuth();
  const [loginError,   setLoginError]   = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      console.log('👤 Usuario detectado, redirigiendo a admin:', user.email);
      setLoginSuccess(true);
      setTimeout(() => { window.location.href = '/admin'; }, 1500);
    }
  }, [user]);

  const handleLogin = async () => {
    setLoginError('');
    const success = await loginWithGoogle();
    if (!success) setLoginError('Error al iniciar sesión. Intenta de nuevo.');
  };

  if (loading && !user) return (
    <div style={{ minHeight: '100vh', background: '#0a0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, position: 'relative' }}>
      <AnimatedBackground />
      <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid rgba(59,130,246,.2)', borderTopColor: '#3b82f6', animation: 'adm-login-spin .8s linear infinite', zIndex: 1 }} />
      <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.85rem', zIndex: 1 }}>Verificando autenticación...</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1a', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      <AnimatedBackground />

      {/* ── LEFT PANEL ── */}
      <div className="adm-login-left">
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,.35)', textDecoration: 'none', fontSize: '.83rem' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,.7)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.35)'}
        >
          <FiArrowLeft size={15} />
          <span>Volver al portafolio</span>
        </a>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '1rem' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: '2.5rem' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: `rgba(59,130,246,${.6 - i*.15})` }} />
            ))}
          </div>
          <p style={{ fontSize: '2.2rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '.75rem', fontFamily: 'Georgia, serif' }}>
            "Build things<br />worth remembering."
          </p>
          <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '.88rem', fontStyle: 'italic' }}>— Portfolio Admin</p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="adm-login-right">
        <div style={{ width: '100%', maxWidth: 460, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: '2.5rem 2.8rem', backdropFilter: 'blur(20px)', boxShadow: '0 24px 64px rgba(0,0,0,.4)' }}>

          {/* Lock icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: 70, height: 70, borderRadius: 18, background: 'linear-gradient(135deg,rgba(59,130,246,.2),rgba(59,130,246,.06))', border: '1px solid rgba(59,130,246,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 28px rgba(59,130,246,.12)' }}>
              <FiLock size={26} color="#3b82f6" />
            </div>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: '.45rem', letterSpacing: '-.5px' }}>Admin Access</h1>
          <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.38)', textAlign: 'center', lineHeight: 1.6, marginBottom: '2rem' }}>
            Inicia sesión con tu cuenta de Google para<br />gestionar tu portafolio
          </p>

          {loginSuccess ? (
            <div style={{ background: 'rgba(34,197,94,.07)', border: '1px solid rgba(34,197,94,.22)', borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <FiCheckCircle size={18} color="#22c55e" />
                <p style={{ color: '#22c55e', fontWeight: 600, margin: 0 }}>¡Login exitoso!</p>
              </div>
              <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.78rem', margin: '0 0 10px' }}>Redirigiendo al panel...</p>
              <div style={{ height: 3, background: 'rgba(34,197,94,.15)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#22c55e', borderRadius: 2, animation: 'adm-progress 1.5s ease forwards' }} />
              </div>
            </div>
          ) : (
            <>
              {(loginError || error) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(239,68,68,.07)', border: '1px solid rgba(239,68,68,.22)', borderRadius: 10, padding: '.7rem 1rem', marginBottom: '1rem' }}>
                  <FiAlertCircle size={15} color="#ef4444" />
                  <span style={{ color: '#ef4444', fontSize: '.83rem' }}>{loginError || error}</span>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="adm-google-btn"
                style={{ width: '100%', padding: '13px 20px', background: '#fff', border: 'none', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .6 : 1, boxShadow: '0 4px 20px rgba(0,0,0,.2)', marginBottom: '1.75rem', transition: 'background .15s, transform .15s' }}
              >
                {loading ? (
                  <>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #9ca3af', borderTopColor: 'transparent', animation: 'adm-login-spin .7s linear infinite' }} />
                    <span style={{ color: '#374151', fontWeight: 500, fontSize: '.9rem' }}>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <FcGoogle size={21} />
                    <span style={{ color: '#111827', fontWeight: 600, fontSize: '.92rem' }}>Continuar con Google</span>
                  </>
                )}
              </button>
            </>
          )}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.08)' }} />
            <span style={{ color: 'rgba(255,255,255,.25)', fontSize: '.7rem', whiteSpace: 'nowrap' }}>Autenticación segura</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.08)' }} />
          </div>

          {/* Security badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              { icon: FiShield, text: 'Protegido por Google OAuth 2.0' },
              { icon: FiLock,   text: 'Tus credenciales nunca se almacenan en nuestros servidores' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,.25)', fontSize: '.73rem' }}>
                <Icon size={12} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ marginTop: '1.4rem', color: 'rgba(255,255,255,.2)', fontSize: '.72rem', textAlign: 'center' }}>
          © 2026 Leonardo Daniel. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;