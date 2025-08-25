-- Script para corregir la restricción UNIQUE que impide agregar a favoritos
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar la restricción actual
SELECT conname, contype, pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'user_movie_lists'::regclass;

-- 2. Eliminar la restricción UNIQUE problemática
ALTER TABLE user_movie_lists DROP CONSTRAINT IF EXISTS user_movie_lists_user_id_imdb_id_key;

-- 3. Crear una nueva restricción UNIQUE que permita múltiples listas por película
-- pero evite duplicados en la misma lista
CREATE UNIQUE INDEX idx_user_movie_lists_unique 
ON user_movie_lists(user_id, imdb_id, list_type);

-- 4. Verificar que la nueva restricción se creó correctamente
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'user_movie_lists';

-- 5. Probar insertando una película en múltiples listas
-- (Ejecutar esto solo si quieres probar la funcionalidad)

-- INSERT INTO user_movie_lists (user_id, imdb_id, title, year, poster, list_type)
-- VALUES 
--   ('TU_USER_ID_AQUI', 'tt0111161', 'The Shawshank Redemption', '1994', 'https://example.com/poster.jpg', 'favorites'),
--   ('TU_USER_ID_AQUI', 'tt0111161', 'The Shawshank Redemption', '1994', 'https://example.com/poster.jpg', 'watchlist'),
--   ('TU_USER_ID_AQUI', 'tt0111161', 'The Shawshank Redemption', '1994', 'https://example.com/poster.jpg', 'watched');

-- 6. Verificar que se insertaron correctamente
-- SELECT * FROM user_movie_lists WHERE imdb_id = 'tt0111161' ORDER BY list_type;
