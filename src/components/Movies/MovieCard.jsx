import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { listService } from '../../services/listService'
import { Eye, Star, Bookmark, Heart } from 'lucide-react'

const MovieCard = ({ movie, onAddToList, userLists = { watched: [], saved: [], favorites: [] } }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  console.log('=== MOVIE CARD RENDER ===')
  console.log('Movie:', movie.Title)
  console.log('UserLists received:', userLists)
  console.log('Favorites in userLists:', userLists.favorites)
  console.log('Saved in userLists:', userLists.saved)
  console.log('Watched in userLists:', userLists.watched)

  const isWatched = userLists.watched?.some(item => item.imdb_id === movie.imdbID)
  const isSaved = userLists.watchlist?.some(item => item.imdb_id === movie.imdbID)
  const isFavorite = userLists.favorites?.some(item => item.imdb_id === movie.imdbID)

  console.log('Movie states:', {
    isWatched,
    isSaved,
    isFavorite,
    movieId: movie.imdbID
  })

  const handleMarkAsWatched = async () => {
    if (!user || loading) return
    
    console.log('Marking as watched:', movie.Title, 'Current state:', isWatched)
    setLoading(true)
    
    try {
      if (isWatched) {
        // Remove from watched list
        console.log('Removing from watched list')
        const result = await listService.removeFromList(user.id, movie.imdbID, 'watched')
        console.log('Remove result:', result)
        if (result.success && onAddToList) {
          onAddToList()
        }
      } else {
        // Add to watched list
        console.log('Adding to watched list')
        const result = await listService.addToList(user.id, movie, 'watched')
        console.log('Add result:', result)
        if (result.success && onAddToList) {
          onAddToList()
        }
      }
    } catch (error) {
      console.error('Error in handleMarkAsWatched:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveMovie = async () => {
    if (!user || loading) return
    
    console.log('=== DEBUG SAVE MOVIE ===')
    console.log('User:', user)
    console.log('Movie:', movie)
    console.log('Current state:', isSaved)
    console.log('User ID:', user.id)
    console.log('Movie ID:', movie.imdbID)
    setLoading(true)
    
    try {
      if (isSaved) {
        // Remove from watchlist
        console.log('Removing from watchlist')
        const result = await listService.removeFromList(user.id, movie.imdbID, 'watchlist')
        console.log('Remove result:', result)
        if (result.success && onAddToList) {
          console.log('Calling onAddToList after remove')
          onAddToList()
        }
      } else {
        // Add to watchlist
        console.log('Adding to watchlist')
        const result = await listService.addToList(user.id, movie, 'watchlist')
        console.log('Add result:', result)
        if (result.success && onAddToList) {
          console.log('Calling onAddToList after add')
          onAddToList()
        }
      }
    } catch (error) {
      console.error('Error in handleSaveMovie:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToFavorites = async () => {
    if (!user || loading) return
    
    console.log('=== DEBUG FAVORITES ===')
    console.log('User:', user)
    console.log('Movie:', movie.Title)
    console.log('Current state:', isFavorite)
    console.log('User ID:', user.id)
    console.log('Movie ID:', movie.imdbID)
    console.log('UserLists received:', userLists)
    console.log('Favorites in userLists:', userLists.favorites)
    
    setLoading(true)
    
    try {
      if (isFavorite) {
        // Remove from favorites list
        console.log('Removing from favorites list')
        const result = await listService.removeFromList(user.id, movie.imdbID, 'favorites')
        console.log('Remove result:', result)
        if (result.success && onAddToList) {
          console.log('Calling onAddToList after remove')
          onAddToList()
        }
      } else {
        // Add to favorites list
        console.log('Adding to favorites list')
        const result = await listService.addToList(user.id, movie, 'favorites')
        console.log('Add result:', result)
        if (result.success && onAddToList) {
          console.log('Calling onAddToList after add')
          onAddToList()
        }
      }
    } catch (error) {
      console.error('Error in handleAddToFavorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : '/placeholder-movie.jpg'

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={posterUrl} 
          alt={movie.Title}
          onError={(e) => {
            e.target.src = '/placeholder-movie.jpg'
          }}
        />
        <div className="movie-overlay">
          <div className="movie-actions">
            <button
              className={`action-btn saved ${isSaved ? 'added' : ''}`}
              onClick={handleSaveMovie}
              disabled={loading}
              title={isSaved ? 'Quitar de guardados' : 'Guardar película'}
            >
              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <Bookmark size={16} />
              )}
            </button>

            <button
              className={`action-btn favorite ${isFavorite ? 'added' : ''}`}
              onClick={handleAddToFavorites}
              disabled={loading}
              title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <Heart size={16} />
              )}
            </button>
            
            <button
              className={`action-btn watched ${isWatched ? 'added' : ''}`}
              onClick={handleMarkAsWatched}
              disabled={loading}
              title={isWatched ? 'Quitar de vistas' : 'Marcar como vista'}
            >
              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.Year}</span>
          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <div className="movie-rating">
              <Star size={14} />
              <span>{movie.imdbRating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
