const Sequelize = require('sequelize');
const sequelize = new Sequelize('Punto_Venta', 'root', '', {
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

