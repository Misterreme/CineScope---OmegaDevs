import { supabase } from '../config/supabase'

class ListService {
  async getUserLists(userId) {
    try {
      console.log('=== GET USER LISTS SERVICE ===')
      console.log('User ID:', userId)
      
      const { data, error } = await supabase
        .from('user_movie_lists')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error getting user lists:', error)
        throw error
      }

      console.log('Raw data from database:', data)
      
      const result = {
        watchlist: data.filter(item => item.list_type === 'watchlist'),
        watched: data.filter(item => item.list_type === 'watched'),
        success: true
      }
      
      console.log('Filtered result:', result)

      console.log('Watchlist count:', result.watchlist.length)
      console.log('Watched count:', result.watched.length)
      
      return result
    } catch (error) {
      console.error('Error getting user lists:', error)
      return {
        watchlist: [],
        watched: [],
        success: false,
        error: error.message
      }
    }
  }

  async addToList(userId, movie, listType) {
    try {
      console.log('=== ADD TO LIST SERVICE ===')
      console.log('User ID:', userId)
      console.log('Movie:', movie)
      console.log('List Type:', listType)
      console.log('Movie.imdbID type:', typeof movie.imdbID)
      console.log('Movie.imdbID value:', movie.imdbID)
      
      // Validate input parameters
      if (!userId || !movie || !movie.imdbID || !listType) {
        console.error('Invalid parameters:', { userId, movie: movie?.imdbID, listType })
        return {
          data: null,
          success: false,
          error: 'Parámetros inválidos'
        }
      }

      console.log('✅ Parameters validated successfully')

      // Check if movie already exists in this specific list for this user
      console.log('🔍 Checking if movie already exists...')
      const { data: existing, error: existingError } = await supabase
        .from('user_movie_lists')
        .select('*')
        .eq('user_id', userId)
        .eq('imdb_id', movie.imdbID)
        .eq('list_type', listType)

      if (existingError) {
        console.error('❌ Error checking existing:', existingError)
        console.error('Error details:', {
          code: existingError.code,
          message: existingError.message,
          details: existingError.details,
          hint: existingError.hint
        })
        throw existingError
      }

      console.log('✅ Existing check completed')
      console.log('Existing entries found:', existing)
      console.log('Existing entries count:', existing?.length || 0)

      if (existing && existing.length > 0) {
        // Movie already exists in this list, return success
        console.log('✅ Movie already exists in this list')
        return { data: existing[0], success: true }
      } else {
        // Create new entry
        console.log('🆕 Creating new entry...')
        const insertData = {
          user_id: userId,
          imdb_id: movie.imdbID,
          title: movie.Title || 'Unknown Title',
          year: movie.Year || 'Unknown Year',
          poster: movie.Poster || null,
          list_type: listType
        }
        
        console.log('📝 Insert data:', insertData)
        console.log('🔗 Supabase connection test...')
        
        // Test connection first
        const { data: testData, error: testError } = await supabase
          .from('user_movie_lists')
          .select('count')
          .limit(1)
        
        if (testError) {
          console.error('❌ Supabase connection test failed:', testError)
          throw testError
        }
        
        console.log('✅ Supabase connection successful')
        
        const { data, error } = await supabase
          .from('user_movie_lists')
          .insert(insertData)
          .select()

        if (error) {
          console.error('❌ Error inserting:', error)
          console.error('Error details:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          })
          throw error
        }
        
        console.log('✅ Insert successful:', data)
        console.log('✅ Returning success response')
        return { data: data[0], success: true }
      }
    } catch (error) {
      console.error('❌ Error adding to list:', error)
      console.error('Error stack:', error.stack)
      return {
        data: null,
        success: false,
        error: error.message || 'Error desconocido al agregar a la lista'
      }
    }
  }

  async removeFromList(userId, imdbId, listType) {
    try {
      console.log('=== REMOVE FROM LIST ===')
      console.log('User ID:', userId)
      console.log('IMDB ID:', imdbId)
      console.log('List Type:', listType)
      
      // Validate input parameters
      if (!userId || !imdbId || !listType) {
        console.error('Invalid parameters:', { userId, imdbId, listType })
        return {
          success: false,
          error: 'Parámetros inválidos'
        }
      }

      const { data, error } = await supabase
        .from('user_movie_lists')
        .delete()
        .eq('user_id', userId)
        .eq('imdb_id', imdbId)
        .eq('list_type', listType)

      if (error) {
        console.error('Error removing from list:', error)
        console.error('Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        })
        throw error
      }

      console.log('Successfully removed from list')
      return { 
        success: true,
        data: data ? data[0] : null
      }
    } catch (error) {
      console.error('Error in removeFromList:', error)
      return {
        success: false,
        error: error.message || 'Error desconocido al remover de la lista'
      }
    }
  }

  async moveToWatched(userId, imdbId) {
    try {
      const { data, error } = await supabase
        .from('user_movie_lists')
        .update({ 
          list_type: 'watched',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('imdb_id', imdbId)
        .select()

      if (error) throw error

      return { data: data[0], success: true }
    } catch (error) {
      console.error('Error moving to watched:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }
}

export const listService = new ListService()
