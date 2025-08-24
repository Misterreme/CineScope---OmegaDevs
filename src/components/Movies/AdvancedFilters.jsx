import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import './AdvancedFilters.css';

const AdvancedFilters = ({ onFiltersChange, isOpen, onToggle }) => {
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    duration: '',
    sortBy: 'popularity'
  });

  const genres = [
    'Acción', 'Aventura', 'Comedia', 'Drama', 'Fantasía', 
    'Horror', 'Misterio', 'Romance', 'Ciencia Ficción', 'Thriller'
  ];

  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);
  const ratings = ['9+', '8+', '7+', '6+', '5+', '4+', '3+', '2+', '1+'];
  const durations = ['< 90 min', '90-120 min', '120-150 min', '> 150 min'];
  const sortOptions = [
    { value: 'popularity', label: 'Popularidad' },
    { value: 'rating', label: 'Calificación' },
    { value: 'year', label: 'Año' },
    { value: 'title', label: 'Título' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      genre: '',
      year: '',
      rating: '',
      duration: '',
      sortBy: 'popularity'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== 'popularity'
  );

  return (
    <div className={`advanced-filters ${isOpen ? 'open' : ''}`}>
      <div className="filters-header" onClick={onToggle}>
        <div className="filters-title">
          <Filter size={20} />
          <span>Filtros Avanzados</span>
          {hasActiveFilters && <span className="active-indicator"></span>}
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isOpen && (
        <div className="filters-content">
          <div className="filters-grid">
            {/* Género */}
            <div className="filter-group">
              <label className="filter-label">Género</label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="filter-select"
              >
                <option value="">Todos los géneros</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Año */}
            <div className="filter-group">
              <label className="filter-label">Año</label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="filter-select"
              >
                <option value="">Todos los años</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Calificación */}
            <div className="filter-group">
              <label className="filter-label">Calificación mínima</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="filter-select"
              >
                <option value="">Cualquier calificación</option>
                {ratings.map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>

            {/* Duración */}
            <div className="filter-group">
              <label className="filter-label">Duración</label>
              <select
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="filter-select"
              >
                <option value="">Cualquier duración</option>
                {durations.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>

            {/* Ordenar por */}
            <div className="filter-group">
              <label className="filter-label">Ordenar por</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="filter-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="filters-actions">
            <button
              onClick={clearFilters}
              className="btn btn-outline btn-clear-filters"
              disabled={!hasActiveFilters}
            >
              <X size={16} />
              Limpiar Filtros
            </button>
            
            <button
              onClick={onToggle}
              className="btn btn-primary btn-apply-filters"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;
