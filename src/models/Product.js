const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    offert: { type: Number, default: 0 },
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
