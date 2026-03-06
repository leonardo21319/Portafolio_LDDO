// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🔄 Verificando estado de autenticación...');
    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        console.log('✅ Estado de auth cambiado:', user ? user.email : 'No usuario');
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('❌ Error en auth state:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Iniciando login con Google...');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('✅ Login exitoso:', result.user.email);
      setUser(result.user);
      
      // Forzar redirección después del login
      setTimeout(() => {
        window.location.href = '/admin';
      }, 500);
      
      return true;
    } catch (err) {
      console.error('❌ Error en login:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Error en logout:', err);
      setError(err.message);
    }
  };

  const value = {
    user,
    loading,
    error,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};