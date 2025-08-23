import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AuthPage from './components/Auth/AuthPage'
import Dashboard from './pages/Dashboard'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando Cines Scope...</p>
      </div>
    )
  }

  return user ? <Dashboard /> : <AuthPage />
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="app">
            <AppContent />
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
