const { check, validationResult } = require("express-validator/check");
const usuario_model = require("../models/usuario");

const validar_registro = [
  check("direccion")
    .exists()
    .isString()
    .isLength({ min: 1 })
    .trim(),
  check("telefono")
    .exists()
    .isMobilePhone()
    .trim(),
  check("cumpleaños")
    .exists()
    .isString()
    .isLength({ min: 8 })
    .trim(),
  check("correo")
    .exists()
    .isEmail()
    .normalizeEmail()
    .trim()
    .custom(async val => {
      try {
        await usuario_model.sync();
        let usr = await usuario_model.findOne({ where: { correo: val } });
        if (!!usr) {
          throw Error("Usuario no disponible!");
        }
        return true;
      } catch (error) {
        throw Error(error);
      }
    }),
  check("contraseña")
    .exists()
    .isAlphanumeric()
    .isLength({ min: 8 })
    .trim()
];

module.exports = {
    validar_registro
}