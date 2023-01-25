const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    products: [
      {
        idProduct: { ref: "Product", type: Schema.Types.ObjectId },
        cantidad: { type: Number, default: 1 },
        totalProduct: { type: Number },
      },
    ],
    numMesa: { type: Number },
    total: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

orderSchema.pre("save", (next) => {
  let total = 0;
  this.products.map((product) => (total += product.totalProduct));
  this.total = total;
  next();
});

module.exports = model("Order", orderSchema);
