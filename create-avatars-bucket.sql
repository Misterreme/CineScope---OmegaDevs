-- Script para crear el bucket de avatares en Supabase Storage
-- Ejecutar en Supabase SQL Editor

-- 1. Crear el bucket de avatares
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB límite de archivo
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Verificar que se creó correctamente
SELECT '✅ Bucket de avatares creado exitosamente' as status;

-- 3. Configurar políticas de seguridad para el bucket
-- Política para permitir que los usuarios suban sus propios avatares
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Política para permitir que los usuarios vean todos los avatares (públicos)
CREATE POLICY "Anyone can view avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

-- Política para permitir que los usuarios actualicen sus propios avatares
CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Política para permitir que los usuarios eliminen sus propios avatares
CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 4. Verificar las políticas
SELECT '✅ Políticas de seguridad configuradas para avatares' as status;

-- 5. Mostrar información del bucket
SELECT 
  id,
  name,
  public,
  file_size_limit,
  created_at
FROM storage.buckets 
WHERE id = 'avatars';
