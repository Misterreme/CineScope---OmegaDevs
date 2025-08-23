// Importar la configuración de Supabase
import { supabase } from '../config/supabase.js';

// Usar las variables de entorno de Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Probando conexión con Supabase...')
    console.log('URL:', supabaseUrl || 'No configurada');
    console.log('Key:', supabaseKey ? 'Configurada' : 'No configurada');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Faltan variables de entorno necesarias');
    }
    
    // Probar conexión básica
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('❌ Error al conectar con Supabase:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Conexión exitosa con Supabase')
    console.log('Sesión actual:', data.session ? 'Usuario logueado' : 'Sin sesión')
    
    return { success: true, session: data.session }
    
  } catch (error) {
    console.error('❌ Error de red o configuración:', error)
    return { success: false, error: error.message }
  }
}

const testSupabaseSignUp = async (testEmail, testPassword) => {
  try {
    console.log('🔍 Probando registro con Supabase...')
    
    // Usar un dominio de prueba válido
    const validTestEmail = `test-${Date.now()}@testuser.com`;
    
    console.log(`📧 Usando email de prueba: ${validTestEmail}`);
    
    const { data, error } = await supabase.auth.signUp({
      email: validTestEmail,
      password: testPassword || 'Test123!' // Usar una contraseña por defecto segura
    })
    
    if (error) {
      console.error('❌ Error en registro:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Registro exitoso:', data)
    return { success: true, data }
    
  } catch (error) {
    console.error('❌ Error de red en registro:', error)
    return { success: false, error: error.message }
  }
}

export { testSupabaseConnection, testSupabaseSignUp };
