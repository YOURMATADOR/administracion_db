const mongoose = require("mongoose");

const lote_schema = new mongoose.Schema({
  fecha_compra: {
    type: Date,
    required: true
  },
  fecha_caducidad: {
    type: Date,
    required: true
  },
  id_proveedor: {
    type: mongoose.Types.ObjectId,
    ref: "proveedore",
    required: true
  },
  id_producto: {
    type: mongoose.Types.ObjectId,
    ref: "producto",
    required: true
  },
  unidades: {
    type: Number,
    required: true
  },
  precio: {
    type: Number,
    required: true
  }
});

const lote = mongoose.model("lote", lote_schema);

module.exports = lote;
