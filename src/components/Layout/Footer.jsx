import React from 'react';
import { Heart, Github, Twitter, Instagram, Mail, Shield, FileText, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const footerSections = [
    {
      title: 'Legal',
      links: [
        { label: 'Política de Privacidad', path: '/privacy', icon: Shield },
        { label: 'Términos de Uso', path: '/terms', icon: FileText },
        { label: 'Ayuda', path: '/help', icon: HelpCircle }
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Mail, href: 'mailto:info@cinescope.com', label: 'Email' }
  ];

  const handleLegalLinkClick = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo y descripción */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo.svg" alt="CineScope" />
          </div>
          <p className="footer-description">
            Descubre el mundo del cine con CineScope. Miles de películas y series 
            en un solo lugar con diseño cinematográfico premium.
          </p>
          <div className="footer-social">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Enlaces del footer */}
        <div className="footer-links">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h3 className="footer-section-title">{section.title}</h3>
              <ul className="footer-section-links">
                {section.links.map((link, linkIndex) => {
                  const Icon = link.icon;
                  return (
                    <li key={linkIndex}>
                      <button 
                        onClick={() => handleLegalLinkClick(link.path)}
                        className="footer-link-button"
                      >
                        {Icon && <Icon size={16} />}
                        <span>{link.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="footer-divider"></div>

      {/* Información inferior */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            © 2025 OmegaDevs. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
