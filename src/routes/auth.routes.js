const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const { emailExisted, checkRoleExisted } = require("../middleware");

const router = Router();

//TODO: Implementar comprobacion de formato de correo electronico y de contraseña

router
  .post("/singin", AuthController.signIn)
  .post("/singup", [checkRoleExisted, emailExisted], AuthController.singUp);

module.exports = router;
