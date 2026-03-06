// src/admin/projects/ProjectsManager.jsx
import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { FiEdit2, FiTrash2, FiEye, FiEyeOff, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Importar iconos directamente
import { 
  SiFlutter,
  SiDart,
  SiFirebase,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiFigma,
  SiTailwindcss
} from 'react-icons/si';

import {
  FiCpu,
  FiCode,
  FiCloud,
  FiDatabase
} from 'react-icons/fi';

import {
  FaAws,
  FaMicrosoft,
  FaJava,
  FaPython as FaPythonIcon
} from 'react-icons/fa';

// Mapa directo de tecnologías a iconos
const techIconMap = {
  // Mobile
  'Flutter': SiFlutter,
  'Dart': SiDart,
  
  // IA/ML
  'YOLO': FiCpu,
  'YOLOv8': FiCpu,
  'Yolo': FiCpu,
  'TensorFlow': SiTensorflow,
  'Tensorflow': SiTensorflow,
  'PyTorch': SiPytorch,
  'Python': SiPython,
  
  // Backend & Firebase
  'Firebase': SiFirebase,
  'Node.js': SiNodedotjs,
  'Node': SiNodedotjs,
  'Express': SiNodedotjs,
  'Express.js': SiNodedotjs,
  
  // Frontend
  'React': SiReact,
  'React.js': SiReact,
  'JavaScript': SiJavascript,
  'JS': SiJavascript,
  'TypeScript': SiTypescript,
  'TS': SiTypescript,
  'Tailwind': SiTailwindcss,
  'Tailwind CSS': SiTailwindcss,
  
  // Bases de datos
  'MongoDB': SiMongodb,
  'Mongo': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Postgres': SiPostgresql,
  
  // Cloud
  'AWS': FaAws,
  'Amazon': FaAws,
  'Azure': FaMicrosoft,
  'Google Cloud': FiCloud,
  'GCP': FiCloud,
  
  // Herramientas
  'Git': SiGit,
  'GitHub': SiGithub,
  'Figma': SiFigma,
  'Docker': SiDocker,
  
  // Por defecto
  'default': FiCode
};

// Función para obtener el icono de una tecnología
const getTechIcon = (techName) => {
  if (!techName) return FiCode;
  
  // Limpiar el nombre
  const cleanName = techName.trim();
  
  // Buscar coincidencia exacta
  if (techIconMap[cleanName]) {
    return techIconMap[cleanName];
  }
  
  // Buscar coincidencia exacta ignorando mayúsculas
  const lowerName = cleanName.toLowerCase();
  for (const [key, value] of Object.entries(techIconMap)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }
  
  // Buscar coincidencia parcial
  for (const [key, value] of Object.entries(techIconMap)) {
    if (lowerName.includes(key.toLowerCase()) && key !== 'default') {
      return value;
    }
  }
  
  // Si no encuentra, devolver icono por defecto
  return FiCode;
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      console.log('📡 Cargando proyectos desde Firebase...');
      
      const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const projectsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('📄 Documento encontrado:', doc.id, data);
        return {
          id: doc.id,
          ...data
        };
      });
      
      console.log('✅ Proyectos cargados:', projectsData.length);
      setProjects(projectsData);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching projects:', err);
      setError('Error al cargar los proyectos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (projectId, currentStatus) => {
    try {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, {
        active: !currentStatus
      });
      
      setProjects(projects.map(p => 
        p.id === projectId ? { ...p, active: !currentStatus } : p
      ));
    } catch (err) {
      console.error('Error:', err);
      alert('Error al actualizar el proyecto');
    }
  };

  const deleteProject = async (projectId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este proyecto?')) return;

    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (err) {
      console.error('Error:', err);
      alert('Error al eliminar el proyecto');
    }
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'active') return project.active !== false;
    if (filter === 'inactive') return project.active === false;
    return true;
  });

  const getStatusColor = (statusColor) => {
    switch(statusColor) {
      case 'yellow': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'green': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'blue': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-accent-blue text-xl">Cargando proyectos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={fetchProjects}
          className="bg-accent-blue text-white px-4 py-2 rounded hover:bg-accent-blue/80 transition-smooth"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link 
            to="/admin" 
            className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-smooth mb-4"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver al Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Gestión de Proyectos</span>
          </h1>
          <p className="text-text-secondary mt-2">
            {projects.length} proyectos en total • {projects.filter(p => p.active !== false).length} activos
          </p>
        </div>
        
        <Link
          to="/admin/projects/new"
          className="bg-accent-blue hover:bg-accent-blue/80 text-white px-6 py-3 rounded-lg font-medium transition-smooth flex items-center space-x-2"
        >
          <FiPlus className="w-5 h-5" />
          <span>Nuevo Proyecto</span>
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            filter === 'all' 
              ? 'bg-accent-blue text-white' 
              : 'bg-white/5 text-text-secondary hover:bg-white/10'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            filter === 'active' 
              ? 'bg-green-600 text-white' 
              : 'bg-white/5 text-text-secondary hover:bg-white/10'
          }`}
        >
          Activos
        </button>
        <button
          onClick={() => setFilter('inactive')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            filter === 'inactive' 
              ? 'bg-red-600 text-white' 
              : 'bg-white/5 text-text-secondary hover:bg-white/10'
          }`}
        >
          Inactivos
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 glass-effect rounded-2xl">
          <p className="text-text-secondary mb-4">No hay proyectos en Firebase</p>
          <p className="text-sm text-text-secondary mb-4">
            Agrega un proyecto desde el botón "Nuevo Proyecto"
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`glass-effect rounded-xl p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] ${
                project.active === false ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2 flex-wrap gap-2">
                    <h3 className="text-xl font-bold text-white">
                      {project.title || 'Sin título'}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-full border border-yellow-500/30">
                        ⭐ Destacado
                      </span>
                    )}
                    {project.status && (
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(project.statusColor)}`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                  
                  {project.subtitle && (
                    <p className="text-accent-blue font-mono text-sm mb-2">{project.subtitle}</p>
                  )}
                  
                  {project.description && (
                    <p className="text-text-secondary mb-4 line-clamp-2">{project.description}</p>
                  )}
                  
                  {/* Tecnologías con iconos */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      {project.technologies.slice(0, 8).map((tech, index) => {
                        const IconComponent = getTechIcon(tech);
                        return (
                          <div
                            key={index}
                            className="group relative"
                            title={tech}
                          >
                            <div className="w-9 h-9 glass-effect rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:bg-white/10 group-hover:scale-110">
                              <IconComponent className="w-5 h-5 text-white transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                            </div>
                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-black/90 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none z-10 shadow-lg border border-white/10">
                              {tech}
                            </span>
                          </div>
                        );
                      })}
                      {project.technologies.length > 8 && (
                        <span className="text-xs text-text-secondary bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                          +{project.technologies.length - 8}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => toggleActive(project.id, project.active !== false)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      project.active !== false
                        ? 'text-green-500 hover:bg-green-500/20 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                        : 'text-red-500 hover:bg-red-500/20 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                    }`}
                    title={project.active !== false ? 'Desactivar' : 'Activar'}
                  >
                    {project.active !== false ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
                  </button>

                  <Link
                    to={`/admin/projects/edit/${project.id}`}
                    className="p-2 text-accent-blue hover:bg-accent-blue/20 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(10,102,194,0.3)]"
                    title="Editar"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </Link>

                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    title="Eliminar"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {project.active === false && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <span className="text-xs text-red-500 flex items-center space-x-1">
                    <FiEyeOff className="w-3 h-3" />
                    <span>Este proyecto está oculto en el portafolio</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;