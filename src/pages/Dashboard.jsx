import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { movieService } from '../services/movieService'
import { listService } from '../services/listService'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

import MovieGrid from '../components/Movies/MovieGrid'
import HeroSection from '../components/Hero/HeroSection'
import {
  ActionIcon,
  ComedyIcon,
  SciFiIcon,
  RomanceIcon,
  HorrorIcon,
  DramaIcon,
  FantasyIcon,
  MysteryIcon,
  AdventureIcon,
  ThrillerIcon
} from '../components/Icons/CategoryIcons'

const Dashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('home')
  const [searchResults, setSearchResults] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [newReleases, setNewReleases] = useState([])
  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [continueWatching, setContinueWatching] = useState([])
  const [userLists, setUserLists] = useState({ watchlist: [], watched: [] })
  const [loading, setLoading] = useState(false)
  const [categoryMovies, setCategoryMovies] = useState([])
  const [currentCategory, setCurrentCategory] = useState(null)


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
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    },
    {
      id: 'adventure',
      name: 'Aventura',
      icon: AdventureIcon,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    },
    {
      id: 'thriller',
      name: 'Suspenso',
      icon: ThrillerIcon,
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop&crop=center',
      overlay: 'linear-gradient(135deg, #156064 0%, #37123C 100%)'
    }
  ]

  useEffect(() => {
    loadInitialData()
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadInitialData = async () => {
    if (!user) return

    setLoading(true)
    
    // Load user lists
    const listsResult = await listService.getUserLists(user.id)
    if (listsResult.success) {
      setUserLists(listsResult)
    }

    // Load popular movies for initial display
    const popularResult = await movieService.getPopularMovies()
    if (popularResult.success) {
      setPopularMovies(popularResult.movies)
      // Simular datos para las nuevas secciones
      setNewReleases(popularResult.movies.slice(0, 8))
      setRecommendedMovies(popularResult.movies.slice(0, 6))
      setContinueWatching(popularResult.movies.slice(0, 4))
    }

    setLoading(false)
  }



  const handleAddToList = () => {
    // Refresh user lists when a movie is added/removed
    loadInitialData()
  }

  const handleCategoryClick = async (categoryId) => {
    setCurrentCategory(categoryId)
    setLoading(true)
    
    try {
      const result = await movieService.getMoviesByCategory(categoryId)
      if (result.success) {
        setCategoryMovies(result.movies)
        setActiveTab(categoryId)
      } else {
        setCategoryMovies([])
        setActiveTab(categoryId)
      }
    } catch (error) {
      console.error('Error loading category movies:', error)
      setCategoryMovies([])
      setActiveTab(categoryId)
    } finally {
      setLoading(false)
    }
  }

  const renderHomeContent = () => {
    return (
      <>
        <HeroSection />
        
        {/* Lo Nuevo */}
        <section className="content-section-new">
          <h2 className="section-title">Lo Nuevo</h2>
          <MovieGrid
            movies={newReleases}
            loading={loading}
            title=""
            onAddToList={handleAddToList}
            userLists={userLists}
            emptyMessage="Cargando novedades..."
            showFilters={false}
            showPagination={false}
            itemsPerPage={8}
          />
        </section>

        {/* Recomendado */}
        <section className="content-section-recommended">
          <h2 className="section-title">Recomendado para ti</h2>
          <MovieGrid
            movies={recommendedMovies}
            loading={loading}
            title=""
            onAddToList={handleAddToList}
            userLists={userLists}
            emptyMessage="Cargando recomendaciones..."
            showFilters={false}
            showPagination={false}
            itemsPerPage={6}
          />
        </section>

        {/* Continuar Viendo */}
        <section className="content-section-continue">
          <h2 className="section-title">Continuar viendo</h2>
          {continueWatching.length > 0 ? (
            <MovieGrid
              movies={continueWatching}
              loading={loading}
              title=""
              onAddToList={handleAddToList}
              userLists={userLists}
              emptyMessage=""
              showFilters={false}
              showPagination={false}
              itemsPerPage={4}
            />
          ) : (
            <div className="empty-continue">
              <p>No tienes contenido en progreso. ¡Empieza a ver algo!</p>
            </div>
          )}
        </section>

        {/* Explorar por Categoría */}
        <section className="content-section-categories">
          <h2 className="section-title">Explorar por categoría</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-background">
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay" style={{ background: category.overlay }}></div>
                </div>
                                 <div className="category-content">
                   <div className="category-icon">
                     <category.icon size={64} color="#FCA311" />
                   </div>
                   <h3>{category.name}</h3>
                   <button 
                     className="category-btn"
                     onClick={() => handleCategoryClick(category.id)}
                   >
                     Explorar
                   </button>
                 </div>
              </div>
            ))}
          </div>
        </section>
             </>
     )
   }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent()

      case 'watchlist': {
        const watchlistMovies = userLists.watchlist.map(item => ({
          imdbID: item.imdb_id,
          Title: item.title,
          Year: item.year,
          Poster: item.poster
        }))
        return (
          <MovieGrid
            movies={watchlistMovies}
            loading={loading}
            title="Quiero Ver"
            onAddToList={handleAddToList}
            userLists={userLists}
            emptyMessage="No tienes películas en tu lista 'Quiero Ver'. ¡Explora y agrega algunas!"
          />
        )
      }

      case 'watched': {
        const watchedMovies = userLists.watched.map(item => ({
          imdbID: item.imdb_id,
          Title: item.title,
          Year: item.year,
          Poster: item.poster
        }))
        return (
          <MovieGrid
            movies={watchedMovies}
            loading={loading}
            title="Ya Vistas"
            onAddToList={handleAddToList}
            userLists={userLists}
            emptyMessage="No has marcado ninguna película como vista. ¡Empieza a llevar tu registro!"
          />
        )
      }

      case 'movies':
        return (
          <MovieGrid
            movies={popularMovies}
            loading={loading}
            title="Catálogo de Películas"
            onAddToList={handleAddToList}
            userLists={userLists}
            emptyMessage="Cargando catálogo de películas..."
          />
        )

      case 'series':
        return (
          <div className="coming-soon-section">
            <div className="coming-soon-content">
              <div className="coming-soon-icon">📺</div>
              <h2 className="coming-soon-title">Series - Próximamente</h2>
              <p className="coming-soon-description">
                Estamos preparando una increíble colección de series para ti. 
                Muy pronto podrás disfrutar de temporadas completas, episodios exclusivos 
                y las mejores producciones televisivas.
              </p>
              <div className="coming-soon-features">
                <div className="feature-item">
                  <span className="feature-icon">🎬</span>
                  <span>Series completas</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📱</span>
                  <span>Disponible en todos los dispositivos</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⭐</span>
                  <span>Contenido exclusivo</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'documentaries':
        return (
          <div className="coming-soon-section">
            <div className="coming-soon-content">
              <div className="coming-soon-icon">🎥</div>
              <h2 className="coming-soon-title">Documentales - Próximamente</h2>
              <p className="coming-soon-description">
                Prepárate para explorar el mundo a través de documentales fascinantes. 
                Desde naturaleza y ciencia hasta historia y cultura, tendremos contenido 
                educativo y entretenido para toda la familia.
              </p>
              <div className="coming-soon-features">
                <div className="feature-item">
                  <span className="feature-icon">🌍</span>
                  <span>Mundo natural</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔬</span>
                  <span>Ciencia y tecnología</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📚</span>
                  <span>Historia y cultura</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'kids':
        return (
          <div className="coming-soon-section">
            <div className="coming-soon-content">
              <div className="coming-soon-icon">🧸</div>
              <h2 className="coming-soon-title">Contenido Infantil - Próximamente</h2>
              <p className="coming-soon-description">
                Los más pequeños de la casa tendrán su propio espacio en CineScope. 
                Contenido educativo, divertido y seguro para niños de todas las edades, 
                con series animadas y películas familiares.
              </p>
              <div className="coming-soon-features">
                <div className="feature-item">
                  <span className="feature-icon">🎨</span>
                  <span>Animación de calidad</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📚</span>
                  <span>Contenido educativo</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🛡️</span>
                  <span>100% seguro para niños</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'continue':
        return (
          <MovieGrid
            movies={popularMovies}
            loading={loading}
            title="Continuar Viendo"
            onAddToList={handleAddToList}
            userLists={userLists}
            emptyMessage="No tienes contenido en progreso. ¡Empieza a ver algo!"
          />
        )

      case 'saved':
        return (
          <MovieGrid
            movies={popularMovies}
            loading={loading}
            title="Contenido Guardado"
            onAddToList={handleAddToList}
            userLists={userLists}
            emptyMessage="No tienes contenido guardado. ¡Guarda tus favoritos!"
          />
        )

      // Casos para categorías
      case 'action':
      case 'comedy':
      case 'sci-fi':
      case 'romance':
      case 'horror':
      case 'drama':
      case 'fantasy':
      case 'mystery':
      case 'adventure':
      case 'thriller':
        const categoryName = categories.find(cat => cat.id === activeTab)?.name || 'Categoría'
        return (
          <MovieGrid
            movies={categoryMovies}
            loading={loading}
            title={`${categoryName} - Películas`}
            onAddToList={handleAddToList}
            userLists={userLists}
            emptyMessage={`No se encontraron películas de ${categoryName.toLowerCase()}. ¡Intenta con otra categoría!`}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="dashboard">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="main-content">
        <div className="content-section">
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
