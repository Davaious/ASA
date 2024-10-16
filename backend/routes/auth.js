const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const bcrypt = require('bcrypt'); 
const db = require('../config/db');  

// Función para cifrar el secreto 2FA
require('dotenv').config();

function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}


// Función para descifrar el secreto 2FA
function decrypt(text) {
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Ruta de registro con bcrypt
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

// Ruta para configurar 2FA mejorada
router.post('/setup', async (req, res) => {
  const { userId } = req.body;
  const secret = speakeasy.generateSecret({ name: 'YourAppName' });
  const encryptedSecret = encrypt(secret.base32);

  try {
    await db.query('UPDATE users SET secret = $1 WHERE id = $2', [encryptedSecret, userId]);
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);
    
    res.status(200).json({ 
      message: '2FA configurado correctamente.',
      qrCodeUrl,
      secret: secret.base32 
    });
  } catch (error) {
    console.error('Error en la configuración 2FA:', error); // Log detallado para debugging
    res.status(500).json({ message: 'Error en la configuración de 2FA. Intenta de nuevo más tarde.' });
  }
});


// Ruta de login con verificación 2FA mejorada
router.post('/login', async (req, res) => {
  const { email, password, token } = req.body;
  
  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Email no registrado' });
    }

    const validPassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    if (user.rows[0].secret) {
      const encryptedSecret = user.rows[0].secret;
      const decryptedSecret = decrypt(encryptedSecret);

      const verified = speakeasy.totp.verify({
        secret: decryptedSecret, 
        encoding: 'base32',
        token,
      });

      if (!verified) {
        return res.status(400).json({ message: 'Código 2FA incorrecto. Verifica tu autenticador.' });
      }
    }

    res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    console.error('Error en el login:', error); // Log detallado para debugging
    res.status(500).json({ message: 'Error en el inicio de sesión. Intenta de nuevo más tarde.' });
  }
});


module.exports = router;
