app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar si el usuario existe
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length === 0) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      // Comparar contraseñas
      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      // Generar token JWT
      const token = jwt.sign({ userId: user.rows[0].id }, 'your_jwt_secret', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
  