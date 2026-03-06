// src/testFirebase.jsx - Archivo temporal para pruebas
import { useEffect } from 'react';
import { db } from './config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const TestFirebase = () => {
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔍 Probando conexión a Firebase...');
        
        // Probar colección projects
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        console.log('📁 Colección projects:', projectsSnapshot.size, 'documentos');
        projectsSnapshot.forEach(doc => {
          console.log('  - Proyecto:', doc.id, doc.data());
        });

        // Probar colección technologies
        const techSnapshot = await getDocs(collection(db, 'technologies'));
        console.log('📁 Colección technologies:', techSnapshot.size, 'documentos');
        techSnapshot.forEach(doc => {
          console.log('  - Tecnología:', doc.id, doc.data());
        });

        if (projectsSnapshot.size === 0) {
          console.warn('⚠️ No hay documentos en la colección projects');
        }
        if (techSnapshot.size === 0) {
          console.warn('⚠️ No hay documentos en la colección technologies');
        }

      } catch (error) {
        console.error('❌ Error de conexión:', error);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg z-50">
      <p className="text-sm">🔍 Revisa la consola (F12) para ver los datos</p>
    </div>
  );
};

export default TestFirebase;