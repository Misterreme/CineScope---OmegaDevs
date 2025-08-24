import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Film, HelpCircle, FileText, Shield, Menu, X } from 'lucide-react'
import './WelcomeHeader.css'

const WelcomeHeader = ({ onShowAuth }) => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = () => {
    // Scroll suave al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const handleHelpClick = () => {
    navigate('/help')
    setIsMobileMenuOpen(false)
  }

  const handlePrivacyClick = () => {
    navigate('/privacy')
    setIsMobileMenuOpen(false)
  }

  const handleTermsClick = () => {
    navigate('/terms')
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`welcome-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="welcome-header-content">
          {/* Logo - Izquierda */}
          <div className="welcome-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img
              src="/logo.svg"
              alt="CineScope"
              style={{
                width: '160px',
                height: 'auto',
                transition: 'width 0.3s ease'
              }}
            />
          </div>

          {/* Acciones del header - Derecha */}
          <div className="welcome-header-actions">
            {/* Navegación principal - Desktop */}
            <nav className="welcome-main-nav desktop-nav">
              <button className="welcome-nav-button" onClick={handleTermsClick}>
                <FileText size={16} />
                <span>Términos</span>
              </button>
              <button className="welcome-nav-button" onClick={handlePrivacyClick}>
                <Shield size={16} />
                <span>Privacidad</span>
              </button>
              <button className="welcome-nav-button" onClick={handleHelpClick}>
                <HelpCircle size={16} />
                <span>Ayuda</span>
              </button>
            </nav>
            
            {/* Botón de Iniciar Sesión - Solo visible en desktop */}
            <button className="welcome-login-btn desktop-login-btn" onClick={onShowAuth}>
              Iniciar Sesión
            </button>
            
            {/* Botón hamburguesa para móvil */}
            <button className="welcome-mobile-menu-toggle" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={`welcome-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}>
          {/* Botón de cerrar */}
          <button className="welcome-mobile-close-btn" onClick={(e) => {
            e.stopPropagation();
            closeMobileMenu();
          }}>
            <X size={20} />
          </button>
          
          {/* Sección de navegación principal */}
          <div className="welcome-mobile-section" onClick={(e) => e.stopPropagation()}>
            <h3 className="welcome-mobile-section-title">Navegación</h3>
            <nav className="welcome-mobile-nav">
              <button
                className="welcome-mobile-nav-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTermsClick();
                }}
              >
                <FileText size={20} />
                <span>Términos</span>
              </button>
              <button
                className="welcome-mobile-nav-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrivacyClick();
                }}
              >
                <Shield size={20} />
                <span>Privacidad</span>
              </button>
              <button
                className="welcome-mobile-nav-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHelpClick();
                }}
              >
                <HelpCircle size={20} />
                <span>Ayuda</span>
              </button>
            </nav>
          </div>
          
          {/* Línea divisoria */}
          <div className="welcome-mobile-divider"></div>
          
          {/* Sección de acciones */}
          <div className="welcome-mobile-section">
            <h3 className="welcome-mobile-section-title">Acciones</h3>
            <div className="welcome-mobile-actions">
              <button
                className="welcome-mobile-login-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onShowAuth();
                }}
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default WelcomeHeader
