-- Script para verificar y corregir la tabla de favoritos
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar que la tabla existe
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'user_movie_lists'
);

-- 2. Verificar la estructura de la tabla
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'user_movie_lists'
ORDER BY ordinal_position;

-- 3. Verificar las políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'user_movie_lists';

-- 4. Verificar si hay datos en la tabla
SELECT list_type, COUNT(*) as count
FROM user_movie_lists 
GROUP BY list_type;

-- 5. Verificar si hay algún problema con la restricción UNIQUE
-- Si hay problemas, eliminar la restricción y recrearla
-- ALTER TABLE user_movie_lists DROP CONSTRAINT IF EXISTS user_movie_lists_user_id_imdb_id_key;

-- 6. Recrear la tabla si es necesario (CUIDADO: esto eliminará todos los datos)
/*
DROP TABLE IF EXISTS user_movie_lists CASCADE;

CREATE TABLE user_movie_lists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    imdb_id VARCHAR(20) NOT NULL,
    title VARCHAR(500) NOT NULL,
    year VARCHAR(10),
    poster TEXT,
    list_type VARCHAR(20) NOT NULL CHECK (list_type IN ('watchlist', 'watched', 'saved', 'favorites')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice único para evitar duplicados
CREATE UNIQUE INDEX idx_user_movie_lists_unique 
ON user_movie_lists(user_id, imdb_id, list_type);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_user_movie_lists_user_id ON user_movie_lists(user_id);
CREATE INDEX idx_user_movie_lists_list_type ON user_movie_lists(list_type);
CREATE INDEX idx_user_movie_lists_imdb_id ON user_movie_lists(imdb_id);

-- Habilitar RLS
ALTER TABLE user_movie_lists ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Users can view their own movie lists" ON user_movie_lists
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own movie lists" ON user_movie_lists
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own movie lists" ON user_movie_lists
    FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own movie lists" ON user_movie_lists
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Crear función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger
CREATE TRIGGER update_user_movie_lists_updated_at 
    BEFORE UPDATE ON user_movie_lists 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
*/

-- 7. Insertar una película de prueba para verificar que funciona
-- INSERT INTO user_movie_lists (user_id, imdb_id, title, year, poster, list_type)
-- VALUES ('TU_USER_ID_AQUI', 'tt0111161', 'The Shawshank Redemption', '1994', 'https://example.com/poster.jpg', 'favorites');

-- 8. Verificar que se insertó correctamente
-- SELECT * FROM user_movie_lists WHERE list_type = 'favorites';
