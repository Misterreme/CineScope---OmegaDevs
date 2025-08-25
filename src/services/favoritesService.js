// 🎬 SERVICIO DE FAVORITOS - Usando localStorage
// Este servicio maneja la lista de películas favoritas del usuario
// sin necesidad de base de datos, usando solo el almacenamiento local

class FavoritesService {
  constructor() {
    this.storageKey = 'cinescope_favorites';
  }

  // Obtener todos los favoritos
  getFavorites() {
    try {
      const favorites = localStorage.getItem(this.storageKey);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      return [];
    }
  }

  // Verificar si una película está en favoritos
  isFavorite(movieId) {
    try {
      const favorites = this.getFavorites();
      return favorites.some(movie => movie.imdbID === movieId);
    } catch (error) {
      console.error('Error al verificar favorito:', error);
      return false;
    }
  }

  // Agregar película a favoritos
  addToFavorites(movie) {
    try {
      const favorites = this.getFavorites();
      
      // Verificar si ya existe
      if (this.isFavorite(movie.imdbID)) {
        return {
          success: false,
          error: 'La película ya está en favoritos'
        };
      }

      // Agregar timestamp para ordenar por fecha de agregado
      const movieWithTimestamp = {
        ...movie,
        addedAt: new Date().toISOString(),
        id: movie.imdbID // ID único para identificación
      };

      favorites.push(movieWithTimestamp);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));

      return {
        success: true,
        message: 'Película agregada a favoritos',
        favorites: favorites
      };
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
      return {
        success: false,
        error: 'Error al agregar a favoritos'
      };
    }
  }

  // Remover película de favoritos
  removeFromFavorites(movieId) {
    try {
      const favorites = this.getFavorites();
      const filteredFavorites = favorites.filter(movie => movie.imdbID !== movieId);
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredFavorites));

      return {
        success: true,
        message: 'Película removida de favoritos',
        favorites: filteredFavorites
      };
    } catch (error) {
      console.error('Error al remover de favoritos:', error);
      return {
        success: false,
        error: 'Error al remover de favoritos'
      };
    }
  }

  // Obtener cantidad de favoritos
  getFavoritesCount() {
    try {
      const favorites = this.getFavorites();
      return favorites.length;
    } catch (error) {
      console.error('Error al obtener cantidad de favoritos:', error);
      return 0;
    }
  }

  // Limpiar todos los favoritos
  clearAllFavorites() {
    try {
      localStorage.removeItem(this.storageKey);
      return {
        success: true,
        message: 'Todos los favoritos han sido eliminados'
      };
    } catch (error) {
      console.error('Error al limpiar favoritos:', error);
      return {
        success: false,
        error: 'Error al limpiar favoritos'
      };
    }
  }

  // Buscar en favoritos
  searchInFavorites(query) {
    try {
      const favorites = this.getFavorites();
      const searchTerm = query.toLowerCase().trim();
      
      if (!searchTerm) return favorites;

      return favorites.filter(movie => 
        movie.Title.toLowerCase().includes(searchTerm) ||
        movie.Year.toString().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error al buscar en favoritos:', error);
      return [];
    }
  }

  // Obtener favoritos ordenados por fecha de agregado (más recientes primero)
  getFavoritesSortedByDate() {
    try {
      const favorites = this.getFavorites();
      return favorites.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    } catch (error) {
      console.error('Error al ordenar favoritos:', error);
      return [];
    }
  }

  // Exportar favoritos (para backup)
  exportFavorites() {
    try {
      const favorites = this.getFavorites();
      const dataStr = JSON.stringify(favorites, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cinescope_favorites_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      
      return {
        success: true,
        message: 'Favoritos exportados correctamente'
      };
    } catch (error) {
      console.error('Error al exportar favoritos:', error);
      return {
        success: false,
        error: 'Error al exportar favoritos'
      };
    }
  }

  // Importar favoritos (desde backup)
  importFavorites(file) {
    return new Promise((resolve) => {
      try {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          try {
            const favorites = JSON.parse(e.target.result);
            
            // Validar que sea un array
            if (!Array.isArray(favorites)) {
              resolve({
                success: false,
                error: 'Formato de archivo inválido'
              });
              return;
            }

            // Validar estructura de cada película
            const validFavorites = favorites.filter(movie => 
              movie.imdbID && movie.Title && movie.Year
            );

            if (validFavorites.length === 0) {
              resolve({
                success: false,
                error: 'No se encontraron películas válidas en el archivo'
              });
              return;
            }

            // Agregar timestamp si no existe
            const favoritesWithTimestamp = validFavorites.map(movie => ({
              ...movie,
              addedAt: movie.addedAt || new Date().toISOString(),
              id: movie.imdbID
            }));

            localStorage.setItem(this.storageKey, JSON.stringify(favoritesWithTimestamp));

            resolve({
              success: true,
              message: `${validFavorites.length} películas importadas correctamente`,
              favorites: favoritesWithTimestamp
            });
          } catch (parseError) {
            resolve({
              success: false,
              error: 'Error al procesar el archivo'
            });
          }
        };

        reader.readAsText(file);
      } catch (error) {
        resolve({
          success: false,
          error: 'Error al leer el archivo'
        });
      }
    });
  }
}

// Crear instancia singleton
const favoritesService = new FavoritesService();

export { favoritesService };
export default favoritesService;
