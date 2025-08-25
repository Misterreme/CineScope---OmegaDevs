-- Script para corregir la restricción de verificación de list_type
-- Ejecutar este script en Supabase SQL Editor

-- 1. Verificar la restricción actual
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_movie_lists'::regclass 
AND contype = 'c';

-- 2. Eliminar la restricción de verificación existente
ALTER TABLE user_movie_lists DROP CONSTRAINT IF EXISTS user_movie_lists_list_type_check;

-- 3. Agregar la nueva restricción que incluye 'favorites'
ALTER TABLE user_movie_lists ADD CONSTRAINT user_movie_lists_list_type_check 
CHECK (list_type IN ('watchlist', 'watched', 'favorites'));

-- 4. Verificar que la nueva restricción se aplicó correctamente
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_movie_lists'::regclass 
AND contype = 'c';

-- 5. Verificar que no hay duplicados antes de aplicar la restricción UNIQUE
-- (esto se hace automáticamente con la nueva restricción UNIQUE)
ALTER TABLE user_movie_lists DROP CONSTRAINT IF EXISTS user_movie_lists_user_id_imdb_id_key;

-- 6. Agregar la nueva restricción UNIQUE que permite múltiples listas
ALTER TABLE user_movie_lists ADD CONSTRAINT user_movie_lists_user_id_imdb_id_list_type_key 
UNIQUE(user_id, imdb_id, list_type);

-- 7. Verificar el estado final de la tabla
SELECT 
    list_type,
    COUNT(*) as count
FROM user_movie_lists 
GROUP BY list_type
ORDER BY list_type;

-- 8. Probar insertar una película en favoritos (debería funcionar ahora)
-- INSERT INTO user_movie_lists (user_id, imdb_id, title, year, poster, list_type)
-- VALUES ('3a70d1a5-2c02-4653-b430-c35ac3c3db8c', 'tt0111161', 'The Shawshank Redemption', '1994', 'https://example.com/poster.jpg', 'favorites');
