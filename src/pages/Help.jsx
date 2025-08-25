import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Play, 
  Bookmark, 
  Eye, 
  Heart, 
  Settings, 
  Users, 
  ArrowLeft, 
  Home,
  Film,
  Star,
  Calendar,
  Clock,
  Globe,
  Award,
  X,
  Menu,
  ChevronDown,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const Help = () => {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeSection, setActiveSection] = useState('getting-started');

  const handleBack = () => {
    navigate('/');
  };

  const toggleFAQ = (id) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const faqs = [
    {
      id: 1,
      question: "¿Cómo puedo crear una cuenta en CineScope?",
      answer: "Para crear una cuenta, haz clic en 'Iniciar Sesión' en la parte superior derecha y luego selecciona 'Crear cuenta'. Completa el formulario con tu información y verifica tu email. Una vez verificado, podrás acceder a todas las funcionalidades de la plataforma."
    },
    {
      id: 2,
      question: "¿Cómo funciona el sistema de favoritos?",
      answer: "Los favoritos se guardan localmente en tu navegador. Puedes agregar películas a favoritos haciendo clic en el botón del corazón en cualquier tarjeta de película o en el modal de detalles. Los favoritos se mantienen incluso si cierras sesión."
    },
    {
      id: 3,
      question: "¿Cómo marco una película como vista?",
      answer: "Haz clic en el botón del ojo (👁️) en cualquier tarjeta de película o en el modal de detalles. La película se agregará a tu lista de 'Películas Vistas' y el botón cambiará de estado para indicar que ya la has visto."
    },
    {
      id: 4,
      question: "¿Cómo guardo películas para ver después?",
      answer: "Haz clic en el botón del marcador (🔖) en cualquier tarjeta de película o en el modal de detalles. La película se agregará a tu lista de 'Guardados' y podrás acceder a ella desde la pestaña 'Guardados' en el header."
    },
    {
      id: 5,
      question: "¿Cómo funciona el buscador?",
      answer: "Haz clic en el botón de búsqueda (🔍) en el header. Escribe el nombre de la película que buscas y los resultados aparecerán en tiempo real. Haz clic en cualquier resultado para abrir el modal de detalles de la película."
    },
    {
      id: 6,
      question: "¿Puedo explorar películas por categorías?",
      answer: "Sí, en la página de inicio encontrarás la sección 'Explorar por categoría' con opciones como Acción, Comedia, Ciencia Ficción, Romance, Terror, Drama, Fantasía, Misterio, Aventura y Suspenso. Haz clic en 'Explorar' para ver todas las películas de esa categoría."
    },
    {
      id: 7,
      question: "¿Cómo se sincronizan mis listas?",
      answer: "Tus listas de 'Vistas' y 'Guardados' se sincronizan automáticamente con tu cuenta de usuario y se almacenan en la base de datos. Los favoritos se guardan localmente en tu navegador. Todos los cambios se reflejan inmediatamente en la interfaz."
    },
    {
      id: 8,
      question: "¿En qué dispositivos puedo usar CineScope?",
      answer: "CineScope está optimizado para funcionar en cualquier dispositivo con un navegador web moderno: computadoras (Windows, macOS, Linux), smartphones (iOS, Android), tablets y smart TVs. La interfaz se adapta automáticamente al tamaño de pantalla."
    }
  ];

  const features = [
    {
      icon: <Search size={24} />,
      title: "Búsqueda Inteligente",
      description: "Encuentra películas rápidamente con búsqueda en tiempo real y sugerencias automáticas."
    },
    {
      icon: <Bookmark size={24} />,
      title: "Lista Personal",
      description: "Guarda películas que quieres ver después en tu lista personal de 'Guardados'."
    },
    {
      icon: <Eye size={24} />,
      title: "Historial de Vistas",
      description: "Lleva un registro de todas las películas que has visto con tu lista de 'Vistas'."
    },
    {
      icon: <Heart size={24} />,
      title: "Favoritos",
      description: "Marca tus películas favoritas para acceder a ellas fácilmente desde cualquier lugar."
    },
    {
      icon: <Film size={24} />,
      title: "Exploración por Categorías",
      description: "Descubre nuevas películas explorando por géneros como Acción, Comedia, Terror, etc."
    },
    {
      icon: <Star size={24} />,
      title: "Recomendaciones",
      description: "Recibe sugerencias personalizadas basadas en tu historial de visualización."
    }
  ];

  const navigationGuide = [
    {
      section: "Header Principal",
      items: [
        "Logo: Haz clic para volver al inicio",
        "Inicio: Página principal con novedades y recomendaciones",
        "Guardados: Tu lista de películas para ver después",
        "Vistos: Historial de películas que has marcado como vistas",
        "Búsqueda: Busca películas por título",
        "Favoritos: Accede a tus películas favoritas",
        "Perfil de Usuario: Ajustes, cuenta y cerrar sesión"
      ]
    },
    {
      section: "Página de Inicio",
      items: [
        "Hero Section: Películas destacadas del momento",
        "Lo Nuevo: Últimas películas agregadas a la plataforma",
        "Recomendado para ti: Sugerencias personalizadas",
        "Mi Lista - Quiero Ver: Tus películas guardadas",
        "Explorar por Categoría: Navegación por géneros"
      ]
    },
    {
      section: "Tarjetas de Películas",
      items: [
        "Haz clic en la tarjeta para abrir detalles completos",
        "Botón Guardar (🔖): Agregar/quitar de tu lista",
        "Botón Vista (👁️): Marcar como vista/no vista",
        "Botón Favorito (❤️): Agregar/quitar de favoritos"
      ]
    },
    {
      section: "Modal de Detalles",
      items: [
        "Información completa de la película",
        "Sinopsis, director, reparto, género",
        "Calificación IMDB y premios",
        "Botones de acción (Guardar, Vista, Favorito)",
        "Cerrar con el botón X o haciendo clic fuera del modal"
      ]
    }
  ];

  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-navigation">
          <button onClick={handleBack} className="back-button">
            <ArrowLeft size={20} />
            <span>Volver al Inicio</span>
          </button>
        </div>
        
        <div className="legal-header">
          <HelpCircle size={48} className="legal-icon" />
          <h1>Centro de Ayuda de CineScope</h1>
          <p className="legal-subtitle">Guía completa para usar todas las funcionalidades de la plataforma</p>
        </div>

        <div className="legal-content">
          {/* Navegación por secciones */}
          <nav className="help-navigation">
            <button 
              className={`nav-tab ${activeSection === 'getting-started' ? 'active' : ''}`}
              onClick={() => setActiveSection('getting-started')}
            >
              Primeros Pasos
            </button>
            <button 
              className={`nav-tab ${activeSection === 'features' ? 'active' : ''}`}
              onClick={() => setActiveSection('features')}
            >
              Funcionalidades
            </button>
            <button 
              className={`nav-tab ${activeSection === 'navigation' ? 'active' : ''}`}
              onClick={() => setActiveSection('navigation')}
            >
              Guía de Navegación
            </button>
            <button 
              className={`nav-tab ${activeSection === 'faq' ? 'active' : ''}`}
              onClick={() => setActiveSection('faq')}
            >
              Preguntas Frecuentes
            </button>
            <button 
              className={`nav-tab ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveSection('contact')}
            >
              Contacto
            </button>
          </nav>

          {/* Sección: Primeros Pasos */}
          {activeSection === 'getting-started' && (
            <section className="legal-section">
              <h2>🚀 Primeros Pasos en CineScope</h2>
              
              <div className="steps-container">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Crear tu Cuenta</h3>
                    <p>Regístrate en minutos para acceder a todas las funcionalidades:</p>
                    <ul>
                      <li>Haz clic en "Iniciar Sesión" en el header</li>
                      <li>Selecciona "Crear cuenta"</li>
                      <li>Completa el formulario con tu información</li>
                      <li>Verifica tu email para activar la cuenta</li>
                    </ul>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Explorar el Contenido</h3>
                    <p>Una vez dentro, podrás:</p>
                    <ul>
                      <li>Ver películas destacadas en la página de inicio</li>
                      <li>Explorar por categorías (Acción, Comedia, Terror, etc.)</li>
                      <li>Buscar películas específicas con el buscador</li>
                      <li>Navegar por las diferentes secciones</li>
                    </ul>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Gestionar tus Listas</h3>
                    <p>Organiza tu experiencia cinematográfica:</p>
                    <ul>
                      <li>Guarda películas que quieres ver después</li>
                      <li>Marca películas como vistas</li>
                      <li>Agrega películas a favoritos</li>
                      <li>Accede a tus listas desde el header</li>
                    </ul>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Personalizar tu Experiencia</h3>
                    <p>Haz que CineScope sea tuyo:</p>
                    <ul>
                      <li>Explora diferentes categorías de películas</li>
                      <li>Recibe recomendaciones personalizadas</li>
                      <li>Accede a tu perfil de usuario</li>
                      <li>Gestiona tus preferencias</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Sección: Funcionalidades */}
          {activeSection === 'features' && (
            <section className="legal-section">
              <h2>✨ Funcionalidades Principales</h2>
              
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="feature-details">
                <h3>🔍 Búsqueda Inteligente</h3>
                <p>Nuestro buscador te permite encontrar películas de múltiples maneras:</p>
                <ul>
                  <li><strong>Búsqueda por título:</strong> Escribe el nombre de la película</li>
                  <li><strong>Sugerencias automáticas:</strong> Resultados en tiempo real</li>
                  <li><strong>Búsqueda avanzada:</strong> Filtros por año, género, etc.</li>
                </ul>

                <h3>📚 Gestión de Listas</h3>
                <p>Organiza tu experiencia cinematográfica con tres tipos de listas:</p>
                <ul>
                  <li><strong>Guardados:</strong> Películas que quieres ver después</li>
                  <li><strong>Vistas:</strong> Historial de películas que has visto</li>
                  <li><strong>Favoritos:</strong> Tus películas preferidas (almacenadas localmente)</li>
                </ul>

                <h3>🎬 Exploración por Categorías</h3>
                <p>Descubre nuevas películas explorando por géneros:</p>
                <ul>
                  <li>Acción, Comedia, Ciencia Ficción, Romance</li>
                  <li>Terror, Drama, Fantasía, Misterio</li>
                  <li>Aventura, Suspenso y más</li>
                </ul>
              </div>
            </section>
          )}

          {/* Sección: Guía de Navegación */}
          {activeSection === 'navigation' && (
            <section className="legal-section">
              <h2>🧭 Guía de Navegación Completa</h2>
              
              <div className="navigation-guide">
                {navigationGuide.map((section, index) => (
                  <div key={index} className="nav-section">
                    <h3>{section.section}</h3>
                    <ul>
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="navigation-tips">
                <h3>💡 Consejos de Navegación</h3>
                <div className="tips-grid">
                  <div className="tip-item">
                    <h4>Navegación Rápida</h4>
                    <p>Usa las pestañas del header para acceder rápidamente a diferentes secciones. El botón del logo siempre te lleva al inicio.</p>
                  </div>
                  <div className="tip-item">
                    <h4>Accesos Directos</h4>
                    <p>Los botones de acción en las tarjetas de películas te permiten realizar acciones sin abrir el modal completo.</p>
                  </div>
                  <div className="tip-item">
                    <h4>Búsqueda Eficiente</h4>
                    <p>El buscador del header te permite encontrar películas rápidamente. Los resultados aparecen en tiempo real.</p>
                  </div>
                  <div className="tip-item">
                    <h4>Gestión de Listas</h4>
                    <p>Accede a tus listas desde el header para ver todas tus películas guardadas, vistas y favoritas.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Sección: Preguntas Frecuentes */}
          {activeSection === 'faq' && (
            <section className="legal-section">
              <h2>❓ Preguntas Frecuentes</h2>
              
              <div className="faq-container">
                {faqs.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <div 
                      className="faq-question" 
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span>{faq.question}</span>
                      <span className={`faq-arrow ${activeFAQ === faq.id ? 'open' : ''}`}>
                        ▼
                      </span>
                    </div>
                    {activeFAQ === faq.id && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="faq-categories">
                <h3>📂 Categorías de Ayuda</h3>
                <div className="faq-categories-grid">
                  <div className="faq-category">
                    <h4>Cuenta y Perfil</h4>
                    <p>Creación de cuenta, inicio de sesión, configuración del perfil</p>
                  </div>
                  <div className="faq-category">
                    <h4>Funcionalidades</h4>
                    <p>Búsqueda, listas, favoritos, marcado de películas</p>
                  </div>
                  <div className="faq-category">
                    <h4>Navegación</h4>
                    <p>Uso de la interfaz, exploración por categorías, acceso a listas</p>
                  </div>
                  <div className="faq-category">
                    <h4>Técnico</h4>
                    <p>Compatibilidad de dispositivos, navegadores, problemas técnicos</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Sección: Contacto */}
          {activeSection === 'contact' && (
            <section className="legal-section">
              <h2>📞 Contacto y Soporte</h2>
              
              <div className="contact-info">
                <p>
                  Nuestro equipo de soporte está aquí para ayudarte con cualquier pregunta o problema que puedas tener.
                </p>
                
                <div className="contact-grid">
                  <div className="contact-item">
                    <h3>🛠️ Soporte Técnico</h3>
                    <p><strong>Email:</strong> support@cinescope.com</p>
                    <p><strong>Horario:</strong> 24/7</p>
                    <p><strong>Tiempo de respuesta:</strong> Menos de 24 horas</p>
                    <p><strong>Asuntos:</strong> Problemas técnicos, errores, funcionalidades</p>
                  </div>
                  
                  <div className="contact-item">
                    <h3>💳 Facturación</h3>
                    <p><strong>Email:</strong> billing@cinescope.com</p>
                    <p><strong>Horario:</strong> Lunes a Viernes, 9:00 - 18:00</p>
                    <p><strong>Asuntos:</strong> Pagos, suscripciones, reembolsos</p>
                  </div>
                  
                  <div className="contact-item">
                    <h3>📧 Información General</h3>
                    <p><strong>Email:</strong> info@cinescope.com</p>
                    <p><strong>Dirección:</strong> OmegaDevs, Calle Principal 123, Ciudad, País</p>
                    <p><strong>Redes sociales:</strong> @CineScope</p>
                  </div>
                </div>
              </div>

              <div className="support-resources">
                <h3>📚 Recursos de Soporte</h3>
                <div className="resources-grid">
                  <div className="resource-item">
                    <h4>📖 Manual de Usuario</h4>
                    <p>Guía completa con todas las funciones de la plataforma</p>
                    <a href="#" className="resource-link">Descargar PDF</a>
                  </div>
                  
                  <div className="resource-item">
                    <h4>🎥 Videos Tutoriales</h4>
                    <p>Aprende a usar CineScope con nuestros videos paso a paso</p>
                    <a href="#" className="resource-link">Ver Tutoriales</a>
                  </div>
                  
                  <div className="resource-item">
                    <h4>👥 Comunidad</h4>
                    <p>Conecta con otros usuarios y comparte experiencias</p>
                    <a href="#" className="resource-link">Unirse</a>
                  </div>
                  
                  <div className="resource-item">
                    <h4>📋 Base de Conocimientos</h4>
                    <p>Artículos detallados sobre funcionalidades específicas</p>
                    <a href="#" className="resource-link">Explorar</a>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help;
