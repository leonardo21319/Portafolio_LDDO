import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useTechStack = () => {
  const [techStack, setTechStack] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        // =============================================
        // 📝 CÓDIGO DE DEPURACIÓN TEMPORAL (AGREGA ESTO)
        // =============================================
        console.log('🔍 VERIFICACIÓN COMPLETA DE FIREBASE:');
        const todosLosDocs = await getDocs(collection(db, 'technologies'));
        console.log('📊 TOTAL documentos en Firebase:', todosLosDocs.size);
        todosLosDocs.forEach(doc => {
          console.log('Documento:', doc.id, {
            name: doc.data().name,
            active: doc.data().active,
            category: doc.data().category,
            // Muestra todos los campos del documento
            data: doc.data()
          });
        });
        // =============================================
        // FIN DEL CÓDIGO DE DEPURACIÓN
        // =============================================

        console.log('🔍 Fetching technologies con filtro active=true...');
        
        // 🔥 Filtrar SOLO las activas (active = true)
        const q = query(
          collection(db, 'technologies'),
          where('active', '==', true)
        );
        
        const snapshot = await getDocs(q);
        console.log('📦 Documentos activos encontrados:', snapshot.size);
        
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => Number(a.order ?? 99) - Number(b.order ?? 99));
        
        console.log(`✅ useTechStack: ${data.length} tecnología(s) activa(s) cargada(s)`);
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