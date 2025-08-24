import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Clock, Shield, Users, CreditCard, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const Terms = () => {
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
          <FileText size={48} className="legal-icon" />
          <h1>Términos de Uso</h1>
          <p className="legal-subtitle">Última actualización: Enero 2025</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar CineScope, aceptas estar sujeto a estos términos de uso.
              Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.
            </p>
            <div className="info-grid">
              <div className="info-item">
                <CheckCircle size={24} />
                <h3>Uso del Servicio</h3>
                <p>Debes tener al menos 18 años o contar con consentimiento parental</p>
              </div>
              <div className="info-item">
                <Clock size={24} />
                <h3>Actualizaciones</h3>
                <p>Los términos pueden actualizarse periódicamente</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Descripción del Servicio</h2>
            <p>
              CineScope es una plataforma de streaming que ofrece acceso a películas, series,
              documentales y contenido infantil. El servicio está disponible en dispositivos compatibles
              y requiere una conexión a internet.
            </p>
            <ul className="legal-list">
              <li>Acceso a catálogo de contenido audiovisual</li>
              <li>Funciones de personalización y recomendaciones</li>
              <li>Sincronización entre dispositivos</li>
              <li>Contenido disponible según tu ubicación</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Cuenta de Usuario</h2>
            <p>
              Para acceder a ciertas funciones del servicio, debes crear una cuenta.
              Eres responsable de mantener la confidencialidad de tu información de acceso.
            </p>
            <div className="info-grid">
              <div className="info-item">
                <Users size={24} />
                <h3>Información Personal</h3>
                <p>Debes proporcionar información precisa y actualizada</p>
              </div>
              <div className="info-item">
                <Shield size={24} />
                <h3>Seguridad</h3>
                <p>No compartas tu contraseña con terceros</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Uso Aceptable</h2>
            <p>
              Te comprometes a utilizar el servicio únicamente para fines legales y de acuerdo
              con estos términos. Está prohibido:
            </p>
            <ul className="legal-list">
              <li>Usar el servicio para actividades ilegales</li>
              <li>Intentar acceder no autorizado a sistemas o redes</li>
              <li>Interferir con el funcionamiento del servicio</li>
              <li>Compartir contenido con violación de derechos de autor</li>
              <li>Usar el servicio para transmitir malware o contenido dañino</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Propiedad Intelectual</h2>
            <p>
              Todo el contenido disponible en CineScope, incluyendo películas, series, documentales,
              software, diseño y marcas comerciales, está protegido por derechos de autor y otras
              leyes de propiedad intelectual.
            </p>
            <div className="rights-grid">
              <div className="right-item">
                <h3>Contenido</h3>
                <p>El contenido es propiedad de sus respectivos titulares de derechos</p>
              </div>
              <div className="right-item">
                <h3>Plataforma</h3>
                <p>El software y diseño son propiedad de OmegaDevs</p>
              </div>
              <div className="right-item">
                <h3>Uso Personal</h3>
                <p>Solo para uso personal y no comercial</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Suscripciones y Pagos</h2>
            <p>
              Algunas funciones del servicio pueden requerir una suscripción de pago.
              Los precios y términos de facturación se muestran claramente antes de la compra.
            </p>
            <div className="info-grid">
              <div className="info-item">
                <CreditCard size={24} />
                <h3>Métodos de Pago</h3>
                <p>Aceptamos tarjetas de crédito y otros métodos de pago seguros</p>
              </div>
              <div className="info-item">
                <AlertTriangle size={24} />
                <h3>Cancelación</h3>
                <p>Puedes cancelar tu suscripción en cualquier momento</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Limitación de Responsabilidad</h2>
            <p>
              En la máxima medida permitida por la ley, OmegaDevs no será responsable por
              daños indirectos, incidentales, especiales o consecuentes que puedan resultar
              del uso del servicio.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contacto</h2>
            <p>
              Si tienes preguntas sobre estos términos de uso, contáctanos en:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> legal@cinescope.com</p>
              <p><strong>Dirección:</strong> OmegaDevs, Calle Principal 123, Ciudad, País</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
