const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Product = require("./Product");
const Sale = require("./Sale");
const Ingredent = require("./Ingredent");

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
 *              extras:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    extraPrice:
 *                      type: number
 *              remove:
 *                type: array
 *                items:
 *                  id:
 *                    type: string
 *        waiterId:
 *          type: string
 *        tableId:
 *          type: string
 *       required:
 *        - products
 *        - numMesa
 *
 *     OrderResponse:
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
 *        tableId:
 *          type: number
 *
 *     OrderDetailResponse:
 *       type: object
 *       properties:
 *        products:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              quantity:
 *                type: number
 *              idProduct:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  imgURL:
 *                    type: string
 *                  price:
 *                    type: number
 *                  ofert:
 *                    type: number
 *                  ofertPrice:
 *                    type: number
 *       idTable:
 *            type: object
 *            properties:
 *             id:
 *               type: string
 *             numMesa:
 *               type: number
 *             capacity:
 *               type: number
 *             waiterId:
 *               type: string
 *
 */

const orderSchema = new Schema(
  {
    products: [
      {
        idProduct: { ref: "Product", type: Schema.Types.ObjectId },
        extras: [
          {
            id: { type: Schema.Types.ObjectId, ref: "Ingredent" },
            extraPrice: { type: Number, default: 0 },
          },
        ],
        remove: [
          {
            id: { type: Schema.Types.ObjectId, ref: "Ingredent" },
          },
        ],
        quantity: { type: Number, default: 1 },
      },
    ],
    totalQuantity: { type: Number },
    waiterId: { ref: "Waiter", type: Schema.Types.ObjectId },
    tableId: { ref: "Table", type: Schema.Types.ObjectId },
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
    let extra = this.products[i].extras;

    const product = await Product.getProductById(productId);
    let price = product.price;

    if (product.ofert !== 0) {
      let discount = (price * product.ofert) / 100;
      price = price - discount.toFixed(2);
    }

    if (extra.length !== 0) {
      for (let i = 0; i < extra.length; i++) {
        const ingredentExtra = extra[i];
        price += ingredentExtra.extraPrice;
      }
    }

    total += price * cantidad;
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
    if (ret.products.length !== 0) {
      ret.products = doc.products.map((p) => {
        let extra = undefined;
        let remove = undefined;
        if (p.extras.length !== 0) {
          extra = p.extras.map((e) => {
            return { id: e.id, extraPrice: e.extraPrice };
          });
        }

        if (p.remove.length !== 0) {
          remove = p.remove.map((r) => r.id);
        }
        return {
          idProduct: p.idProduct,
          quantity: p.quantity,
          extra,
          remove,
        };
      });
    }
    delete ret._id;
  },
});

module.exports = model("Order", orderSchema);
