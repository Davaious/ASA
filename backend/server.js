const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/auth', authRoutes); // Esta línea está correctamente ubicada.

// Servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
