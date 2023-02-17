const { Router } = require("express");
const userController = require("../controllers/users.controller");
const { isAdmin, checkRoleExisted, verifyToken } = require("../middleware");

const router = Router();

/**
 * @swagger
 * /user/:
 *  get:
 *    summary: Retorna todos los usuarios
 *    tags: [User]
 *    parameters:
 *      - in: query
 *        name: q
 *        required: false
 *        description: filtro por nombre de usuario debe tener minimo 3 carateres
 *        schema:
 *          type: string
 *      - in: query
 *        name: email
 *        required: false
 *        description: filtro por email de usuario 
 *        schema:
 *          type: string
 *      - in: query
 *        name: rol
 *        required: false
 *        description: filtro por rol de usuario 
 *        schema:
 *          type: string
 *      - in: query
 *        name: limit
 *        required: false
 *        schema:
 *          type: number
 *      - in: query
 *        name: page
 *        required: false
 *        schema:
 *          type: number
 *  
 *    responses:
 *      200:
 *        description: Success
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserResponse'
 *      404:
 *        description: Not Found
 * 
 */


/**
 * @swagger
 * /user/{id}:
 *  get:
 *    summary: Retorna un usuario por id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the User Id
 *    responses:
 *      200:
 *        description: Success
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/UserResponse'
 *      404:
 *        description: Not Found
 * 
 */


/**
 * @swagger
 * /user/{id}:
 *  put:
 *   summary: Actualizar un usuario
 *   tags: [User]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/UserUpdate'
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the User Id
 *   responses:
 *     200:
 *       description: Success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/UserResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 */


router.get("/", [verifyToken, isAdmin], userController.getUsers);
router.get("/:id", [verifyToken, isAdmin], userController.getUser);
router.put("/:id", userController.updateUser);
router.put(
  "/change/:id",
  [verifyToken, isAdmin],
  userController.updateUserRole
);

module.exports = router;
