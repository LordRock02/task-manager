import React from 'react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false }) => {
  // Estilos base: Redondeado, transición suave, fuente negrita
  const baseStyle = "px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 transform active:scale-95 shadow-lg";
  
  // Variantes de color
  const variants = {
    primary: "bg-galaxy-300 hover:bg-action-hover text-white shadow-galaxy-900/20", // ACEPTAR (Tu color Púrpura)
    danger: "bg-action-deny hover:bg-action-denyHover text-white shadow-red-900/20", // NEGAR (Rojo)
    outline: "border-2 border-galaxy-100 text-galaxy-100 hover:bg-galaxy-100/10" // Secundario (Solo borde)
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;