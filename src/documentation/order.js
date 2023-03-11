/**
 * @swagger
 * /api/order/:
 *  get:
 *    summary: Retorna todos las ordenes
 *    tags: [Order]
 *    parameters:
 *      - in: query
 *        name: date
 *        required: false
 *        description: filtro por  dia en que se hizo la orden dd/mm/yyyy
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
 *                $ref: '#/components/schemas/OrderResponse'
 *      404:
 *        description: Not Found
 * 
 */


/**
 * @swagger
 * /api/order/{id}:
 *  get:
 *    summary: Retorna una orden por id
 *    tags: [Order]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Order Id
 *    responses:
 *      200:
 *        description: Success
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/OrderDetailResponse'
 *      404:
 *        description: Not Found
 * 
 */


/**
 * @swagger
 * /api/order/:
 *  post:
 *   summary: Crear una orden
 *   tags: 
 *      - Order
 *      - Mobile
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Order'
 *   responses:
 *     201:
 *       description: Success Create
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Order'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 *     409:
 *       description: Conflict Order already exist
 */

