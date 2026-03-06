// src/utils/iconMapper.js
//
// ─────────────────────────────────────────────────────────────────────────────
//  MAPA DE ICONOS — react-icons verificados
//
//  Paquetes usados:
//    react-icons/si  → Simple Icons  (tecnologías con logo oficial)
//    react-icons/fa  → Font Awesome  (AWS, CSS3 — no existen en /si)
//    react-icons/tb  → Tabler Icons  (VSCode, Azure — no existen en /si ni /fa)
//
//  ⚠️  ICONOS QUE NO EXISTEN en react-icons/si (verificado):
//        ✗ SiAmazonaws   → usa FaAws      (fa)
//        ✗ SiAws         → usa FaAws      (fa)
//        ✗ SiMicrosoftazure → usa TbBrandAzure (tb)
//        ✗ SiAzuredevops → usa TbBrandAzure (tb)
//        ✗ SiVisualstudiocode / SiVscode → usa TbBrandVscode (tb)
//        ✗ SiCss3        → usa FaCss3     (fa)
//        ✗ SiAngularjs   → usa SiAngular  (si) — nombre correcto
//
//  ✅  ICONOS VERIFICADOS que SÍ existen en react-icons/si:
//        SiReact, SiFlutter, SiDart, SiFirebase, SiTypescript, SiFigma,
//        SiDocker, SiNodedotjs, SiPython, SiMongodb, SiMysql, SiGit,
//        SiPostman, SiJira, SiAngular, SiGithub, SiPhp, SiJavascript,
//        SiHtml5, SiTailwindcss, SiVuedotjs, SiNextdotjs, SiKotlin, SiSwift,
//        SiCss (nueva), SiGitlab, SiLinux, SiAndroid
// ─────────────────────────────────────────────────────────────────────────────

// ── react-icons/si ──
import {
  SiReact,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiTypescript,
  SiFigma,
  SiDocker,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiMysql,
  SiGit,
  SiPostman,
  SiJira,
  SiAngular,
  SiGithub,
  SiPhp,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiVuedotjs,
  SiNextdotjs,
  SiKotlin,
  SiSwift,
  SiGitlab,
  SiLinux,
} from 'react-icons/si';

// ── react-icons/fa — AWS, CSS3 y Windows no existen en /si ──
import { FaAws, FaCss3Alt, FaWindows } from 'react-icons/fa';

// ── react-icons/tb — VSCode y Azure no existen en /si ni /fa ──
import { TbBrandVscode, TbBrandAzure } from 'react-icons/tb';

// ─────────────────────────────────────────────────────────────────────────────
//  OBJETO EXPORTADO
//  Clave = string que guardas en Firestore en el campo `iconName`
// ─────────────────────────────────────────────────────────────────────────────
export const iconMap = {
  // Frontend
  SiReact,
  SiAngular,
  SiVuedotjs,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  FaCss3Alt,         // usa "FaCss3Alt" como iconName en Firestore
  SiFigma,

  // Mobile
  SiFlutter,
  SiDart,
  SiKotlin,
  SiSwift,

  // Backend
  SiNodedotjs,
  SiPhp,
  SiPython,

  // Bases de datos
  SiMongodb,
  SiMysql,
  SiFirebase,

  // Cloud / DevOps
  FaAws,             // usa "FaAws" como iconName en Firestore
  TbBrandAzure,      // usa "TbBrandAzure" como iconName en Firestore
  SiDocker,

  // Herramientas
  TbBrandVscode,     // usa "TbBrandVscode" como iconName en Firestore
  SiGit,
  SiGithub,
  SiGitlab,
  SiPostman,
  SiJira,

  // OS
  SiLinux,
  FaWindows,         // usa "FaWindows" como iconName en Firestore (SiWindows no existe)
};

// ─────────────────────────────────────────────────────────────────────────────
//  HELPER — recibe el string de Firestore y devuelve el componente icono
//  Si el nombre no existe en el mapa, usa SiReact como fallback visible
// ─────────────────────────────────────────────────────────────────────────────
export const getIconComponent = (iconName) => {
  const icon = iconMap[iconName];
  if (!icon) {
    console.warn(`[iconMapper] Icono no encontrado: "${iconName}". Revisa el campo iconName en Firestore.`);
    return SiReact; // fallback
  }
  return icon;
};