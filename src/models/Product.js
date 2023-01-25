const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    imgURL: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    ingredentsInclude: [{ type: String }],
    personalize: {
      extra: [{ type: String }],
      remove: [{ type: String }],
    },
    Offert: { type: Number, default: 0 },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Product", productSchema);
