// src/hooks/useProjects.js
//
// ─────────────────────────────────────────────────────────────────────────────
//  HOOK — useProjects
//  Lee la colección "projects" de Firestore.
//
//  Estructura esperada de cada documento:
//  {
//    title:        string,
//    subtitle:     string,
//    description:  string,
//    category:     string,           // "Frontend" | "Mobile" | "FullStack"
//    status:       string,           // "Producción" | "Desarrollo"
//    statusColor:  string,           // "#hex"
//    technologies: string[],         // ["React","Flutter",...]
//    features:     string[],
//    demoUrl:      string,
//    githubUrl:    string,
//    featured:     boolean,
//    order:        number
//  }
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
        // No usamos orderBy para evitar errores si "order" es string en Firestore
        const q = query(collection(db, 'projects'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          // Ordenamos en cliente — tolera order como string o number
          .sort((a, b) => Number(a.order ?? 99) - Number(b.order ?? 99));
        console.log(`✅ useProjects: ${data.length} proyecto(s) cargado(s)`);
        setProjects(data);
      } catch (err) {
        console.error('❌ useProjects error:', err.message);
        // Si el error es "requires an index", Firestore te dará el link
        // en la consola para crearlo con un click.
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};