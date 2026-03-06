// src/hooks/useTechStack.js
//
// ─────────────────────────────────────────────────────────────────────────────
//  HOOK — useTechStack
//  Lee la colección "technologies" de Firestore.
//
//  Estructura esperada de cada documento:
//  {
//    name:        string,    // "React.js"
//    iconName:    string,    // "SiReact"  ← debe coincidir con iconMapper.js
//    category:    string,    // "Frontend" | "Mobile" | "Backend" | "Cloud" | "Herramientas"
//    level:       string,    // "Avanzado" | "Intermedio" | "Básico"
//    color:       string,    // "#61DAFB"
//    description: string,
//    order:       number
//  }
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useTechStack = () => {
  const [techStack, setTechStack] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        const q = query(collection(db, 'technologies'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(`✅ useTechStack: ${data.length} tecnología(s) cargada(s)`);
        setTechStack(data);
      } catch (err) {
        console.error('❌ useTechStack error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTechStack();
  }, []);

  return { techStack, loading, error };
};