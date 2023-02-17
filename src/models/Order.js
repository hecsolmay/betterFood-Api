const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Product = require("./Product");
const Sale = require("./Sale");

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *        products: 
 *          type: array
 *          items: 
 *            type: object
 *            properties:
 *              idProduct: 
 *                type: string 
 *              quantity:
 *                type: number 
 *        numMesa: 
 *          type: number
 *       required:
 *        - products 
 *        - numMesa 
 * 
 *     OrderResponse:
 *       type: object
 *       properties:
 *        id:
 *          type: string
 *        products: 
 *          type: array
 *          properties:
 *            idProduct: 
 *              type: string 
 *            quantity:
 *              type: number 
 *        numMesa: 
 *          type: number
 *        totalQuantity:
 *          type: number
 *        total:
 *          type: number
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *   
 */


const orderSchema = new Schema(
  {
    products: [
      {
        idProduct: { ref: "Product", type: Schema.Types.ObjectId },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalQuantity: { type: Number },
    numMesa: { type: Number },
    total: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

orderSchema.plugin(mongoosePaginate);

orderSchema.statics.getOrderById = function (orderId) {
  return this.findById(orderId);
};

orderSchema.pre("save", async function () {
  let total = 0;
  let totalQuantity = 0;
  for (let i = 0; i < this.products.length; i++) {
    let productId = this.products[i].idProduct;
    let cantidad = this.products[i].quantity;
    const product = await Product.getProductById(productId);
    total += product.price * cantidad;
    totalQuantity += cantidad;

    await Product.findByIdAndUpdate(productId, {
      $inc: { ordered: cantidad },
    });
  }
  this.total = total;
  this.totalQuantity = totalQuantity;
});

orderSchema.pre("findOneAndDelete", async function () {
  console.log(this.getFilter());
  const order = await this.model.findOne(this.getFilter());
  const removedSale = await Sale.findOneAndDelete({ order: order._id });
  for (let i = 0; i < order.products.length; i++) {
    let cantidad = order.products[i].quantity;
    let productId = order.products[i].idProduct;

    let foundProd = await Product.findByIdAndUpdate(productId, {
      $inc: { ordered: -cantidad },
    });
  }
  console.log(removedSale);
});

orderSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    ret.products = doc.products.map((p) => {
      return {
        idProduct: p.idProduct,
        quantity: p.quantity,
      };
    });
    delete ret._id;
  },
});

module.exports = model("Order", orderSchema);
