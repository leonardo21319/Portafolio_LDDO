// src/hooks/useProjects.js
//
// ─────────────────────────────────────────────────────────────────────────────
//  HOOK — useProjects
//  Lee la colección "projects" de Firestore y devuelve los datos crudos.
//  La lógica de merge con fallback vive en ProjectsSection.jsx
//  (mismo patrón que useTechStack / StackSection).
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => Number(a.order ?? 99) - Number(b.order ?? 99));
        console.log(`✅ useProjects: ${data.length} proyecto(s) cargado(s) desde Firestore`);
        setProjects(data);
      } catch (err) {
        console.error('❌ useProjects error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return { projects, loading, error };
};
