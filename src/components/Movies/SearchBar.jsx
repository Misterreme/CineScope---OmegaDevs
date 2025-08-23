import React, { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { movieService } from '../../services/movieService'

const SearchBar = ({ onSearchResults, onClearSearch }) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true)
        const results = await movieService.searchMovies(query.trim())
        
        if (results.success) {
          setSuggestions(results.movies.slice(0, 5)) // Show top 5 suggestions
          setShowSuggestions(true)
        }
        setLoading(false)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setShowSuggestions(false)
    
    const results = await movieService.searchMovies(searchQuery.trim())
    onSearchResults(results, searchQuery.trim())
    
    setLoading(false)
  }

  const handleSuggestionClick = (movie) => {
    setQuery(movie.Title)
    setShowSuggestions(false)
    handleSearch(movie.Title)
  }

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
    onClearSearch()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch()
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar películas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((movie) => (
            <div
              key={movie.imdbID}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(movie)}
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
                alt={movie.Title}
                className="suggestion-poster"
              />
              <div className="suggestion-info">
                <span className="suggestion-title">{movie.Title}</span>
                <span className="suggestion-year">{movie.Year}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
