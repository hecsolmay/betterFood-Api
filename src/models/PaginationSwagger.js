
/**
 * @swagger
 * components:
 *   schemas:
 *     Info:
 *       type: object
 *       properties:
 *         limit:
 *           type: number
 *           description: Limite de elementos por pagina
 *         currentPage:
 *           type: number
 *           description: La pagina en la que se encuentra
 *         nextPage:
 *           type: string
 *           format: url
 *           description: El link a la siguiente pagina
 *         prevPage:
 *           type: string
 *           format: url
 *           description: El link a la pagina anterior
 *         next:
 *           type: boolean
 *           description: Nos dice si hay o no hay siguiente pagina
 *         prev:
 *           type: boolean
 *           description: Nos dice si hay o no hay pagina anterior
 *         totalPages:
 *           type: number
 *           description: total de paginas
 *         items:
 *           type: number
 *           description: total de elementos paginados
 * 
 *       example:
 *         limit: 10,
 *         currentPage: 1,
 *         nextPage: http://localhost:3000/category?page=2,
 *         prevPage: null,
 *         next: true,
 *         prev: false,
 *         totalPages: 2,
 *         items: 11
 *         
 */