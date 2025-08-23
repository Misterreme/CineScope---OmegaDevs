// Usar las variables de entorno de Vite directamente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Importar funciones de prueba
import { testSupabaseConnection, testSupabaseSignUp } from './testSupabase.mjs';

const runDiagnostics = async () => {
  console.log('🔍 Iniciando diagnósticos...')
  
  // 1. Verificar variables de entorno
  console.log('📋 Verificando variables de entorno:');
  
  console.log(`✅ VITE_SUPABASE_URL: ${supabaseUrl ? 'Configurada' : '❌ No configurada'}`);
  console.log(`✅ VITE_SUPABASE_ANON_KEY: ${supabaseKey ? 'Configurada' : '❌ No configurada'}`);
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('❌ Faltan variables de entorno necesarias. Por favor, verifica tu archivo .env');
  }
  
  // 2. Probar conexión básica
  console.log('\n🌐 Probando conexión básica con Supabase...');
  try {
    const connectionTest = await testSupabaseConnection();
    if (!connectionTest.success) {
      throw new Error(connectionTest.error || 'Error desconocido al conectar con Supabase');
    }
    console.log('✅ Conexión exitosa con Supabase');
  } catch (error) {
    console.error('❌ Error en conexión básica:', error.message);
    return { success: false, error: error.message };
  }
  
  // 3. Probar registro de usuario
  console.log('\n👤 Probando registro de usuario...');
  const testEmail = `testuser-${Math.random().toString(36).substring(2, 10)}@test.com`;
  const testPassword = 'Test123!';
  
  try {
    console.log(`📧 Intentando registrar usuario: ${testEmail}`);
    const signupTest = await testSupabaseSignUp(testEmail, testPassword);
    
    if (!signupTest.success) {
      throw new Error(signupTest.error || 'Error desconocido durante el registro');
    }
    
    console.log(`✅ Registro exitoso con email: ${testEmail}`);
  } catch (error) {
    console.error(`❌ Error en registro con email ${testEmail}:`, error.message);
    return { 
      success: false, 
      error: `Error en registro: ${error.message}`,
      details: error.response?.data || error
    };
  }
  
  console.log(`✅ Registro exitoso con email: ${testEmail}`)
  console.log('🏁 Diagnósticos completados exitosamente')
  return { success: true }
}

// Ejecutar diagnósticos si el archivo se ejecuta directamente
if (process.argv[1] === new URL(import.meta.url).pathname) {
  runDiagnostics()
    .catch(error => {
      console.error('❌ Error en los diagnósticos:', error);
      process.exit(1);
    });
}

export { runDiagnostics };
