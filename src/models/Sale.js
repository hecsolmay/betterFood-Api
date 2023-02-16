const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const saleSchema = new Schema(
  {
    order: { ref: "Order", type: Schema.Types.ObjectId },
    paid: { type: Boolean, default: false },
    moneyReceived: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

saleSchema.virtual("change").get(function () {
  let total = this.order ? this.order.total : 0;
  console.log(this.order);
  if (this.moneyReceived >= total) {
    return this.moneyReceived - total;
  }

  return 0;
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
