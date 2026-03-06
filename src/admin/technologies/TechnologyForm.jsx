// src/admin/technologies/TechnologyForm.jsx
import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiX, FiSearch } from 'react-icons/fi';

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
  FiEye,
  FiGlobe,
  FiServer,
  FiTool,
  FiBox,
  FiLayers,
  FiLayout,
  FiSmartphone,
  FiTablet,
  FiMonitor,
  FiCpu,
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
} from 'react-icons/fa';

// Catálogo completo de iconos disponibles (SOLO LOS QUE EXISTEN)
const iconsCatalog = [
  // Si (Simple Icons)
  { name: 'SiFlutter', icon: SiFlutter, category: 'Mobile', color: '#02569B' },
  { name: 'SiDart', icon: SiDart, category: 'Mobile', color: '#0175C2' },
  { name: 'SiReact', icon: SiReact, category: 'Frontend', color: '#61DAFB' },
  { name: 'SiNextdotjs', icon: SiNextdotjs, category: 'Frontend', color: '#000000' },
  { name: 'SiVuedotjs', icon: SiVuedotjs, category: 'Frontend', color: '#4FC08D' },
  { name: 'SiAngular', icon: SiAngular, category: 'Frontend', color: '#DD0031' },
  { name: 'SiTypescript', icon: SiTypescript, category: 'Frontend', color: '#3178C6' },
  { name: 'SiJavascript', icon: SiJavascript, category: 'Frontend', color: '#F7DF1E' },
  { name: 'SiTailwindcss', icon: SiTailwindcss, category: 'Frontend', color: '#06B6D4' },
  { name: 'SiFirebase', icon: SiFirebase, category: 'Database', color: '#FFCA28' },
  { name: 'SiMongodb', icon: SiMongodb, category: 'Database', color: '#47A248' },
  { name: 'SiPostgresql', icon: SiPostgresql, category: 'Database', color: '#336791' },
  { name: 'SiMysql', icon: SiMysql, category: 'Database', color: '#4479A1' },
  { name: 'SiRedis', icon: SiRedis, category: 'Database', color: '#DC382D' },
  { name: 'SiPython', icon: SiPython, category: 'Backend', color: '#3776AB' },
  { name: 'SiNodedotjs', icon: SiNodedotjs, category: 'Backend', color: '#339933' },
  { name: 'SiPhp', icon: SiPhp, category: 'Backend', color: '#777BB4' },
  { name: 'SiLaravel', icon: SiLaravel, category: 'Backend', color: '#FF2D20' },
  { name: 'SiDocker', icon: SiDocker, category: 'DevOps', color: '#2496ED' },
  { name: 'SiKubernetes', icon: SiKubernetes, category: 'DevOps', color: '#326CE5' },
  { name: 'SiGit', icon: SiGit, category: 'Tools', color: '#F05032' },
  { name: 'SiGithub', icon: SiGithub, category: 'Tools', color: '#181717' },
  { name: 'SiFigma', icon: SiFigma, category: 'Design', color: '#F24E1E' },
  { name: 'SiTensorflow', icon: SiTensorflow, category: 'AI/ML', color: '#FF6F00' },
  { name: 'SiPytorch', icon: SiPytorch, category: 'AI/ML', color: '#EE4C2C' },
  { name: 'SiKotlin', icon: SiKotlin, category: 'Mobile', color: '#7F52FF' },
  { name: 'SiSwift', icon: SiSwift, category: 'Mobile', color: '#FA7343' },
  { name: 'SiJest', icon: SiJest, category: 'Testing', color: '#C21325' },
  { name: 'SiCypress', icon: SiCypress, category: 'Testing', color: '#17202C' },
  { name: 'SiRedux', icon: SiRedux, category: 'Frontend', color: '#764ABC' },
  { name: 'SiVite', icon: SiVite, category: 'Frontend', color: '#646CFF' },
  { name: 'SiWebpack', icon: SiWebpack, category: 'Frontend', color: '#8DD6F9' },
  { name: 'SiWordpress', icon: SiWordpress, category: 'CMS', color: '#21759B' },
  { name: 'SiHtml5', icon: SiHtml5, category: 'Frontend', color: '#E34F26' },
  { name: 'SiCss3', icon: SiCss3, category: 'Frontend', color: '#1572B6' },
  { name: 'SiBootstrap', icon: SiBootstrap, category: 'Frontend', color: '#7952B3' },
  { name: 'SiSass', icon: SiSass, category: 'Frontend', color: '#CC6699' },
  
  // Fi (Feather Icons) - Genéricos
  { name: 'FiCode', icon: FiCode, category: 'Generic', color: '#FFFFFF' },
  { name: 'FiCloud', icon: FiCloud, category: 'Generic', color: '#4285F4' },
  { name: 'FiDatabase', icon: FiDatabase, category: 'Generic', color: '#F4A261' },
  { name: 'FiCpu', icon: FiCpu, category: 'Generic', color: '#00FF00' },
  { name: 'FiZap', icon: FiZap, category: 'Generic', color: '#FFD700' },
  { name: 'FiEye', icon: FiEye, category: 'Generic', color: '#8A2BE2' },
  { name: 'FiGlobe', icon: FiGlobe, category: 'Generic', color: '#87CEEB' },
  { name: 'FiServer', icon: FiServer, category: 'Generic', color: '#CD5C5C' },
  { name: 'FiTool', icon: FiTool, category: 'Generic', color: '#A9A9A9' },
  { name: 'FiSmartphone', icon: FiSmartphone, category: 'Generic', color: '#32CD32' },
  { name: 'FiMonitor', icon: FiMonitor, category: 'Generic', color: '#6A5ACD' },
  { name: 'FiLayout', icon: FiLayout, category: 'Generic', color: '#FF69B4' },
  { name: 'FiBox', icon: FiBox, category: 'Generic', color: '#8B4513' },
  { name: 'FiLayers', icon: FiLayers, category: 'Generic', color: '#20B2AA' },
  
  // Fa (Font Awesome)
  { name: 'FaAws', icon: FaAws, category: 'Cloud', color: '#FF9900' },
  { name: 'FaMicrosoft', icon: FaMicrosoft, category: 'Cloud', color: '#0078D4' },
  { name: 'FaJava', icon: FaJava, category: 'Backend', color: '#007396' },
  { name: 'FaPython', icon: FaPython, category: 'Backend', color: '#3776AB' },
  { name: 'FaDocker', icon: FaDocker, category: 'DevOps', color: '#2496ED' },
  { name: 'FaAndroid', icon: FaAndroid, category: 'Mobile', color: '#3DDC84' },
  { name: 'FaApple', icon: FaApple, category: 'Mobile', color: '#000000' },
  { name: 'FaNodeJs', icon: FaNodeJs, category: 'Backend', color: '#339933' },
  { name: 'FaNpm', icon: FaNpm, category: 'Tools', color: '#CB3837' },
  { name: 'FaYarn', icon: FaYarn, category: 'Tools', color: '#2C8EBB' },
  { name: 'FaGitAlt', icon: FaGitAlt, category: 'Tools', color: '#F05032' },
];

