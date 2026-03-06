// src/utils/techIcons.js
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
  SiMongodb
} from 'react-icons/si';

import {
  FiCpu,
  FiEye,
  FiZap,
  FiCode
} from 'react-icons/fi';

import {
  FaAws,
  FaMicrosoft,
  FaJava
} from 'react-icons/fa';

// Mapa de tecnologías a componentes de icono
export const techIconMap = {
  // Mobile
  'Flutter': SiFlutter,
  'Dart': SiDart,
  
  // IA/ML
  'YOLO': FiCpu,
  'YOLOv8': FiCpu,
  'Yolo': FiCpu,
  'TensorFlow': SiTensorflow,
  'PyTorch': SiPytorch,
  'Python': SiPython,
  
  // Backend
  'Firebase': SiFirebase,
  'Node.js': SiNodedotjs,
  'Express': SiNodedotjs,
  
  // Frontend
  'React': SiReact,
  'React.js': SiReact,
  
  // Cloud
  'AWS': FaAws,
  'Azure': FaMicrosoft,
  
  // Default
  'default': FiCode
};

// Función para obtener el icono de una tecnología
export const getTechIcon = (techName) => {
  if (!techName) return FiCode;
  
  // Limpiar el nombre
  const cleanName = techName.trim();
  
  // Buscar coincidencia exacta
  if (techIconMap[cleanName]) {
    return techIconMap[cleanName];
  }
  
  // Buscar coincidencia parcial (case insensitive)
  const lowerName = cleanName.toLowerCase();
  for (const [key, value] of Object.entries(techIconMap)) {
    if (lowerName.includes(key.toLowerCase())) {
      return value;
    }
  }
  
  // Si no encuentra, devolver icono por defecto
  return FiCode;
};