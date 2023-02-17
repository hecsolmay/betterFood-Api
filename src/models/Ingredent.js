const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredent:
 *       type: object
 *       properties:
 *        name: 
 *          type: string
 *       required:
 *        - name 
 *       example: 
 *          name: Salsa
 * 
 *     IngredentResponse:
 *       type: object
 *       properties:
 *        id: 
 *          type: string
 *        name: 
 *          type: string
 *        active:
 *          type: number
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *       example: 
 *          name: Tortilla
 *          active: 1,
 *          createdAt: 2023-02-09T16:14:05.541Z,
 *          updatedAt: 2023-02-16T06:47:31.559Z,
 *          id: 63e51bccc8f638d26725715c
 *   
 *     IngredentUpdate:
 *       type: object
 *       properties:
 *        name: 
 *          type: string
 *          description: nombre de la categoria
 *        active:
 *          type: number
 *          description: Indica si la categoria esta activa
 *       example: 
 *          name: Tortilla Actualizada
 *          active: 1,
 */



const ingredentSchema = new Schema(
  {
    name: { type: String },
    active: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ingredentSchema.plugin(mongoosePaginate);

ingredentSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    delete ret._id;
  },
});

module.exports = model("Ingredent", ingredentSchema);
