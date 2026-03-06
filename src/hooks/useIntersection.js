// src/hooks/useIntersection.js
// Hook compartido para animar elementos al hacer scroll
import { useEffect, useRef } from 'react';

/**
 * Observa un elemento y le agrega la clase 'vis' cuando entra en viewport.
 * @param {string[]} selectors  — selectores CSS dentro del ref (ej: ['.section-label','.section-title'])
 * @param {number}   threshold  — porcentaje visible para disparar (default 0.1)
 */
export function useIntersection(selectors = [], threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = selectors.flatMap(sel =>
      Array.from(ref.current.querySelectorAll(sel))
    );
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          obs.unobserve(e.target);
        }
      });
    }, { threshold });

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);  // eslint-disable-line

  return ref;
}

/**
 * Versión simple: observa el propio ref y agrega 'vis' cuando entra.
 */
export function useVisibleClass(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        obs.disconnect();
      }
    }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return ref;
}