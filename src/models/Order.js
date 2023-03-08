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
    orderNumber: { type: String },
    products: [
      {
        idProduct: { ref: "Product", type: Schema.Types.ObjectId },
        extras: [{ ref: "Ingredent", type: Schema.Types.ObjectId }],
        remove: [{ ref: "Ingredent", type: Schema.Types.ObjectId }],
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

    const product = await Product.findById(productId);

    let price = product.price;

    if (product.ofert !== 0) {
      let discount = (price * product.ofert) / 100;
      price = price - discount.toFixed(2);
    }

    if (extra.length !== 0) {
      const extraIngredents = product.ingredents.map((i) => {
        let extraPrice = i.extraPrice || 0;
        return {
          id: i.id,
          extraPrice,
        };
      });
      for (let i = 0; i < extra.length; i++) {
        let id = extra[i].toString();
        let index = extraIngredents.findIndex((i) => i.id == id);

        if (index === -1) return;
        price += extraIngredents[index].extraPrice;
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

  if (!this.orderNumber) {
    const lastOrder = await this.constructor.findOne().sort({ createdAt: -1 });
    let orderNumber = 1;
    if (lastOrder) {
      orderNumber = parseInt(lastOrder.orderNumber.substring(1)) + 1;
    }
    this.orderNumber = `#${orderNumber.toString().padStart(3, "0")}`;
  }
});

orderSchema.pre("findOneAndDelete", async function () {
  const order = await this.model.findOne(this.getFilter());
  const removedSale = await Sale.findOneAndDelete({ order: order._id });
  for (let i = 0; i < order.products.length; i++) {
    let cantidad = order.products[i].quantity;
    let productId = order.products[i].idProduct;

    let foundProd = await Product.findByIdAndUpdate(productId, {
      $inc: { ordered: -cantidad },
    });
  }
});

orderSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    if (ret.products.length !== 0) {
      ret.products = doc.products.map((p) => {
        // delete p._id;
        let extras = undefined;
        let remove = undefined;

        if (p.extras.length !== 0) {
          if (p.idProduct.ingredents) {
            const allIngredents = p.idProduct.ingredents;
            let filteredExtras = allIngredents.filter((i) => {
              return p.extras.includes(i.id._id);
            });
            extras = filteredExtras.map((e) => {
              return {
                id: e.id._id,
                name: e.id.name,
                extraPrice: e.extraPrice,
              };
            });
          } else {
            extras = p.extras.map((e) => {
              let string = e.toString("hex");
              return string;
            });
          }
        }
        if (p.remove.length !== 0) {
          if (p.idProduct.ingredents) {
            const allIngredents = p.idProduct.ingredents;
            let filteredExtras = allIngredents.filter((i) => {
              return p.remove.includes(i.id._id);
            });
            remove = filteredExtras.map((e) => {
              return {
                id: e.id._id,
                name: e.id.name,
              };
            });
          } else {
            remove = p.remove.map((e) => {
              let string = e.toString("hex");
              return string;
            });
          }
        }

        // if (p.remove.length !== 0) {
        //   remove = p.remove.map((e) => {
        //     let string = e.toString("hex");
        //     return string;
        //   });
        // }

        if (p.idProduct.name) {
          let product = {
            id: p.idProduct._id,
            name: p.idProduct.name,
            imgURL: p.idProduct.imgURL,
            description: p.idProduct.description,
            price: p.idProduct.price,
            ofert: p.idProduct.ofert,
          };
          return {
            product,
            quantity: p.quantity,
            extras,
            remove,
          };
        }

        return {
          productId: p.idProduct,
          quantity: p.quantity,
          extras,
          remove,
        };
      });
    }
    delete ret._id;
  },
});

module.exports = model("Order", orderSchema);
