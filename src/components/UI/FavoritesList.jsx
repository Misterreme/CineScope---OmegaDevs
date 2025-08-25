import React, { useState, useEffect } from 'react';
import { Heart, Search, Download, Upload, Trash2, Calendar, Star } from 'lucide-react';
import { favoritesService } from '../../services/favoritesService';
import FavoriteButton from './FavoriteButton';
import './FavoritesList.css';

const FavoritesList = ({ onClose, show = false }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('date'); // 'date', 'title', 'year'

  // Cargar favoritos al montar el componente
  useEffect(() => {
    loadFavorites();
  }, []);

  // Filtrar y ordenar favoritos cuando cambien
  useEffect(() => {
    filterAndSortFavorites();
  }, [favorites, searchQuery, sortBy]);

  const loadFavorites = () => {
    try {
      const loadedFavorites = favoritesService.getFavoritesSortedByDate();
      setFavorites(loadedFavorites);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  };

  const filterAndSortFavorites = () => {
    let filtered = favorites;

    // Aplicar búsqueda
    if (searchQuery.trim()) {
      filtered = favoritesService.searchInFavorites(searchQuery);
    }

    // Aplicar ordenamiento
    switch (sortBy) {
      case 'title':
        filtered = [...filtered].sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case 'year':
        filtered = [...filtered].sort((a, b) => b.Year - a.Year);
        break;
      case 'date':
      default:
        filtered = [...filtered].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
    }

    setFilteredFavorites(filtered);
  };

  const handleFavoriteChange = (updatedFavorites) => {
    setFavorites(updatedFavorites);
  };

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const result = favoritesService.exportFavorites();
      if (result.success) {
        showNotification('Favoritos exportados correctamente', 'success');
      } else {
        showNotification(result.error, 'error');
      }
    } catch (error) {
      showNotification('Error al exportar favoritos', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const result = await favoritesService.importFavorites(file);
      if (result.success) {
        setFavorites(result.favorites);
        showNotification(result.message, 'success');
      } else {
        showNotification(result.error, 'error');
      }
    } catch (error) {
      showNotification('Error al importar favoritos', 'error');
    } finally {
      setIsLoading(false);
      // Limpiar el input
      event.target.value = '';
    }
  };

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los favoritos? Esta acción no se puede deshacer.')) {
      const result = favoritesService.clearAllFavorites();
      if (result.success) {
        setFavorites([]);
        showNotification(result.message, 'success');
      } else {
        showNotification(result.error, 'error');
      }
    }
  };

  const showNotification = (message, type) => {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = `favorites-notification ${type}`;
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
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Fecha desconocida';
    }
  };

  if (!show) return null;

  return (
    <div className="favorites-overlay" onClick={onClose}>
      <div className="favorites-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="favorites-header">
          <div className="favorites-title">
            <Heart size={24} className="favorites-icon" />
            <h2>Mis Favoritos</h2>
            <span className="favorites-count">({favorites.length})</span>
          </div>
          
          <button className="favorites-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Controles */}
        <div className="favorites-controls">
          {/* Búsqueda */}
          <div className="favorites-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar en favoritos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Ordenamiento */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="favorites-sort"
          >
            <option value="date">Más recientes</option>
            <option value="title">Por título</option>
            <option value="year">Por año</option>
          </select>

          {/* Acciones */}
          <div className="favorites-actions">
            <button
              className="action-button export-button"
              onClick={handleExport}
              disabled={isLoading || favorites.length === 0}
              title="Exportar favoritos"
            >
              <Download size={16} />
              <span>Exportar</span>
            </button>

            <label className="action-button import-button" title="Importar favoritos">
              <Upload size={16} />
              <span>Importar</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>

            <button
              className="action-button clear-button"
              onClick={handleClearAll}
              disabled={isLoading || favorites.length === 0}
              title="Limpiar todos los favoritos"
            >
              <Trash2 size={16} />
              <span>Limpiar</span>
            </button>
          </div>
        </div>

        {/* Lista de favoritos */}
        <div className="favorites-content">
          {isLoading ? (
            <div className="favorites-loading">
              <div className="loading-spinner"></div>
              <p>Procesando...</p>
            </div>
          ) : filteredFavorites.length === 0 ? (
            <div className="favorites-empty">
              {searchQuery ? (
                <>
                  <Search size={48} className="empty-icon" />
                  <h3>No se encontraron resultados</h3>
                  <p>Intenta con otros términos de búsqueda</p>
                </>
              ) : (
                <>
                  <Heart size={48} className="empty-icon" />
                  <h3>No tienes favoritos aún</h3>
                  <p>Agrega películas a tus favoritos para verlas aquí</p>
                </>
              )}
            </div>
          ) : (
            <div className="favorites-grid">
              {filteredFavorites.map((movie) => (
                <div key={movie.imdbID} className="favorite-item">
                  <div className="favorite-poster">
                    <img
                      src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
                      alt={movie.Title}
                      className="poster-image"
                    />
                    <div className="favorite-overlay">
                      <FavoriteButton
                        movie={movie}
                        onFavoriteChange={handleFavoriteChange}
                        size="medium"
                      />
                    </div>
                  </div>
                  
                  <div className="favorite-info">
                    <h4 className="favorite-title">{movie.Title}</h4>
                    <div className="favorite-meta">
                      <span className="favorite-year">
                        <Calendar size={14} />
                        {movie.Year}
                      </span>
                      <span className="favorite-date">
                        <Star size={14} />
                        {formatDate(movie.addedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;
