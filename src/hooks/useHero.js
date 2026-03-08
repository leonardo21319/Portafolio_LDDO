// src/hooks/useHero.js
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Estructura de hero/main en Firestore:
// {
//   nameWhite:   string   — "Leonardo Daniel"
//   nameBlue:    string   — "Dominguez"
//   roleLine:    string   — "Frontend & Mobile Dev · UX · QA"
//   description: string   — soporta **negrita**
//   heroIcons:   string[] — claves de iconMap ej. ["SiReact","FaJava",...]
//   updatedAt:   timestamp
// }

export const useHero = () => {
  const [hero,    setHero]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'hero', 'main'));
        if (!cancelled) {
          if (snap.exists()) {
            setHero({ id: snap.id, ...snap.data() });
            console.log('✅ useHero: cargado desde Firestore');
          } else {
            setHero(null);
            console.warn('⚠️  useHero: hero/main no existe, usando fallback');
          }
        }
      } catch (e) {
        console.error('❌ useHero:', e.message);
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { hero, loading, error };
};