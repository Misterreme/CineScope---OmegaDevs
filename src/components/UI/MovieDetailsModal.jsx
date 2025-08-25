import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNotification } from '../../contexts/NotificationContext'
import { movieService } from '../../services/movieService'
import { listService } from '../../services/listService'
import { favoritesService } from '../../services/favoritesService'
import { 
  X,
  Star, 
  Calendar, 
  Clock, 
  Globe, 
  Award,
  Eye,
  Bookmark,
  Heart,
  Play,
  Share2,
  Download
} from 'lucide-react'
import './MovieDetailsModal.css'

const MovieDetailsModal = ({ isOpen, onClose, movieId, onStateChange }) => {
  const { user } = useAuth()
  const { showMovieActionSuccess } = useNotification()
  
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userLists, setUserLists] = useState({ watched: [], watchlist: [] })
  const [actionLoading, setActionLoading] = useState(false)

  // Estados para el estado de las listas
  const [isFavorite, setIsFavorite] = useState(false)
  const [isWatched, setIsWatched] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (isOpen && movieId) {
      loadMovieDetails()
      if (user) {
        loadUserLists()
      }
      // Actualizar estado de favoritos
      setIsFavorite(favoritesService.isFavorite(movieId))
    }
  }, [isOpen, movieId, user])

  // Actualizar estados de watched y saved cuando cambien las listas del usuario
  useEffect(() => {
    if (movieId && userLists) {
      console.log('🔄 Actualizando estados desde userLists:', { movieId, userLists })
      
      const watched = userLists.watched?.some(item => item.imdb_id === movieId || item.imdbID === movieId) || false
      const saved = userLists.watchlist?.some(item => item.imdb_id === movieId || item.imdbID === movieId) || false
      
      console.log('📊 Estados calculados:', { watched, saved })
      
      setIsWatched(watched)
      setIsSaved(saved)
    }
  }, [movieId, userLists])



  const loadMovieDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (!movieId) {
        setError('ID de película inválido')
        return
      }
      
      const cleanMovieId = movieId.trim()
      const result = await movieService.getMovieDetails(cleanMovieId)
      
      if (result.success) {
        setMovie(result.movie)
      } else {
        setError(result.error || 'No se pudo cargar la película')
      }
    } catch (error) {
      console.error('Error loading movie details:', error)
      setError('Error al cargar los detalles de la película')
    } finally {
      setLoading(false)
    }
  }

  const loadUserLists = async () => {
    try {
      console.log('🔄 loadUserLists iniciado para usuario:', user.id)
      const result = await listService.getUserLists(user.id)
      
      console.log('📋 Resultado de loadUserLists:', result)
      
      if (result.success) {
        console.log('✅ Listas cargadas exitosamente:', result)
        setUserLists(result)
      } else {
        console.error('❌ Failed to load user lists:', result.error)
      }
    } catch (error) {
      console.error('❌ Error loading user lists:', error)
    }
  }

  // FUNCIONES IDÉNTICAS A LAS DE MOVIECARD
  const handleMarkAsWatched = async () => {
    if (!user || actionLoading) return
    
    console.log('=== MODAL: Marking as watched ===')
    console.log('Movie:', movie.Title, 'Current state:', isWatched)
    setActionLoading(true)
    
    try {
      if (isWatched) {
        // Remove from watched list
        console.log('Removing from watched list')
        const result = await listService.removeFromList(user.id, movie.imdbID, 'watched')
        console.log('Remove result:', result)
        if (result.success) {
          showMovieActionSuccess('watched', movie.Title, false)
          setIsWatched(false)
          // Recargar listas para sincronizar
          await loadUserLists()
        }
      } else {
        // Add to watched list
        console.log('Adding to watched list')
        const result = await listService.addToList(user.id, movie, 'watched')
        console.log('Add result:', result)
        if (result.success) {
          showMovieActionSuccess('watched', movie.Title, true)
          setIsWatched(true)
          // Recargar listas para sincronizar
          await loadUserLists()
        }
      }
    } catch (error) {
      console.error('Error in handleMarkAsWatched:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const handleSaveMovie = async () => {
    if (!user || actionLoading) return
    
    console.log('=== MODAL: Save Movie ===')
    console.log('User:', user)
    console.log('Movie:', movie)
    console.log('Current state:', isSaved)
    console.log('User ID:', user.id)
    console.log('Movie ID:', movie.imdbID)
    setActionLoading(true)
    
    try {
      if (isSaved) {
        // Remove from watchlist
        console.log('Removing from watchlist')
        const result = await listService.removeFromList(user.id, movie.imdbID, 'watchlist')
        console.log('Remove result:', result)
        if (result.success) {
          showMovieActionSuccess('watchlist', movie.Title, false)
          setIsSaved(false)
          // Recargar listas para sincronizar
          await loadUserLists()
        }
      } else {
        // Add to watchlist
        console.log('Adding to watchlist')
        const result = await listService.addToList(user.id, movie, 'watchlist')
        console.log('Add result:', result)
        if (result.success) {
          showMovieActionSuccess('watchlist', movie.Title, true)
          setIsSaved(true)
          // Recargar listas para sincronizar
          await loadUserLists()
        }
      }
    } catch (error) {
      console.error('Error in handleSaveMovie:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const handleToggleFavorite = async () => {
    if (actionLoading) return
    
    setActionLoading(true)
    
    try {
      let result;
      
      if (isFavorite) {
        // Remover de favoritos
        result = favoritesService.removeFromFavorites(movie.imdbID);
      } else {
        // Agregar a favoritos
        result = favoritesService.addToFavorites(movie);
      }

      if (result.success) {
        setIsFavorite(!isFavorite);
        showMovieActionSuccess('favoritos', movie.Title, !isFavorite);
      }
    } catch (error) {
      console.error('Error al manejar favoritos:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const handleClose = () => {
    console.log('🔒 Cerrando modal, limpiando estados...')
    setMovie(null)
    setLoading(true)
    setError(null)
    setUserLists({ watched: [], watchlist: [] })
    setIsFavorite(false)
    setIsWatched(false)
    setIsSaved(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="movie-details-modal-overlay" onClick={handleClose}>
      <div className="movie-details-modal" onClick={(e) => e.stopPropagation()}>
        {/* Botón de cerrar */}
        <button className="modal-close-button" onClick={handleClose}>
          <X size={24} />
        </button>

        {loading ? (
          <div className="modal-loading">
            <div className="loading-spinner"></div>
            <p>Cargando detalles de la película...</p>
          </div>
        ) : error ? (
          <div className="modal-error">
            <p>{error}</p>
            <button onClick={handleClose} className="error-close-btn">Cerrar</button>
          </div>
        ) : movie ? (
          <div className="modal-content">
            {/* Hero Section */}
            <div className="modal-hero">
              <div className="modal-poster">
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'} 
                  alt={movie.Title}
                />
              </div>
              
              <div className="modal-hero-info">
                <h1 className="modal-movie-title">{movie.Title}</h1>
                
                <div className="modal-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{movie.Year}</span>
                  </div>
                  
                  {movie.Runtime && movie.Runtime !== 'N/A' && (
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>{movie.Runtime}</span>
                    </div>
                  )}
                  
                  {movie.Country && movie.Country !== 'N/A' && (
                    <div className="meta-item">
                      <Globe size={16} />
                      <span>{movie.Country}</span>
                    </div>
                  )}
                  
                  {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                    <div className="meta-item">
                      <Star size={16} />
                      <span>{movie.imdbRating}/10</span>
                    </div>
                  )}
                </div>

                {movie.Plot && (
                  <p className="modal-plot">{movie.Plot}</p>
                )}

                {/* Botones de acción */}
                <div className="modal-actions">
                                     <button
                     className={`action-button ${isWatched ? 'active' : ''}`}
                     onClick={(e) => {
                       e.stopPropagation()
                       if (!actionLoading) handleMarkAsWatched()
                     }}
                     disabled={actionLoading}
                     title={isWatched ? 'Quitar de vistas' : 'Marcar como vista'}
                   >
                     <Eye size={18} />
                     {isWatched ? 'Vista' : 'Marcar vista'}
                   </button>

                   <button
                     className={`action-button ${isSaved ? 'active' : ''}`}
                     onClick={(e) => {
                       e.stopPropagation()
                       if (!actionLoading) handleSaveMovie()
                     }}
                     disabled={actionLoading}
                     title={isSaved ? 'Quitar de guardados' : 'Guardar película'}
                   >
                     <Bookmark size={18} />
                     {isSaved ? 'Guardada' : 'Guardar'}
                   </button>

                   <button
                     className={`action-button ${isFavorite ? 'active' : ''}`}
                     onClick={(e) => {
                       e.stopPropagation()
                       if (!actionLoading) handleToggleFavorite()
                     }}
                     disabled={actionLoading}
                     title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                   >
                     <Heart size={18} />
                     {isFavorite ? 'Favorita' : 'Favorito'}
                   </button>
                </div>
              </div>
            </div>

            {/* Información detallada */}
            <div className="modal-details">
              <div className="details-grid">
                {/* Columna izquierda */}
                <div className="details-left">
                  {movie.Director && (
                    <div className="detail-section">
                      <h3>Director</h3>
                      <p>{movie.Director}</p>
                    </div>
                  )}

                  {movie.Actors && (
                    <div className="detail-section">
                      <h3>Reparto</h3>
                      <p>{movie.Actors}</p>
                    </div>
                  )}

                  {movie.Genre && (
                    <div className="detail-section">
                      <h3>Género</h3>
                      <div className="genre-list">
                        {movie.Genre.split(', ').map((genre, index) => (
                          <span key={index} className="genre-item">{genre}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {movie.Country && movie.Country !== 'N/A' && (
                    <div className="detail-section">
                      <h3>País</h3>
                      <p>{movie.Country}</p>
                    </div>
                  )}
                </div>

                {/* Columna derecha */}
                <div className="details-right">
                  {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                    <div className="detail-section">
                      <h3>Calificación IMDB</h3>
                      <div className="rating-display">
                        <Star size={20} className="rating-star" />
                        <span className="rating-value">{movie.imdbRating}</span>
                        <span className="rating-max">/10</span>
                      </div>
                      {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                        <p className="rating-votes">({movie.imdbVotes} votos)</p>
                      )}
                    </div>
                  )}

                  {movie.Awards && movie.Awards !== 'N/A' && (
                    <div className="detail-section">
                      <h3>Premios</h3>
                      <p>{movie.Awards}</p>
                    </div>
                  )}

                  {movie.Rated && movie.Rated !== 'N/A' && (
                    <div className="detail-section">
                      <h3>Clasificación</h3>
                      <p>{movie.Rated}</p>
                    </div>
                  )}

                  {movie.Released && movie.Released !== 'N/A' && (
                    <div className="detail-section">
                      <h3>Fecha de lanzamiento</h3>
                      <p>{movie.Released}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Información adicional */}
              {movie.Writer && movie.Writer !== 'N/A' && (
                <div className="detail-section full-width">
                  <h3>Guionista</h3>
                  <p>{movie.Writer}</p>
                </div>
              )}

              {movie.Production && movie.Production !== 'N/A' && (
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
        ) : null}
      </div>
    </div>
  )
}

export default MovieDetailsModal
