import React, { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Film } from 'lucide-react'
import { testSupabaseConnection } from '../../utils/testSupabase'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState(null)

  useEffect(() => {
    // Probar conexión al cargar la página
    const checkConnection = async () => {
      const result = await testSupabaseConnection()
      setConnectionStatus(result)
    }
    checkConnection()
  }, [])

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="logo">
            <Film size={32} />
            <h1>Cines Scope</h1>
          </div>
        </div>
        
        <div className="auth-content">
          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </div>
      </div>
      
      <div className="auth-background">
        <div className="gradient-overlay"></div>
      </div>
    </div>
  )
}

export default AuthPage
