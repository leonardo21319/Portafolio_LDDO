// src/hooks/useHero.js
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Lee el documento único hero/main de Firestore.
 *
 * Uso en HeroSection.jsx:
 *   const { hero, loading } = useHero();
 *   if (loading) return <Skeleton />;
 *   return <h1>{hero?.name}</h1>;
 *
 * Campos disponibles:
 *   name, title, subtitle, description,
 *   ctaText, ctaLink, avatarUrl, cv_url, badges[]
 */
export function useHero() {
  const [hero, setHero]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'hero', 'main'));
        if (!cancelled) {
          setHero(snap.exists() ? { id: snap.id, ...snap.data() } : null);
        }
      } catch (e) {
        console.error('useHero error:', e);
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { hero, loading, error };
}