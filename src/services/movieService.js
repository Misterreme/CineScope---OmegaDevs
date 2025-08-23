import axios from 'axios'

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY
const OMDB_BASE_URL = 'https://www.omdbapi.com/'

class MovieService {
  async searchMovies(query, page = 1) {
    try {
      const response = await axios.get(OMDB_BASE_URL, {
        params: {
          apikey: OMDB_API_KEY,
          s: query,
          page: page,
          type: 'movie'
        }
      })

      if (response.data.Response === 'True') {
        return {
          movies: response.data.Search || [],
          totalResults: parseInt(response.data.totalResults) || 0,
          success: true
        }
      } else {
        return {
          movies: [],
          totalResults: 0,
          success: false,
          error: response.data.Error
        }
      }
    } catch (error) {
      console.error('Error searching movies:', error)
      return {
        movies: [],
        totalResults: 0,
        success: false,
        error: 'Error connecting to movie database'
      }
    }
  }

  async getMovieDetails(imdbId) {
    try {
      const response = await axios.get(OMDB_BASE_URL, {
        params: {
          apikey: OMDB_API_KEY,
          i: imdbId,
          plot: 'full'
        }
      })

      if (response.data.Response === 'True') {
        return {
          movie: response.data,
          success: true
        }
      } else {
        return {
          movie: null,
          success: false,
          error: response.data.Error
        }
      }
    } catch (error) {
      console.error('Error getting movie details:', error)
      return {
        movie: null,
        success: false,
        error: 'Error connecting to movie database'
      }
    }
  }

  async getPopularMovies() {
    // Since OMDb doesn't have a "popular" endpoint, we'll search for some popular titles
    const popularTitles = [
      'Avengers', 'Batman', 'Spider-Man', 'Star Wars', 'Harry Potter',
      'Lord of the Rings', 'Matrix', 'Inception', 'Interstellar', 'Joker'
    ]
    
    try {
      const randomTitle = popularTitles[Math.floor(Math.random() * popularTitles.length)]
      return await this.searchMovies(randomTitle)
    } catch (error) {
      console.error('Error getting popular movies:', error)
      return {
        movies: [],
        totalResults: 0,
        success: false,
        error: 'Error loading popular movies'
      }
    }
  }
}

export const movieService = new MovieService()
