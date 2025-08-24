import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { ThemeProvider } from './contexts/ThemeContext'
import WelcomePage from './components/Welcome/WelcomePage'
import Dashboard from './pages/Dashboard'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Help from './pages/Help'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function AppContent() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando CineScope...</p>
      </div>
    )
  }

  // Check if we're on a legal/help page - these should be accessible without auth
  const isLegalPage = ['/privacy', '/terms', '/help'].includes(location.pathname)

  if (isLegalPage) {
    return (
      <Routes>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    )
  }

  if (!user) {
    return <WelcomePage />
  }

  return <Dashboard />
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <NotificationProvider>
            <AuthProvider>
              <div className="app">
                <AppContent />
              </div>
            </AuthProvider>
          </NotificationProvider>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
