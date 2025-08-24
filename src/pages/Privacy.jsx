import React from 'react';
import { Shield, Lock, Eye, Database, Users, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const Privacy = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
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
          <Shield size={48} className="legal-icon" />
          <h1>Política de Privacidad</h1>
          <p className="legal-subtitle">Última actualización: Enero 2025</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>Información que Recopilamos</h2>
            <p>
              Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta,
              te suscribes a nuestro servicio, te comunicas con nosotros o realizas compras.
            </p>
            <div className="info-grid">
              <div className="info-item">
                <Lock size={24} />
                <h3>Información de Cuenta</h3>
                <p>Nombre, email, contraseña y preferencias de usuario</p>
              </div>
              <div className="info-item">
                <Eye size={24} />
                <h3>Datos de Uso</h3>
                <p>Contenido visto, tiempo de visualización y preferencias</p>
              </div>
              <div className="info-item">
                <Database size={24} />
                <h3>Información Técnica</h3>
                <p>Dirección IP, tipo de dispositivo y navegador</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Cómo Utilizamos tu Información</h2>
            <p>
              Utilizamos la información recopilada para proporcionar, mantener y mejorar nuestros servicios,
              así como para desarrollar nuevos productos y funcionalidades.
            </p>
            <ul className="legal-list">
              <li>Proporcionar acceso a nuestro catálogo de contenido</li>
              <li>Personalizar recomendaciones y experiencia de usuario</li>
              <li>Comunicarnos contigo sobre actualizaciones y cambios</li>
              <li>Mejorar la seguridad y prevenir fraudes</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Compartir Información</h2>
            <p>
              No vendemos, alquilamos ni compartimos tu información personal con terceros,
              excepto en las circunstancias descritas en esta política.
            </p>
            <div className="info-grid">
              <div className="info-item">
                <Users size={24} />
                <h3>Proveedores de Servicios</h3>
                <p>Colaboramos con proveedores confiables para operar nuestro servicio</p>
              </div>
              <div className="info-item">
                <ShieldCheck size={24} />
                <h3>Requisitos Legales</h3>
                <p>Podemos divulgar información cuando la ley lo requiera</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Tus Derechos</h2>
            <p>
              Tienes derecho a acceder, corregir, eliminar y portar tu información personal.
              También puedes oponerte al procesamiento de tus datos en ciertas circunstancias.
            </p>
            <div className="rights-grid">
              <div className="right-item">
                <h3>Acceso</h3>
                <p>Solicitar una copia de tus datos personales</p>
              </div>
              <div className="right-item">
                <h3>Rectificación</h3>
                <p>Corregir información inexacta o incompleta</p>
              </div>
              <div className="right-item">
                <h3>Eliminación</h3>
                <p>Solicitar la eliminación de tus datos</p>
              </div>
              <div className="right-item">
                <h3>Portabilidad</h3>
                <p>Recibir tus datos en formato estructurado</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Seguridad de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger
              tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tu información,
              contáctanos en:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> privacy@cinescope.com</p>
              <p><strong>Dirección:</strong> OmegaDevs, Calle Principal 123, Ciudad, País</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
