// src/admin/technologies/TechnologiesManager.jsx
import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { FiEdit2, FiTrash2, FiEye, FiEyeOff, FiPlus, FiArrowLeft, FiGrid, FiLayers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Importar SOLO los iconos que existen
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
  SiTailwindcss,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiKotlin,
  SiSwift,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiRedis,
  SiKubernetes,
  SiJenkins,
  SiVercel,
  SiNetlify,
  SiGraphql,
  SiPrisma,
  SiJest,
  SiCypress,
  SiStorybook,
  SiRedux,
  SiWebpack,
  SiVite,
  SiWordpress,
  SiHtml5,
  SiCss3,
  SiSass,
  SiBootstrap,
} from 'react-icons/si';

import {
  FiCode,
  FiCloud,
  FiDatabase,
  FiZap,
  FiEye as FiEyeIcon,
  FiGlobe,
  FiServer,
  FiTool,
  FiBox,
  FiLayers as FiLayersIcon,
  FiLayout,
  FiSmartphone,
  FiTablet,
  FiMonitor,
  FiCpu as FiCpuIcon,
} from 'react-icons/fi';

import {
  FaAws,
  FaMicrosoft,
  FaJava,
  FaPython as FaPythonIcon,
  FaDocker,
  FaGitAlt,
  FaApple,
  FaAndroid,
  FaNodeJs,
  FaNpm,
  FaYarn,
} from 'react-icons/fa';

// Mapa de iconos para vista previa
const iconMap = {
  // Si (Simple Icons)
  SiFlutter, SiDart, SiFirebase, SiPython, SiTensorflow, SiPytorch,
  SiReact, SiNodedotjs, SiJavascript, SiTypescript, SiMongodb,
  SiPostgresql, SiDocker, SiGit, SiGithub, SiFigma, SiTailwindcss,
  SiNextdotjs, SiVuedotjs, SiAngular, SiKotlin, SiSwift, SiPhp,
  SiLaravel, SiMysql, SiRedis, SiKubernetes, SiJenkins, SiVercel,
  SiNetlify, SiGraphql, SiPrisma, SiJest, SiCypress, SiStorybook,
  SiRedux, SiWebpack, SiVite, SiWordpress, SiHtml5, SiCss3, SiSass,
  SiBootstrap,
  
  // Fi (Feather Icons)
  FiCode, FiCloud, FiDatabase, FiZap, FiEyeIcon, FiGlobe, FiServer,
  FiTool, FiBox, FiLayersIcon, FiLayout, FiSmartphone, FiTablet, FiMonitor,
  FiCpuIcon,
  
  // Fa (Font Awesome)
  FaAws, FaMicrosoft, FaJava, FaPythonIcon, FaDocker, FaGitAlt,
  FaApple, FaAndroid, FaNodeJs, FaNpm, FaYarn,
};

// Función para obtener el color del nivel
const getLevelColor = (level) => {
  switch(level) {
    case 'Básico': return 'bg-green-500/20 text-green-500 border-green-500/30';
    case 'Intermedio': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
    case 'Avanzado': return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
    case 'Experto': return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
    default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
  }
};

