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
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useTechStack = () => {
  const [techStack, setTechStack] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        // No usamos orderBy para evitar errores si "order" es string en Firestore
        const q = query(collection(db, 'technologies'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          // Ordenamos en cliente para tolerar order como string o number
          .sort((a, b) => Number(a.order ?? 99) - Number(b.order ?? 99));
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