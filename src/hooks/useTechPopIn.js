// src/hooks/useTechPopIn.js
import { useEffect } from 'react';

/**
 * useTechPopIn
 *
 * Aplica un pop-in escalonado a los elementos `.ti` del tech-grid
 * al montar el componente.
 *
 * Cada ícono aparece con un pequeño retraso (base + i * step ms),
 * va de translateY(14px) scale(.8) → estado natural.
 * El retraso base (1400 ms) deja que las animaciones CSS de entrada
 * del héroe terminen primero.
 *
 * @param {React.RefObject} gridRef — ref al div .tech-grid
 */
export function useTechPopIn(gridRef) {
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = Array.from(grid.querySelectorAll('.ti'));

    /* Estado inicial — invisible y desplazado */
    items.forEach(el => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(14px) scale(.8)';
    });

    const timers = items.map((el, i) =>
      setTimeout(() => {
        el.style.transition = 'opacity .45s ease, transform .45s ease';
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0) scale(1)';

        /* Quitar transition inline al terminar para no interferir con techFloat */
        setTimeout(() => {
          el.style.transition = '';
          el.style.transform  = '';
        }, 500);
      }, 1400 + i * 110)
    );

    return () => timers.forEach(clearTimeout);
  }, [gridRef]);
}