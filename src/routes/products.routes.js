const { Router } = require("express");
const productsController = require("../controllers/products.controller");

const {
  verifyToken,
  canEdit,
  isAdmin,
  checkValidCategory,
  verifyExistingIngredents,
} = require("../middleware");

const router = Router();

/**
 * @swagger
 * /product/:
 *  get:
 *    summary: Retorna todos los productos
 *    tags: [Product]
 *    parameters:
 *      - in: query
 *        name: q
 *        required: false
 *        description: filtro por nombre
 *        schema:
 *          type: string
 *      - in: query
 *        name: category
 *        required: false
 *        description: filtro por categoria
 *        schema:
 *          type: string
 *      - in: query
 *        name: offert
 *        required: false
 *        description: filtra los que tienen ofertas poniniendo 1
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
 *                $ref: '#/components/schemas/ProductResponse'
 *      404:
 *        description: Not Found
 *
 */

/**
 * @swagger
 * /product/{id}:
 *  get:
 *    summary: Retorna un producto por id
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Product Id
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
 * /product:
 *  post:
 *   summary: Crear un producto
 *   tags: [Product]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Product'
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/ProductResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 *     409:
 *       description: Conflict Product already exist
 */

/**
 * @swagger
 * /product/{id}:
 *  delete:
 *    summary: Borra un producto
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Product Id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/ProductResponse'
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
 * /product/{id}:
 *  put:
 *   summary: Actualizar un producto
 *   tags: [Product]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ProductUpdate'
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Product Id
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/ProductResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 */

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProduct);
router.post(
  "/",
  [verifyToken, canEdit, checkValidCategory, verifyExistingIngredents],
  productsController.createProduct
);
router.put(
  "/:id",
  [verifyToken, canEdit, checkValidCategory, verifyExistingIngredents],
  productsController.updateProduct
);
router.delete("/:id", [verifyToken, isAdmin], productsController.deleteProduct);

module.exports = router;
