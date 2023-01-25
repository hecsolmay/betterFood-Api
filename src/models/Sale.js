const { model, Schema } = require("mongoose");

const saleSchema = new Schema(
  {
    Order: { ref: "Order", type: Schema.Types.ObjectId },
    paid: { type: Boolean, default: false },
    moneyRecived: { type: Number },
    change: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);
