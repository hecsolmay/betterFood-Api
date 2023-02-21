/**
 * @swagger
 * /api/table/:
 *  get:
 *    summary: Retorna todos las mesas
 *    tags: [Tables]
 *    parameters:
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
 *                $ref: '#/components/schemas/TableResponse'
 *      404:
 *        description: Not Found
 *
 */

/**
 * @swagger
 * /api/table/{id}:
 *  get:
 *    summary: Retorna una mesa por id
 *    tags: [Tables]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Table Id
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
 * /api/table/:
 *  post:
 *   summary: Crear una mesa
 *   tags: [Tables]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Table'
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/TableResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 *     409:
 *       description: Conflict Table already exist
 */

/**
 * @swagger
 * /api/table/{id}:
 *  delete:
 *    summary: Borra una mesa
 *    tags: [Tables]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Table Id
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
 * /api/table/{id}:
 *  put:
 *   summary: Actualizar una mesa
 *   tags: [Tables]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/TableUpdate'
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Table Id
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/TableResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 */
