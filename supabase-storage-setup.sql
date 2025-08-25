-- 🗂️ CONFIGURACIÓN DE SUPABASE STORAGE PARA AVATARES
-- Este script configura el bucket de Storage para almacenar las imágenes de perfil

-- Crear bucket para avatares (si no existe)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB en bytes
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Política para permitir a los usuarios subir sus propios avatares
CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Política para permitir a los usuarios ver todos los avatares (públicos)
CREATE POLICY "Users can view all avatars" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'avatars');

-- Política para permitir a los usuarios actualizar sus propios avatares
CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Política para permitir a los usuarios eliminar sus propios avatares
CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Comentarios sobre el uso
COMMENT ON TABLE storage.buckets IS 'Bucket para almacenar avatares de usuario';
COMMENT ON COLUMN storage.buckets.file_size_limit IS 'Límite de 5MB por archivo';
COMMENT ON COLUMN storage.buckets.allowed_mime_types IS 'Tipos de imagen permitidos: JPEG, PNG, GIF, WebP';
