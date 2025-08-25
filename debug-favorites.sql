-- Script de depuración para favoritos
-- Ejecutar en Supabase SQL Editor paso a paso

-- 1. Verificar que la tabla existe y tiene datos
SELECT 
  COUNT(*) as total_records,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT imdb_id) as unique_movies
FROM user_movie_lists;

-- 2. Verificar la estructura de la tabla
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'user_movie_lists'
ORDER BY ordinal_position;

-- 3. Verificar las restricciones actuales
SELECT 
  conname as constraint_name,
  contype as constraint_type,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'user_movie_lists'::regclass;

-- 4. Verificar los índices
SELECT 
  indexname,
  indexdef
FROM pg_indexes 
WHERE tablename = 'user_movie_lists';

-- 5. Verificar las políticas RLS
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check
FROM pg_policies 
WHERE tablename = 'user_movie_lists';

-- 6. Verificar datos por tipo de lista
SELECT 
  list_type,
  COUNT(*) as count,
  MIN(created_at) as oldest,
  MAX(created_at) as newest
FROM user_movie_lists 
GROUP BY list_type
ORDER BY list_type;

-- 7. Verificar si hay algún problema con la restricción UNIQUE
-- Si hay problemas, ejecutar esto:
-- ALTER TABLE user_movie_lists DROP CONSTRAINT IF EXISTS user_movie_lists_user_id_imdb_id_key;

-- 8. Crear la restricción correcta
-- CREATE UNIQUE INDEX idx_user_movie_lists_unique 
-- ON user_movie_lists(user_id, imdb_id, list_type);

-- 9. Probar insertar una película de prueba (reemplaza USER_ID_AQUI con tu ID real)
-- INSERT INTO user_movie_lists (user_id, imdb_id, title, year, poster, list_type)
-- VALUES ('USER_ID_AQUI', 'tt0111161', 'The Shawshank Redemption', '1994', 'https://example.com/poster.jpg', 'favorites')
-- ON CONFLICT (user_id, imdb_id, list_type) DO NOTHING;

-- 10. Verificar que se insertó
-- SELECT * FROM user_movie_lists WHERE list_type = 'favorites' ORDER BY created_at DESC LIMIT 5;
