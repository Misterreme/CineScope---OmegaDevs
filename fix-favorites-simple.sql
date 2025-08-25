-- Script SIMPLE para corregir favoritos en CineScope
-- Ejecutar en Supabase SQL Editor

-- 1. Eliminar restricción problemática
ALTER TABLE user_movie_lists DROP CONSTRAINT IF EXISTS user_movie_lists_list_type_check;

-- 2. Agregar nueva restricción con 'favorites'
ALTER TABLE user_movie_lists ADD CONSTRAINT user_movie_lists_list_type_check 
CHECK (list_type IN ('watchlist', 'watched', 'favorites'));

-- 3. Eliminar restricción UNIQUE problemática
ALTER TABLE user_movie_lists DROP CONSTRAINT IF EXISTS user_movie_lists_user_id_imdb_id_key;

-- 4. Agregar nueva restricción UNIQUE que permite múltiples listas
ALTER TABLE user_movie_lists ADD CONSTRAINT user_movie_lists_user_id_imdb_id_list_type_key 
UNIQUE(user_id, imdb_id, list_type);

-- 5. Verificar que funcionó
SELECT '✅ Restricciones actualizadas correctamente' as status;
