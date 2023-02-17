const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const { emailExisted, checkRoleExisted } = require("../middleware");

const router = Router();

/**
 * @swagger
 * /auth/singup:
 *  post:
 *   summary: Registrar un usuario
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/AuthRegister'
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/AuthResponse'
 *     409:
 *       description: Conflict user already exist
*/
router.post("/singin", AuthController.signIn);

/**
 * @swagger
 * /auth/singin:
 *  post:
 *   summary: Inicia sesion de usuario
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/AuthLogin'
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/AuthResponse'
 *     409:
 *       description: Conflict user already exist
*/
router.post("/singup", [checkRoleExisted, emailExisted], AuthController.singUp);

module.exports = router;
