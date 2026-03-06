// src/debug-env.jsx - IMPORTA ESTO TEMPORALMENTE EN main.jsx
console.log('🔍 DEBUG ENV:');
console.log('Todas las import.meta.env:', import.meta.env);
console.log('Variables VITE_ disponibles:', 
    Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
console.log('VITE_FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY ? '✅' : '❌');