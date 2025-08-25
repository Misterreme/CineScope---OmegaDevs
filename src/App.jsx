import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { ThemeProvider } from './contexts/ThemeContext'
import WelcomePage from './components/Welcome/WelcomePage'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Account from './pages/Account'
import MovieDetails from './pages/MovieDetails'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Help from './pages/Help'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/UI/ScrollToTop'
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

  if (user && location.pathname === '/settings') {
    return <Settings />
  }

  if (user && location.pathname === '/account') {
    return <Account />
  }

  if (!user) {
    return <WelcomePage />
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/account" element={<Account />} />
      <Route path="/movie/:imdbId" element={<MovieDetails />} />
    </Routes>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <NotificationProvider>
            <ThemeProvider>
              <div className="app theme-transition">
                <AppContent />
                <ScrollToTop />
              </div>
            </ThemeProvider>
          </NotificationProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
