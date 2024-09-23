const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const db = require('../db');  // Asegúrate de que tu base de datos esté correctamente importada

// Endpoint para configurar 2FA y generar un código QR
router.post('/setup', async (req, res) => {
  const { userId } = req.body;

  try {
    // Generar el secreto para 2FA
    const secret = speakeasy.generateSecret({ name: 'YourAppName' });

    // Guardar el secreto en la base de datos del usuario
    await db.query('UPDATE users SET secret = $1 WHERE id = $2', [secret.base32, userId]);

    // Generar el código QR
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    res.status(200).json({ qrCodeUrl, secret: secret.base32 });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    try {
      await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
  
module.exports = router;

// Endpoint para verificar el token 2FA
router.post('/verify', async (req, res) => {
    const { userId, token } = req.body;
  
    try {
      // Obtener el secreto del usuario
      const user = await db.query('SELECT secret FROM users WHERE id = $1', [userId]);
  
      // Verificar el token usando speakeasy
      const verified = speakeasy.totp.verify({
        secret: user.rows[0].secret,
        encoding: 'base32',
        token,
      });
  
      if (verified) {
        res.status(200).json({ message: 'Código 2FA verificado' });
      } else {
        res.status(400).json({ message: 'Código 2FA inválido' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
  
  module.exports = router;
  