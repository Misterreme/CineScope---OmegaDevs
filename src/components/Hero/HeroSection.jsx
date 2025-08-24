import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

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
                
                {/* Llamado a la acción solo en la primera diapositiva */}
                {slide.id === 1 && (
                  <div className="hero-cta-text">
                    <span className="cta-text">Desliza para empezar</span>
                    <div className="cta-arrow-down">↓</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles del carrusel */}
      <div className="hero-carousel-controls">
        <button className="carousel-control prev" onClick={prevSlide}>
          <span className="control-arrow">‹</span>
        </button>
        
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        
        <button className="carousel-control next" onClick={nextSlide}>
          <span className="control-arrow">›</span>
        </button>
      </div>

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
