import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import WelcomeHeader from './WelcomeHeader'
import HeroSection from '../Hero/HeroSection'
import Footer from '../Layout/Footer'
import LoginForm from '../Auth/LoginForm'
import RegisterForm from '../Auth/RegisterForm'
import { ActionIcon, ComedyIcon, SciFiIcon, RomanceIcon, HorrorIcon, DramaIcon, FantasyIcon, MysteryIcon, AdventureIcon, ThrillerIcon } from '../Icons/CategoryIcons'
import './WelcomePage.css'

const WelcomePage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { user } = useAuth()

  const handleShowAuth = () => {
    // Scroll suave a la sección de autenticación
    const authSection = document.querySelector('.auth-section')
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Categorías para explorar
  const categories = [
    {
      id: 'action',
      name: 'Acción',
      icon: ActionIcon,
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    },
    {
      id: 'comedy',
      name: 'Comedia',
      icon: ComedyIcon,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    },
    {
      id: 'sci-fi',
      name: 'Ciencia Ficción',
      icon: SciFiIcon,
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=400&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    },
    {
      id: 'romance',
      name: 'Romance',
      icon: RomanceIcon,
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    },
    {
      id: 'horror',
      name: 'Terror',
      icon: HorrorIcon,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    },
    {
      id: 'drama',
      name: 'Drama',
      icon: DramaIcon,
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    },
    {
      id: 'fantasy',
      name: 'Fantasía',
      icon: FantasyIcon,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    },
    {
      id: 'mystery',
      name: 'Misterio',
      icon: MysteryIcon,
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    },
    {
      id: 'adventure',
      name: 'Aventura',
      icon: AdventureIcon,
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    },
    {
      id: 'thriller',
      name: 'Suspenso',
      icon: ThrillerIcon,
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    }
  ]

  // Si el usuario ya está autenticado, redirigir al dashboard
  if (user) {
    return null // El App.jsx se encargará de la redirección
  }

  return (
    <div className="welcome-page">
      {/* Header adaptado para usuarios no autenticados */}
      <WelcomeHeader onShowAuth={handleShowAuth} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Sección de categorías */}
      <section className="welcome-categories-section">
        <div className="welcome-categories-container">
          <div className="welcome-categories-header">
            <h2 className="welcome-categories-title">Explora por categoría</h2>
            <p className="welcome-categories-subtitle">
              Descubre contenido increíble organizado por géneros. Inicia sesión para acceder a todo el catálogo.
            </p>
          </div>
          
          <div className="welcome-categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="welcome-category-card">
                <div className="welcome-category-background">
                  <img src={category.image} alt={category.name} />
                  <div className="welcome-category-overlay" style={{ background: category.overlay }}></div>
                </div>
                <div className="welcome-category-content">
                  <div className="welcome-category-icon">
                    <category.icon size={48} color="#FCA311" />
                  </div>
                  <h3>{category.name}</h3>
                  <button 
                    className="welcome-category-btn"
                    onClick={() => {
                      setIsLogin(true);
                      handleShowAuth();
                    }}
                  >
                    Inicia sesión para explorar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sección de autenticación */}
      <section className="auth-section">
        <div className="auth-section-container">
          <div className="auth-section-content">
            <div className="auth-section-header">
              <h2 className="auth-section-title">
                {isLogin ? 'Bienvenid@' : 'Únete a CineScope'}
              </h2>
              <p className="auth-section-subtitle">
                {isLogin 
                  ? 'Accede a tu cuenta para continuar explorando el universo del cine'
                  : 'Crea tu cuenta y descubre un mundo de películas increíbles'
                }
              </p>
            </div>
            
            <div className="auth-form-container">
              {isLogin ? (
                <LoginForm onToggleForm={() => setIsLogin(false)} />
              ) : (
                <RegisterForm onToggleForm={() => setIsLogin(true)} />
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default WelcomePage
