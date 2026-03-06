// src/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FiFolder, FiCpu, FiBriefcase, FiArrowRight } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: { total: 0, active: 0 },
    technologies: { total: 0, active: 0 },
    experiences: { total: 0, active: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Obtener proyectos
        const projectsSnap = await getDocs(collection(db, 'projects'));
        const projects = projectsSnap.docs.map(doc => doc.data());
        
        // Obtener tecnologías
        const techSnap = await getDocs(collection(db, 'technologies'));
        const technologies = techSnap.docs.map(doc => doc.data());

        setStats({
          projects: {
            total: projects.length,
            active: projects.filter(p => p.active !== false).length
          },
          technologies: {
            total: technologies.length,
            active: technologies.filter(t => t.active !== false).length
          },
          experiences: {
            total: 0,
            active: 0
          }
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, icon: Icon, to, total, active, color, isReady = true }) => (
    <Link
      to={to}
      className={`glass-effect rounded-2xl p-6 transition-smooth hover:scale-105 ${!isReady ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <Icon className={`w-8 h-8 text-${color}-500`} />
        {!isReady && (
          <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-text-secondary">
            Próximamente
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 bg-white/10 animate-pulse rounded"></div>
          <div className="h-4 bg-white/10 animate-pulse rounded w-2/3"></div>
        </div>
      ) : (
        <>
          <div className="space-y-1 mb-4">
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Total:</span>
              <span className="text-white font-bold">{total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Activos:</span>
              <span className="text-green-500 font-bold">{active}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-accent-blue">Gestionar</span>
            <FiArrowRight className="text-accent-blue" />
          </div>
        </>
      )}
    </Link>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-text-secondary">
          Bienvenido al panel de administración. Gestiona todo el contenido de tu portafolio.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Proyectos - Habilitado */}
        <StatCard
          title="Proyectos"
          icon={FiFolder}
          to="/admin/projects"
          total={stats.projects.total}
          active={stats.projects.active}
          color="blue"
          isReady={true}
        />
        
        {/* Tecnologías - Habilitado */}
        <StatCard
          title="Tecnologías"
          icon={FiCpu}
          to="/admin/technologies"
          total={stats.technologies.total}
          active={stats.technologies.active}
          color="green"
          isReady={true}  // ← Comentario removido
        />
        
        {/* Experiencias - Próximamente */}
        <StatCard
          title="Experiencias"
          icon={FiBriefcase}
          to="/admin/experiences"
          total={stats.experiences.total}
          active={stats.experiences.active}
          color="purple"
          isReady={false}
        />
      </div>

      {/* Acciones Rápidas */}
      <div className="mt-8 glass-effect rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/projects/new"
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-smooth flex items-center justify-between"
          >
            <span className="text-text-secondary">➕ Crear nuevo proyecto</span>
            <FiArrowRight className="text-accent-blue" />
          </Link>
          
          {/* Tecnologías - Nueva acción rápida */}
          <Link
            to="/admin/technologies/new"
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-smooth flex items-center justify-between"
          >
            <span className="text-text-secondary">➕ Agregar nueva tecnología</span>
            <FiArrowRight className="text-accent-blue" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;