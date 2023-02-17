const { Router } = require("express");
const categoryControllers = require("../controllers/categories.controller");
const {
  canEdit,
  isAdmin,
  verifyToken,
  checkUniqueCategory,
} = require("../middleware");

const router = Router();

/**
 * @swagger
 * /category/:
 *  get:
 *    summary: Retorna una categoría
 *    tags: [Category]
 *    parameters:
 *      - in: query
 *        name: q
 *        required: false
 *        description: filtro por nombre
 *        schema:
 *          type: string
 *      - in: query
 *        name: sort
 *        required: false
 *        description: Organizar de mayor a menor por el total de pedidos si es -1 es de mayor a menor de otra forma es de menor a mayor
 *        schema:
 *          type: number
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
 *                $ref: '#/components/schemas/CategoryResponse'
 *      404:
 *        description: Not Found
 * 
 */

router.get("/", categoryControllers.getCategories);

/**
 * @swagger
 * /category/{id}:
 *  get:
 *    summary: Retorna una categoría
 *    tags: [Category]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the category Id
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
router.get("/:id", categoryControllers.getCategory);


/**
 * @swagger
 * /category:
 *  post:
 *   summary: Crear una categoría
 *   tags: [Category]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Category'
 *   responses:
 *     200:
 *       description: Success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/CategoryResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 *     409:
 *       description: Conflict category already exist
 */
router.post(
  "/",
  [verifyToken, canEdit, checkUniqueCategory],
  categoryControllers.createCategory
);

/**
 * @swagger
 * /category/{id}:
 *  delete:
 *    summary: Borra una categoría
 *    tags: [Category]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the category Id
 *    responses:
 *      200:
 *        description: Success
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/CategoryResponse'
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
router.delete(
  "/:id",
  [verifyToken, isAdmin],
  categoryControllers.deleteCategory
);



/**
 * @swagger
 * /category/{id}:
 *  put:
 *   summary: Actualizar una categoría
 *   tags: [Category]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/CategoryUpdate'
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the category Id
 *   responses:
 *     200:
 *       description: Success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/CategoryResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 */
router.put("/:id", [verifyToken, canEdit], categoryControllers.updateCategory);

module.exports = router;
