import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { favoritesService } from '../../services/favoritesService';
import './FavoriteButton.css';

const FavoriteButton = ({ movie, onFavoriteChange, size = 'medium', showText = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar estado inicial de favoritos
  useEffect(() => {
    if (movie?.imdbID) {
      setIsFavorite(favoritesService.isFavorite(movie.imdbID));
    }
  }, [movie?.imdbID]);

  const handleToggleFavorite = async () => {
    if (!movie?.imdbID) return;

    setIsLoading(true);
    
    try {
      let result;
      
      if (isFavorite) {
        // Remover de favoritos
        result = favoritesService.removeFromFavorites(movie.imdbID);
      } else {
        // Agregar a favoritos
        result = favoritesService.addToFavorites(movie);
      }

      if (result.success) {
        setIsFavorite(!isFavorite);
        
        // Notificar cambio al componente padre
        if (onFavoriteChange) {
          onFavoriteChange(result.favorites);
        }
        
        // Mostrar notificación temporal
        showNotification(result.message, 'success');
      } else {
        showNotification(result.error, 'error');
      }
    } catch (error) {
      console.error('Error al manejar favoritos:', error);
      showNotification('Error al manejar favoritos', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = `favorite-notification ${type}`;
    notification.textContent = message;
    
    // Estilos básicos
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    // Agregar keyframes para la animación
    if (!document.querySelector('#favorite-notification-keyframes')) {
      const style = document.createElement('style');
      style.id = 'favorite-notification-keyframes';
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  if (!movie?.imdbID) return null;

  const buttonClasses = [
    'favorite-button',
    `favorite-button--${size}`,
    isFavorite ? 'favorite-button--active' : '',
    isLoading ? 'favorite-button--loading' : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={handleToggleFavorite}
      disabled={isLoading}
      title={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
      aria-label={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
    >
      <Heart 
        size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
        className="favorite-icon"
        fill={isFavorite ? 'currentColor' : 'none'}
      />
      
      {showText && (
        <span className="favorite-text">
          {isFavorite ? 'En favoritos' : 'Agregar'}
        </span>
      )}
      
      {isLoading && (
        <div className="favorite-loading">
          <div className="favorite-loading-spinner"></div>
        </div>
      )}
    </button>
  );
};

export default FavoriteButton;
