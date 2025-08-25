import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useNotification } from '../../contexts/NotificationContext'
import { listService } from '../../services/listService'
import { Eye, Star, Bookmark } from 'lucide-react'

const MovieCard = ({ movie, onAddToList, onTabChange, userLists = { watched: [], watchlist: [] } }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showMovieActionSuccess } = useNotification()
  const [loading, setLoading] = useState(false)

  console.log('=== MOVIE CARD RENDER ===')
  console.log('Movie:', movie.Title)
  console.log('UserLists received:', userLists)
  console.log('Watchlist in userLists:', userLists.watchlist)
  console.log('Watched in userLists:', userLists.watched)

  const isWatched = userLists.watched?.some(item => item.imdb_id === movie.imdbID || item.imdbID === movie.imdbID)
  const isSaved = userLists.watchlist?.some(item => item.imdb_id === movie.imdbID || item.imdbID === movie.imdbID)

  console.log('Movie states:', {
    movieId: movie.imdbID,
    isWatched,
    isSaved,
    watchlist: userLists.watchlist,
    watched: userLists.watched
  })

  console.log('Movie states:', {
    isWatched,
    isSaved,
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
        if (result.success) {
          showMovieActionSuccess('watched', movie.Title, false)
          if (onAddToList) {
            onAddToList()
          }
        }
      } else {
        // Add to watched list
        console.log('Adding to watched list')
        const result = await listService.addToList(user.id, movie, 'watched')
        console.log('Add result:', result)
        if (result.success) {
          showMovieActionSuccess('watched', movie.Title, true)
          if (onAddToList) {
            onAddToList()
          }
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
        if (result.success) {
          showMovieActionSuccess('watchlist', movie.Title, false)
          if (onAddToList) {
            console.log('Calling onAddToList after remove')
            onAddToList()
          }
        }
      } else {
        // Add to watchlist
        console.log('Adding to watchlist')
        const result = await listService.addToList(user.id, movie, 'watchlist')
        console.log('Add result:', result)
        if (result.success) {
          showMovieActionSuccess('watchlist', movie.Title, true)
          if (onAddToList) {
            console.log('Calling onAddToList after add')
            onAddToList()
          }
        }
      }
    } catch (error) {
      console.error('Error in handleSaveMovie:', error)
    } finally {
      setLoading(false)
    }
  }




  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : '/placeholder-movie.jpg'

  const handleCardClick = () => {
    console.log('🎬 MovieCard clicked:', {
      title: movie.Title,
      imdbID: movie.imdbID,
      type: typeof movie.imdbID,
      year: movie.Year
    })
    
    if (!movie.imdbID) {
      console.error('❌ No IMDb ID found for movie:', movie)
      return
    }
    
    navigate(`/movie/${movie.imdbID}`)
  }

  return (
    <div 
      className="movie-card" 
      style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
      onClick={handleCardClick}
    >
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
              onClick={(e) => {
                e.stopPropagation();
                handleSaveMovie();
              }}
              disabled={loading}
              title={isSaved ? 'Quitar de guardados' : 'Guardar película'}
            >
              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
              )}
            </button>

            <button
              className={`action-btn watched ${isWatched ? 'added' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsWatched();
              }}
              disabled={loading}
              title={isWatched ? 'Quitar de vistas' : 'Marcar como vista'}
            >
              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <Eye size={16} fill={isWatched ? 'currentColor' : 'none'} />
              )}
            </button>


          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title" style={{ color: 'var(--color-text)' }}>{movie.Title}</h3>
        <div className="movie-meta" style={{ color: 'var(--color-text-secondary, #666)' }}>
          <span className="movie-year">{movie.Year}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
