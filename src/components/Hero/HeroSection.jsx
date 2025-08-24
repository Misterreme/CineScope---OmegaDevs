import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './HeroSection.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useAuth();

  // Datos del carrusel con contenido para cinéfilos
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop&crop=center',
      title: 'Explora el universo del cine',
      subtitle: 'Sumérgete en las historias que han marcado generaciones',
      description: 'Desde clásicos inolvidables hasta los estrenos más esperados.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=center',
      title: 'Tu guía visual definitiva',
      subtitle: 'Descubre reseñas, trailers y análisis en profundidad',
      description: 'Todo lo que necesitas para elegir tu próxima película favorita.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center',
      title: 'Diseñado para cinéfilos',
      subtitle: 'Una experiencia pensada para quienes viven el cine con pasión',
      description: 'Navega, comparte y disfruta como nunca antes.'
    }
  ];

  // Auto-rotación del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Cambia cada 6 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero-section">
      {/* Carrusel de imágenes */}
      <div className="hero-carousel">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay oscuro con gradiente */}
            <div className="hero-overlay">
              <div className="hero-overlay-gradient"></div>
            </div>
            
            {/* Contenido del slide */}
            <div className="hero-slide-content">
              <div className="hero-text-container">
                <h1 className="hero-title">
                  {slide.title}
                </h1>
                
                <h2 className="hero-subtitle">
                  {slide.subtitle}
                </h2>
                
                <p className="hero-description">
                  {slide.description}
                </p>
                
                {/* Botón de acción en todas las diapositivas */}
                <div className="hero-cta-button">
                  {!user ? (
                    <button 
                      className="hero-login-btn"
                      onClick={() => {
                        const authSection = document.querySelector('.auth-section')
                        if (authSection) {
                          authSection.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                    >
                      Iniciar Sesión
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flechas discretas en los lados */}
      <button className="hero-nav-arrow hero-nav-left" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      
      <button className="hero-nav-arrow hero-nav-right" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>

      {/* Elementos decorativos flotantes */}
      <div className="hero-floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>
    </section>
  );
};

export default HeroSection;
