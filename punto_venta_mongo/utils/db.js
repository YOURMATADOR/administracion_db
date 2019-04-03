const mongoose = require("mongoose");

const conexion = mongoose.connect(
  `mongodb+srv://${process.env.USUARIODB}:${
    process.env.PASSWORDB
  }@cluster0-pjibc.mongodb.net/test?retryWrites=true`,
  { useNewUrlParser: true }
);

module.exports = conexion