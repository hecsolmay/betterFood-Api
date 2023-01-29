const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const saleSchema = new Schema(
  {
    order: { ref: "Order", type: Schema.Types.ObjectId },
    paid: { type: Boolean, default: false },
    moneyReceived: { type: Number, default: 0 },
    change: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

saleSchema.plugin(mongoosePaginate);

module.exports = model("Sale", saleSchema);
