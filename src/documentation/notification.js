/**
 * @swagger
 * /api/notification/help:
 *  post:
 *   summary: Crear una peticion de ayuda
 *   tags:
 *    - Notification
 *    - Mobile
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Notification'
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/IngredentResponse'
 *     404:
 *       description: Not Found
 *     500:
 *       description: Internal Server Error
 */

/**
 * @swagger
 * /api/waiter/{id}/notification:
 *  get:
 *   summary: Obtiene una lista de las notificaciones del mesero
 *   tags:
 *    - Notification
 *    - Mobile
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: the Waiter Id
 *     - in: query
 *       name: limit
 *       required: false
 *       schema:
 *         type: number
 *     - in: query
 *       name: page
 *       required: false
 *       schema:
 *         type: number
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/NotificationResponse'
 *     404:
 *       description: Not Found
 *     500:
 *       description: Internal Server Error
 */
