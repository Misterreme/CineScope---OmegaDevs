import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../hooks/useTheme'
import { profileService } from '../services/profileService'
import AvatarSelector from '../components/UI/AvatarSelector'
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  Save, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import './Settings.css'

const Settings = () => {
  const navigate = useNavigate()
  const { user, signOut, refreshUser } = useAuth()
  const { toggleTheme, isDark } = useTheme()
  
  // Estados para el formulario
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  // Estados para avatar
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  
  // Estados para cambio de email
  const [newEmail, setNewEmail] = useState('')
  const [emailPassword, setEmailPassword] = useState('')
  
  // Estados para cambio de contraseña
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Estados para información personal
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '')
  const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || '')

  const handleBack = () => {
    navigate('/')
  }

  // Manejo de avatar
  const handleAvatarSelect = async (avatar) => {
    setIsLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      const result = await profileService.updateProfileAvatar(user.id, avatar)
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Avatar actualizado correctamente' })
        setSelectedAvatar(avatar)
        
        // Actualizar el contexto del usuario para mostrar el nuevo avatar inmediatamente
        await refreshUser()
      } else {
        setMessage({ type: 'error', text: result.error || 'Error al actualizar el avatar' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar el avatar' })
    } finally {
      setIsLoading(false)
    }
  }

  // Manejo de cambio de email
  const handleEmailChange = async (e) => {
    e.preventDefault()
    if (!newEmail || !emailPassword) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos' })
      return
    }
    
    setIsLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      const result = await profileService.changeEmail(newEmail, emailPassword)
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Se ha enviado un email de confirmación' })
        setNewEmail('')
        setEmailPassword('')
      } else {
        setMessage({ type: 'error', text: result.error || 'Error al cambiar el email' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cambiar el email' })
    } finally {
      setIsLoading(false)
    }
  }

  // Manejo de cambio de contraseña
  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos' })
      return
    }
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' })
      return
    }
    
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres' })
      return
    }
    
    setIsLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      const result = await profileService.changePassword(currentPassword, newPassword)
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Contraseña actualizada correctamente' })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setMessage({ type: 'error', text: result.error || 'Error al cambiar la contraseña' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cambiar la contraseña' })
    } finally {
      setIsLoading(false)
    }
  }

  // Manejo de información personal
  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    
    setIsLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      const profileData = {
        full_name: fullName,
        display_name: displayName
      }
      
      const result = await profileService.updateProfile(user.id, profileData)
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Perfil actualizado correctamente' })
      } else {
        setMessage({ type: 'error', text: result.error || 'Error al actualizar el perfil' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar el perfil' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>
        <h1>Configuración</h1>
      </div>

      {/* Mensajes */}
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="settings-content">
        {/* Información Personal */}
        <section className="settings-section">
          <h2>
            <User size={20} />
            Información Personal
          </h2>
          
          <form onSubmit={handleProfileUpdate} className="settings-form">
            <div className="form-group">
              <label htmlFor="fullName">Nombre Completo</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre completo"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="displayName">Nombre de Usuario</label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Nombre para mostrar"
              />
            </div>
            
            <button type="submit" className="save-button" disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </form>
        </section>

        {/* Avatar del Perfil */}
        <section className="settings-section">
          <h2>
            <User size={20} />
            Avatar del Perfil
          </h2>
          
          <div className="current-avatar-section">
            <div className="current-avatar">
              <img 
                src={user?.user_metadata?.avatar_url || '/placeholder-avatar.jpg'} 
                alt="Avatar actual"
                className="avatar-preview"
              />
              <p className="avatar-info">
                Avatar actual: <strong>{user?.user_metadata?.avatar_name || 'Sin avatar'}</strong>
              </p>
            </div>
          </div>
          
          <AvatarSelector 
            onAvatarSelect={handleAvatarSelect}
            currentAvatar={selectedAvatar}
          />
        </section>

        {/* Cambio de Email */}
        <section className="settings-section">
          <h2>
            <Mail size={20} />
            Cambiar Email
          </h2>
          
          <form onSubmit={handleEmailChange} className="settings-form">
            <div className="form-group">
              <label htmlFor="newEmail">Nuevo Email</label>
              <input
                type="email"
                id="newEmail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="nuevo@email.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="emailPassword">Contraseña Actual</label>
              <div className="password-input">
                <input
                  type="password"
                  id="emailPassword"
                  value={emailPassword}
                  onChange={(e) => setEmailPassword(e.target.value)}
                  placeholder="Tu contraseña actual"
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="save-button" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Cambiar Email'}
            </button>
          </form>
        </section>

        {/* Cambio de Contraseña */}
        <section className="settings-section">
          <h2>
            <Lock size={20} />
            Cambiar Contraseña
          </h2>
          
          <form onSubmit={handlePasswordChange} className="settings-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Contraseña Actual</label>
              <div className="password-input">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Tu contraseña actual"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <div className="password-input">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nueva contraseña"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirma la nueva contraseña"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <button type="submit" className="save-button" disabled={isLoading}>
              {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
            </button>
          </form>
        </section>

        {/* Acciones de Cuenta */}
        <section className="settings-section">
          <h2>Acciones de Cuenta</h2>
          
          <div className="account-actions">
            <button className="danger-button" onClick={handleSignOut}>
              Cerrar Sesión
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Settings
