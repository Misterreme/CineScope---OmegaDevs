-- Script para crear la tabla de puntuaciones de películas
-- Ejecutar en Supabase SQL Editor

-- 1. Crear tabla de puntuaciones
CREATE TABLE IF NOT EXISTS user_movie_ratings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    imdb_id VARCHAR(20) NOT NULL,
    movie_title VARCHAR(500) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Un usuario solo puede puntuar una película una vez
    UNIQUE(user_id, imdb_id)
);

-- 2. Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_user_movie_ratings_user_id ON user_movie_ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_movie_ratings_imdb_id ON user_movie_ratings(imdb_id);
CREATE INDEX IF NOT EXISTS idx_user_movie_ratings_rating ON user_movie_ratings(rating);
CREATE INDEX IF NOT EXISTS idx_user_movie_ratings_created_at ON user_movie_ratings(created_at);

-- 3. Habilitar Row Level Security
ALTER TABLE user_movie_ratings ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de seguridad
CREATE POLICY "Users can view their own movie ratings" ON user_movie_ratings
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own movie ratings" ON user_movie_ratings
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own movie ratings" ON user_movie_ratings
    FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own movie ratings" ON user_movie_ratings
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 5. Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_ratings_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Trigger para actualizar timestamp automáticamente
CREATE TRIGGER update_user_movie_ratings_updated_at 
    BEFORE UPDATE ON user_movie_ratings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_ratings_updated_at_column();

-- 7. Verificar que se creó correctamente
SELECT '✅ Tabla user_movie_ratings creada exitosamente' as status;
