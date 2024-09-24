// src/pages/RegisterSuccess.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-futuristic-blue to-black">
      <h1 className="text-4xl text-neon-green font-bold">¡Registro Exitoso!</h1>
      <p className="text-lg text-white mt-4">Bienvenido a la plataforma. Puedes iniciar sesión ahora.</p>
      <button
        className="mt-8 w-48 bg-neon-green text-black p-3 rounded-lg hover:bg-white hover:text-neon-green transition"
        onClick={() => navigate('/login')} // Redirige al login
      >
        Ir al Login
      </button>
    </div>
  );
};

export default RegisterSuccess;
