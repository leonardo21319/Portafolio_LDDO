// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

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
  const [isAuthorized, setIsAuthorized] = useState(false);

  const authorizedEmail = import.meta.env.VITE_AUTHORIZED_ADMIN_EMAIL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔄 Estado de auth cambiado:', user ? user.email : 'No usuario');
      
      if (user) {
        // Verificar si el correo coincide
        const authorized = user.email === authorizedEmail;
        console.log('🔐 Correo autorizado:', authorized ? '✅ Sí' : '❌ No');
        
        if (authorized) {
          setUser(user);
          setIsAuthorized(true);
        } else {
          // Si no está autorizado, cerrar sesión y limpiar estado
          console.log('⛔ Correo no autorizado, cerrando sesión...');
          await signOut(auth);
          setUser(null);
          setIsAuthorized(false);
        }
      } else {
        setUser(null);
        setIsAuthorized(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, [authorizedEmail]);

  const value = {
    user,
    loading,
    isAuthorized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};