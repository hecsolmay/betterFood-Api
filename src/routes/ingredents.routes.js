const { Router } = require("express");
const ingredentsCtrl = require("../controllers/ingredent.controller");
const {
  isAdmin,
  canEdit,
  verifyToken,
  checkUniqueIngredent,
} = require("../middleware");

const router = Router();


/**
 * @swagger
 * /ingredent/:
 *  get:
 *    summary: Retorna todos los ingredientes
 *    tags: [Ingredent]
 *    parameters:
 *      - in: query
 *        name: q
 *        required: false
 *        description: filtro por nombre
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
 *                $ref: '#/components/schemas/IngredentResponse'
 *      404:
 *        description: Not Found
 * 
 */


/**
 * @swagger
 * /ingredent/{id}:
 *  get:
 *    summary: Retorna un ingrediente por id
 *    tags: [Ingredent]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Ingredent Id
 *    responses:
 *      200:
 *        description: Success
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/CategoryResponse'
 *      404:
 *        description: Not Found
 * 
 */


/**
 * @swagger
 * /ingredent:
 *  post:
 *   summary: Crear un ingrediente
 *   tags: [Ingredent]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Ingredent'
 *   responses:
 *     200:
 *       description: Success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/IngredentResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 *     409:
 *       description: Conflict Ingredent already exist
 */

/**
 * @swagger
 * /ingredent/{id}:
 *  delete:
 *    summary: Borra un ingrediente
 *    tags: [Ingredent]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Ingredent Id
 *    responses:
 *      200:
 *        description: Success
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/IngredentResponse'
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not Found
 * 
 */


/**
 * @swagger
 * /ingredent/{id}:
 *  put:
 *   summary: Actualizar un ingrediente
 *   tags: [Ingredent]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/IngredentUpdate'
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Ingredent Id
 *   responses:
 *     200:
 *       description: Success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/IngredentResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 */


router
  .get("/", ingredentsCtrl.getIngredents)
  .get("/:id", ingredentsCtrl.getIngredent)
  .post(
    "/",
    [verifyToken, canEdit, checkUniqueIngredent],
    ingredentsCtrl.createIngredent
  )
  .put("/:id", [verifyToken, canEdit], ingredentsCtrl.updateIngredent)
  .delete("/:id", [verifyToken, isAdmin], ingredentsCtrl.deleteIngredent);

module.exports = router;
