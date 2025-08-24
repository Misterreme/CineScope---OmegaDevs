-- Script para actualizar el esquema existente de CineScope
-- Ejecutar este script en Supabase para agregar el tipo 'favorites'

-- Actualizar la restricción CHECK para incluir 'favorites'
ALTER TABLE user_movie_lists 
DROP CONSTRAINT IF EXISTS user_movie_lists_list_type_check;

ALTER TABLE user_movie_lists 
ADD CONSTRAINT user_movie_lists_list_type_check 
CHECK (list_type IN ('watchlist', 'watched', 'saved', 'favorites'));

-- Verificar que la tabla se actualizó correctamente
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'user_movie_lists' 
AND column_name = 'list_type';

-- Verificar la restricción
SELECT 
  constraint_name, 
  check_clause
FROM information_schema.check_constraints 
WHERE constraint_name = 'user_movie_lists_list_type_check';
