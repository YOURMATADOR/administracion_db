const uuid = require("uuid/v1");
const { validationResult } = require("express-validator/check");

const usuario = require("../models/usuario");

const getRegistro = (req, res, next) => {
  res.render("registro",{errors:[]});
};
const postRegistro = async (req, res, next) => {
  try {
    let {
      direccion,
      telefono,
      cumpleaños,
      nombre,
      correo,
      contraseña
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("rerro", errors.array());
      return res.render("registro", { errors:errors.array() });
      //   return res.status(422).json({ errors: errors.array() });
    }

    let id = uuid();
    console.log("id ", id);

    usuario.sync().then(async () => {
      try {
        await usuario.create({
          id,
          direccion,
          telefono,
          cumpleaños,
          rol: "vendedor",
          registro: new Date().toString(),
          nombre,
          correo,
          contraseña
        });
        console.log("id ", id);
        let usr = await usuario.findOne({ where: { correo } });
        usr.encriptar_pass(contraseña);
        res.redirect("/");
      } catch (error) {
        throw new Error(error);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getRegistro, postRegistro };
