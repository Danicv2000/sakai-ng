const express = require('express');
const mongoose = require('./dbconfig');
const app = express();
const port = 3000;

// Configuración de rutas?
const userRoutes = require('./userRoutes');
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});