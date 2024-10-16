// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const bcrypt = require('bcrypt'); // Asegúrate de importar bcrypt para hashear contraseñas
const db = require('../config/db');  // Asegúrate de que tu base de datos esté correctamente importada
const pool = require('../config/db');

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


// Ruta de login
router.post('/login', async (req, res) => {
  const { email, password, token } = req.body;
  
  try {
    // Verifica que el email existe en la base de datos
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).send('Email no registrado');
    }

    // Verifica la contraseña usando bcrypt
    const validPassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).send('Contraseña incorrecta');
    }

    // Si el usuario tiene 2FA habilitado, verifica el token
    if (user.rows[0].secret) {
      const verified = speakeasy.totp.verify({
        secret: user.rows[0].secret,
        encoding: 'base32',
        token,
      });

      if (!verified) {
        return res.status(400).json({ message: 'Código 2FA incorrecto' });
      }
    }

    res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    res.status(500).send('Error en el inicio de sesión');
  }
});
