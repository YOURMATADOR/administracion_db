const mongoose = require("mongoose");

const proveedor_schema = new mongoose.Schema({
  RFC: {
    type: String,
    required: true,
    unique: true
  },
  razon_social: {
    type: String,
    required: true,
    unique: true
  },
  productos: [
    {
      id_producto: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
      },
      precio: {
        type: Number,
        required: true
      },
      abastecimiento: {
        type: Number,
        required: true
      }
    }
  ]
});

let proveedor = mongoose.model("proveedore", proveedor_schema);

module.exports = proveedor;
