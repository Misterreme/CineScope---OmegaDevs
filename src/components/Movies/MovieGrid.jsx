import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import AdvancedFilters from './AdvancedFilters'
import Pagination from './Pagination'
import Breadcrumbs from '../Layout/Breadcrumbs'

const MovieGrid = ({ 
  movies, 
  loading, 
  title, 
  onAddToList, 
  userLists, 
  emptyMessage,
  showFilters = true,
  showPagination = true,
  itemsPerPage = 12
}) => {
  const [filteredMovies, setFilteredMovies] = useState(movies || [])
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  useEffect(() => {
    setFilteredMovies(movies || [])
    setCurrentPage(1)
  }, [movies])

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    
    // Aplicar filtros
    let filtered = movies || []
    
    if (newFilters.genre) {
      filtered = filtered.filter(movie => 
        movie.Genre && movie.Genre.includes(newFilters.genre)
      )
    }
    
    if (newFilters.year) {
      filtered = filtered.filter(movie => 
        movie.Year && movie.Year.toString() === newFilters.year.toString()
      )
    }
    
    if (newFilters.rating) {
      const minRating = parseInt(newFilters.rating)
      filtered = filtered.filter(movie => 
        movie.imdbRating && parseFloat(movie.imdbRating) >= minRating
      )
    }
    
    // Ordenar
    switch (newFilters.sortBy) {
      case 'rating':
        filtered = [...filtered].sort((a, b) => 
          (b.imdbRating || 0) - (a.imdbRating || 0)
        )
        break
      case 'year':
        filtered = [...filtered].sort((a, b) => 
          (b.Year || 0) - (a.Year || 0)
        )
        break
      case 'title':
        filtered = [...filtered].sort((a, b) => 
          (a.Title || '').localeCompare(b.Title || '')
        )
        break
      default: // popularity - mantener orden original
        break
    }
    
    setFilteredMovies(filtered)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Calcular páginas
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMovies = filteredMovies.slice(startIndex, endIndex)

  // Breadcrumbs para navegación
  const getBreadcrumbItems = () => {
    const items = []
    
    if (title.includes('Películas')) {
      items.push({ label: 'Películas', path: '/movies' })
    } else if (title.includes('Continuar')) {
      items.push({ label: 'Continuar Viendo', path: '/continue' })
    } else if (title.includes('Mi Lista')) {
      items.push({ label: 'Mi Lista', path: '/saved' })
    } else if (title.includes('Vistas')) {
      items.push({ label: 'Vistas', path: '/watched' })
    }
    
    return items
  }

  if (loading) {
    return (
      <div className="movie-grid-container">
        <Breadcrumbs items={getBreadcrumbItems()} />
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
        <Breadcrumbs items={getBreadcrumbItems()} />
        <h2>{title}</h2>
        <div className="empty-state">
          <p>{emptyMessage || 'No se encontraron películas'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="movie-grid-container">
      <Breadcrumbs items={getBreadcrumbItems()} />
      <h2>{title}</h2>
      
      {/* Filtros avanzados */}
      {showFilters && (
        <AdvancedFilters
          onFiltersChange={handleFiltersChange}
          isOpen={isFiltersOpen}
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
        />
      )}



      {/* Grid de películas */}
      <div className="movie-grid">
        {currentMovies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onAddToList={onAddToList}
            userLists={userLists}
          />
        ))}
      </div>

      {/* Paginación */}
      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default MovieGrid
