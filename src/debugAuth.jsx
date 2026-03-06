// src/debugAuth.jsx - Agrega redirección automática
import { useState, useEffect } from 'react';
import { auth, googleProvider } from './config/firebase';
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';

const DebugAuth = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // REDIRECCIÓN AUTOMÁTICA CUANDO HAY USUARIO
  useEffect(() => {
    if (result) {
      console.log('✅ Usuario autenticado, redirigiendo en 1 segundo...');
      setTimeout(() => {
        window.location.href = '/admin';
      }, 1000);
    }
  }, [result]);

  // Verificar si ya hay sesión al cargar
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('🔄 Sesión existente detectada:', user.email);
        setResult(user);
      }
    });
    return unsubscribe;
  }, []);

  const testPopup = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔥 Intentando login con popup...');
      const res = await signInWithPopup(auth, googleProvider);
      console.log('✅ Éxito:', res.user);
      setResult(res.user);
    } catch (err) {
      console.error('❌ Error detallado:', err);
      setError({
        code: err.code,
        message: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testRedirect = () => {
    setLoading(true);
    try {
      console.log('🔄 Intentando login con redirect...');
      signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err);
      setLoading(false);
    }
  };

  const checkRedirectResult = async () => {
    try {
      const res = await getRedirectResult(auth);
      if (res) {
        console.log('✅ Redirect result:', res.user);
        setResult(res.user);
      } else {
        console.log('ℹ️ No hay resultado de redirect');
      }
    } catch (err) {
      console.error('❌ Error en redirect result:', err);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-dark-primary text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold gradient-text mb-2">¡Login exitoso!</h2>
          <p className="text-text-secondary mb-4">Bienvenido, {result.email}</p>
          <p className="text-sm text-text-secondary">Redirigiendo al panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary text-white p-8">
      <h1 className="text-3xl font-bold gradient-text mb-6">🔍 Diagnóstico Firebase Auth</h1>
      
      <div className="space-y-4 mb-8">
        <button 
          onClick={testPopup}
          disabled={loading}
          className="bg-accent-blue px-6 py-3 rounded-lg mr-4 disabled:opacity-50"
        >
          {loading ? 'Cargando...' : '1. Probar signInWithPopup'}
        </button>
        
        <button 
          onClick={testRedirect}
          disabled={loading}
          className="bg-accent-red px-6 py-3 rounded-lg mr-4 disabled:opacity-50"
        >
          {loading ? 'Cargando...' : '2. Probar signInWithRedirect'}
        </button>
        
        <button 
          onClick={checkRedirectResult}
          className="bg-green-600 px-6 py-3 rounded-lg"
        >
          3. Verificar resultado redirect
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-bold text-red-500 mb-2">❌ Error:</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DebugAuth;