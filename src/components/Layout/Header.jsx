import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { User, LogOut, Film, Tv, BookOpen, Baby, Clock, Heart, Settings, HelpCircle, ChevronDown, Search, X } from 'lucide-react'

const Header = ({ activeTab, onTabChange }) => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

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
  }

  const handleHelpClick = () => {
    navigate('/help')
  }

  const handleSearchInputChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    // Filtrar películas según la consulta
    if (query.trim() === '') {
      setSearchResults([])
    } else {
      // Aquí implementarías la lógica de búsqueda real
      // Por ahora simulamos resultados
      const mockResults = [
        { id: 1, title: 'Avengers: Endgame', year: '2019', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=300&fit=crop&crop=center' },
        { id: 2, title: 'Spider-Man: No Way Home', year: '2021', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=300&fit=crop&crop=center' },
        { id: 3, title: 'Black Panther', year: '2018', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=300&fit=crop&crop=center' },
        { id: 4, title: 'Doctor Strange', year: '2016', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=300&fit=crop&crop=center' },
        { id: 5, title: 'Thor: Ragnarok', year: '2017', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=300&fit=crop&crop=center' },
        { id: 6, title: 'Captain Marvel', year: '2019', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=300&fit=crop&crop=center' },
        { id: 7, title: 'Iron Man', year: '2008', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=300&fit=crop&crop=center' },
        { id: 8, title: 'Guardians of the Galaxy', year: '2014', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=300&fit=crop&crop=center' }
      ].filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.year.includes(query)
      )
      setSearchResults(mockResults)
    }
  }

  const closeSearchModal = () => {
    setIsSearchModalOpen(false)
    setSearchQuery('')
    setSearchResults([])
  }

  const handleMovieClick = (movie) => {
    // Aquí puedes implementar la navegación a la página de la película
    console.log('Película seleccionada:', movie)
    closeSearchModal()
  }

  return (
    <>
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          {/* Logo */}
          <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img
              src="/logo.svg"
              alt="CineScope"
              style={{
                width: isSearchActive ? '160px' : '140px',
                height: 'auto',
                transition: 'width 0.3s ease'
              }}
            />
          </div>

          {/* Navegación principal */}
          <nav className="main-nav">
            <button
              className={`nav-button ${activeTab === 'movies' ? 'active' : ''}`}
              onClick={() => onTabChange('movies')}
            >
              <Film size={16} />
              <span>Películas</span>
            </button>
            <button
              className={`nav-button ${activeTab === 'series' ? 'active' : ''}`}
              onClick={() => onTabChange('series')}
            >
              <Tv size={16} />
              <span>Series</span>
            </button>
            <button
              className={`nav-button ${activeTab === 'documentaries' ? 'active' : ''}`}
              onClick={() => onTabChange('documentaries')}
            >
              <BookOpen size={16} />
              <span>Documentales</span>
            </button>
            <button
              className={`nav-button ${activeTab === 'kids' ? 'active' : ''}`}
              onClick={() => onTabChange('kids')}
            >
              <Baby size={16} />
              <span>Infantil</span>
            </button>
            <button
              className={`nav-button ${activeTab === 'continue' ? 'active' : ''}`}
              onClick={() => onTabChange('continue')}
            >
              <Clock size={16} />
              <span>Continuar viendo</span>
            </button>
          </nav>

          {/* Acciones del header */}
          <div className="header-actions">
            {/* Botón de búsqueda */}
            <button className="search-button" onClick={handleSearchClick}>
              <Search size={44} />
            </button>

            {/* Botón de guardados */}
            <button
              className={`saved-button ${activeTab === 'saved' ? 'active' : ''}`}
              onClick={() => onTabChange('saved')}
            >
              <Heart size={20} />
            </button>

            {/* Menú de usuario */}
            <div className="user-menu">
              <div className="user-avatar">
                <User size={24} />
                <ChevronDown size={16} className="chevron" />
              </div>

              <div className="user-dropdown">
                <div className="dropdown-header">
                  <span className="user-name">{user?.user_metadata?.full_name || user?.email}</span>
                </div>
                <div className="dropdown-item" onClick={() => onTabChange('saved')}>
                  <Heart size={16} />
                  <span>Favoritos</span>
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
          </div>
        </div>
      </header>

      {/* Modal de búsqueda */}
      {isSearchModalOpen && (
        <div className="search-modal-overlay" onClick={closeSearchModal}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <div className="search-input-container">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar películas, series, actores..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="search-modal-input"
                  autoFocus
                />
              </div>
              <button className="close-search-btn" onClick={closeSearchModal}>
                <X size={24} />
              </button>
            </div>
            
            <div className="search-results-container">
              {searchQuery.trim() === '' ? (
                <div className="search-placeholder">
                  <Search size={48} />
                  <h3>Busca tu contenido favorito</h3>
                  <p>Escribe para encontrar películas, series y más</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="search-results-grid">
                  {searchResults.map((movie) => (
                    <div 
                      key={movie.id} 
                      className="search-result-card"
                      onClick={() => handleMovieClick(movie)}
                    >
                      <div className="search-result-poster">
                        <img src={movie.poster} alt={movie.title} />
                      </div>
                      <div className="search-result-info">
                        <h4>{movie.title}</h4>
                        <p>{movie.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="search-no-results">
                  <p>No se encontraron resultados para "{searchQuery}"</p>
                  <p>Intenta con otros términos de búsqueda</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
