// src/admin/AdminLogin.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // ← IMPORTANTE: desde contexts
import { FcGoogle } from 'react-icons/fc';
import { FiAlertCircle, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';

const AdminLogin = () => {
  const { user, loginWithGoogle, loading, error } = useAuth();
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Redirigir si ya hay usuario
  useEffect(() => {
    if (user) {
      console.log('👤 Usuario detectado, redirigiendo a admin:', user.email);
      setLoginSuccess(true);
      setTimeout(() => {
        window.location.href = '/admin';
      }, 1500);
    }
  }, [user]);

  const handleLogin = async () => {
    setLoginError('');
    const success = await loginWithGoogle();
    if (!success) {
      setLoginError('Error al iniciar sesión. Intenta de nuevo.');
    }
  };

  // Mostrar loading mientras se verifica auth
  if (loading && !user) {
    return (
      <div className="min-h-screen bg-dark-primary text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <AnimatedBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="glass-effect-strong rounded-2xl p-8 md:p-10 shadow-2xl border border-white/10">
            
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-blue to-accent-red rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-glow-blue">
                <span className="text-3xl font-bold text-white">AD</span>
              </div>
              <h1 className="text-3xl font-bold gradient-text mb-2">
                ModificaciónPortafolio
              </h1>
              <p className="text-text-secondary text-sm">
                Panel de Administración
              </p>
            </div>

            {loginSuccess ? (
              <div className="mb-6 p-6 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-green-500 text-lg font-medium mb-2">
                  ¡Login exitoso!
                </p>
                <p className="text-text-secondary text-sm">
                  Redirigiendo al panel...
                </p>
                <div className="w-full bg-white/10 h-1 mt-4 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full animate-progress"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8 p-5 bg-accent-blue/5 border border-accent-blue/20 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <FiAlertCircle className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                    <p className="text-sm text-text-secondary leading-relaxed">
                      <span className="text-white font-medium">Acceso restringido</span>
                      <br />
                      Solo usuarios autorizados pueden acceder al panel de administración.
                    </p>
                  </div>
                </div>

                {(loginError || error) && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <FiAlertCircle className="w-5 h-5 text-red-500" />
                      <p className="text-red-500 text-sm font-medium">
                        {loginError || error}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-white hover:bg-gray-100 text-gray-800 px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg mb-6"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                      <span>Iniciando sesión...</span>
                    </>
                  ) : (
                    <>
                      <FcGoogle className="w-6 h-6" />
                      <span className="text-gray-800 font-medium">Iniciar sesión con Google</span>
                    </>
                  )}
                </button>
              </>
            )}

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-dark-primary/50 text-text-secondary">o</span>
              </div>
            </div>

            <a
              href="/"
              className="flex items-center justify-center space-x-2 text-text-secondary hover:text-accent-blue transition-smooth group"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Volver al portafolio</span>
            </a>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-text-secondary">
              © 2026 Leonardo Daniel. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;