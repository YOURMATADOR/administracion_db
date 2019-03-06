const Sequelize = require('sequelize');
<<<<<<< HEAD
const sequelize = new Sequelize('Punto_Venta', 'root', '', {
=======
const sequelize = new Sequelize('Punto_Venta', 'tumatador', '123', {
>>>>>>> f1421e550c11ab391329d1bff23b2acfd96e1855
  host: 'localhost',
  dialect: 'mysql',
  port:3306,
  operatorsAliases: false,  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  
});

sequelize
  .authenticate()
  .then(() => {
    console.log('conectado a base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar en la base de datos', err);
  });

module.exports = {sequelize}

