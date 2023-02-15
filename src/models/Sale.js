const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Order = require("../models/Order");

const saleSchema = new Schema(
  {
    order: { ref: "Order", type: Schema.Types.ObjectId },
    paid: { type: Boolean, default: false },
    moneyReceived: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

saleSchema.virtual("change").get(function () {
  if (this.moneyReceived >= this.order.total) {
    return this.moneyReceived - this.order.total;
  }
  return 0
});

saleSchema.plugin(mongoosePaginate);

saleSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    delete ret._id;
  },
  virtuals: true,
});

module.exports = model("Sale", saleSchema);
