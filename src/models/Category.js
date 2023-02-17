const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *        name: 
 *          type: string
 *          description: nombre de la categoria
 *        imgURL:
 *          type: string
 *          format: url
 *          description: La imagen de la categoria por medio de url
 *       required:
 *        - name 
 *        - imgURL 
 *       example: 
 *          name: Tacos
 *          imgURL: https://cdn.pixabay.com/photo/2019/07/21/01/36/tacos-al-pastor-4351813_1280.jpg
 *     CategoryResponse:
 *       type: object
 *       properties:
 *        id: 
 *          type: string
 *          description: id de la categoria
 *        name: 
 *          type: string
 *          description: nombre de la categoria
 *        imgURL:
 *          type: string
 *          format: url
 *          description: La imagen de la categoria por medio de url
 *        totalProducts:
 *          type: number
 *          description: El total de productos de la categoria
 *        active:
 *          type: number
 *          description: Indica si la categoria esta activa
 *        createdAt:
 *          type: string
 *          description: La fecha en la que se creo
 *        updatedAt:
 *          type: string
 *          description: La fecha en la que se modifico
 *       example: 
 *          name: Tacos
 *          imgURL: https://cdn.pixabay.com/photo/2019/07/21/01/36/tacos-al-pastor-4351813_1280.jpg
 *          totalProducts: 3,
 *          createdAt: 2023-02-09T16:14:05.541Z,
 *          updatedAt: 2023-02-16T06:47:31.559Z,
 *          active: 1,
 *          id: 63e51bccc8f638d26725715c
 *   
 *     CategoryUpdate:
 *       type: object
 *       properties:
 *        name: 
 *          type: string
 *          description: nombre de la categoria
 *        imgURL:
 *          type: string
 *          format: url
 *          description: La imagen de la categoria por medio de url
 *        active:
 *          type: number
 *          description: Indica si la categoria esta activa
 *       example: 
 *          name: Tacos
 *          imgURL: https://cdn.pixabay.com/photo/2019/07/21/01/36/tacos-al-pastor-4351813_1280.jpg
 *          active: 1,
 */

const categorieSchema = new Schema(
  {
    name: { type: String, required: true },
    imgURL: { type: String, required: true },
    totalProducts: { type: Number, default: 0 },
    active: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

categorieSchema.plugin(mongoosePaginate);

categorieSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    delete ret._id;
  },
});

module.exports = model("Category", categorieSchema);
