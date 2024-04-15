const mongoose = require('mongoose');

   const dbURI = 'mongodb://localhost:27017/product'; // URL de conexión a tu base de datos MongoDB

   mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
   db.once('open', () => {
     console.log('Conexión exitosa a la base de datos');
   });

   module.exports = db;