const TechnologiesManager = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('sections'); // 'sections' o 'grid'

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      console.log('📡 Cargando tecnologías desde Firebase...');
      
      const q = query(collection(db, 'technologies'), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const technologiesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data
        };
      });
      
      console.log('✅ Tecnologías cargadas:', technologiesData.length);
      setTechnologies(technologiesData);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching technologies:', err);
      setError('Error al cargar las tecnologías: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (techId, currentStatus) => {
    try {
      const techRef = doc(db, 'technologies', techId);
      await updateDoc(techRef, {
        active: !currentStatus
      });
      
      setTechnologies(technologies.map(t => 
        t.id === techId ? { ...t, active: !currentStatus } : t
      ));
    } catch (err) {
      console.error('Error:', err);
      alert('Error al actualizar la tecnología');
    }
  };

  const deleteTechnology = async (techId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tecnología?')) return;

    try {
      await deleteDoc(doc(db, 'technologies', techId));
      setTechnologies(technologies.filter(t => t.id !== techId));
    } catch (err) {
      console.error('Error:', err);
      alert('Error al eliminar la tecnología');
    }
  };

  // Filtrar tecnologías activas para mostrar
  const filteredTechnologies = technologies.filter(tech => {
    if (filter === 'active') return tech.active !== false;
    if (filter === 'inactive') return tech.active === false;
    return true;
  });

  // Agrupar tecnologías por categoría
  const groupedTechnologies = filteredTechnologies.reduce((acc, tech) => {
    const category = tech.category || 'Sin categoría';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tech);
    return acc;
  }, {});

  // Ordenar categorías
  const sortedCategories = Object.keys(groupedTechnologies).sort();

  const getIconComponent = (iconName) => {
    return iconMap[iconName] || FiCode;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-accent-blue text-xl">Cargando tecnologías...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={fetchTechnologies}
          className="bg-accent-blue text-white px-4 py-2 rounded hover:bg-accent-blue/80 transition-smooth"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header con título y acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link 
            to="/admin" 
            className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-smooth mb-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver al Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Gestión de Tecnologías</span>
          </h1>
          <p className="text-text-secondary mt-2">
            {technologies.length} tecnologías en total • {technologies.filter(t => t.active !== false).length} activas
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Selector de vista */}
          <div className="flex bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode('sections')}
              className={`px-3 py-2 rounded-lg transition-smooth flex items-center space-x-2 ${
                viewMode === 'sections' 
                  ? 'bg-accent-blue text-white' 
                  : 'text-text-secondary hover:text-white'
              }`}
              title="Vista por secciones"
            >
              <FiLayers className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Secciones</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-lg transition-smooth flex items-center space-x-2 ${
                viewMode === 'grid' 
                  ? 'bg-accent-blue text-white' 
                  : 'text-text-secondary hover:text-white'
              }`}
              title="Vista grid"
            >
              <FiGrid className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Grid</span>
            </button>
          </div>

          <Link
            to="/admin/technologies/new"
            className="bg-accent-blue hover:bg-accent-blue/80 text-white px-4 py-2 rounded-lg font-medium transition-smooth flex items-center space-x-2"
          >
            <FiPlus className="w-4 h-4" />
            <span>Nueva</span>
          </Link>
        </div>
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
          Todas
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            filter === 'active' 
              ? 'bg-green-600 text-white' 
              : 'bg-white/5 text-text-secondary hover:bg-white/10'
          }`}
        >
          Activas
        </button>
        <button
          onClick={() => setFilter('inactive')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            filter === 'inactive' 
              ? 'bg-red-600 text-white' 
              : 'bg-white/5 text-text-secondary hover:bg-white/10'
          }`}
        >
          Inactivas
        </button>
      </div>

      {technologies.length === 0 ? (
        <div className="text-center py-12 glass-effect rounded-2xl">
          <p className="text-text-secondary mb-4">No hay tecnologías en Firebase</p>
          <p className="text-sm text-text-secondary mb-4">
            Agrega una tecnología desde el botón "Nueva Tecnología"
          </p>
          <Link
            to="/admin/technologies/new"
            className="text-accent-blue hover:text-white transition-smooth"
          >
            + Crear primera tecnología
          </Link>
        </div>
      ) : (
        <>
          {viewMode === 'sections' ? (
            // VISTA POR SECCIONES - Con panel de acciones arriba
            <div className="space-y-8">
              {sortedCategories.map((category) => (
                <div key={category} className="glass-effect rounded-2xl p-6">
                  {/* Título de la categoría */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      <span className="gradient-text">{category}</span>
                    </h2>
                    <span className="text-sm text-text-secondary bg-white/5 px-3 py-1 rounded-full">
                      {groupedTechnologies[category].length} tecnologías
                    </span>
                  </div>

                  {/* Grid de tecnologías en la categoría */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedTechnologies[category].map((tech) => {
                      const IconComponent = getIconComponent(tech.iconName);
                      return (
                        <div
                          key={tech.id}
                          className={`bg-white/5 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] ${
                            tech.active === false ? 'opacity-60' : ''
                          }`}
                        >
                          {/* Panel de acciones - ARRIBA */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center">
                                <IconComponent className="w-5 h-5" style={{ color: tech.color || '#FFFFFF' }} />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => toggleActive(tech.id, tech.active !== false)}
                                className={`p-1.5 rounded-lg transition-all duration-300 ${
                                  tech.active !== false
                                    ? 'text-green-500 hover:bg-green-500/20'
                                    : 'text-red-500 hover:bg-red-500/20'
                                }`}
                                title={tech.active !== false ? 'Desactivar' : 'Activar'}
                              >
                                {tech.active !== false ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                              </button>

                              <Link
                                to={`/admin/technologies/edit/${tech.id}`}
                                className="p-1.5 text-accent-blue hover:bg-accent-blue/20 rounded-lg transition-all duration-300"
                                title="Editar"
                              >
                                <FiEdit2 className="w-4 h-4" />
                              </Link>

                              <button
                                onClick={() => deleteTechnology(tech.id)}
                                className="p-1.5 text-red-500 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                                title="Eliminar"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Información - ABAJO */}
                          <div className="space-y-2">
                            <p className="text-text-secondary text-sm line-clamp-2">
                              {tech.description || 'Sin descripción'}
                            </p>
                            
                            <div className="flex items-center justify-between pt-2 border-t border-white/10">
                              <span className="text-xs text-text-secondary">
                                {tech.category}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full border ${getLevelColor(tech.level)}`}>
                                {tech.level}
                              </span>
                            </div>

                            {tech.active === false && (
                              <div className="text-xs text-red-500 flex items-center space-x-1">
                                <FiEyeOff className="w-3 h-3" />
                                <span>Oculta</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // VISTA GRID (original)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTechnologies.map((tech) => {
                const IconComponent = getIconComponent(tech.iconName);
                return (
                  <div
                    key={tech.id}
                    className={`glass-effect rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] ${
                      tech.active === false ? 'opacity-60' : ''
                    }`}
                  >
                    {/* Panel de acciones - ARRIBA */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5" style={{ color: tech.color || '#FFFFFF' }} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => toggleActive(tech.id, tech.active !== false)}
                          className={`p-1.5 rounded-lg transition-all duration-300 ${
                            tech.active !== false
                              ? 'text-green-500 hover:bg-green-500/20'
                              : 'text-red-500 hover:bg-red-500/20'
                          }`}
                          title={tech.active !== false ? 'Desactivar' : 'Activar'}
                        >
                          {tech.active !== false ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                        </button>

                        <Link
                          to={`/admin/technologies/edit/${tech.id}`}
                          className="p-1.5 text-accent-blue hover:bg-accent-blue/20 rounded-lg transition-all duration-300"
                          title="Editar"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => deleteTechnology(tech.id)}
                          className="p-1.5 text-red-500 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                          title="Eliminar"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Información - ABAJO */}
                    <div className="space-y-2">
                      <p className="text-text-secondary text-sm line-clamp-2">
                        {tech.description || 'Sin descripción'}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-xs text-text-secondary">
                          {tech.category}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getLevelColor(tech.level)}`}>
                          {tech.level}
                        </span>
                      </div>

                      {tech.active === false && (
                        <div className="text-xs text-red-500 flex items-center space-x-1">
                          <FiEyeOff className="w-3 h-3" />
                          <span>Oculta</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TechnologiesManager;