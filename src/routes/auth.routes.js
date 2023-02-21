const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const { emailExisted, checkRoleExisted } = require("../middleware");

const router = Router();

router.post("/singin", AuthController.signIn);

router.post("/singup", [checkRoleExisted, emailExisted], AuthController.singUp);

module.exports = router;
