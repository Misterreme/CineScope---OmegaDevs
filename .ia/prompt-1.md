
Desarrollar una aplicación web funcional y moderna llamada **Cines Scope**, inspirada en la experiencia de usuario de plataformas como Netflix. El objetivo es permitir a los usuarios descubrir, organizar y calificar películas de forma personalizada y segura.

---

### 🧩 Requerimientos Funcionales

#### 🔐 Autenticación de Usuarios

* Implementar un sistema completo de **registro** y **login** de usuarios.
* Usar **JWT (JSON Web Tokens)** para mantener sesiones seguras.
* Permitir a cada usuario tener un **perfil personalizado**.

#### 🔍 Búsqueda y Exploración de Películas

* Integrar con una API externa como **OMDb** (https://www.omdbapi.com/) para consultar películas.
* Habilitar una barra de **búsqueda en tiempo real** con autocompletado.
* Mostrar información detallada: sinopsis, puntuación, póster, año, género.

#### 📚 Gestión de Listas Personales

* Crear dos listas por usuario:

  * **"Quiero Ver"**: para películas guardadas.
  * **"Ya Vistas"**: para historial de películas vistas.
* Soporte completo de operaciones **CRUD** sobre estas listas.
* Sincronización constante con el perfil del usuario autenticado.

---

### 🛠️ Tecnologías Requeridas

* **Frontend**: React (con enfoque en UI intuitiva y responsiva)
* **Backend**: Node.js (REST API para operaciones de usuarios y listas)
* **Base de Datos**: Supabase (autenticación + almacenamiento de datos)
* **Autenticación**: JWT
* **APIs de Películas**: OMDb API
* **Estilizado**: CSS 

---

### 🎯 Objetivo Final

Una SPA (Single Page Application) optimizada que ofrezca:

* Experiencia de usuario moderna y fluida
* Gestión de películas personalizada
* Seguridad en el manejo de cuentas y datos
* Eficiencia en búsquedas y organización de contenidos
