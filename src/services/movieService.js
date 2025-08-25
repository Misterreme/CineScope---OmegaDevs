import axios from 'axios'

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY
const OMDB_BASE_URL = 'https://www.omdbapi.com/'

// Verificar que la API key esté configurada
if (!OMDB_API_KEY || OMDB_API_KEY === 'your_omdb_api_key_here') {
  console.error('❌ OMDB API Key no está configurada. Por favor, crea un archivo .env con VITE_OMDB_API_KEY=tu_api_key_aqui')
}

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
      console.log('🎬 MovieService: Getting details for IMDb ID:', imdbId)
      console.log('🔑 API Key available:', !!OMDB_API_KEY)
      console.log('🌐 Base URL:', OMDB_BASE_URL)
      
      // Verificar que la API key esté configurada
      if (!OMDB_API_KEY || OMDB_API_KEY === 'your_omdb_api_key_here') {
        console.error('❌ OMDB API Key no está configurada')
        return {
          movie: null,
          success: false,
          error: 'API Key de OMDB no está configurada. Por favor, configura VITE_OMDB_API_KEY en tu archivo .env'
        }
      }
      
      // Validar que el ID de IMDB tenga el formato correcto
      if (!imdbId || typeof imdbId !== 'string') {
        console.error('❌ Invalid IMDb ID format:', imdbId)
        return {
          movie: null,
          success: false,
          error: 'ID de IMDB inválido'
        }
      }
      
      // Validar que el ID de IMDB tenga el formato ttXXXXXXXXX
      const imdbIdPattern = /^tt\d{7,}$/
      if (!imdbIdPattern.test(imdbId)) {
        console.error('❌ IMDb ID format incorrect:', imdbId)
        return {
          movie: null,
          success: false,
          error: 'Formato de ID de IMDB incorrecto. Debe ser tt seguido de números (ej: tt0111161)'
        }
      }
      
      const params = {
        apikey: OMDB_API_KEY,
        i: imdbId,
        plot: 'full'
      }
      
      console.log('📡 Request params:', params)
      
      const response = await axios.get(OMDB_BASE_URL, { params })
      console.log('📡 Response status:', response.status)
      console.log('📡 Response data:', response.data)

      if (response.data.Response === 'True') {
        console.log('✅ Movie found successfully')
        return {
          movie: response.data,
          success: true
        }
      } else {
        console.error('❌ API Error:', response.data.Error)
        return {
          movie: null,
          success: false,
          error: response.data.Error
        }
      }
    } catch (error) {
      console.error('❌ Network/API Error:', error)
      if (error.response) {
        console.error('❌ Error response:', error.response.data)
        console.error('❌ Error status:', error.response.status)
      }
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

  async getMoviesByCategory(category) {
    // Mapeo de categorías a términos de búsqueda específicos
    const categoryMappings = {
      'action': ['action', 'adventure', 'thriller', 'superhero', 'war'],
      'comedy': ['comedy', 'funny', 'humor', 'romantic comedy'],
      'sci-fi': ['sci-fi', 'science fiction', 'space', 'future', 'robot'],
      'romance': ['romance', 'romantic', 'love story', 'drama'],
      'horror': ['horror', 'scary', 'thriller', 'suspense'],
      'drama': ['drama', 'emotional', 'serious', 'biography'],
      'fantasy': ['fantasy', 'magic', 'wizard', 'dragon', 'medieval'],
      'mystery': ['mystery', 'detective', 'crime', 'investigation'],
      'adventure': ['adventure', 'exploration', 'journey', 'quest'],
      'thriller': ['thriller', 'suspense', 'psychological', 'crime']
    }

    const searchTerms = categoryMappings[category] || ['movie']
    
    try {
      let allMovies = []
      
      // Buscar películas para cada término de la categoría
      for (const term of searchTerms.slice(0, 3)) { // Limitar a 3 términos para no sobrecargar la API
        const result = await this.searchMovies(term, 1)
        if (result.success && result.movies) {
          allMovies = [...allMovies, ...result.movies]
        }
      }
      
      // Eliminar duplicados basándose en imdbID
      const uniqueMovies = allMovies.filter((movie, index, self) => 
        index === self.findIndex(m => m.imdbID === movie.imdbID)
      )
      
      return {
        movies: uniqueMovies.slice(0, 20), // Limitar a 20 películas
        totalResults: uniqueMovies.length,
        success: true
      }
    } catch (error) {
      console.error('Error getting movies by category:', error)
      return {
        movies: [],
        totalResults: 0,
        success: false,
        error: 'Error loading movies by category'
      }
    }
  }
}

export const movieService = new MovieService()
