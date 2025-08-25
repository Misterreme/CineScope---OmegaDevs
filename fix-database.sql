-- Script para corregir la tabla user_movie_lists si es necesario
-- Ejecutar en Supabase SQL Editor DESPUÉS de debug-database.sql

-- 1. Agregar campos de fecha si no existen
DO $$ 
BEGIN
    -- Verificar si created_at existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_movie_lists' AND column_name = 'created_at'
    ) THEN
        ALTER TABLE user_movie_lists ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Campo created_at agregado';
    ELSE
        RAISE NOTICE 'Campo created_at ya existe';
    END IF;

    -- Verificar si updated_at existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_movie_lists' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE user_movie_lists ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Campo updated_at agregado';
    ELSE
        RAISE NOTICE 'Campo updated_at ya existe';
    END IF;
END $$;

-- 2. Actualizar registros existentes sin fechas
UPDATE user_movie_lists 
SET 
    created_at = NOW() - INTERVAL '1 day' * (random() * 30)::integer,
    updated_at = NOW() - INTERVAL '1 day' * (random() * 30)::integer
WHERE created_at IS NULL OR updated_at IS NULL;

-- 3. Verificar que todos los registros tengan fechas
SELECT 
    list_type,
    COUNT(*) as total,
    COUNT(created_at) as with_created_at,
    COUNT(updated_at) as with_updated_at
FROM user_movie_lists 
GROUP BY list_type;

-- 4. Verificar que las fechas se vean correctas
SELECT 
    list_type,
    title,
    created_at,
    updated_at
FROM user_movie_lists 
WHERE list_type = 'watched'
ORDER BY created_at DESC
LIMIT 5;
