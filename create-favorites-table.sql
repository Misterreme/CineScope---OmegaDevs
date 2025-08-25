-- Script para crear la tabla de favoritos desde cero
-- Ejecutar en Supabase SQL Editor

-- 1. Eliminar la tabla problemática si existe
DROP TABLE IF EXISTS user_movie_lists CASCADE;

-- 2. Crear nueva tabla con estructura optimizada
CREATE TABLE user_movie_lists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    imdb_id VARCHAR(20) NOT NULL,
    title VARCHAR(500) NOT NULL,
    year VARCHAR(10),
    poster TEXT,
    list_type VARCHAR(20) NOT NULL CHECK (list_type IN ('watchlist', 'watched', 'favorites')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Crear índices para mejor rendimiento
CREATE INDEX idx_user_movie_lists_user_id ON user_movie_lists(user_id);
CREATE INDEX idx_user_movie_lists_list_type ON user_movie_lists(list_type);
CREATE INDEX idx_user_movie_lists_imdb_id ON user_movie_lists(imdb_id);
CREATE INDEX idx_user_movie_lists_user_list_type ON user_movie_lists(user_id, list_type);

-- 4. Restricción UNIQUE que permite múltiples listas
ALTER TABLE user_movie_lists ADD CONSTRAINT user_movie_lists_user_id_imdb_id_list_type_key 
UNIQUE(user_id, imdb_id, list_type);

-- 5. Habilitar Row Level Security
ALTER TABLE user_movie_lists ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de seguridad
CREATE POLICY "Users can view their own movie lists" ON user_movie_lists
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own movie lists" ON user_movie_lists
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own movie lists" ON user_movie_lists
    FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own movie lists" ON user_movie_lists
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 7. Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Trigger para actualizar timestamp automáticamente
CREATE TRIGGER update_user_movie_lists_updated_at 
    BEFORE UPDATE ON user_movie_lists 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 9. Verificar que se creó correctamente
SELECT '✅ Tabla user_movie_lists creada exitosamente' as status;
SELECT 
    list_type,
    COUNT(*) as count
FROM user_movie_lists 
GROUP BY list_type
ORDER BY list_type;
