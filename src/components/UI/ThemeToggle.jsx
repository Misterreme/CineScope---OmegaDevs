import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import './ThemeToggle.css'

const ThemeToggle = ({ className = '', size = 'medium' }) => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      className={`theme-toggle ${className} theme-toggle--${size}`}
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      title={isDarkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      <div className="theme-toggle-icon">
        {isDarkMode ? (
          <Sun size={20} className="theme-toggle-sun" />
        ) : (
          <Moon size={20} className="theme-toggle-moon" />
        )}
      </div>
    </button>
  )
}

export default ThemeToggle
