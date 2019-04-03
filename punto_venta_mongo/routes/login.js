const express = require("express");
const router = express.Router();

const login_controller = require("../controllers/login");
const login_validator = require("../validators/login");

router.get("/", login_controller.getLogin);
router.post(
  "/login",
  login_validator.validar_login,
  login_controller.postLogin
);

module.exports = router;
