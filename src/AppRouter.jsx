// src/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import App from './App';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ProjectsManager from './admin/projects/ProjectsManager';
import ProjectForm from './admin/projects/ProjectForm';
import TechnologiesManager from './admin/technologies/TechnologiesManager';
import TechnologyForm from './admin/technologies/TechnologyForm';

// Componente para proteger TODAS las rutas de admin
const PrivateRoute = ({ children }) => {
  const { user, loading, isAuthorized } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto"></div>
          <p className="mt-4 text-text-secondary">Cargando...</p>
        </div>
      </div>
    );
  }
  
  // ✅ VULNERABILIDAD 2 SOLUCIONADA: Si no hay usuario O no está autorizado, redirigir al login
  if (!user || !isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // Usuario autorizado, mostrar el contenido
  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Portafolio público */}
      <Route path="/" element={<App />} />

      {/* Login de admin (público) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ✅ TODAS las rutas de admin están protegidas por PrivateRoute */}
      <Route path="/admin" element={
        <PrivateRoute>
          <AdminLayout />
        </PrivateRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/edit/:id" element={<ProjectForm />} />
        <Route path="technologies" element={<TechnologiesManager />} />
        <Route path="technologies/new" element={<TechnologyForm />} />
        <Route path="technologies/edit/:id" element={<TechnologyForm />} />
      </Route>

      {/* ✅ CUALQUIER otra ruta de admin que no esté listada también se protege */}
      <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

      {/* Ruta 404 - Redirige a inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;