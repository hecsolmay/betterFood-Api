const { Router } = require("express");
const salesController = require("../controllers/sales.controller");
const { verifyToken, canSale, verifyUpdateSale } = require("../middleware");

const router = Router();

/**
 * @swagger
 * /Sale/:
 *  get:
 *    summary: Retorna todos las ventas
 *    tags: [Sale]
 *    parameters:
 *      - in: query
 *        name: paid
 *        required: false
 *        description: filtro por status de pagado con numero 1
 *        schema:
 *          type: number
 *      - in: query
 *        name: date
 *        required: false
 *        description: filtro por fecha en formato dd/mm/yyyy
 *        schema:
 *          type: string 
 *      - in: query
 *        name: sort
 *        required: false
 *        description: filtro para orderar de mayor a menor apartir de la fecha de creacion con 1 es menor a mayor
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
 *                $ref: '#/components/schemas/SaleResponse'
 *      404:
 *        description: Not Found
 * 
 */


/**
 * @swagger
 * /Sale/{id}:
 *  get:
 *    summary: Retorna una venta por id
 *    tags: [Sale]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Sale Id
 *    responses:
 *      200:
 *        description: Success
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/SaleResponse'
 *      404:
 *        description: Not Found
 * 
 */


/**
 * @swagger
 * /Sale/{id}:
 *  put:
 *   summary: Actualizar una venta
 *   tags: [Sale]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/SaleUpdate'
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Sale Id
 *   responses:
 *     200:
 *       description: Success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/SaleResponse'
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
  .get("/", [verifyToken, canSale], salesController.getSales)
  .get("/:id", [verifyToken, canSale], salesController.getSale)
  .put(
    "/:id",
    [verifyToken, canSale, verifyUpdateSale],
    salesController.updateSale
  );

module.exports = router;
