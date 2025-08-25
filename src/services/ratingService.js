import { supabase } from '../config/supabase'

class RatingService {
  // Obtener puntuación de una película específica del usuario
  async getUserRating(userId, imdbId) {
    try {
      const { data, error } = await supabase
        .from('user_movie_ratings')
        .select('*')
        .eq('user_id', userId)
        .eq('imdb_id', imdbId)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error
      }

      return {
        data: data || null,
        success: true
      }
    } catch (error) {
      console.error('Error getting user rating:', error)
      return {
        data: null,
        success: false,
        error: error.message
      }
    }
  }

  // Obtener todas las puntuaciones del usuario
  async getUserRatings(userId) {
    try {
      const { data, error } = await supabase
        .from('user_movie_ratings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return {
        data: data || [],
        success: true
      }
    } catch (error) {
      console.error('Error getting user ratings:', error)
      return {
        data: [],
        success: false,
        error: error.message
      }
    }
  }

  // Agregar o actualizar puntuación
  async setRating(userId, movie, rating) {
    try {
      if (!userId || !movie?.imdbID || !rating || rating < 1 || rating > 10) {
        return {
          data: null,
          success: false,
          error: 'Parámetros inválidos'
        }
      }

      // Verificar si ya existe una puntuación
      const existingRating = await this.getUserRating(userId, movie.imdbID)
      
      let result
      if (existingRating.data) {
        // Actualizar puntuación existente
        const { data, error } = await supabase
          .from('user_movie_ratings')
          .update({
            rating,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('imdb_id', movie.imdbID)
          .select()
          .single()

        if (error) throw error
        result = data
      } else {
        // Crear nueva puntuación
        const { data, error } = await supabase
          .from('user_movie_ratings')
          .insert({
            user_id: userId,
            imdb_id: movie.imdbID,
            movie_title: movie.Title,
            rating
          })
          .select()
          .single()

        if (error) throw error
        result = data
      }

      return {
        data: result,
        success: true
      }
    } catch (error) {
      console.error('Error setting rating:', error)
      return {
        data: null,
        success: false,
        error: error.message
      }
    }
  }

  // Eliminar puntuación
  async removeRating(userId, imdbId) {
    try {
      const { error } = await supabase
        .from('user_movie_ratings')
        .delete()
        .eq('user_id', userId)
        .eq('imdb_id', imdbId)

      if (error) throw error

      return {
        data: null,
        success: true
      }
    } catch (error) {
      console.error('Error removing rating:', error)
      return {
        data: null,
        success: false,
        error: error.message
      }
    }
  }

  // Obtener estadísticas de puntuaciones del usuario
  async getUserRatingStats(userId) {
    try {
      const ratings = await this.getUserRatings(userId)
      
      if (!ratings.success) {
        return {
          data: {
            totalRatings: 0,
            averageRating: 0,
            ratingDistribution: {},
            recentRatings: []
          },
          success: false,
          error: ratings.error
        }
      }

      const userRatings = ratings.data
      const totalRatings = userRatings.length
      
      if (totalRatings === 0) {
        return {
          data: {
            totalRatings: 0,
            averageRating: 0,
            ratingDistribution: {},
            recentRatings: []
          },
          success: true
        }
      }

      // Calcular promedio
      const totalRating = userRatings.reduce((sum, r) => sum + r.rating, 0)
      const averageRating = Math.round((totalRating / totalRatings) * 10) / 10

      // Distribución de puntuaciones
      const ratingDistribution = {}
      for (let i = 1; i <= 10; i++) {
        ratingDistribution[i] = userRatings.filter(r => r.rating === i).length
      }

      // Puntuaciones recientes (últimas 5)
      const recentRatings = userRatings.slice(0, 5)

      return {
        data: {
          totalRatings,
          averageRating,
          ratingDistribution,
          recentRatings
        },
        success: true
      }
    } catch (error) {
      console.error('Error getting user rating stats:', error)
      return {
        data: null,
        success: false,
        error: error.message
      }
    }
  }
}

export const ratingService = new RatingService()
