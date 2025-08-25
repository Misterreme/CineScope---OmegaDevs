-- Script para VERIFICAR el estado actual de la base de datos
-- Ejecutar en Supabase SQL Editor para diagnosticar

-- 1. Verificar restricciones actuales
SELECT 
    'Restricciones actuales:' as info,
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_movie_lists'::regclass;

-- 2. Verificar estructura de la tabla
SELECT 
    'Estructura de la tabla:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_movie_lists'
ORDER BY ordinal_position;

-- 3. Verificar datos existentes
SELECT 
    'Datos existentes:' as info,
    list_type,
    COUNT(*) as count
FROM user_movie_lists 
GROUP BY list_type
ORDER BY list_type;

-- 4. Verificar si 'favorites' está permitido
SELECT 
    '¿Favorites está permitido?' as pregunta,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conrelid = 'user_movie_lists'::regclass 
            AND contype = 'c' 
            AND pg_get_constraintdef(oid) LIKE '%favorites%'
        ) THEN '✅ SÍ' 
        ELSE '❌ NO' 
    END as respuesta;
