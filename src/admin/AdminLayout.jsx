// src/admin/AdminLayout.jsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Barra de navegación superior */}
      <nav className="glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold gradient-text">Admin Panel</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/admin"
                  className="text-text-secondary hover:text-accent-blue hover:border-accent-blue inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-smooth"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/projects"
                  className="text-text-secondary hover:text-accent-blue hover:border-accent-blue inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-smooth"
                >
                  Proyectos
                </Link>
                <Link
                  to="/admin/technologies"
                  className="text-text-secondary hover:text-accent-blue hover:border-accent-blue inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-smooth"
                >
                  Tecnologías
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary font-mono">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 bg-accent-red/10 hover:bg-accent-red/20 text-accent-red font-medium rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  'Cerrar Sesión'
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-xl p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;