// src/admin/projects/ProjectForm.jsx
import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiX, FiPlus, FiSearch, FiCode } from 'react-icons/fi';

// Importar SOLO los iconos que SÍ existen en react-icons
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
} from 'react-icons/si';

import {
  FiCpu,
  FiCode as FiCodeIcon,
  FiCloud,
  FiDatabase,
  FiZap,
  FiEye,
  FiGlobe,
  FiServer,
  FiTool,
  FiBox,
  FiLayers,
  FiLayout,
  FiSmartphone,
  FiTablet,
  FiMonitor
} from 'react-icons/fi';

import {
  FaAws,
  FaMicrosoft,
  FaJava,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaApple,
  FaAndroid,
  FaNodeJs,
  FaNpm,
  FaYarn,
  FaCss3,
  FaHtml5,
} from 'react-icons/fa';

// Catálogo completo de tecnologías con sus iconos y categorías
const technologiesCatalog = [
  // Frontend
  { name: 'React', icon: SiReact, category: 'Frontend', color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'Frontend', color: '#000000' },
  { name: 'Vue.js', icon: SiVuedotjs, category: 'Frontend', color: '#4FC08D' },
  { name: 'Angular', icon: SiAngular, category: 'Frontend', color: '#DD0031' },
  { name: 'TypeScript', icon: SiTypescript, category: 'Frontend', color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, category: 'Frontend', color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Frontend', color: '#06B6D4' },
  { name: 'HTML5', icon: FaHtml5, category: 'Frontend', color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3, category: 'Frontend', color: '#1572B6' },
  { name: 'Redux', icon: SiRedux, category: 'Frontend', color: '#764ABC' },
  { name: 'Vite', icon: SiVite, category: 'Frontend', color: '#646CFF' },
  { name: 'Webpack', icon: SiWebpack, category: 'Frontend', color: '#8DD6F9' },
  { name: 'Figma', icon: SiFigma, category: 'Frontend', color: '#F24E1E' },
  
  // Mobile
  { name: 'Flutter', icon: SiFlutter, category: 'Mobile', color: '#02569B' },
  { name: 'Dart', icon: SiDart, category: 'Mobile', color: '#0175C2' },
  { name: 'React Native', icon: SiReact, category: 'Mobile', color: '#61DAFB' },
  { name: 'Kotlin', icon: SiKotlin, category: 'Mobile', color: '#7F52FF' },
  { name: 'Swift', icon: SiSwift, category: 'Mobile', color: '#FA7343' },
  { name: 'Android', icon: FaAndroid, category: 'Mobile', color: '#3DDC84' },
  { name: 'iOS', icon: FaApple, category: 'Mobile', color: '#000000' },
  
  // Backend
  { name: 'Node.js', icon: SiNodedotjs, category: 'Backend', color: '#339933' },
  { name: 'Express', icon: SiNodedotjs, category: 'Backend', color: '#000000' },
  { name: 'Python', icon: SiPython, category: 'Backend', color: '#3776AB' },
  { name: 'Java', icon: FaJava, category: 'Backend', color: '#007396' },
  { name: 'PHP', icon: SiPhp, category: 'Backend', color: '#777BB4' },
  { name: 'Laravel', icon: SiLaravel, category: 'Backend', color: '#FF2D20' },
  { name: 'GraphQL', icon: SiGraphql, category: 'Backend', color: '#E10098' },
  
  // Bases de datos
  { name: 'Firebase', icon: SiFirebase, category: 'Database', color: '#FFCA28' },
  { name: 'MongoDB', icon: SiMongodb, category: 'Database', color: '#47A248' },
  { name: 'PostgreSQL', icon: SiPostgresql, category: 'Database', color: '#336791' },
  { name: 'MySQL', icon: SiMysql, category: 'Database', color: '#4479A1' },
  { name: 'Redis', icon: SiRedis, category: 'Database', color: '#DC382D' },
  { name: 'Prisma', icon: SiPrisma, category: 'Database', color: '#2D3748' },
  
  // Cloud & DevOps
  { name: 'AWS', icon: FaAws, category: 'Cloud', color: '#FF9900' },
  { name: 'Azure', icon: FaMicrosoft, category: 'Cloud', color: '#0078D4' },
  { name: 'Google Cloud', icon: FiCloud, category: 'Cloud', color: '#4285F4' },
  { name: 'Docker', icon: SiDocker, category: 'DevOps', color: '#2496ED' },
  { name: 'Kubernetes', icon: SiKubernetes, category: 'DevOps', color: '#326CE5' },
  { name: 'Jenkins', icon: SiJenkins, category: 'DevOps', color: '#D24939' },
  { name: 'Vercel', icon: SiVercel, category: 'DevOps', color: '#000000' },
  { name: 'Netlify', icon: SiNetlify, category: 'DevOps', color: '#00C7B7' },
  
  // IA/ML
  { name: 'TensorFlow', icon: SiTensorflow, category: 'AI/ML', color: '#FF6F00' },
  { name: 'PyTorch', icon: SiPytorch, category: 'AI/ML', color: '#EE4C2C' },
  { name: 'YOLO', icon: FiCpu, category: 'AI/ML', color: '#00FF00' },
  { name: 'YOLOv8', icon: FiCpu, category: 'AI/ML', color: '#00FF00' },
  { name: 'OpenCV', icon: FiEye, category: 'AI/ML', color: '#5C3EE8' },
  
  // Herramientas
  { name: 'Git', icon: SiGit, category: 'Tools', color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, category: 'Tools', color: '#181717' },
  { name: 'Jest', icon: SiJest, category: 'Tools', color: '#C21325' },
  { name: 'Cypress', icon: SiCypress, category: 'Tools', color: '#17202C' },
  { name: 'Storybook', icon: SiStorybook, category: 'Tools', color: '#FF4785' },
  { name: 'NPM', icon: FaNpm, category: 'Tools', color: '#CB3837' },
  { name: 'Yarn', icon: FaYarn, category: 'Tools', color: '#2C8EBB' },
  { name: 'WordPress', icon: SiWordpress, category: 'Tools', color: '#21759B' },
];

// Agrupar por categoría
const categories = [...new Set(technologiesCatalog.map(t => t.category))].sort();

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showTechSelector, setShowTechSelector] = useState(false);
  const [customTechInput, setCustomTechInput] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    longDescription: '',
    technologies: [],
    features: [],
    category: '',
    status: 'En desarrollo',
    statusColor: 'yellow',
    gridSize: 'normal',
    featured: false,
    demoUrl: '',
    githubUrl: '',
    order: 1,
    active: true
  });

  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'projects', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setFormData({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError('Proyecto no encontrado');
      }
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Error al cargar el proyecto');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addTechnology = (techName) => {
    if (techName && !formData.technologies.includes(techName)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techName]
      }));
    }
  };

  const addCustomTechnology = () => {
    if (customTechInput.trim() && !formData.technologies.includes(customTechInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, customTechInput.trim()]
      }));
      setCustomTechInput('');
    }
  };

  const removeTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!formData.title || !formData.subtitle || !formData.description) {
        throw new Error('Por favor completa los campos obligatorios');
      }

      const projectData = {
        ...formData,
        technologies: formData.technologies || [],
        features: formData.features || [],
        updatedAt: new Date().toISOString()
      };

      if (id) {
        const docRef = doc(db, 'projects', id);
        await updateDoc(docRef, projectData);
        alert('✅ Proyecto actualizado correctamente');
      } else {
        await addDoc(collection(db, 'projects'), {
          ...projectData,
          createdAt: new Date().toISOString()
        });
        alert('✅ Proyecto creado correctamente');
      }
      
      navigate('/admin/projects');
    } catch (err) {
      console.error('Error saving project:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Filtrar tecnologías por búsqueda y categoría
  const filteredTechnologies = technologiesCatalog.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tech.category === selectedCategory;
    const notSelected = !formData.technologies.includes(tech.name);
    return matchesSearch && matchesCategory && notSelected;
  });

  // Verificar si la búsqueda no tiene resultados y hay texto para agregar
  const showCustomOption = searchTerm.trim() !== '' && 
                          filteredTechnologies.length === 0 && 
                          !formData.technologies.includes(searchTerm.trim());

  const getTechIcon = (techName) => {
    const tech = technologiesCatalog.find(t => t.name === techName);
    return tech ? tech.icon : FiCodeIcon;
  };

  const getTechColor = (techName) => {
    const tech = technologiesCatalog.find(t => t.name === techName);
    return tech ? tech.color : '#FFFFFF';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-accent-blue text-xl">Cargando proyecto...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/admin/projects" 
          className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-smooth mb-4"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver a Proyectos</span>
        </Link>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">
            {id ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
            {error}
          </div>
        )}

        {/* Información Básica */}
        <div className="glass-effect rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Información Básica</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm mb-2">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
                required
                placeholder="Ej: Ixelo"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">
                Subtítulo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
                required
                placeholder="Ej: Sistema de clasificación con IA"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-2">
              Descripción Corta <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
              required
              placeholder="Breve descripción del proyecto..."
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-2">
              Descripción Larga
            </label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              rows="5"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
              placeholder="Descripción detallada del proyecto..."
            />
          </div>
        </div>

        {/* Tecnologías con selector */}
        <div className="glass-effect rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Tecnologías</h2>
            <button
              type="button"
              onClick={() => setShowTechSelector(!showTechSelector)}
              className="bg-accent-blue hover:bg-accent-blue/80 text-white px-4 py-2 rounded-lg transition-smooth flex items-center space-x-2"
            >
              <FiPlus className="w-4 h-4" />
              <span>Agregar tecnología</span>
            </button>
          </div>

          {/* Selector de tecnologías */}
          {showTechSelector && (
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center space-x-2 mb-4">
                <FiSearch className="w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Buscar tecnología..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-b border-white/10 px-2 py-1 text-white focus:border-accent-blue outline-none"
                  autoFocus
                />
              </div>

              {/* Filtros por categoría */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 text-xs rounded-full transition-smooth ${
                    selectedCategory === 'all'
                      ? 'bg-accent-blue text-white'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  Todas
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs rounded-full transition-smooth ${
                      selectedCategory === cat
                        ? 'bg-accent-blue text-white'
                        : 'bg-white/5 text-text-secondary hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid de tecnologías */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2">
                {filteredTechnologies.map((tech) => {
                  const IconComponent = tech.icon;
                  return (
                    <button
                      key={tech.name}
                      type="button"
                      onClick={() => {
                        addTechnology(tech.name);
                        setShowTechSelector(false);
                        setSearchTerm('');
                      }}
                      className="flex items-center space-x-2 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-smooth text-left"
                    >
                      <IconComponent className="w-5 h-5 shrink-0" style={{ color: tech.color }} />
                      <span className="text-sm text-white truncate">{tech.name}</span>
                    </button>
                  );
                })}
                
                {/* Opción para agregar tecnología personalizada */}
                {showCustomOption && (
                  <button
                    type="button"
                    onClick={() => {
                      addTechnology(searchTerm.trim());
                      setShowTechSelector(false);
                      setSearchTerm('');
                    }}
                    className="col-span-2 md:col-span-3 flex items-center justify-center space-x-2 p-3 bg-accent-blue/20 hover:bg-accent-blue/30 border border-accent-blue/30 rounded-lg transition-smooth"
                  >
                    <FiPlus className="w-5 h-5 text-accent-blue" />
                    <span className="text-sm text-white">
                      Agregar "{searchTerm}" como tecnología personalizada
                    </span>
                    <FiCodeIcon className="w-4 h-4 text-text-secondary" />
                  </button>
                )}

                {filteredTechnologies.length === 0 && !showCustomOption && (
                  <p className="text-text-secondary text-sm col-span-3 text-center py-4">
                    No se encontraron tecnologías
                  </p>
                )}
              </div>

              {/* Entrada manual de tecnología */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-text-secondary text-sm mb-2">O escribe una tecnología personalizada:</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={customTechInput}
                    onChange={(e) => setCustomTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTechnology())}
                    placeholder="Ej: Otra tecnología..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      addCustomTechnology();
                      setShowTechSelector(false);
                    }}
                    className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-smooth"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tecnologías seleccionadas */}
          {formData.technologies?.length > 0 && (
            <div className="mt-4">
              <p className="text-text-secondary text-sm mb-2">Tecnologías seleccionadas:</p>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => {
                  const IconComponent = getTechIcon(tech);
                  const color = getTechColor(tech);
                  return (
                    <div
                      key={index}
                      className="group relative flex items-center space-x-2 px-3 py-2 bg-white/5 border border-accent-blue/30 rounded-lg"
                    >
                      <IconComponent className="w-4 h-4" style={{ color }} />
                      <span className="text-sm text-white">{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="text-red-500 hover:text-red-400 ml-2"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Características */}
        <div className="glass-effect rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Características</h2>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              placeholder="Ej: Reconocimiento en tiempo real..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-smooth flex items-center space-x-2"
            >
              <FiPlus className="w-4 h-4" />
              <span>Agregar</span>
            </button>
          </div>

          <ul className="space-y-2 mt-4">
            {formData.features?.map((feature, index) => (
              <li key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                <span className="text-text-secondary">• {feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Configuración */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Configuración</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm mb-2">Categoría del Proyecto</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
                placeholder="Ej: AI & Mobile"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
              >
                <option value="En desarrollo">En desarrollo</option>
                <option value="Completado">Completado</option>
                <option value="En pausa">En pausa</option>
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">Color de estado</label>
              <select
                name="statusColor"
                value={formData.statusColor}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
              >
                <option value="yellow">Amarillo (En desarrollo)</option>
                <option value="green">Verde (Completado)</option>
                <option value="blue">Azul (Otros)</option>
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">Tamaño en grid</label>
              <select
                name="gridSize"
                value={formData.gridSize}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
              >
                <option value="normal">Normal</option>
                <option value="large">Grande (ocupa 2 columnas)</option>
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">URL Demo</label>
              <input
                type="url"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">URL GitHub</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">Orden</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="1"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-accent-blue"
              />
              <span className="text-text-secondary">Marcar como destacado</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="w-4 h-4 accent-accent-blue"
              />
              <span className="text-text-secondary">Activo (visible en el portafolio)</span>
            </label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <Link
            to="/admin/projects"
            className="px-6 py-3 border-2 border-text-secondary text-text-secondary hover:border-white hover:text-white rounded-lg font-medium transition-smooth"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="bg-accent-blue hover:bg-accent-blue/80 text-white px-6 py-3 rounded-lg font-medium transition-smooth flex items-center space-x-2 disabled:opacity-50"
          >
            <FiSave className="w-5 h-5" />
            <span>{saving ? 'Guardando...' : id ? 'Actualizar Proyecto' : 'Crear Proyecto'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;