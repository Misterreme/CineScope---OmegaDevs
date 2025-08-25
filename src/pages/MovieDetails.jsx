import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext'
import { movieService } from '../services/movieService'
import { listService } from '../services/listService'
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  Clock, 
  Globe, 
  Award,
  Eye,
  Bookmark,
  Play,
  Share2,
  Download
} from 'lucide-react'
import './MovieDetails.css'

const MovieDetails = () => {
  const { imdbId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showMovieActionSuccess } = useNotification()

  
  console.log('🎬 MovieDetails component rendered with:', {
    imdbId,
    imdbIdType: typeof imdbId,
    user: !!user,
    location: window.location.pathname
  })
  
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userLists, setUserLists] = useState({ watched: [], watchlist: [] })
  const [actionLoading, setActionLoading] = useState(false)

  // Variables para el estado de las listas
  const isWatched = userLists.watched?.some(item => item.imdb_id === imdbId || item.imdbID === imdbId)
  const isSaved = userLists.watchlist?.some(item => item.imdb_id === imdbId || item.imdbID === imdbId)

  useEffect(() => {
    console.log('🔄 useEffect triggered with:', { imdbId, user: !!user })
    loadMovieDetails()
    if (user) {
      loadUserLists()
    }
  }, [imdbId, user])

  const loadMovieDetails = async () => {
    try {
      setLoading(true)
      console.log('🔍 Loading movie details for IMDb ID:', imdbId)
      
      // Validar que el ID de IMDB tenga el formato correcto
      if (!imdbId || typeof imdbId !== 'string') {
        setError('ID de película inválido')
        return
      }
      
      // Limpiar el ID de IMDB (remover espacios y caracteres extra)
      const cleanImdbId = imdbId.trim()
      console.log('🧹 Cleaned IMDb ID:', cleanImdbId)
      
      const result = await movieService.getMovieDetails(cleanImdbId)
      console.log('📡 API Response:', result)
      
      if (result.success) {
        setMovie(result.movie)
      } else {
        setError(result.error || 'No se pudo cargar la película')
      }
    } catch (error) {
      console.error('❌ Error loading movie details:', error)
      setError('Error al cargar los detalles de la película')
    } finally {
      setLoading(false)
    }
  }

  const loadUserLists = async () => {
    try {
      console.log('=== LOADING USER LISTS IN MOVIE DETAILS ===')
      console.log('User ID:', user.id)
      console.log('IMDB ID:', imdbId)
      
      const result = await listService.getUserLists(user.id)
      console.log('Result from getUserLists:', result)
      
      if (result.success) {
        console.log('Setting user lists:', result)
        console.log('Watchlist count:', result.watchlist?.length || 0)
        console.log('Watched count:', result.watched?.length || 0)
        
        setUserLists(result)
      } else {
        console.error('Failed to load user lists:', result.error)
      }
    } catch (error) {
      console.error('Error loading user lists:', error)
    }
  }

  const handleBack = () => {
    navigate(-1)
  }




  const handleAction = async (actionType) => {
    if (!user || actionLoading) return
    
    console.log('=== HANDLE ACTION IN MOVIE DETAILS ===')
    console.log('Action type:', actionType)
    console.log('User ID:', user.id)
    console.log('IMDB ID:', imdbId)
    console.log('Movie:', movie?.Title)
    console.log('Current states:', { isWatched, isSaved })
    
    setActionLoading(true)
    
    try {
      let result
      
      if (actionType === 'watched') {
        console.log('Handling watched action, current state:', isWatched)
        if (isWatched) {
          console.log('Removing from watched list')
          result = await listService.removeFromList(user.id, imdbId, 'watched')
          if (result?.success) {
            showMovieActionSuccess('watched', movie.Title, false)
          }
        } else {
          console.log('Adding to watched list')
          result = await listService.addToList(user.id, movie, 'watched')
          if (result?.success) {
            showMovieActionSuccess('watched', movie.Title, true)
          }
        }
      } else if (actionType === 'watchlist') {
        console.log('Handling watchlist action, current state:', isSaved)
        if (isSaved) {
          console.log('Removing from watchlist')
          result = await listService.removeFromList(user.id, imdbId, 'watchlist')
          if (result?.success) {
            showMovieActionSuccess('watchlist', movie.Title, false)
          }
        } else {
          console.log('Adding to watchlist')
          result = await listService.addToList(user.id, movie, 'watchlist')
          if (result?.success) {
            showMovieActionSuccess('watchlist', movie.Title, true)
          }
        }

      }
      
      console.log('Action result:', result)
      
      if (result?.success) {
        console.log('Action successful, reloading user lists')
        await loadUserLists()
      } else {
        console.error('Action failed:', result?.error)
      }
    } catch (error) {
      console.error('Error handling action:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const formatRuntime = (runtime) => {
    if (!runtime || runtime === 'N/A') return 'Duración no disponible'
    const minutes = parseInt(runtime)
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  const formatRating = (rating) => {
    if (!rating || rating === 'N/A') return 'Sin calificación'
    return `${rating}/10`
  }

  if (loading) {
    return (
      <div className="movie-details-page">
        <div className="movie-details-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando detalles de la película...</p>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="movie-details-page">
        <div className="movie-details-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
        </div>
        <div className="error-container">
          <p>Error: {error || 'No se pudo cargar la película'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="movie-details-page">
      {/* Header con botón de volver */}
      <div className="movie-details-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>
      </div>

      {/* Hero Section con poster y información principal */}
      <div className="movie-hero">
        <div className="movie-hero-content">
          <div className="movie-poster-large">
            <img 
              src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'} 
              alt={movie.Title}
              onError={(e) => {
                e.target.src = '/placeholder-movie.jpg'
              }}
            />
          </div>
          
          <div className="movie-hero-info">
            <h1 className="movie-title">{movie.Title}</h1>
            
            <div className="movie-meta">
              <div className="meta-item">
                <Calendar size={16} />
                <span>{movie.Year || 'Año no disponible'}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} />
                <span>{formatRuntime(movie.Runtime)}</span>
              </div>
              <div className="meta-item">
                <Star size={16} />
                <span>{formatRating(movie.imdbRating)}</span>
              </div>
              <div className="meta-item">
                <Globe size={16} />
                <span>{movie.Language || 'Idioma no disponible'}</span>
              </div>
            </div>

            <div className="movie-genres">
              {movie.Genre && movie.Genre.split(', ').map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>

            <div className="movie-plot">
              <p>{movie.Plot || 'Sinopsis no disponible'}</p>
            </div>

            {/* Enlaces de acción */}
            <div className="movie-actions">
              {/* Enlace de Marcar como Vista */}
              <a
                href="#"
                className="action-link"
                onClick={(e) => {
                  e.preventDefault()
                  if (!actionLoading) handleAction('watched')
                }}
                title={isWatched ? 'Quitar de vistas' : 'Marcar como vista'}
              >
                {isWatched ? 'Ya vista' : 'Marcar como vista'}
              </a>

              {/* Enlace de Guardar en Lista */}
              <a
                href="#"
                className="action-link"
                onClick={(e) => {
                  e.preventDefault()
                  if (!actionLoading) handleAction('watchlist')
                }}
                title={isSaved ? 'Quitar de guardados' : 'Guardar película'}
              >
                {isSaved ? 'Guardada' : 'Guardar'}
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Información detallada */}
      <div className="movie-details-content">
        <div className="details-grid">
          {/* Columna izquierda */}
          <div className="details-left">
            <div className="detail-section">
              <h3>Director</h3>
              <p>{movie.Director || 'No disponible'}</p>
            </div>

            <div className="detail-section">
              <h3>Reparto</h3>
              <p>{movie.Actors || 'No disponible'}</p>
            </div>

            <div className="detail-section">
              <h3>Género</h3>
              <div className="genre-list">
                {movie.Genre && movie.Genre.split(', ').map((genre, index) => (
                  <span key={index} className="genre-item">{genre}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>País</h3>
              <p>{movie.Country || 'No disponible'}</p>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="details-right">
            <div className="detail-section">
              <h3>Calificación IMDB</h3>
              <div className="rating-display">
                <Star size={24} className="rating-star" />
                <span className="rating-value">{movie.imdbRating || 'N/A'}</span>
                <span className="rating-max">/10</span>
              </div>
              <p className="rating-votes">({movie.imdbVotes || '0'} votos)</p>
            </div>

            <div className="detail-section">
              <h3>Premios</h3>
              <p>{movie.Awards || 'No disponible'}</p>
            </div>

            <div className="detail-section">
              <h3>Clasificación</h3>
              <p>{movie.Rated || 'No disponible'}</p>
            </div>

            <div className="detail-section">
              <h3>Fecha de lanzamiento</h3>
              <p>{movie.Released || 'No disponible'}</p>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        {movie.Writer && (
          <div className="detail-section full-width">
            <h3>Guionista</h3>
            <p>{movie.Writer}</p>
          </div>
        )}

        {movie.Production && (
          <div className="detail-section full-width">
            <h3>Producción</h3>
            <p>{movie.Production}</p>
          </div>
        )}

        {movie.Website && movie.Website !== 'N/A' && (
          <div className="detail-section full-width">
            <h3>Sitio web</h3>
            <a href={movie.Website} target="_blank" rel="noopener noreferrer" className="website-link">
              {movie.Website}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetails 
