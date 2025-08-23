import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { movieService } from '../services/movieService'
import { listService } from '../services/listService'
import Header from '../components/Layout/Header'
import SearchBar from '../components/Movies/SearchBar'
import MovieGrid from '../components/Movies/MovieGrid'

const Dashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('search')
  const [searchResults, setSearchResults] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [userLists, setUserLists] = useState({ watchlist: [], watched: [] })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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
    }

    setLoading(false)
  }

  const handleSearchResults = (results, query) => {
    setSearchResults(results.movies || [])
    setSearchQuery(query)
    setActiveTab('search')
  }

  const handleClearSearch = () => {
    setSearchResults([])
    setSearchQuery('')
  }

  const handleAddToList = () => {
    // Refresh user lists when a movie is added/removed
    loadInitialData()
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        if (searchQuery && searchResults.length > 0) {
          return (
            <MovieGrid
              movies={searchResults}
              loading={loading}
              title={`Resultados para "${searchQuery}"`}
              onAddToList={handleAddToList}
              userLists={userLists}
            />
          )
        } else if (searchQuery && searchResults.length === 0) {
          return (
            <MovieGrid
              movies={[]}
              loading={loading}
              title={`Resultados para "${searchQuery}"`}
              emptyMessage="No se encontraron películas con ese título"
            />
          )
        } else {
          return (
            <MovieGrid
              movies={popularMovies}
              loading={loading}
              title="Películas Populares"
              onAddToList={handleAddToList}
              userLists={userLists}
              emptyMessage="Carga películas populares..."
            />
          )
        }

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

      default:
        return null
    }
  }

  return (
    <div className="dashboard">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'search' && (
          <div className="search-section">
            <SearchBar
              onSearchResults={handleSearchResults}
              onClearSearch={handleClearSearch}
            />
          </div>
        )}
        
        <div className="content-section">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
