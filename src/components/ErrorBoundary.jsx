import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen">
          <div className="error-content">
            <h1>🎬 Cines Scope</h1>
            <h2>Error de Configuración</h2>
            <p>
              La aplicación necesita configuración adicional para funcionar correctamente.
            </p>
            <div className="error-details">
              <h3>Pasos para configurar:</h3>
              <ol>
                <li>Configura las variables de entorno en el archivo <code>.env</code></li>
                <li>Obtén credenciales de Supabase en <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
                <li>Obtén una API key de OMDb en <a href="https://www.omdbapi.com/apikey.aspx" target="_blank" rel="noopener noreferrer">omdbapi.com</a></li>
                <li>Ejecuta el script SQL en tu proyecto de Supabase</li>
              </ol>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
            >
              Reintentar
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
