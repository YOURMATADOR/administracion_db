const mongoose = require("mongoose");
const bc = require("bcrypt");

const usuario_schema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    direccion: {
      type: String
    },
    telefono: {
      type: String
    },
    cumpleaños: {
      type: String
    },
    rol: {
      type: String
    },
    registro: {
      type: String
    },
    nombre: {
      type: String
    },
    correo: {
      type: String,
      unique: true
    },
    contraseña: {
      type: String
    }
  },
  {
    timestamps: false
  }
);

usuario_schema.methods.encriptar_pass = function() {
  console.log("modificado");
  bc.genSalt(10, (err, salt) => {
    bc.hash(this.contraseña, salt, (err, hash) => {
      if (err) {
        console.log({
          err,
          mensaje: "Error al encriptar la contraseña"
        });
      } else {
        console.log(hash);
        this.contraseña = hash;
        this.save();
      }
    });
  });
};
usuario_schema.methods.comprobar_pass = async function(pass) {
  try {
    let comparacion = await bc.compare(pass, this.contraseña);

    if (!!comparacion) {
      return Promise.resolve(this);
    } else {
      return Promise.reject(new Error("Las contraseñas no coinciden"));
    }
  } catch (err) {
    return Promise.reject({
      err,
      mensaje: "Contraseña invalida"
    });
  }
};
let usuario = mongoose.model("usuario", usuario_schema);
module.exports = usuario;
