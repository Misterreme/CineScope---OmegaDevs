import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { movieService } from '../services/movieService'
import { listService } from '../services/listService'
import { favoritesService } from '../services/favoritesService'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

import MovieGrid from '../components/Movies/MovieGrid'
import HeroSection from '../components/Hero/HeroSection'
import MovieDetailsModal from '../components/UI/MovieDetailsModal'

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
  const [savedMovies, setSavedMovies] = useState([])
  const [userLists, setUserLists] = useState({ watchlist: [], watched: [] })
  const [loading, setLoading] = useState(false)
  const [categoryMovies, setCategoryMovies] = useState([])
  const [currentCategory, setCurrentCategory] = useState(null)
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState(null)


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
    console.log('=== LOADING INITIAL DATA ===')
    console.log('User ID:', user.id)
    console.log('Lists result:', listsResult)
    
    console.log('Watchlist count:', listsResult.watchlist?.length || 0)
    console.log('Watched count:', listsResult.watched?.length || 0)
    
    if (listsResult.success) {
      setUserLists(listsResult)
      console.log('User lists set successfully:', listsResult)
      console.log('State after setUserLists:', {

        watchlist: listsResult.watchlist,
        watched: listsResult.watched
      })

    } else {
      console.error('Failed to load user lists:', listsResult.error)
    }

    // Load popular movies for initial display
    const popularResult = await movieService.getPopularMovies()
    if (popularResult.success) {
      setPopularMovies(popularResult.movies)
      // Simular datos para las nuevas secciones
      setNewReleases(popularResult.movies.slice(0, 8))
      setRecommendedMovies(popularResult.movies.slice(0, 6))
      // Mostrar películas guardadas del usuario
      if (listsResult.success && listsResult.watchlist.length > 0) {
        setSavedMovies(listsResult.watchlist.slice(0, 4))
      } else {
        setSavedMovies([])
      }
    }

    setLoading(false)
  }



  const handleAddToList = async () => {
    // Refresh user lists when a movie is added/removed
    if (user) {
      console.log('=== REFRESHING USER LISTS ===')
      console.log('User ID:', user.id)
      console.log('Current userLists state:', userLists)
      
      const listsResult = await listService.getUserLists(user.id)
      console.log('Lists result from API:', listsResult)
      
      if (listsResult.success) {
        console.log('Setting new user lists:', listsResult)

        console.log('Watchlist in new result:', listsResult.watchlist)
        console.log('Watched in new result:', listsResult.watched)
        
        setUserLists(listsResult)
        
        // Verificar que el estado se actualizó
        setTimeout(() => {
          console.log('State after setUserLists (delayed):', userLists)
  
        }, 100)
      } else {
        console.error('Failed to get user lists:', listsResult.error)
      }
    }
  }

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId)
    setIsMovieModalOpen(true)
  }

  const handleCloseMovieModal = () => {
    setIsMovieModalOpen(false)
    setSelectedMovieId(null)
  }

  const handleCategoryClick = async (categoryId) => {
    console.log('=== CATEGORY CLICK ===')
    console.log('Category ID:', categoryId)
    console.log('Current activeTab:', activeTab)
    
    setCurrentCategory(categoryId)
    setLoading(true)
    
    try {
      console.log('Fetching movies for category:', categoryId)
      const result = await movieService.getMoviesByCategory(categoryId)
      console.log('Category result:', result)
      
      if (result.success) {
        console.log('Setting category movies:', result.movies)
        setCategoryMovies(result.movies)
        setActiveTab(categoryId)
        console.log('ActiveTab changed to:', categoryId)
      } else {
        console.error('Category fetch failed:', result.error)
        setCategoryMovies([])
        setActiveTab(categoryId)
      }
    } catch (error) {
      console.error('Error loading category movies:', error)
      setCategoryMovies([])
      setActiveTab(categoryId)
    } finally {
      setLoading(false)
      console.log('Category loading finished')
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
            onMovieClick={handleMovieClick}
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
            onMovieClick={handleMovieClick}
          />
        </section>

        {/* Mi Lista - Quiero Ver */}
        <section className="content-section-saved">
          <h2 className="section-title">Mi Lista - Quiero Ver</h2>
          {userLists.watchlist && userLists.watchlist.length > 0 ? (
            <MovieGrid
              onTabChange={setActiveTab}
              movies={userLists.watchlist.map(item => ({
                imdbID: item.imdb_id,
                Title: item.title,
                Year: item.year,
                Poster: item.poster
              }))}
              loading={loading}
              title=""
              onAddToList={handleAddToList}
              userLists={userLists}
              emptyMessage=""
              showFilters={false}
              showPagination={false}
              itemsPerPage={4}
              onMovieClick={handleMovieClick}
            />
          ) : (
            <div className="empty-saved">
              <p>No tienes películas en tu lista. ¡Explora y agrega algunas!</p>
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

      case 'saved': {
        const watchlistMovies = userLists.watchlist.map(item => ({
          imdbID: item.imdb_id,
          Title: item.title,
          Year: item.year,
          Poster: item.poster
        }))
        
        return (
          <div className="content-section">
            <h2 className="section-title page-title">Mi Lista - Quiero Ver</h2>
            {watchlistMovies.length > 0 ? (
              <MovieGrid
                onTabChange={setActiveTab}
                movies={watchlistMovies}
                loading={loading}
                title=""
                onAddToList={handleAddToList}
                userLists={userLists}
                emptyMessage=""
                showFilters={true}
                showPagination={true}
                itemsPerPage={12}
                onMovieClick={handleMovieClick}
              />
            ) : (
              <div className="empty-state">
                <p>No tienes películas en tu lista. ¡Explora y agrega algunas!</p>
              </div>
            )}
          </div>
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
          <div className="content-section">
            <h2 className="section-title page-title">Películas Vistas</h2>
            {watchedMovies.length > 0 ? (
              <MovieGrid
                onTabChange={setActiveTab}
                movies={watchedMovies}
                loading={loading}
                title=""
                onAddToList={handleAddToList}
                userLists={userLists}
                emptyMessage=""
                showFilters={true}
                showPagination={true}
                itemsPerPage={12}
                onMovieClick={handleMovieClick}
              />
            ) : (
              <div className="empty-state">
                <p>No has marcado ninguna película como vista. ¡Empieza a llevar tu registro!</p>
              </div>
            )}
          </div>
        )
      }

      case 'favorites': {
        const favorites = favoritesService.getFavorites();
        
        return (
          <div className="content-section">
            <h2 className="section-title page-title">Mis Favoritos</h2>
            {favorites.length > 0 ? (
              <MovieGrid
                onTabChange={setActiveTab}
                movies={favorites}
                loading={loading}
                title=""
                onAddToList={handleAddToList}
                userLists={userLists}
                emptyMessage=""
                showFilters={true}
                showPagination={true}
                itemsPerPage={12}
                onMovieClick={handleMovieClick}
              />
            ) : (
              <div className="empty-state">
                <p>No tienes películas en favoritos. ¡Explora y agrega algunas!</p>
              </div>
            )}
          </div>
        )
      }

      case 'movies':
        return (
          <MovieGrid
            onTabChange={setActiveTab}
            movies={popularMovies}
            loading={loading}
            title="Catálogo de Películas"
            onAddToList={handleAddToList}
            userLists={userLists}
            emptyMessage="Cargando catálogo de películas..."
            onMovieClick={handleMovieClick}
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
      case 'thriller': {
        const categoryName = categories.find(cat => cat.id === activeTab)?.name || 'Categoría'
        
        return (
          <div className="content-section">
            <h2 className="section-title">{categoryName}</h2>
            {categoryMovies.length > 0 ? (
              <MovieGrid
                onTabChange={setActiveTab}
                movies={categoryMovies}
                loading={loading}
                title={`Películas de ${categoryName}`}
                onAddToList={handleAddToList}
                userLists={userLists}
                emptyMessage=""
                showFilters={true}
                showPagination={true}
                itemsPerPage={12}
                onMovieClick={handleMovieClick}
              />
            ) : (
              <div className="empty-state">
                {loading ? (
                  <p>Cargando películas de {categoryName}...</p>
                ) : (
                  <p>No se encontraron películas en esta categoría.</p>
                )}
              </div>
            )}
          </div>
        )
      }
      
      default: {
        // Si no es un caso específico, verificar si es una categoría
        const category = categories.find(cat => cat.id === activeTab)
        if (category) {
          const categoryName = category.name
          return (
            <div className="content-section">
              <h2 className="section-title">{categoryName}</h2>
              {categoryMovies.length > 0 ? (
                <MovieGrid
                  movies={categoryMovies}
                  loading={loading}
                  title={`Películas de ${categoryName}`}
                  onAddToList={handleAddToList}
                  userLists={userLists}
                  emptyMessage=""
                  showFilters={true}
                  showPagination={true}
                  itemsPerPage={12}
                  onMovieClick={handleMovieClick}
                />
              ) : (
                <div className="empty-state">
                  {loading ? (
                    <p>Cargando películas de {categoryName}...</p>
                  ) : (
                    <p>No se encontraron películas en esta categoría.</p>
                  )}
                </div>
              )}
            </div>
          )
        }
        
        // Si no es una categoría, mostrar el contenido por defecto
        return renderHomeContent()
      }
    }
  }

  return (
    <div className="dashboard">
      <Header activeTab={activeTab} onTabChange={setActiveTab} onMovieClick={handleMovieClick} />
      
      <main className="main-content">
        <div className="content-section">
          {renderContent()}
        </div>
      </main>

      {/* Modal de detalles de película */}
      <MovieDetailsModal
        isOpen={isMovieModalOpen}
        onClose={handleCloseMovieModal}
        movieId={selectedMovieId}
      />

      <Footer />
    </div>
  )
}

export default Dashboard
