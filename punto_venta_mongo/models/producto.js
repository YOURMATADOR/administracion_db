const mongoose = require("mongoose");

const producto_schema = new mongoose.Schema({
  descripcion: {
    type: String,
    unique: true
  },
  precio_venta: {
    type: Number,
    required: true
  },
  cant_inventario: {
    type: Number,
    required: true
  },
  CAT: {
    type: Number,
    required: true
  }
});
const producto = mongoose.model("producto", producto_schema);

module.exports = producto;
