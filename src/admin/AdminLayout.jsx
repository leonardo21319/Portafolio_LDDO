// src/admin/AdminLayout.jsx
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FiLogOut, FiHome, FiFolder, FiCpu, FiBriefcase, FiSettings, FiUser } from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';

const AdminLayout = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      console.log('🚫 No autorizado, redirigiendo a login...');
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-primary text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Cargando panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <AnimatedBackground />
      
      {/* Panel Superior - Siempre visible */}
      <div className="fixed top-0 left-0 right-0 glass-effect-strong border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Título */}
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-red rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-white font-bold text-lg hidden sm:block">Admin Panel</span>
              </Link>
            </div>

            {/* Menú de navegación - TODOS HABILITADOS */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-lg transition-smooth flex items-center space-x-1 ${
                  isActive('/admin') && !isActive('/admin/projects') && !isActive('/admin/technologies')
                    ? 'bg-accent-blue text-white'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
                title="Dashboard"
              >
                <FiHome className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm">Dashboard</span>
              </Link>

              <Link
                to="/admin/projects"
                className={`px-3 py-2 rounded-lg transition-smooth flex items-center space-x-1 ${
                  isActive('/admin/projects')
                    ? 'bg-accent-blue text-white'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
                title="Proyectos"
              >
                <FiFolder className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm">Proyectos</span>
              </Link>

              {/* TECNOLOGÍAS - HABILITADO */}
              <Link
                to="/admin/technologies"
                className={`px-3 py-2 rounded-lg transition-smooth flex items-center space-x-1 ${
                  isActive('/admin/technologies')
                    ? 'bg-accent-blue text-white'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
                title="Tecnologías"
              >
                <FiCpu className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm">Tecnologías</span>
              </Link>

              {/* Experiencias - Deshabilitado por ahora */}
              <div
                className="px-3 py-2 rounded-lg text-text-secondary opacity-50 cursor-not-allowed flex items-center space-x-1"
                title="Próximamente"
              >
                <FiBriefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm">Experiencias</span>
              </div>

              {/* Configuración - Deshabilitado por ahora */}
              <div
                className="px-3 py-2 rounded-lg text-text-secondary opacity-50 cursor-not-allowed flex items-center space-x-1"
                title="Próximamente"
              >
                <FiSettings className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm">Configuración</span>
              </div>
            </div>

            {/* Información del usuario */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-accent-blue" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-text-secondary">Conectado como</span>
                  <span className="text-sm text-white font-medium">{user.email}</span>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-smooth"
                title="Cerrar sesión"
              >
                <FiLogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal - con padding superior para el panel fijo */}
      <div className="pt-16 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;