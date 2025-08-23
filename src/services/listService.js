import { supabase } from '../config/supabase'

class ListService {
  async getUserLists(userId) {
    try {
      const { data, error } = await supabase
        .from('user_movie_lists')
        .select('*')
        .eq('user_id', userId)

      if (error) throw error

      return {
        watchlist: data.filter(item => item.list_type === 'watchlist'),
        watched: data.filter(item => item.list_type === 'watched'),
        success: true
      }
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
      // Check if movie already exists in any list for this user
      const { data: existing } = await supabase
        .from('user_movie_lists')
        .select('*')
        .eq('user_id', userId)
        .eq('imdb_id', movie.imdbID)

      if (existing && existing.length > 0) {
        // Update existing entry
        const { data, error } = await supabase
          .from('user_movie_lists')
          .update({ 
            list_type: listType,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('imdb_id', movie.imdbID)
          .select()

        if (error) throw error
        return { data: data[0], success: true }
      } else {
        // Create new entry
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

        if (error) throw error
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

  async removeFromList(userId, imdbId) {
    try {
      const { error } = await supabase
        .from('user_movie_lists')
        .delete()
        .eq('user_id', userId)
        .eq('imdb_id', imdbId)

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