// Agrupar por categoría
const categories = [...new Set(iconsCatalog.map(i => i.category))].sort();

const TechnologyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showIconSelector, setShowIconSelector] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    iconName: 'FiCode',
    category: 'Frontend',
    color: '#61DAFB',
    level: 'Intermedio',
    description: '',
    order: 1,
    active: true
  });

  useEffect(() => {
    if (id) {
      fetchTechnology();
    }
  }, [id]);

  const fetchTechnology = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'technologies', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setFormData({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError('Tecnología no encontrada');
      }
    } catch (err) {
      console.error('Error fetching technology:', err);
      setError('Error al cargar la tecnología');
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

  const selectIcon = (iconName, iconColor) => {
    setFormData(prev => ({
      ...prev,
      iconName,
      color: iconColor
    }));
    setShowIconSelector(false);
    setSearchTerm('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!formData.name || !formData.iconName) {
        throw new Error('Por favor completa los campos obligatorios');
      }

      const technologyData = {
        ...formData,
        updatedAt: new Date().toISOString()
      };

      if (id) {
        const docRef = doc(db, 'technologies', id);
        await updateDoc(docRef, technologyData);
        alert('✅ Tecnología actualizada correctamente');
      } else {
        await addDoc(collection(db, 'technologies'), {
          ...technologyData,
          createdAt: new Date().toISOString()
        });
        alert('✅ Tecnología creada correctamente');
      }
      
      navigate('/admin/technologies');
    } catch (err) {
      console.error('Error saving technology:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Filtrar iconos por búsqueda y categoría
  const filteredIcons = iconsCatalog.filter(icon => {
    const matchesSearch = icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         icon.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Obtener el icono seleccionado
  const SelectedIcon = iconsCatalog.find(i => i.name === formData.iconName)?.icon || FiCode;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-accent-blue text-xl">Cargando tecnología...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/admin/technologies" 
          className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-smooth mb-4"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver a Tecnologías</span>
        </Link>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">
            {id ? 'Editar Tecnología' : 'Nueva Tecnología'}
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
          
          <div>
            <label className="block text-text-secondary text-sm mb-2">
              Nombre de la Tecnología <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
              required
              placeholder="Ej: React, Flutter, Node.js..."
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
              placeholder="Breve descripción de la tecnología..."
            />
          </div>
        </div>

        {/* Selector de Icono */}
        <div className="glass-effect rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Icono</h2>
            <button
              type="button"
              onClick={() => setShowIconSelector(!showIconSelector)}
              className="bg-accent-blue hover:bg-accent-blue/80 text-white px-4 py-2 rounded-lg transition-smooth"
            >
              {showIconSelector ? 'Cerrar selector' : 'Cambiar icono'}
            </button>
          </div>

          {/* Icono seleccionado */}
          <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
            <div className="w-12 h-12 glass-effect rounded-lg flex items-center justify-center">
              <SelectedIcon className="w-6 h-6" style={{ color: formData.color }} />
            </div>
            <div>
              <p className="text-white font-medium">{formData.iconName}</p>
              <p className="text-text-secondary text-sm">Color: {formData.color}</p>
            </div>
          </div>

          {/* Selector de iconos */}
          {showIconSelector && (
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center space-x-2 mb-4">
                <FiSearch className="w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Buscar icono por nombre o categoría..."
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

              {/* Grid de iconos */}
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2 max-h-80 overflow-y-auto p-2">
                {filteredIcons.map((icon) => {
                  const IconComponent = icon.icon;
                  return (
                    <button
                      key={icon.name}
                      type="button"
                      onClick={() => selectIcon(icon.name, icon.color)}
                      className={`p-3 flex flex-col items-center space-y-1 rounded-lg transition-smooth ${
                        formData.iconName === icon.name
                          ? 'bg-accent-blue/20 border border-accent-blue'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                      title={icon.name}
                    >
                      <IconComponent className="w-5 h-5" style={{ color: icon.color }} />
                      <span className="text-[10px] text-text-secondary truncate w-full text-center">
                        {icon.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Configuración */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Configuración</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm mb-2">Categoría</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps</option>
                <option value="Cloud">Cloud</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Testing">Testing</option>
                <option value="Tools">Tools</option>
                <option value="Design">Design</option>
                <option value="CMS">CMS</option>
                <option value="Generic">Generic</option>
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">Nivel</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
                <option value="Experto">Experto</option>
              </select>
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

            <div>
              <label className="block text-text-secondary text-sm mb-2">Color (manual)</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-12 h-10 bg-transparent border border-white/10 rounded-lg"
                />
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:outline-none"
                  placeholder="#RRGGBB"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
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
            to="/admin/technologies"
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
            <span>{saving ? 'Guardando...' : id ? 'Actualizar Tecnología' : 'Crear Tecnología'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TechnologyForm;