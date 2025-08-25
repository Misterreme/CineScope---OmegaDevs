import React, { createContext, useContext, useState, useCallback } from 'react'
import SuccessNotification from '../components/UI/SuccessNotification'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const showNotification = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      message,
      type,
      duration
    }

    setNotifications(prev => [...prev, newNotification])

    // Auto-remove after duration + animation time
    setTimeout(() => {
      removeNotification(id)
    }, duration + 300)
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const showSuccess = useCallback((message, duration) => {
    showNotification(message, 'success', duration)
  }, [showNotification])

  const showError = useCallback((message, duration) => {
    showNotification(message, 'error', duration)
  }, [showNotification])

  const showMovieActionSuccess = useCallback((action, movieTitle, isAdding = true) => {
    let message = ''
    
    switch (action) {
      case 'watchlist':
        message = isAdding 
          ? `"${movieTitle}" agregada a tu lista` 
          : `"${movieTitle}" removida de tu lista`
        break
      case 'watched':
        message = isAdding 
          ? `"${movieTitle}" marcada como vista` 
          : `"${movieTitle}" removida de vistas`
        break
      default:
        message = isAdding 
          ? `"${movieTitle}" agregada exitosamente` 
          : `"${movieTitle}" removida exitosamente`
    }

    showSuccess(message, 3000)
  }, [showSuccess])

  const value = {
    showNotification,
    showSuccess,
    showError,
    showMovieActionSuccess,
    removeNotification
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {/* Render notifications */}
      {notifications.map(notification => (
        <SuccessNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  )
}
