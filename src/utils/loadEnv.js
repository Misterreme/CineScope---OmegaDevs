// Cargar variables de entorno desde .env
require('dotenv').config({ path: '../../.env' });

// Exportar las variables de entorno necesarias
module.exports = {
  supabaseUrl: process.env.VITE_SUPABASE_URL,
  supabaseAnonKey: process.env.VITE_SUPABASE_ANON_KEY
};
