// src/utils/iconMapper.js
import {
  SiReact, SiFlutter, SiDart, SiFirebase, SiTypescript, SiFigma,
  SiDocker, SiNodedotjs, SiPython, SiMongodb, SiMysql, SiGit,
  SiPostman, SiJira, SiAngular, SiGithub, SiPhp, SiJavascript,
  SiHtml5, SiTailwindcss, SiVuedotjs, SiNextdotjs, SiKotlin,
  SiSwift, SiGitlab, SiLinux,
} from 'react-icons/si';

import { FaAws, FaCss3Alt, FaWindows, FaJava } from 'react-icons/fa';
import { TbBrandVscode, TbBrandAzure } from 'react-icons/tb';

// ─────────────────────────────────────────────────────────────────
//  iconMap — la clave es el string que guardas en Firestore
// ─────────────────────────────────────────────────────────────────
export const iconMap = {
  // Frontend
  SiReact, SiAngular, SiVuedotjs, SiNextdotjs,
  SiTypescript, SiJavascript, SiHtml5, SiTailwindcss,
  FaCss3Alt, SiFigma,

  // Mobile
  SiFlutter, SiDart, SiKotlin, SiSwift,

  // Backend
  SiNodedotjs, SiPhp, SiPython, FaJava,

  // Bases de datos
  SiMongodb, SiMysql, SiFirebase,

  // Cloud / DevOps
  FaAws, TbBrandAzure, SiDocker,

  // Herramientas
  TbBrandVscode, SiGit, SiGithub, SiGitlab, SiPostman, SiJira,

  // OS
  SiLinux, FaWindows,
};

// Etiquetas legibles
export const iconLabels = {
  SiReact:'React',        SiFlutter:'Flutter',     FaAws:'AWS',
  SiFirebase:'Firebase',  TbBrandAzure:'Azure',    SiTypescript:'TypeScript',
  SiFigma:'Figma',        SiDocker:'Docker',       SiDart:'Dart',
  SiNodedotjs:'Node.js',  SiPython:'Python',       SiMysql:'MySQL',
  TbBrandVscode:'VSCode', SiPostman:'Postman',     SiJira:'Jira',
  SiGit:'Git',            SiJavascript:'JavaScript',SiHtml5:'HTML5',
  FaCss3Alt:'CSS3',       SiTailwindcss:'Tailwind', SiAngular:'Angular',
  SiNextdotjs:'Next.js',  SiMongodb:'MongoDB',     SiGithub:'GitHub',
  SiPhp:'PHP',            SiLinux:'Linux',          FaWindows:'Windows',
  SiKotlin:'Kotlin',      SiSwift:'Swift',          SiGitlab:'GitLab',
  FaJava:'Java',          SiVuedotjs:'Vue.js',
};

export const getIconComponent = (iconName) => {
  const icon = iconMap[iconName];
  if (!icon) {
    console.warn(`[iconMapper] "${iconName}" no encontrado.`);
    return SiReact;
  }
  return icon;
};

export const getLabel = (key) =>
  iconLabels[key] || key.replace(/^(Si|Fa|Tb)(?:Brand)?/, '');