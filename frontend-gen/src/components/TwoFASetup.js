import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TwoFASetup = () => {
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const setup2FA = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.post('http://localhost:5001/api/2fa/setup', {
          userId,
        });
        setQrCode(response.data.qrCodeUrl);
      } catch (err) {
        setError('Error al configurar 2FA');
      }
    };

    setup2FA();
  }, []);

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
            <img src={qrCode} alt="Código QR para 2FA" />
            <button
              className="mt-4 w-full bg-neon-green text-gray-900 p-2 rounded hover:bg-green-500 transition"
              onClick={() => navigate('/login')}
            >
              Continuar al Login
            </button>
          </>
        ) : (
          <p className="text-white">Generando código QR...</p>
        )}
      </div>
    </div>
  );
};

export default TwoFASetup;
