// src/hooks/useTechStack.js
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
        // Sin filtro active — muestra todos los documentos.
        // Si en el futuro quieres filtrar, asegúrate de que cada doc
        // tenga el campo active: true en Firestore antes de activarlo.
        const q = query(
          collection(db, 'technologies'),
          orderBy('order', 'asc')
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log(`✅ useTechStack: ${data.length} tecnología(s) cargada(s) desde Firebase`);
        setTechStack(data);
      } catch (err) {
        // Si falla el orderBy (índice faltante), reintenta sin orden
        console.warn('⚠️ useTechStack: orderBy falló, reintentando sin orden...', err.message);
        try {
          const snapshot = await getDocs(collection(db, 'technologies'));
          const data = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => Number(a.order ?? 99) - Number(b.order ?? 99));

          console.log(`✅ useTechStack (fallback): ${data.length} tecnología(s) cargada(s)`);
          setTechStack(data);
        } catch (err2) {
          console.error('❌ useTechStack error:', err2.message);
          setError(err2.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTechStack();
  }, []);

  return { techStack, loading, error };
};