/**
 * @swagger
 * /api/sale/:
 *  get:
 *    summary: Retorna todos las ventas
 *    tags: [Sale]
 *    parameters:
 *      - in: query
 *        name: orderNumber
 *        required: false
 *        description: filtro por numero de orden
 *        schema:
 *          type: number
 *      - in: query
 *        name: date
 *        required: false
 *        description: filtro por fecha en disponibles today,week,month,period,all
 *        schema:
 *          type: string 
 *      - in: query
 *        name: status
 *        required: false
 *        description: filtro por estatus del pedido disponibles all, paid,pending
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
 * /api/sale/reports:
 *  get:
 *    summary: Retorna todos las ventas
 *    tags: 
 *       - Sale
 *    parameters:
 *      - in: query
 *        name: date
 *        required: false
 *        description: filtro fecha con formato YYYY-MM-DD
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
 *                $ref: '#/components/schemas/SaleResponse'
 *      404:
 *        description: Not Found
 * 
 */


/**
 * @swagger
 * /api/Sale/{id}:
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
 * /api/Sale/{id}:
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

/**
 * @swagger
 * /api/sale/{id}:
 *  delete:
 *    summary: Borra una venta
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
 *        description: ok
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
