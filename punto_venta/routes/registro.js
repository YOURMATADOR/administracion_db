const express = require("express");
const router = express.Router();

const registro_login = require("../controllers/registro");
const registro_validator = require("../validators/registro");

router.get("/registro", registro_login.getRegistro);
router.post(
  "/registro",
  registro_validator.validar_registro,
  registro_login.postRegistro
);

module.exports = router;
