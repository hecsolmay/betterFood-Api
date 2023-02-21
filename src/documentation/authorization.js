/**
 * @swagger
 * /api/auth/singup:
 *  post:
 *   summary: Registrar un usuario
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/AuthRegister'
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/AuthResponse'
 *     409:
 *       description: Conflict user already exist
*/

/**
 * @swagger
 * /api/auth/singin:
 *  post:
 *   summary: Inicia sesion de usuario
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/AuthLogin'
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/AuthResponse'
 *     409:
 *       description: Conflict user already exist
*/

