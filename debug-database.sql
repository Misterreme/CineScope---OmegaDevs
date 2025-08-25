-- Script para debuggear la base de datos de películas
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar la estructura de la tabla user_movie_lists
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_movie_lists'
ORDER BY ordinal_position;

-- 2. Verificar si hay datos en la tabla
SELECT COUNT(*) as total_movies FROM user_movie_lists;

-- 3. Verificar películas marcadas como vistas
SELECT 
    id,
    user_id,
    imdb_id,
    title,
    list_type,
    created_at,
    updated_at,
    year,
    poster
FROM user_movie_lists 
WHERE list_type = 'watched'
ORDER BY created_at DESC
LIMIT 10;

-- 4. Verificar películas en watchlist
SELECT 
    id,
    user_id,
    imdb_id,
    title,
    list_type,
    created_at,
    updated_at,
    year,
    poster
FROM user_movie_lists 
WHERE list_type = 'watchlist'
ORDER BY created_at DESC
LIMIT 10;

-- 5. Verificar si hay campos de fecha vacíos
SELECT 
    list_type,
    COUNT(*) as total,
    COUNT(created_at) as with_created_at,
    COUNT(updated_at) as with_updated_at
FROM user_movie_lists 
GROUP BY list_type;

-- 6. Verificar el formato de las fechas
SELECT 
    list_type,
    created_at,
    updated_at,
    title
FROM user_movie_lists 
WHERE list_type = 'watched'
ORDER BY created_at DESC
LIMIT 5;
