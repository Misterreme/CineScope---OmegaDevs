-- Script para corregir la base de datos de CineScope
-- Ejecutar este script en Supabase SQL Editor

-- 1. Eliminar la restricción UNIQUE problemática
ALTER TABLE user_movie_lists DROP CONSTRAINT IF EXISTS user_movie_lists_user_id_imdb_id_key;

-- 2. Agregar la nueva restricción UNIQUE que permite múltiples listas
ALTER TABLE user_movie_lists ADD CONSTRAINT user_movie_lists_user_id_imdb_id_list_type_key 
UNIQUE(user_id, imdb_id, list_type);

-- 3. Actualizar la validación de list_type para remover 'saved' y usar solo 'watchlist'
-- Primero, convertir cualquier entrada 'saved' a 'watchlist'
UPDATE user_movie_lists 
SET list_type = 'watchlist' 
WHERE list_type = 'saved';

-- 4. Verificar que no haya duplicados antes de aplicar la nueva restricción
-- (esto se hace automáticamente con la nueva restricción UNIQUE)

-- 5. Verificar el estado actual
SELECT 
    list_type,
    COUNT(*) as count
FROM user_movie_lists 
GROUP BY list_type
ORDER BY list_type;

-- 6. Verificar que la nueva restricción funciona
-- Intentar insertar una película en múltiples listas para el mismo usuario
-- (esto debería funcionar ahora)
