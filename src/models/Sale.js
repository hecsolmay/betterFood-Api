const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

/**
 * @swagger
 * components:
 *   schemas:
 *     SaleUpdate:
 *       type: object
 *       properties:
 *        moneyReceived:
 *          type: number
 *       example: 
 *          moneyReceived: 450
 *     SaleResponse:
 *       type: object
 *       properties:
 *        id:
 *          type: string
 *        order:
 *          type: object
 *          properties: 
 *            products:
 *              type: array
 *              items: 
 *                type: object 
 *                properties: 
 *                  idProduct:
 *                    type: string 
 *                  quantity:
 *                    type: number 
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
 */


const saleSchema = new Schema(
  {
    order: { ref: "Order", type: Schema.Types.ObjectId },
    paid: { type: Boolean, default: false },
    waiter: {type: Schema.Types.ObjectId, ref: "Waiter"},
    moneyReceived: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

saleSchema.virtual("change").get(function () {
  let total = this.order ? this.order.total : 0;
  if (this.moneyReceived >= total) {
    return this.moneyReceived - total;
  }

  return 0;
});

saleSchema.plugin(mongoosePaginate);

saleSchema.set("toObject", { getters: true, virtuals: true });


saleSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;

    delete ret._id;
  },
  virtuals: true,
  getters: true
});

module.exports = model("Sale", saleSchema);
