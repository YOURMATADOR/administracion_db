const usuario = require("../models/usuario");
const { validationResult } = require("express-validator/check");

const getLogin = (req, res, next) => {
  res.render("login");
};
const postLogin = async (req, res, next) => {
  try {
    let { correo, contraseña } = req.body;
    await usuario.sync();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('rerro',errors.array());
      return res.redirect("/");
      //   return res.status(422).json({ errors: errors.array() });
    }

    res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

module.exports = { getLogin, postLogin };
