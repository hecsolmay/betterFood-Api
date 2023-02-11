const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    // imgURL: { type: String, required: true },
    imgURL: { type: String },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    ingredents: [
      {
        name: { type: String },
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.plugin(mongoosePaginate);

module.exports = model("Product", productSchema);
