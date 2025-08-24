# 🎭 CineScope - Plataforma de Streaming Cinematográfico

Una plataforma de streaming moderna y elegante con un diseño cinematográfico premium, construida con React y un sistema de diseño completo.

## ✨ Características Principales

### 🎨 Sistema de Diseño Cinematográfico
- **Paleta de Colores**: Naranja (#FCA311) como color principal, azul (#156064) como secundario
- **Tipografías**: Inter (general), Satoshi (títulos), Poppins (páginas de información)
- **Efectos Visuales**: Glassmorphism, gradientes cinematográficos, transparencias
- **Animaciones**: Transiciones suaves, efectos de hover, animaciones de entrada

### 🏗️ Arquitectura de Componentes
- **Header Transparente**: Con efecto de blur y navegación completa
- **Hero Section**: Landing principal con estadísticas y CTA
- **MovieGrid**: Sistema de filtros avanzados y paginación
- **Footer**: Enlaces organizados y redes sociales
- **Notificaciones**: Sistema global de alertas y mensajes

### 📱 Diseño Responsive
- **Mobile First**: Adaptativo para todos los dispositivos
- **Breakpoints**: 320px, 768px, 1024px, 1200px
- **Grid System**: CSS Grid y Flexbox para layouts complejos

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18, Vite
- **Estilos**: CSS Modules, CSS Variables, CSS Grid/Flexbox
- **Iconos**: Lucide React, Font Awesome
- **Fuentes**: Google Fonts (Inter, Satoshi, Poppins)
- **Autenticación**: Supabase
- **Estado**: React Context API

## 🎯 Estructura del Proyecto

```
src/
├── components/
│   ├── Auth/           # Componentes de autenticación
│   ├── Hero/           # Hero Section principal
│   ├── Layout/         # Header, Footer, Breadcrumbs
│   ├── Movies/         # MovieGrid, MovieCard, filtros
│   └── UI/             # Notificaciones y componentes base
├── contexts/            # Contextos de React
├── pages/               # Páginas principales
├── services/            # Servicios de API
├── styles/              # Sistema de estilos modular
│   ├── variables.css    # Variables CSS del sistema de diseño
│   ├── base.css         # Estilos base y tipografías
│   ├── components.css   # Estilos de componentes
│   ├── utilities.css    # Clases de utilidad
│   └── index.css        # Archivo principal de estilos
└── utils/               # Utilidades y helpers
```

## 🎨 Sistema de Estilos

### Variables CSS Principales
```css
:root {
  /* Colores */
  --color-primary: #FCA311;      /* Naranja principal */
  --color-secondary: #156064;    /* Azul secundario */
  --color-dark-primary: #0E0F19; /* Fondo principal */
  
  /* Espaciado */
  --spacing-xs: 0.25rem;        /* 4px */
  --spacing-sm: 0.5rem;         /* 8px */
  --spacing-md: 1rem;           /* 16px */
  --spacing-lg: 1.5rem;         /* 24px */
  --spacing-xl: 2rem;           /* 32px */
  --spacing-xxl: 3rem;          /* 48px */
  
  /* Transiciones */
  --transition-fast: 0.2s;
  --transition-medium: 0.3s;
  --transition-slow: 0.5s;
}
```

### Componentes Estilizados
- **Glassmorphism**: Efectos de cristal con backdrop-filter
- **Gradientes**: Fondos con múltiples capas y colores
- **Sombras**: Sistema de sombras con diferentes intensidades
- **Hover Effects**: Transformaciones y cambios de color suaves

## 🎬 Componentes Principales

### Header
- Logo SVG personalizado con efectos hover
- Navegación principal con 7 secciones
- Header transparente con efecto de blur
- Estado scrolled con cambios visuales

### Hero Section
- Título principal con gradiente de texto
- Botones CTA con efectos de hover
- Estadísticas en cards glassmorphism
- Elementos decorativos flotantes

### MovieGrid
- Filtros avanzados (género, año, calificación)
- Sistema de paginación completo
- Breadcrumbs para navegación
- Información de resultados

### Footer
- Logo y descripción de la marca
- Enlaces organizados por categorías
- Redes sociales con efectos hover
- Información legal y copyright

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1199px
- **Wide**: 1200px+

### Adaptaciones
- Navegación colapsable en mobile
- Grid adaptativo para diferentes tamaños
- Tipografías responsivas con clamp()
- Espaciado adaptativo

## 🌟 Características Avanzadas

### Sistema de Notificaciones
- 4 tipos: success, error, warning, info
- Posicionamiento configurable
- Auto-dismiss con barra de progreso
- Animaciones de entrada/salida

### Filtros Avanzados
- Filtrado por género, año, calificación
- Ordenamiento por popularidad, rating, año
- Interfaz colapsable
- Indicadores visuales de filtros activos

### Paginación
- Navegación entre páginas
- Información de resultados
- Scroll automático al cambiar página
- Diseño responsive

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm o pnpm

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd CineScope---OmegaDevs

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

### Variables de Entorno
Crear archivo `.env.local`:
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

## 🎭 Personalización

### Colores
Modificar `src/styles/variables.css`:
```css
:root {
  --color-primary: #tu_color_principal;
  --color-secondary: #tu_color_secundario;
  /* ... otros colores */
}
```

### Tipografías
Cambiar fuentes en `src/styles/base.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=TuFuente:wght@400;500;600;700&display=swap');
```

### Espaciado
Ajustar sistema de espaciado en `src/styles/variables.css`:
```css
:root {
  --spacing-xs: 0.5rem;  /* Cambiar de 0.25rem a 0.5rem */
  /* ... otros espaciados */
}
```

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run preview` - Vista previa de producción
- `npm run lint` - Linting del código

## 📚 Documentación Adicional

### Estructura de Estilos
- **variables.css**: Sistema de tokens de diseño
- **base.css**: Reset y estilos base
- **components.css**: Estilos específicos de componentes
- **utilities.css**: Clases de utilidad y helpers
- **index.css**: Archivo principal que importa todo

### Convenciones de Nomenclatura
- **BEM**: Para componentes complejos
- **Kebab-case**: Para clases CSS
- **CamelCase**: Para variables JavaScript
- **PascalCase**: Para componentes React

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Diseño**: Sistema de diseño cinematográfico personalizado
- **Iconos**: Lucide React y Font Awesome
- **Fuentes**: Google Fonts
- **Inspiración**: Plataformas de streaming modernas

---

**CineScope** - Donde el cine cobra vida 🎬✨
