import { supabase } from '../config/supabase'
import { listService } from './listService'
import { ratingService } from './ratingService'

class UserStatsService {
  // Obtener estadísticas completas del usuario
  async getUserStats(userId) {
    try {
      // Obtener información básica del usuario
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError

      // Obtener estadísticas de películas (simuladas por ahora, en producción vendrían de tablas reales)
      const stats = await this.getMovieStats(userId)
      
      // Generar logros para pasarlos a getActivityStats
      const achievements = this.generateAchievements({
        totalMovies: stats.totalMovies,
        saved: stats.saved,
        watched: stats.watched,
        averageRating: 0 // Se actualizará después
      })
      
      // Obtener estadísticas de actividad
      const activityStats = await this.getActivityStats(userId, achievements)
      
      // Calcular días activos desde la creación de la cuenta
      const daysActive = this.calculateDaysActive(user.created_at)
      
      // Obtener estadísticas de puntuaciones reales
      const ratingStats = await ratingService.getUserRatingStats(userId)
      const averageRating = ratingStats.success ? ratingStats.data.averageRating : 0
      
      // Combinar todas las estadísticas
      const userStats = {
        ...stats,
        ...activityStats,
        daysActive,
        averageRating,
        memberSince: user.created_at
      }

      return { data: userStats, success: true }
    } catch (error) {
      console.error('Error getting user stats:', error)
      return { 
        data: null, 
        success: false, 
        error: error.message 
      }
    }
  }

    // Obtener estadísticas de películas
  async getMovieStats(userId) {
    try {
      // Obtener datos reales de las listas del usuario
      console.log('🔄 Getting user lists from listService...')
      const userLists = await listService.getUserLists(userId)
      
      console.log('📋 User lists result:', userLists)
      
      if (!userLists.success) {
        console.error('❌ Error getting user lists:', userLists.error)
        return {
          totalMovies: 0,
          saved: 0,
          watched: 0,
          ratings: []
        }
      }

      // Calcular estadísticas reales
      const saved = userLists.watchlist?.length || 0  // watchlist = saved
      const watched = userLists.watched?.length || 0
      
      console.log('📊 Calculated stats:', {
        saved,
        watched
      })
      
      // Total de películas en todas las listas
      const totalMovies = saved + watched
      
      // Obtener puntuaciones reales del usuario
      const ratingStats = await ratingService.getUserRatingStats(userId)
      const ratings = ratingStats.success ? ratingStats.data.recentRatings : []
      
      console.log('⭐ Rating stats:', ratingStats)

      console.log('Real movie stats:', {
        totalMovies,
        saved,
        watched,
        ratings: ratings.length
      })

      return {
        totalMovies,
        saved,
        watched,
        ratings
      }
    } catch (error) {
      console.error('Error getting movie stats:', error)
      return {
        totalMovies: 0,
        saved: 0,
        watched: 0,
        ratings: []
      }
    }
  }

  // Obtener estadísticas de actividad
  async getActivityStats(userId, achievements = []) {
    try {
      // Obtener datos reales de las listas del usuario
      const userLists = await listService.getUserLists(userId)
      
      if (!userLists.success) {
        console.error('Error getting user lists for activity stats:', userLists.error)
        return {
          weeklyActivity: {},
          mostActiveDay: 'Sábados',
          favoriteGenre: 'Ciencia Ficción',
          mostUsedList: 'Guardadas'
        }
      }

      // Obtener actividad semanal real basada en películas marcadas como vistas
      const watchedMovies = userLists.watched || []
      
      console.log('📋 Raw watched movies data (ordered by created_at DESC):', watchedMovies.map((m, index) => ({
        index,
        title: m.title,
        created_at: m.created_at,
        updated_at: m.updated_at,
        list_type: m.list_type
      })))
      
      // La base de datos ya devuelve las películas ordenadas por created_at DESC
      // La primera película (índice 0) es la más recientemente agregada a "watched"
      const sortedWatchedMovies = watchedMovies
      
      console.log('🎯 First movie in array (most recently added to watched):', {
        index: 0,
        title: sortedWatchedMovies[0]?.title || 'No movies',
        created_at: sortedWatchedMovies[0]?.created_at || 'No date'
      })
      
      // Generar actividad reciente basada en las últimas acciones del usuario
      const recentActivity = this.generateRecentActivity(sortedWatchedMovies, userLists.watchlist || [], achievements || [])

      // Calcular género favorito basado en películas vistas y guardadas
      const favoriteGenre = this.calculateFavoriteGenre([...sortedWatchedMovies, ...(userLists.watchlist || [])])



      // Determinar lista más usada basada en datos reales
      const listCounts = {
        'Guardadas': userLists.watchlist?.length || 0,
        'Vistas': userLists.watched?.length || 0
      }
      
      const mostUsedList = Object.entries(listCounts)
        .reduce((a, b) => listCounts[a] > listCounts[b] ? a : b)

      console.log('Real activity stats:', {
        recentActivity: recentActivity.length,
        favoriteGenre,
        mostUsedList
      })

      return {
        recentActivity,
        favoriteGenre,
        mostUsedList
      }
    } catch (error) {
      console.error('Error getting activity stats:', error)
      return {
        recentActivity: [],
        favoriteGenre: 'Ciencia Ficción',
        mostUsedList: 'Guardadas'
      }
    }
  }

