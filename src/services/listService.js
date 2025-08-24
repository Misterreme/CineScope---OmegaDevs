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

      if (error) {
        console.error('Error getting user lists:', error)
        throw error
      }

      console.log('Raw data from database:', data)
      
      const result = {
        watchlist: data.filter(item => item.list_type === 'watchlist'),
        watched: data.filter(item => item.list_type === 'watched'),
        saved: data.filter(item => item.list_type === 'saved'),
        favorites: data.filter(item => item.list_type === 'favorites'),
        success: true
      }
      
      console.log('Filtered result:', result)
      console.log('Favorites count:', result.favorites.length)
      console.log('Saved count:', result.saved.length)
      console.log('Watched count:', result.watched.length)
      
      return result
    } catch (error) {
      console.error('Error getting user lists:', error)
      return {
        watchlist: [],
        watched: [],
        saved: [],
        favorites: [],
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
      
      // Check if movie already exists in any list for this user
      const { data: existing, error: existingError } = await supabase
        .from('user_movie_lists')
        .select('*')
        .eq('user_id', userId)
        .eq('imdb_id', movie.imdbID)

      if (existingError) {
        console.error('Error checking existing:', existingError)
        throw existingError
      }

      console.log('Existing entries found:', existing)

      if (existing && existing.length > 0) {
        // Update existing entry
        console.log('Updating existing entry')
        const { data, error } = await supabase
          .from('user_movie_lists')
          .update({ 
            list_type: listType,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('imdb_id', movie.imdbID)
          .select()

        if (error) {
          console.error('Error updating:', error)
          throw error
        }
        
        console.log('Update successful:', data)
        return { data: data[0], success: true }
      } else {
        // Create new entry
        console.log('Creating new entry')
        const { data, error } = await supabase
          .from('user_movie_lists')
          .insert({
            user_id: userId,
            imdb_id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            list_type: listType
          })
          .select()

        if (error) {
          console.error('Error inserting:', error)
          throw error
        }
        
        console.log('Insert successful:', data)
        return { data: data[0], success: true }
      }
    } catch (error) {
      console.error('Error adding to list:', error)
      return {
        data: null,
        success: false,
        error: error.message
      }
    }
  }

  async removeFromList(userId, imdbId, listType) {
    try {
      const { error } = await supabase
        .from('user_movie_lists')
        .delete()
        .eq('user_id', userId)
        .eq('imdb_id', imdbId)
        .eq('list_type', listType)

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error('Error removing from list:', error)
      return {
        success: false,
        error: error.message
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
