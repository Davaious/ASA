// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      console.log('Inicio de sesión exitoso:', response.data);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-futuristic-blue to-black">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl text-neon-green mb-4 font-bold text-center">Login Futurista</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="w-full mb-4 p-3 bg-gray-900 text-white border-none rounded-md"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="w-full mb-4 p-3 bg-gray-900 text-white border-none rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-neon-green text-black py-2 px-4 rounded-lg hover:bg-white hover:text-neon-green transition duration-300"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;