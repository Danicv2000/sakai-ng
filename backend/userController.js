const User = require('./User');

exports.getAllUsers = (req, res) => {
  // Lógica para obtener todos los usuarios
  res.send('Obteniendo todos los usuarios');
};

exports.createUser = (req, res) => {
  // Lógica para crear un nuevo usuario
  res.send('Creando un nuevo usuario');
};