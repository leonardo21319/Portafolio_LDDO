// src/admin/AdminLogin.jsx
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // ✅ Obtener el correo autorizado de las variables de entorno
  const authorizedEmail = import.meta.env.VITE_AUTHORIZED_ADMIN_EMAIL;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Verificación adicional en el login
      if (user.email !== authorizedEmail) {
        await auth.signOut();
        setError('Este correo no está autorizado para acceder al panel de administración.');
        return;
      }
      
      navigate('/admin');
    } catch (error) {
      console.error('Error de login:', error);
      setError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Solo usuarios autorizados
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión con Google'}
          </button>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>Acceso restringido solo para:</p>
          <p className="font-mono mt-1">{authorizedEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;