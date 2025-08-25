import { useState, useEffect, useCallback } from 'react';
import { favoritesService } from '../services/favoritesService';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar favoritos
  const loadFavorites = useCallback(() => {
    try {
      const loadedFavorites = favoritesService.getFavoritesSortedByDate();
      setFavorites(loadedFavorites);
      setFavoritesCount(loadedFavorites.length);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  }, []);

  // Agregar a favoritos
  const addToFavorites = useCallback(async (movie) => {
    setIsLoading(true);
    try {
      const result = favoritesService.addToFavorites(movie);
      if (result.success) {
        setFavorites(result.favorites);
        setFavoritesCount(result.favorites.length);
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
      return { success: false, error: 'Error al agregar a favoritos' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Remover de favoritos
  const removeFromFavorites = useCallback(async (movieId) => {
    setIsLoading(true);
    try {
      const result = favoritesService.removeFromFavorites(movieId);
      if (result.success) {
        setFavorites(result.favorites);
        setFavoritesCount(result.favorites.length);
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error al remover de favoritos:', error);
      return { success: false, error: 'Error al remover de favoritos' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verificar si una película está en favoritos
  const isFavorite = useCallback((movieId) => {
    return favorites.some(movie => movie.imdbID === movieId);
  }, [favorites]);

  // Buscar en favoritos
  const searchInFavorites = useCallback((query) => {
    return favoritesService.searchInFavorites(query);
  }, []);

  // Limpiar todos los favoritos
  const clearAllFavorites = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = favoritesService.clearAllFavorites();
      if (result.success) {
        setFavorites([]);
        setFavoritesCount(0);
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error al limpiar favoritos:', error);
      return { success: false, error: 'Error al limpiar favoritos' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Exportar favoritos
  const exportFavorites = useCallback(() => {
    return favoritesService.exportFavorites();
  }, []);

  // Importar favoritos
  const importFavorites = useCallback(async (file) => {
    setIsLoading(true);
    try {
      const result = await favoritesService.importFavorites(file);
      if (result.success) {
        setFavorites(result.favorites);
        setFavoritesCount(result.favorites.length);
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error al importar favoritos:', error);
      return { success: false, error: 'Error al importar favoritos' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar favoritos al montar el componente
  useEffect(() => {
    loadFavorites();

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // También escuchar cambios en el mismo tab
    const handleCustomStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('favoritesChanged', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesChanged', handleCustomStorageChange);
    };
  }, [loadFavorites]);

  return {
    favorites,
    favoritesCount,
    isLoading,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    searchInFavorites,
    clearAllFavorites,
    exportFavorites,
    importFavorites,
    loadFavorites
  };
};

export default useFavorites;
