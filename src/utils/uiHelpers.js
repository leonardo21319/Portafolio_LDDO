// src/utils/uiHelpers.js
// ─────────────────────────────────────────────────────────────────────────────
//  Utilidades de UI compartidas entre secciones.
//  Extraídas aquí para evitar duplicación y facilitar cambios globales.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Devuelve el color hex del badge de estado de un proyecto.
 * Usado en ProjectsSection.
 */
export const getStatusColor = (s) => {
  if (!s) return '#60a5fa';
  const lc = s.toLowerCase();
  if (lc.includes('producc') || lc.includes('complet')) return '#4ade80';
  if (lc.includes('desarroll') || lc.includes('progres')) return '#fbbf24';
  if (lc.includes('pause')    || lc.includes('pausa'))   return '#f87171';
  return '#60a5fa';
};

/**
 * Construye las CSS custom properties para una tech card a partir de su color.
 * Soporta '#RRGGBB' y 'rgba(r,g,b,...)'.
 * Usado en StackSection.
 */
export const buildCardVars = (color = 'rgba(0,123,255,.55)', idx = 0) => {
  let r = 0, g = 123, b = 255;

  const hexMatch = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (hexMatch) {
    r = parseInt(hexMatch[1], 16);
    g = parseInt(hexMatch[2], 16);
    b = parseInt(hexMatch[3], 16);
  } else {
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) { r = +rgbMatch[1]; g = +rgbMatch[2]; b = +rgbMatch[3]; }
  }

  return {
    '--hc':   `rgba(${r},${g},${b},.6)`,
    '--hg':   `rgba(${r},${g},${b},.14)`,
    '--hbg':  `rgba(${r},${g},${b},.07)`,
    '--lc':   `rgba(${r},${g},${b},.9)`,
    '--lbg':  `rgba(${r},${g},${b},.18)`,
    '--fd':   `${3.2 + (idx % 4) * 0.4}s`,
    '--fdel': `${(idx % 6) * 0.3}s`,
    '--sd':   `${5 + (idx % 3) * 1.5}s`,
    '--sdel': `${(idx % 5) * 0.8}s`,
  };
};
