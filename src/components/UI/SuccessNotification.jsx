import React, { useEffect, useState } from 'react'
import { CheckCircle, X } from 'lucide-react'
import './SuccessNotification.css'

const SuccessNotification = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Auto-close after duration
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, 300) // Animation duration
  }

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />
      case 'error':
        return <X size={20} />
      default:
        return <CheckCircle size={20} />
    }
  }

  const getMessage = () => {
    if (message) return message
    
    switch (type) {
      case 'success':
        return 'Operación completada exitosamente'
      case 'error':
        return 'Error en la operación'
      default:
        return 'Operación completada'
    }
  }

  return (
    <div className={`success-notification ${type} ${isClosing ? 'closing' : ''}`}>
      <div className="notification-content">
        <div className="notification-icon">
          {getIcon()}
        </div>
        <div className="notification-message">
          {getMessage()}
        </div>
        <button 
          className="notification-close"
          onClick={handleClose}
          aria-label="Cerrar notificación"
        >
          <X size={16} />
        </button>
      </div>
      <div className="notification-progress">
        <div 
          className="progress-bar"
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  )
}

export default SuccessNotification
