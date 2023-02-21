const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Category = require("./Category");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *        name:
 *          type: string
 *        price:
 *          type: number
 *        imgURL:
 *          type: string
 *          format: url
 *        description:
 *          type: string
 *        categories:
 *          type: array
 *          items:
 *            type: string
 *        ingredents:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              required:
 *                type: boolean
 *              extraPrice:
 *                type: number
 *       required:
 *        - name
 *        - price
 *        - description
 *        - imgURL
 *
 *     ProductResponse:
 *       type: object
 *       properties:
 *        id:
 *          type: string
 *          description: id de la categoria
 *        name:
 *          type: string
 *        price:
 *          type: number
 *        imgURL:
 *          type: string
 *          format: url
 *        description:
 *          type: string
 *        categories:
 *          type: array
 *          items:
 *            type: string
 *        ingredents:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              required:
 *                type: boolean
 *              extraPrice:
 *                type: number
 *        ofert:
 *          type: number
 *        ordered:
 *          type: number
 *        active:
 *          type: number
 *        createdAt:
 *          type: string
 *          description: La fecha en la que se creo
 *        updatedAt:
 *          type: string
 *          description: La fecha en la que se modifico
 *       example:
 *          name: Agua Chile de Rib Eye,
 *          imgURL:  https://www.foodandwine.com/thmb/lgXOxVZGdiZZtRArldeWqpQxKLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ribeye-aquanchile-ft-recipe0819-01ae271fbc3b46e79063c2bbf617ad17.jpg ,
 *          price: 450,
 *          description: Rico agua chile de ribe eye para cargar energias ,
 *          ofert: 0,
 *          categories: []
 *          ordered: 1,
 *          Ingredents: []
 *          createdAt: 2023-02-08T16:53:14.265Z,
 *          updatedAt: 2023-02-13T18:16:20.673Z,
 *          active: 1,
 *          ingredents: []
 *          id: 63e3d37a645ed8f34ba3c1df
 *
 *     ProductResponseDTO:
 *       type: object
 *       properties:
 *        id:
 *          type: string
 *          description: id de la categoria
 *        name:
 *          type: string
 *        price:
 *          type: number
 *        imgURL:
 *          type: string
 *          format: url
 *        description:
 *          type: string
 *        ofert:
 *          type: number
 *        ofertPrice:
 *          type: number
 *       example:
 *          id: 63e3d37a645ed8f34ba3c1df
 *          name: Agua Chile de Rib Eye,
 *          description: Rico agua chile de ribe eye para cargar energias ,
 *          ofert: 10,
 *          price: 150,
 *          ofertPrice: 135,
 *          imgURL:  https://www.foodandwine.com/thmb/lgXOxVZGdiZZtRArldeWqpQxKLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ribeye-aquanchile-ft-recipe0819-01ae271fbc3b46e79063c2bbf617ad17.jpg ,
 *
 *     ProductUpdate:
 *       type: object
 *       properties:
 *        name:
 *          type: string
 *        price:
 *          type: number
 *        imgURL:
 *          type: string
 *          format: url
 *        description:
 *          type: string
 *        categories:
 *          type: array
 *          items:
 *            type: string
 *        ingredents:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              required:
 *                type: boolean
 *              extraPrice:
 *                type: number
 *        ofert:
 *          type: number
 *        active:
 *          type: number
 *       example:
 *          name: Agua Chile de Rib Eye,
 *          imgURL:  https://www.foodandwine.com/thmb/lgXOxVZGdiZZtRArldeWqpQxKLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ribeye-aquanchile-ft-recipe0819-01ae271fbc3b46e79063c2bbf617ad17.jpg ,
 *          price: 450,
 *          description: Rico agua chile de ribe eye para cargar energias ,
 *          ofert: 0,
 *          categories: []
 *          ordered: 1,
 *          Ingredents: []
 *          active: 1,
 *          ingredents: []
 */

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    imgURL: { type: String },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    ingredents: [
      {
        id: { type: Schema.Types.ObjectID, ref: "Ingredent" },
        required: { type: Boolean, default: true },
        extraPrice: { type: Number, default: 0 },
      },
    ],
    ofert: { type: Number, default: 0 },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    ordered: { type: Number, default: 0 },
    active: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.virtual("ofertPrice").get(function () {
  if (this.ofert > 0) {
    let newPrice = 0;
    let discount = (this.price * this.ofert) / 100;
    newPrice = this.price - discount.toFixed(2);

    return newPrice;
  }

  return undefined;
});

productSchema.plugin(mongoosePaginate);

productSchema.statics.getProductById = function (productId) {
  return this.findById(productId);
};

productSchema.pre("save", async function () {
  for (let i = 0; i < this.categories.length; i++) {
    let categoryId = this.categories[i];

    await Category.findByIdAndUpdate(categoryId, {
      $inc: { totalProducts: 1 },
    });
  }
});

productSchema.pre("findOneAndDelete", async function () {
  console.log(this.getFilter());
  const Product = await this.model.findOne(this.getFilter());

  for (let i = 0; i < Product.categories.length; i++) {
    let categoryId = Product.categories[i];

    await Category.findByIdAndUpdate(categoryId, {
      $inc: { totalProducts: -1 },
    });
  }
});

productSchema.set("toObject", { getters: true, virtuals: true });

productSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    if (doc.categories)
      ret.categories = doc.categories.map((c) => {
        return {
          id: c._id,
          name: c.name,
        };
      });

    if (doc.ingredents) {
      ret.ingredents = doc.ingredents.map((i) => {
        if (i.id)
          return {
            id: i.id.id,
            name: i.id.name,
            required: i.required,
            extraPrice: i.extraPrice,
          };
      });
      ret.ingredents = ret.ingredents.filter((i) => i !== undefined);
    }

    if (doc.ofert === 0) delete ret.ofert;

    delete ret._id;
  },
  virtuals: true,
  getters: true,
});

module.exports = model("Product", productSchema);
