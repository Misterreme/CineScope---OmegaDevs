-- Script simple para crear bucket de avatares
-- Ejecutar en Supabase SQL Editor

-- Crear bucket de avatares
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Verificar creación
SELECT 'Bucket avatars creado' as status;
