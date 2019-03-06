const Sequelize = require('sequelize');
const sequelize = new Sequelize('Punto_Venta', 'tumatador', '123', {
  host: 'localhost',
  dialect: 'mysql',
  port:8889,
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

