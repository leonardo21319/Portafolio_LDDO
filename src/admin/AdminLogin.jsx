// src/admin/AdminLogin.jsx
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { user, isAuthorized } = useAuth();

  const authorizedEmail = import.meta.env.VITE_AUTHORIZED_ADMIN_EMAIL;

  // Redirigir si ya está autorizado
  useEffect(() => {
    if (user && isAuthorized) {
      navigate('/admin');
    }
  }, [user, isAuthorized, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInEmail = result.user.email;
      
      // ✅ VULNERABILIDAD 1 SOLUCIONADA: Verificar inmediatamente después del login
      if (loggedInEmail !== authorizedEmail) {
        // Cerrar sesión inmediatamente
        await auth.signOut();
        setLoginAttempts(prev => prev + 1);
        setError(
          `⛔ Acceso denegado. El correo "${loggedInEmail}" no está autorizado.\n` +
          `Solo el administrador con correo "${authorizedEmail}" puede acceder.`
        );
        return;
      }
      
      // Si es el correo correcto, el contexto se encargará
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
    <div className="min-h-screen flex items-center justify-center bg-dark-primary">
      <div className="glass-effect max-w-md w-full space-y-8 p-10 rounded-2xl">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-accent-blue rounded-full flex items-center justify-center animate-glow">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold gradient-text">
            Panel de Administración
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Acceso restringido solo para administradores
          </p>
        </div>

        {/* ✅ Mensaje de error mejorado para cuentas no autorizadas */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-red-500 whitespace-pre-line">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Mostrar intentos fallidos si hay muchos */}
        {loginAttempts > 2 && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <p className="text-xs text-yellow-500 text-center">
              Múltiples intentos fallidos detectados. Asegúrate de usar la cuenta correcta.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 bg-accent-blue hover:bg-blue-600 text-white font-medium rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Iniciando sesión...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Iniciar sesión con Google
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-xs text-text-secondary mb-2">Acceso autorizado solo para:</p>
            <div className="bg-dark-secondary rounded-lg p-3 border border-white/10">
              <p className="text-sm font-mono text-accent-blue">{authorizedEmail}</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-text-secondary hover:text-accent-blue transition-smooth"
            >
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;