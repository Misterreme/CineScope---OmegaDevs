import { supabase } from '../config/supabase'

class ProfileService {
  // Actualizar información del perfil
  async updateProfile(userId, profileData) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: profileData
      })

      if (error) {
        console.error('Error updating profile:', error)
        throw error
      }

      return { data, success: true }
    } catch (error) {
      console.error('Profile update error:', error)
      return { 
        data: null, 
        success: false, 
        error: error.message 
      }
    }
  }

  // Cambiar email del usuario
  async changeEmail(newEmail, password) {
    try {
      // Primero verificar la contraseña actual
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: password
      })

      if (signInError) {
        throw new Error('Contraseña incorrecta')
      }

      // Cambiar el email
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail
      })

      if (error) {
        console.error('Error changing email:', error)
        throw error
      }

      return { data, success: true }
    } catch (error) {
      console.error('Email change error:', error)
      return { 
        data: null, 
        success: false, 
        error: error.message 
      }
    }
  }

  // Cambiar contraseña del usuario
  async changePassword(currentPassword, newPassword) {
    try {
      // Primero verificar la contraseña actual
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      })

      if (signInError) {
        throw new Error('Contraseña actual incorrecta')
      }

      // Cambiar la contraseña
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        console.error('Error changing password:', error)
        throw error
      }

      return { data, success: true }
    } catch (error) {
      console.error('Password change error:', error)
      return { 
        data: null, 
        success: false, 
        error: error.message 
      }
    }
  }

  // Actualizar avatar del perfil
  async updateProfileAvatar(userId, avatarData) {
    try {
      // Actualizar el perfil del usuario con la nueva URL del avatar
      const { data: profileData, error: profileError } = await supabase.auth.updateUser({
        data: { 
          avatar_url: avatarData.url,
          avatar_name: avatarData.name
        }
      })

      if (profileError) {
        console.error('Error updating profile with avatar:', profileError)
        throw profileError
      }

      // Forzar la actualización del contexto de autenticación
      // Esto asegura que el avatar se muestre inmediatamente en toda la aplicación
      await new Promise(resolve => setTimeout(resolve, 100))

      return { 
        data: { avatarUrl: avatarData.url, profileData }, 
        success: true 
      }
    } catch (error) {
      console.error('Profile avatar update error:', error)
      return { 
        data: null, 
        success: false, 
        error: error.message 
      }
    }
  }

  // Eliminar foto de perfil
  async removeProfileImage(userId) {
    try {
      // Obtener el usuario actual para ver si tiene avatar
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        throw userError
      }

      if (!user.user_metadata?.avatar_url) {
        return { success: true, message: 'No hay avatar para eliminar' }
      }

      // Extraer el nombre del archivo de la URL
      const avatarUrl = user.user_metadata.avatar_url
      const fileName = avatarUrl.split('/').pop()

      // Eliminar archivo de Storage
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([`avatars/${fileName}`])

      if (deleteError) {
        console.error('Error deleting image:', deleteError)
        // No lanzar error aquí, solo log
      }

      // Actualizar perfil removiendo la URL del avatar
      const { data, error: profileError } = await supabase.auth.updateUser({
        data: { avatar_url: null }
      })

      if (profileError) {
        console.error('Error updating profile:', profileError)
        throw profileError
      }

      return { data, success: true }
    } catch (error) {
      console.error('Profile image removal error:', error)
      return { 
        data: null, 
        success: false, 
        error: error.message 
      }
    }
  }

  // Obtener información del perfil
  async getProfile(userId) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        throw error
      }

      return { 
        data: user, 
        success: true 
      }
    } catch (error) {
      console.error('Get profile error:', error)
      return { 
        data: null, 
        success: false, 
        error: error.message 
      }
    }
  }
}

export const profileService = new ProfileService()
