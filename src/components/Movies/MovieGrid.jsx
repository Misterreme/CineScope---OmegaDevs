import React from 'react'
import MovieCard from './MovieCard'

const MovieGrid = ({ movies, loading, title, onAddToList, userLists, emptyMessage }) => {
  if (loading) {
    return (
      <div className="movie-grid-container">
        <h2>{title}</h2>
        <div className="loading-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="movie-card-skeleton">
              <div className="skeleton-poster"></div>
              <div className="skeleton-info">
                <div className="skeleton-title"></div>
                <div className="skeleton-year"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-grid-container">
        <h2>{title}</h2>
        <div className="empty-state">
          <p>{emptyMessage || 'No se encontraron películas'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="movie-grid-container">
      <h2>{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onAddToList={onAddToList}
            userLists={userLists}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieGrid
