// src/verificar-env.js
console.log('🔥 VERIFICACIÓN DE VARIABLES DE ENTORNO:');
console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Definida' : '❌ NO DEFINIDA');
console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Definida' : '❌ NO DEFINIDA');
console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Definida' : '❌ NO DEFINIDA');

// Si quieres ver los valores (ocultos parcialmente)
if (import.meta.env.VITE_FIREBASE_API_KEY) {
  const key = import.meta.env.VITE_FIREBASE_API_KEY;
  console.log('API Key (primeros 5 chars):', key.substring(0, 5) + '...');
}