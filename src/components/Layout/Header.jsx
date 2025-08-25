import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { movieService } from '../../services/movieService'
import { User, LogOut, Film, Tv, BookOpen, Baby, Clock, Heart, Settings, HelpCircle, ChevronDown, Search, X, Menu, ZoomIn, Bookmark, Home, List, Eye } from 'lucide-react'
import './Header.css'

const Header = ({ activeTab, onTabChange }) => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
  }

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive)
    setIsSearchModalOpen(true)
  }

  const handleLogoClick = () => {
    onTabChange('home')
    setIsMobileMenuOpen(false)
  }

  const handleHelpClick = () => {
    navigate('/help')
    setIsMobileMenuOpen(false)
  }

  const handleTabChange = (tab) => {
    onTabChange(tab)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleSearchInputChange = async (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    // Limpiar timeout anterior
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    
    // Filtrar películas según la consulta
    if (query.trim() === '') {
      setSearchResults([])
      setIsSearchLoading(false)
    } else {
      // Debounce: esperar 500ms después de que el usuario deje de escribir
      const timeout = setTimeout(async () => {
        setIsSearchLoading(true)
        try {
          console.log('Searching for:', query)
          const result = await movieService.searchMovies(query, 1)
          
          if (result.success) {
            console.log('Search results:', result.movies)
            setSearchResults(result.movies)
          } else {
            console.error('Search failed:', result.error)
            setSearchResults([])
          }
        } catch (error) {
          console.error('Error during search:', error)
          setSearchResults([])
        } finally {
          setIsSearchLoading(false)
        }
      }, 500)
      
      setSearchTimeout(timeout)
    }
  }

  const closeSearchModal = () => {
    setIsSearchModalOpen(false)
    setSearchQuery('')
    setSearchResults([])
    setIsSearchLoading(false)
    
    // Limpiar timeout si existe
    if (searchTimeout) {
      clearTimeout(searchTimeout)
      setSearchTimeout(null)
    }
  }

  const handleMovieClick = (movie) => {
    console.log('Película seleccionada:', movie)
    // Navegar a la página de detalles de la película
    navigate(`/movie/${movie.imdbID}`)
    closeSearchModal()
  }

  return (
    <>
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          {/* Logo - Izquierda */}
          <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img
              src="/logo.svg"
              alt="CineScope"
              style={{
                width: isSearchActive ? '180px' : '160px',
                height: 'auto',
                transition: 'width 0.3s ease'
              }}
            />
          </div>

          {/* Acciones del header - Derecha */}
          <div className="header-actions">
            {/* Navegación principal */}
            <nav className="main-nav desktop-nav">
              <button
                className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleTabChange('home')}
              >
                <Home size={16} />
                <span>Inicio</span>
              </button>
              
              <button
                className={`nav-button ${activeTab === 'saved' ? 'active' : ''}`}
                onClick={() => handleTabChange('saved')}
              >
                <Bookmark size={16} />
                <span>Mi Lista</span>
              </button>
              
              <button
                className={`nav-button ${activeTab === 'watched' ? 'active' : ''}`}
                onClick={() => handleTabChange('watched')}
              >
                <Eye size={16} />
                <span>Visto</span>
              </button>
            </nav>

            {/* Botón de búsqueda */}
            <button className="search-button" onClick={handleSearchClick}>
              <img 
                src="/search-icon.svg" 
                alt="Buscar" 
                className="search-icon-img"
              />
            </button>

            {/* Botón de favoritos - Solo visible en desktop */}
            <button
              className={`favorites-button desktop-favorites ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => handleTabChange('favorites')}
            >
              <Heart size={20} />
            </button>

            {/* Menú de usuario - Solo visible en desktop */}
            <div className="user-menu desktop-user-menu">
              <div className="user-avatar">
                <User size={24} />
                <ChevronDown size={16} className="chevron" />
              </div>

              <div className="user-dropdown">
                <div className="dropdown-header">
                  <span className="user-name">{user?.user_metadata?.full_name || user?.email}</span>
                </div>
                <div className="dropdown-item">
                  <Settings size={16} />
                  <span>Ajustes</span>
                </div>
                <div className="dropdown-item">
                  <User size={16} />
                  <span>Cuenta</span>
                </div>
                <div className="dropdown-item" onClick={handleHelpClick}>
                  <HelpCircle size={16} />
                  <span>Ayuda</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={handleSignOut}>
                  <LogOut size={16} />
                  <span>Cerrar sesión</span>
                </div>
              </div>
            </div>

            {/* Botón hamburguesa para móvil */}
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}>
          {/* Botón de cerrar */}
          <button className="mobile-close-btn" onClick={(e) => {
            e.stopPropagation();
            closeMobileMenu();
          }}>
            <X size={20} />
          </button>
          
          {/* Sección de navegación principal */}
          <div className="mobile-section" onClick={(e) => e.stopPropagation()}>
            <h3 className="mobile-section-title">Navegación</h3>
            {/* Navegación móvil */}
            <div className="mobile-nav">
              <button
                className={`mobile-nav-button ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => {
                  handleTabChange('home');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Home size={20} />
                <span>Inicio</span>
              </button>
              
              <button
                className={`mobile-nav-button ${activeTab === 'saved' ? 'active' : ''}`}
                onClick={() => {
                  handleTabChange('saved');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Bookmark size={20} />
                <span>Mi Lista</span>
              </button>
              
              <button
                className={`mobile-nav-button ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => {
                  handleTabChange('favorites');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Heart size={20} />
                <span>Favoritos</span>
              </button>
              
              <button
                className={`mobile-nav-button ${activeTab === 'watched' ? 'active' : ''}`}
                onClick={() => {
                  handleTabChange('watched');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Eye size={20} />
                <span>Visto</span>
              </button>
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="mobile-divider"></div>

          {/* Sección de usuario */}
          <div className="mobile-section">
            <h3 className="mobile-section-title">Usuario</h3>
            <div className="mobile-user-info">
              <div className="mobile-user-avatar">
                <User size={24} />
              </div>
              <span className="mobile-user-name">{user?.user_metadata?.full_name || user?.email}</span>
            </div>
            <div className="mobile-actions">
              <button className="mobile-help-btn" onClick={(e) => {
                e.stopPropagation();
                handleHelpClick();
              }}>
                <HelpCircle size={20} />
                <span>Ayuda</span>
              </button>
              <button className="mobile-settings-btn" onClick={(e) => e.stopPropagation()}>
                <Settings size={20} />
                <span>Ajustes</span>
              </button>
              <button className="mobile-account-btn" onClick={(e) => e.stopPropagation()}>
                <User size={20} />
                <span>Cuenta</span>
              </button>
              <button className="mobile-logout-btn" onClick={(e) => {
                e.stopPropagation();
                handleSignOut();
              }}>
                <LogOut size={20} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal de búsqueda con backdrop */}
      {isSearchModalOpen && (
        <div className="search-modal-overlay" onClick={closeSearchModal}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-content">
              <div className="search-input-container">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar películas..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  autoFocus
                  className="search-modal-input"
                />
                <button onClick={closeSearchModal} className="close-search">
                  <X size={20} />
                </button>
              </div>

              <div className="search-results-container">
                {isSearchLoading ? (
                  <div className="search-loading">
                    <div className="loading-spinner"></div>
                    <p>Buscando películas...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="search-results">
                    <h3>Resultados de búsqueda</h3>
                    <div className="search-results-grid">
                      {searchResults.map((movie) => (
                        <div 
                          key={movie.imdbID} 
                          className="search-result-item"
                          onClick={() => handleMovieClick(movie)}
                        >
                          <img 
                            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'} 
                            alt={movie.Title}
                            className="search-result-poster"
                          />
                          <div className="search-result-info">
                            <h4>{movie.Title}</h4>
                            <p>{movie.Year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : searchQuery ? (
                  <div className="no-results">
                    <p>No se encontraron películas para "{searchQuery}"</p>
                  </div>
                ) : (
                  <div className="search-placeholder">
                    <Search size={48} className="search-placeholder-icon" />
                    <p>Busca tus películas favoritas</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
