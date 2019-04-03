const { check, validationResult } = require("express-validator/check");
const usuario_model = require("../models/usuario");

const validar_login = [
  check("correo")
    .exists()
    .isString()
    .isLength({ min: 1 })
    .trim()
    .custom(async val => {
      try {
        await usuario_model.sync();

        await usuario_model.findOne({ where: { correo: val } });
        return true;
      } catch (error) {
        throw Error(error);
      }
    }),
  check("contraseña")
    .exists()
    .isAlphanumeric()
    .isLength({ min: 8 })
    .custom(async (val, { req }) => {
      try {
        await usuario_model.sync();
        let usr = await usuario_model.findOne({ where: { correo: req.body.correo } });
        await usr.comprobar_pass(val);
        return true;
      } catch (error) {
        throw Error(error);
      }
    })
];

module.exports={
    validar_login
}
