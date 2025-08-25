import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { userStatsService } from '../services/userStatsService'
import { 
  ArrowLeft, 
  Trophy, 
  Film, 
  Bookmark, 
  Eye, 
  Calendar,
  Star,
  Target,
  TrendingUp,
  Award,
  Medal
} from 'lucide-react'
import './Account.css'

const Account = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  // Estados para estadísticas y logros
  const [stats, setStats] = useState({
    totalMovies: 0,
    saved: 0,
    watched: 0,
    daysActive: 0,
    averageRating: 0
  })
  
  const [userStats, setUserStats] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserStats()
  }, [])

  const loadUserStats = async () => {
    try {
      if (!user?.id) return
      
      console.log('🔄 Loading user stats for user:', user.id)
      
      // Obtener estadísticas reales del usuario
      const result = await userStatsService.getActivitySummary(user.id)
      
      console.log('📊 Result from userStatsService:', result)
      
      if (result.success) {
        const { stats: userStatsData, achievements: userAchievements } = result.data
        
        console.log('📈 User stats data:', userStatsData)
        console.log('🏆 Achievements:', userAchievements)
        
        // Guardar estadísticas básicas para las tarjetas
        const newStats = {
          totalMovies: userStatsData.totalMovies || 0,
          saved: userStatsData.saved || 0,
          watched: userStatsData.watched || 0,
          daysActive: userStatsData.daysActive || 0,
          averageRating: userStatsData.averageRating || 0
        }
        
        console.log('🎯 Setting stats to:', newStats)
        setStats(newStats)
        
        // Guardar datos completos para el resumen de actividad
        setUserStats(userStatsData)
        
        // Mapear los logros para usar los iconos de Lucide
        const mappedAchievements = userAchievements.map(achievement => ({
          ...achievement,
          icon: getIconComponent(achievement.icon)
        }))
        
        setAchievements(mappedAchievements)
      } else {
        console.error('❌ Error loading user stats:', result.error)
      }
    } catch (error) {
      console.error('❌ Error loading user stats:', error)
    } finally {
      setLoading(false)
    }
  }

  // Función para mapear nombres de iconos a componentes de Lucide
  const getIconComponent = (iconName) => {
    const iconMap = {
      'Film': Film,
      'Eye': Eye,
      'Calendar': Calendar,
      'Star': Star,
      'Target': Target,
      'TrendingUp': TrendingUp
    }
    return iconMap[iconName] || Film
  }

  const handleBack = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="account-page">
        <div className="account-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
          <h1>Mi Cuenta</h1>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="account-page">
      {/* Header */}
      <div className="account-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>
        <h1>Mi Cuenta</h1>
      </div>

      <div className="account-content">
        {/* Información del Usuario */}
        <section className="account-section user-info">
          <div className="user-profile">
            <div className="user-avatar">
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Foto de perfil"
                />
              ) : (
                <div className="avatar-placeholder">
                  <span>{user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}</span>
                </div>
              )}
            </div>
            <div className="user-details">
              <h2>{user?.user_metadata?.full_name || 'Usuario'}</h2>
              <p className="user-email">{user?.email}</p>
              <p className="member-since">Miembro desde {new Date(user?.created_at).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="account-section">
          <h2>
            <TrendingUp size={20} />
            Estadísticas de Actividad
          </h2>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Film size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalMovies}</h3>
                <p>Películas en Listas</p>
              </div>
            </div>
            

            
            <div className="stat-card">
              <div className="stat-icon">
                <Bookmark size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.saved}</h3>
                <p>Guardadas</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Eye size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.watched}</h3>
                <p>Vistas</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Calendar size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.daysActive}</h3>
                <p>Días Activo</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Star size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.averageRating}</h3>
                <p>Calificación Promedio</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Target size={24} />
              </div>
              <div className="stat-content">
                <h3>{userStats?.favoriteGenre || 'N/A'}</h3>
                <p>Género Favorito</p>
              </div>
            </div>
          </div>
        </section>

        {/* Logros */}
        <section className="account-section">
          <h2>
            <Trophy size={20} />
            Logros y Conquistas
          </h2>
          
          <div className="achievements-grid">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <div 
                  key={achievement.id} 
                  className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-icon" style={{ color: achievement.color }}>
                    <IconComponent size={32} />
                  </div>
                  <div className="achievement-content">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                    {!achievement.unlocked && (
                      <div className="achievement-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{Math.round(achievement.progress)}%</span>
                      </div>
                    )}
                  </div>
                  {achievement.unlocked && (
                    <div className="achievement-badge">
                      <Award size={20} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          {achievements.length === 0 && (
            <div className="no-achievements">
              <Trophy size={48} />
              <p>¡Comienza a usar CineScope para desbloquear logros!</p>
            </div>
          )}
        </section>

        {/* Actividad */}
        <section className="account-section">
          <h2>
            <TrendingUp size={20} />
            Actividad
          </h2>
          
          <div className="activity-timeline">
            {userStats?.recentActivity && userStats.recentActivity.length > 0 ? (
              userStats.recentActivity.slice(0, 10).map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-content">
                    <p className="activity-text">{activity.description}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                  <div className="activity-icon">
                    {activity.type === 'watched' && <Eye size={16} />}
                    {activity.type === 'review' && <Star size={16} />}
                    {activity.type === 'watchlist' && <Bookmark size={16} />}
                    {activity.type === 'achievement' && <Award size={16} />}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-activity">
                <TrendingUp size={48} />
                <p>¡Comienza a usar CineScope para ver tu actividad!</p>
              </div>
            )}
          </div>
        </section>


      </div>
    </div>
  )
}

export default Account
