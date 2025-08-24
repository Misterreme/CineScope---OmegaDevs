import React, { useState } from 'react';
import { HelpCircle, Search, Play, Download, Settings, Users, CreditCard, Smartphone, Monitor, Tablet, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const Help = () => {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(null);

  const handleBack = () => {
    navigate('/');
  };

  const faqs = [
    {
      id: 1,
      question: "¿Cómo puedo crear una cuenta en CineScope?",
      answer: "Para crear una cuenta, haz clic en 'Iniciar Sesión' en la parte superior derecha y luego selecciona 'Crear cuenta'. Completa el formulario con tu información y verifica tu email."
    },
    {
      id: 2,
      question: "¿En qué dispositivos puedo usar CineScope?",
      answer: "CineScope está disponible en computadoras, smartphones, tablets y smart TVs. También puedes usar nuestro reproductor web en cualquier navegador moderno."
    },
    {
      id: 3,
      question: "¿Puedo descargar contenido para ver offline?",
      answer: "Actualmente no ofrecemos descargas offline, pero estamos trabajando en esta funcionalidad. Por ahora, necesitas una conexión a internet para disfrutar del contenido."
    },
    {
      id: 4,
      question: "¿Cómo funcionan las recomendaciones?",
      answer: "Nuestro sistema de IA analiza tu historial de visualización y preferencias para sugerir contenido que te guste. Cuanto más uses la plataforma, mejores serán las recomendaciones."
    },
    {
      id: 5,
      question: "¿Puedo compartir mi cuenta con familiares?",
      answer: "Sí, puedes crear hasta 5 perfiles en una sola cuenta. Cada perfil tendrá sus propias preferencias y recomendaciones personalizadas."
    }
  ];

  const toggleFAQ = (id) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

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
          <h1>Centro de Ayuda</h1>
          <p className="legal-subtitle">Encuentra respuestas a tus preguntas más frecuentes</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>Búsqueda Rápida</h2>
            <div className="search-box">
              <Search size={20} />
              <input 
                type="text" 
                placeholder="Buscar en la ayuda..." 
                className="help-search-input"
              />
            </div>
          </section>

          <section className="legal-section">
            <h2>Primeros Pasos</h2>
            <div className="info-grid">
              <div className="info-item">
                <Users size={24} />
                <h3>Crear Cuenta</h3>
                <p>Regístrate en minutos y comienza a disfrutar del contenido</p>
              </div>
              <div className="info-item">
                <Play size={24} />
                <h3>Reproducir Contenido</h3>
                <p>Haz clic en cualquier película o serie para comenzar a ver</p>
              </div>
              <div className="info-item">
                <Settings size={24} />
                <h3>Personalizar</h3>
                <p>Ajusta tu perfil y preferencias para mejores recomendaciones</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Dispositivos Compatibles</h2>
            <div className="devices-grid">
              <div className="device-item">
                <Monitor size={32} />
                <h3>Computadoras</h3>
                <p>Windows, macOS, Linux</p>
                <p>Navegadores: Chrome, Firefox, Safari, Edge</p>
              </div>
              <div className="device-item">
                <Smartphone size={32} />
                <h3>Smartphones</h3>
                <p>iOS 12+ y Android 8+</p>
                <p>Aplicación nativa disponible</p>
              </div>
              <div className="device-item">
                <Tablet size={32} />
                <h3>Tablets</h3>
                <p>iPad, Android tablets</p>
                <p>Experiencia optimizada para pantallas táctiles</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Preguntas Frecuentes</h2>
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
          </section>

          <section className="legal-section">
            <h2>Contacto y Soporte</h2>
            <p>
              Si no encuentras la respuesta que buscas, nuestro equipo de soporte está aquí para ayudarte.
            </p>
            <div className="contact-grid">
              <div className="contact-item">
                <h3>Soporte Técnico</h3>
                <p><strong>Email:</strong> support@cinescope.com</p>
                <p><strong>Horario:</strong> 24/7</p>
                <p><strong>Tiempo de respuesta:</strong> Menos de 24 horas</p>
              </div>
              <div className="contact-item">
                <h3>Facturación</h3>
                <p><strong>Email:</strong> billing@cinescope.com</p>
                <p><strong>Horario:</strong> Lunes a Viernes, 9:00 - 18:00</p>
                <p><strong>Asuntos:</strong> Pagos, suscripciones, reembolsos</p>
              </div>
              <div className="contact-item">
                <h3>General</h3>
                <p><strong>Email:</strong> info@cinescope.com</p>
                <p><strong>Dirección:</strong> OmegaDevs, Calle Principal 123, Ciudad, País</p>
                <p><strong>Redes sociales:</strong> @CineScope</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Recursos Adicionales</h2>
            <div className="resources-grid">
              <div className="resource-item">
                <h3>Guía de Usuario</h3>
                <p>Manual completo con todas las funciones de la plataforma</p>
                <a href="#" className="resource-link">Descargar PDF</a>
              </div>
              <div className="resource-item">
                <h3>Videos Tutoriales</h3>
                <p>Aprende a usar CineScope con nuestros videos paso a paso</p>
                <a href="#" className="resource-link">Ver Tutoriales</a>
              </div>
              <div className="resource-item">
                <h3>Comunidad</h3>
                <p>Conecta con otros usuarios y comparte experiencias</p>
                <a href="#" className="resource-link">Unirse</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;