  // Calcular días activos desde la creación de la cuenta
  calculateDaysActive(createdAt) {
    if (!createdAt) return 0
    
    const created = new Date(createdAt)
    const now = new Date()
    const diffTime = Math.abs(now - created)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays
  }

  // Calcular calificación promedio
  calculateAverageRating(ratings) {
    if (!ratings || ratings.length === 0) return 0
    
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0)
    const average = totalRating / ratings.length
    
    return Math.round(average * 10) / 10 // Redondear a 1 decimal
  }

  // Calcular actividad semanal basada en películas marcadas como vistas
  calculateWeeklyActivity(watchedMovies) {
    const weeklyActivity = {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0
    }

    // Agrupar películas por día de la semana basado en created_at o updated_at
    watchedMovies.forEach(movie => {
      const dateStr = movie.created_at || movie.updated_at
      if (dateStr) {
        try {
          const date = new Date(dateStr)
          if (!isNaN(date.getTime())) {
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'lowercase' })
            if (weeklyActivity.hasOwnProperty(dayOfWeek)) {
              weeklyActivity[dayOfWeek]++
            }
          }
        } catch (error) {
          console.warn('Error parsing date for movie:', movie.title, dateStr, error)
        }
      }
    })

    console.log('📅 Weekly activity calculation:', {
      totalMovies: watchedMovies.length,
      weeklyActivity
    })

    return weeklyActivity
  }

  // Método simple para calcular actividad semanal cuando no hay fechas válidas
  calculateWeeklyActivitySimple(watchedMovies) {
    const totalMovies = watchedMovies.length
    
    if (totalMovies === 0) {
      return {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0
      }
    }

    // Distribuir las películas a lo largo de la semana de manera realista
    const baseActivity = Math.max(1, Math.floor(totalMovies / 7))
    const extraMovies = totalMovies % 7
    
    const weeklyActivity = {
      monday: baseActivity,
      tuesday: baseActivity,
      wednesday: baseActivity,
      thursday: baseActivity,
      friday: baseActivity,
      saturday: baseActivity + Math.ceil(extraMovies / 2), // Más actividad los fines de semana
      sunday: baseActivity + Math.floor(extraMovies / 2)
    }

    console.log('📅 Simple weekly activity calculation:', {
      totalMovies,
      weeklyActivity
    })

    return weeklyActivity
  }

  // Calcular género favorito basado en películas
  calculateFavoriteGenre(movies) {
    const genreCounts = {}
    
    movies.forEach(movie => {
      if (movie.Genre) {
        const genres = movie.Genre.split(', ').map(g => g.trim())
        genres.forEach(genre => {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1
        })
      }
    })

    if (Object.keys(genreCounts).length === 0) {
      return 'No disponible'
    }

    // Encontrar el género más frecuente
    const favoriteGenre = Object.entries(genreCounts)
      .reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b)

    return favoriteGenre
  }

  // Generar logros basados en estadísticas reales
  generateAchievements(userStats) {
    const achievements = []
    
    // Logros por cantidad de películas
    if (userStats.totalMovies >= 50) {
      achievements.push({
        id: 'movie-collector',
        title: 'Coleccionista de Películas',
        description: 'Has agregado 50+ películas a tus listas',
        icon: 'Film',
        color: '#FCA311',
        unlocked: true,
        progress: 100,
        category: 'collection'
      })
    } else if (userStats.totalMovies >= 25) {
      achievements.push({
        id: 'movie-collector',
        title: 'Coleccionista de Películas',
        description: `Agrega 50 películas a tus listas (${userStats.totalMovies}/50)`,
        icon: 'Film',
        color: '#6B46C1',
        unlocked: false,
        progress: (userStats.totalMovies / 50) * 100,
        category: 'collection'
      })
    }



    // Logros por películas vistas
    if (userStats.watched >= 30) {
      achievements.push({
        id: 'movie-watcher',
        title: 'Cineasta Experto',
        description: 'Has visto 30+ películas',
        icon: 'Eye',
        color: '#FCA311',
        unlocked: true,
        progress: 100,
        category: 'watching'
      })
    } else if (userStats.watched >= 15) {
      achievements.push({
        id: 'movie-watcher',
        title: 'Cineasta Experto',
        description: `Ve 30 películas para desbloquear (${userStats.watched}/30)`,
        icon: 'Eye',
        color: '#6B46C1',
        unlocked: false,
        progress: (userStats.watched / 30) * 100,
        category: 'watching'
      })
    }

    // Logros por días activos
    if (userStats.daysActive >= 30) {
      achievements.push({
        id: 'loyal-user',
        title: 'Usuario Leal',
        description: 'Has usado CineScope por 30+ días',
        icon: 'Calendar',
        color: '#FCA311',
        unlocked: true,
        progress: 100,
        category: 'loyalty'
      })
    } else if (userStats.daysActive >= 7) {
      achievements.push({
        id: 'loyal-user',
        title: 'Usuario Leal',
        description: `Usa CineScope por 30 días (${userStats.daysActive}/30)`,
        icon: 'Calendar',
        color: '#6B46C1',
        unlocked: false,
        progress: (userStats.daysActive / 30) * 100,
        category: 'loyalty'
      })
    }

    // Logros por calificación promedio
    if (userStats.averageRating >= 4.5) {
      achievements.push({
        id: 'critic',
        title: 'Crítico de Cine',
        description: `Tu calificación promedio es ${userStats.averageRating} estrellas`,
        icon: 'Star',
        color: '#FCA311',
        unlocked: true,
        progress: 100,
        category: 'rating'
      })
    } else if (userStats.averageRating >= 4.0) {
      achievements.push({
        id: 'critic',
        title: 'Crítico de Cine',
        description: `Llega a 4.5 estrellas de calificación promedio (${userStats.averageRating}/4.5)`,
        icon: 'Star',
        color: '#6B46C1',
        unlocked: false,
        progress: (userStats.averageRating / 4.5) * 100,
        category: 'rating'
      })
    }

    // Logros especiales
    if (userStats.saved >= 5 && userStats.watched >= 10) {
      achievements.push({
        id: 'balanced-user',
        title: 'Usuario Equilibrado',
        description: 'Tienes películas guardadas y has visto películas',
        icon: 'Target',
        color: '#FCA311',
        unlocked: true,
        progress: 100,
        category: 'special'
      })
    }

    // Logro por actividad semanal
    const totalWeeklyActivity = Object.values(userStats.weeklyActivity || {}).reduce((a, b) => a + b, 0)
    if (totalWeeklyActivity >= 50) {
      achievements.push({
        id: 'active-user',
        title: 'Usuario Activo',
        description: 'Has tenido mucha actividad esta semana',
        icon: 'TrendingUp',
        color: '#FCA311',
        unlocked: true,
        progress: 100,
        category: 'activity'
      })
    } else if (totalWeeklyActivity >= 25) {
      achievements.push({
        id: 'active-user',
        title: 'Usuario Activo',
        description: `Mantén tu actividad semanal (${totalWeeklyActivity}/50)`,
        icon: 'TrendingUp',
        color: '#6B46C1',
        unlocked: false,
        progress: (totalWeeklyActivity / 50) * 100,
        category: 'activity'
      })
    }

    return achievements
  }

  // Generar actividad reciente basada en las últimas acciones del usuario
  generateRecentActivity(watchedMovies, watchlistMovies, achievements) {
    const activities = []
    
    // Agregar películas marcadas como vistas (más recientes primero)
    watchedMovies.forEach((movie, index) => {
      if (index < 5) { // Solo las 5 más recientes
        activities.push({
          type: 'watched',
          description: `Marcaste "${movie.title}" como vista`,
          time: this.formatTimeAgo(movie.created_at || movie.updated_at),
          timestamp: new Date(movie.created_at || movie.updated_at).getTime()
        })
      }
    })
    
    // Agregar películas añadidas a la lista para ver (más recientes primero)
    watchlistMovies.forEach((movie, index) => {
      if (index < 3) { // Solo las 3 más recientes
        activities.push({
          type: 'watchlist',
          description: `Añadiste "${movie.title}" a tu lista para ver`,
          time: this.formatTimeAgo(movie.created_at || movie.updated_at),
          timestamp: new Date(movie.created_at || movie.updated_at).getTime()
        })
      }
    })
    
    // Agregar logros desbloqueados recientemente
    const unlockedAchievements = achievements.filter(a => a.unlocked)
    unlockedAchievements.forEach((achievement, index) => {
      if (index < 2) { // Solo los 2 más recientes
        activities.push({
          type: 'achievement',
          description: `¡Desbloqueaste el logro "${achievement.title}"!`,
          time: 'Recientemente',
          timestamp: Date.now() - (index * 60000) // Simular tiempo reciente
        })
      }
    })
    
    // Ordenar por timestamp (más reciente primero) y tomar solo las últimas 10
    return activities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10)
  }

  // Formatear tiempo transcurrido
  formatTimeAgo(dateString) {
    if (!dateString) return 'Recientemente'
    
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) return 'Hace un momento'
    if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`
    
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    })
  }

  // Obtener resumen de actividad detallado
  async getActivitySummary(userId) {
    try {
      const stats = await this.getUserStats(userId)
      if (!stats.success) throw new Error(stats.error)

      const userStats = stats.data
      const achievements = this.generateAchievements(userStats)

      return {
        data: {
          stats: userStats,
          achievements,
          summary: {
            totalAchievements: achievements.length,
            unlockedAchievements: achievements.filter(a => a.unlocked).length,
            lockedAchievements: achievements.filter(a => !a.unlocked).length,
            completionRate: achievements.length > 0 ? 
              (achievements.filter(a => a.unlocked).length / achievements.length) * 100 : 0
          }
        },
        success: true
      }
    } catch (error) {
      console.error('Error getting activity summary:', error)
      return { 
        data: null, 
        success: false, 
        error: error.message 
      }
    }
  }
}

export const userStatsService = new UserStatsService()
