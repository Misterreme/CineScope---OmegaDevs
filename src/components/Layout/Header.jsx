import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Film, User, LogOut, List, Eye } from 'lucide-react'

const Header = ({ activeTab, onTabChange }) => {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <Film size={28} />
          <h1>Cines Scope</h1>
        </div>

        <nav className="main-nav">
          <button
            className={`nav-button ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => onTabChange('search')}
          >
            Explorar
          </button>
          <button
            className={`nav-button ${activeTab === 'watchlist' ? 'active' : ''}`}
            onClick={() => onTabChange('watchlist')}
          >
            <List size={16} />
            Quiero Ver
          </button>
          <button
            className={`nav-button ${activeTab === 'watched' ? 'active' : ''}`}
            onClick={() => onTabChange('watched')}
          >
            <Eye size={16} />
            Ya Vistas
          </button>
        </nav>

        <div className="user-menu">
          <div className="user-info">
            <User size={20} />
            <span>{user?.user_metadata?.full_name || user?.email}</span>
          </div>
          <button onClick={handleSignOut} className="logout-button">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
