const mysql = require('mysql2');
 

const connection = mysql.createPool({
  host: 'localhost',
  user: 'tumatador',
  database: 'Punto_Venta',
  password:"mansanita",
  waitForConnections:true,
  port:8889
});

module.exports = connection.promise()