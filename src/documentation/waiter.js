/**
 * @swagger
 * /api/waiter/:
 *  get:
 *    summary: Retorna todos los meseros
 *    tags: [Waiter]
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
 *                $ref: '#/components/schemas/WaiterResponse'
 *      404:
 *        description: Not Found
 * 
 */


/**
 * @swagger
 * /api/waiter/{id}:
 *  get:
 *    summary: Retorna un mesero por id
 *    tags: [Waiter]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Waiter Id
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
 * /api/waiter/:
 *  post:
 *   summary: Crear un mesero
 *   tags: [Waiter]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Waiter'
 *   responses:
 *     200:
 *       description: Success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/WaiterResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 *     409:
 *       description: Conflict Waiter already exist
 */

/**
 * @swagger
 * /api/waiter/{id}:
 *  delete:
 *    summary: Borra un mesero
 *    tags: [Waiter]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Waiter Id
 *    responses:
 *      204:
 *        description: No content
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
 * /api/waiter/{id}:
 *  put:
 *   summary: Actualizar un mesero
 *   tags: [Waiter]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/WaiterUpdate'
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Waiter Id
 *   responses:
 *     200:
 *       description: Success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/WaiterResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 */
