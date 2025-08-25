# 🔑 Configuración de OMDB API para CineScope

## 📋 Problema Identificado

El error "Incorrect IMDb ID" indica que la API key de OMDB no está configurada correctamente en tu aplicación.

## 🛠️ Solución: Configurar API Key

### **1. Obtener API Key de OMDB:**

1. Ve a [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. Completa el formulario para obtener una API key gratuita
3. Verifica tu email para activar la key
4. Copia tu API key (formato: `abc12345`)

### **2. Crear Archivo de Variables de Entorno:**

En la raíz de tu proyecto, crea un archivo llamado `.env`:

```bash
# OMDB API Configuration
VITE_OMDB_API_KEY=tu_api_key_aqui

# Ejemplo:
VITE_OMDB_API_KEY=abc12345
```

### **3. Verificar Configuración:**

- El archivo `.env` debe estar en la raíz del proyecto (mismo nivel que `package.json`)
- La variable debe empezar con `VITE_` para que Vite la reconozca
- No incluyas comillas alrededor del valor
- No incluyas espacios alrededor del `=`

### **4. Reiniciar la Aplicación:**

Después de crear/modificar el archivo `.env`:

1. Detén el servidor de desarrollo (`Ctrl+C`)
2. Reinicia la aplicación (`npm run dev`)

## 🔍 Verificación

### **En la Consola del Navegador:**
Deberías ver estos logs sin errores:

```
🎬 MovieService: Getting details for IMDb ID: tt0111161
🔑 API Key available: true
🌐 Base URL: https://www.omdbapi.com/
📡 Request params: {apikey: "abc12345", i: "tt0111161", plot: "full"}
```

### **Si la API Key no está configurada:**
Verás este error:

```
❌ OMDB API Key no está configurada. Por favor, crea un archivo .env con VITE_OMDB_API_KEY=tu_api_key_aqui
```

## 📝 Ejemplo de Archivo .env

```env
# OMDB API Key (obtener en http://www.omdbapi.com/apikey.aspx)
VITE_OMDB_API_KEY=abc12345

# Supabase Configuration (si usas Supabase)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

## 🚨 Problemas Comunes

### **1. "API Key no está configurada":**
- Verifica que el archivo `.env` esté en la raíz del proyecto
- Verifica que la variable se llame `VITE_OMDB_API_KEY`
- Reinicia la aplicación después de crear/modificar `.env`

### **2. "Incorrect IMDb ID":**
- Verifica que tu API key sea válida
- Verifica que hayas verificado tu email después de registrarte
- La API key gratuita tiene límites de uso

### **3. "Error connecting to movie database":**
- Verifica tu conexión a internet
- Verifica que la API de OMDB esté funcionando
- Verifica que tu API key no haya expirado

## 🌟 Beneficios de la Configuración

Una vez configurada la API key:

- ✅ Las tarjetas de película serán clickeables
- ✅ Se mostrarán detalles completos de películas
- ✅ Información de director, reparto, géneros, etc.
- ✅ Calificaciones IMDB y premios
- ✅ Sinopsis completa de la película

## 📚 Recursos Adicionales

- [OMDB API Documentation](http://www.omdbapi.com/)
- [OMDB API Key Registration](http://www.omdbapi.com/apikey.aspx)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

*Configura tu API key y disfruta de la experiencia completa de CineScope* 🎬
