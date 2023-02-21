/**
 * @swagger
 * /api/product/:
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
 * /api/m/product/ofert:
 *  get:
 *    summary: Retorna todos los productos en oferta
 *    tags: [Mobile]
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
 *                $ref: '#/components/schemas/ProductResponseDTO'
 *      404:
 *        description: Not Found
 *
 */

/**
 * @swagger
 * /api/m/product/:
 *  get:
 *    summary: Retorna todos los productos 
 *    tags: [Mobile]
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
 *                $ref: '#/components/schemas/ProductResponseDTO'
 *      404:
 *        description: Not Found
 *
 */

/**
 * @swagger
 * /api/m/product/{id}:
 *  get:
 *    summary: Retorna un producto por id
 *    tags: [Mobile]
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
 *              $ref: '#/components/schemas/ProductResponseDTO'
 *      404:
 *        description: Not Found
 *
 */


/**
 * @swagger
 * /api/product/{id}:
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
 *              $ref: '#/components/schemas/ProductResponse'
 *      404:
 *        description: Not Found
 *
 */

/**
 * @swagger
 * /api/product/:
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
 * /api/product/{id}:
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
 * /api/product/{id}:
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
 *     204:
 *       description: Not Content
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not Found
 */
