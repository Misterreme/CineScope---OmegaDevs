import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { listService } from '../../services/listService'
import { Plus, Check, Eye, Star } from 'lucide-react'

const MovieCard = ({ movie, onAddToList, userLists = { watchlist: [], watched: [] } }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const isInWatchlist = userLists.watchlist?.some(item => item.imdb_id === movie.imdbID)
  const isWatched = userLists.watched?.some(item => item.imdb_id === movie.imdbID)

  const handleAddToWatchlist = async () => {
    if (!user || loading) return
    
    setLoading(true)
    const result = await listService.addToList(user.id, movie, 'watchlist')
    
    if (result.success && onAddToList) {
      onAddToList()
    }
    
    setLoading(false)
  }

  const handleMarkAsWatched = async () => {
    if (!user || loading) return
    
    setLoading(true)
    const result = await listService.addToList(user.id, movie, 'watched')
    
    if (result.success && onAddToList) {
      onAddToList()
    }
    
    setLoading(false)
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
            {!isWatched && (
              <button
                className={`action-btn ${isInWatchlist ? 'added' : ''}`}
                onClick={handleAddToWatchlist}
                disabled={loading}
                title={isInWatchlist ? 'En tu lista' : 'Agregar a lista'}
              >
                {isInWatchlist ? <Check size={16} /> : <Plus size={16} />}
              </button>
            )}
            
            <button
              className={`action-btn watched ${isWatched ? 'added' : ''}`}
              onClick={handleMarkAsWatched}
              disabled={loading}
              title={isWatched ? 'Ya vista' : 'Marcar como vista'}
            >
              <Eye size={16} />
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
