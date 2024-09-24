// src/pages/TwoFASetup.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // Asegúrate de que esta importación sea correcta

const TwoFASetup = () => {
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const setup2FA = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Obtén el userId del localStorage
        const response = await axios.post('http://localhost:5001/api/2fa/setup', {
          userId,
        });
        setQrCode(response.data.qrCodeUrl); // Almacena el código QR desde la respuesta del servidor
      } catch (err) {
        console.error('Error al configurar 2FA:', err);
        setError('Error al configurar 2FA'); // Mensaje de error
      }
    };

    setup2FA(); // Llama a la función setup2FA una vez
  }, []); // El array vacío hace que useEffect se ejecute solo una vez

  return (
    <div className="min-h-screen flex items-center justify-center bg-futuristic-blue">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-neon-green text-2xl mb-4">Configura tu 2FA</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {qrCode ? (
          <>
            <p className="text-white mb-4">
              Escanea el siguiente código QR con tu autenticador.
            </p>
            <QRCodeCanvas value={qrCode} size={256} /> {/* Tamaño del QR */}
            <button
              className="mt-4 w-full bg-neon-green text-gray-900 p-2 rounded hover:bg-green-500 transition"
              onClick={() => navigate('/login')} // Redirige al login tras la configuración de 2FA
            >
              Continuar al Login
            </button>
          </>
        ) : (
          <p className="text-white">Generando código QR...</p>
        )}
        <button
          className="mt-4 w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-600 transition"
          onClick={() => navigate('/')} // Botón para volver al Home
        >
          Volver al Home
        </button>
      </div>
    </div>
  );
};

export default TwoFASetup;
