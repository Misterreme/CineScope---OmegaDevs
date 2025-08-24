import React from 'react';

// Icono de Acción - Pistola de rayos
export const ActionIcon = ({ size = 24, color = "#FCA311" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z" fill={color}/>
    <circle cx="12" cy="12" r="2" fill={color} opacity="0.3"/>
  </svg>
);

// Icono de Comedia - Máscara de teatro
export const ComedyIcon = ({ size = 24, color = "#FCA311" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill={color}/>
    <path d="M8 10C8.55 10 9 9.55 9 9C9 8.45 8.55 8 8 8C7.45 8 7 8.45 7 9C7 9.55 7.45 10 8 10Z" fill={color}/>
    <path d="M16 10C16.55 10 17 9.55 17 9C17 8.45 16.55 8 16 8C15.45 8 15 8.45 15 9C15 9.55 15.45 10 16 10Z" fill={color}/>
    <path d="M12 16C14.21 16 16 14.21 16 12H8C8 14.21 9.79 16 12 16Z" fill={color}/>
  </svg>
);

// Icono de Ciencia Ficción - Nave espacial
export const SciFiIcon = ({ size = 24, color = "#FCA311" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15 8H21L16 12L18 18L12 14L6 18L8 12L3 8H9L12 2Z" fill={color}/>
    <circle cx="12" cy="12" r="3" fill={color} opacity="0.2"/>
    <path d="M12 8L14 12L12 16L10 12L12 8Z" fill={color} opacity="0.6"/>
  </svg>
);

// Icono de Romance - Corazón con flores
export const RomanceIcon = ({ size = 24, color = "#FCA311" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill={color}/>
    <circle cx="8" cy="6" r="1" fill="white" opacity="0.8"/>
    <circle cx="16" cy="6" r="1" fill="white" opacity="0.8"/>
  </svg>
);

// Icono de Terror - Calabaza de Halloween
export const HorrorIcon = ({ size = 24, color = "#FCA311" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" fill={color}/>
    <path d="M9 11C9.55 11 10 10.55 10 10C10 9.45 9.55 9 9 9C8.45 9 8 9.45 8 10C8 10.55 8.45 11 9 11Z" fill="white"/>
    <path d="M15 11C15.55 11 16 10.55 16 10C16 9.45 15.55 9 15 9C14.45 9 14 9.45 14 10C14 10.55 14.45 11 15 11Z" fill="white"/>
    <path d="M12 13C11.45 13 11 13.45 11 14C11 14.55 11.45 15 12 15C12.55 15 13 14.55 13 14C13 13.45 12.55 13 12 13Z" fill="white"/>
  </svg>
);

// Icono de Drama - Máscara trágica
export const DramaIcon = ({ size = 24, color = "#FCA311" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill={color}/>
    <path d="M8 9C8.55 9 9 8.55 9 8C9 7.45 8.55 7 8 7C7.45 7 7 7.45 7 8C7 8.55 7.45 9 8 9Z" fill={color}/>
    <path d="M16 9C16.55 9 17 8.55 17 8C17 7.45 16.55 7 16 7C15.45 7 15 7.45 15 8C15 8.55 15.45 9 16 9Z" fill={color}/>
    <path d="M12 17C10.9 17 10 16.1 10 15H14C14 16.1 13.1 17 12 17Z" fill={color}/>
  </svg>
);

// Icono de Fantasía - Dragón
export const FantasyIcon = ({ size = 24, color = "#FCA311" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14 6H20L16 9L18 15L12 12L6 15L8 9L4 6H10L12 2Z" fill={color}/>
    <path d="M12 8L14 12L12 16L10 12L12 8Z" fill={color} opacity="0.7"/>
    <circle cx="12" cy="12" r="2" fill={color} opacity="0.3"/>
  </svg>
);

// Icono de Misterio - Lupa con sombra
export const MysteryIcon = ({ size = 24, color = "#FCA311" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M21 21L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="11" cy="11" r="3" fill={color} opacity="0.3"/>
  </svg>
);

// Icono de Aventura - Brújula
export const AdventureIcon = ({ size = 24, color = "#FCA311" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 2L14 8H20L16 12L18 18L12 14L6 18L8 12L4 8H10L12 2Z" fill={color}/>
    <circle cx="12" cy="12" r="2" fill="white"/>
  </svg>
);

// Icono de Suspenso - Relámpago
export const ThrillerIcon = ({ size = 24, color = "#FCA311" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 2V13H10V22L17 10H13L17 2H7Z" fill={color}/>
    <path d="M9 4H15L12 8H16L10 20V15H7L9 4Z" fill={color} opacity="0.6"/>
  </svg>
);
