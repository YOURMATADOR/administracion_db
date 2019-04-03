const mongoose = require("mongoose");

const factura_schema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  id_cliente: {
    //* hace referencia a la tabla de usuario para que cuando sea necesario poblar con la informacion del usuario que tenga el id de este campo
    type: mongoose.Types.ObjectId,
    ref: "usuario"
  },
  id_vendedor: {
    //* hace referencia a la tabla de usuario para que cuando sea necesario poblar con la informacion del usuario que tenga el id de este campo
    type: mongoose.Types.ObjectId,
    ref: "usuario"
  },
  subtotal: {
    type: Number,
    required: true
  },
  iva: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  metodo_pago: {
    type: String,
    required: true
  },
  productos: [
    {
      id_producto: {
        type: mongoose.Types.ObjectId,
        ref: "producto"
      },
      cantidad: {
        type: Number,
        required: true
      },
      precio: {
        type: Number
      },
      subtotal: {
        type: Number
      },
      id_lote: {
        type: mongoose.Types.ObjectId,
        ref: "lote"
      }
    }
  ]
});

const factura = mongoose.model("factura", factura_schema);

module.exports = factura;
