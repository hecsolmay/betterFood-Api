const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const categorieSchema = new Schema(
  {
    name: { type: String, required: true },
    imgURL: { type: String, required: true },
    totalProducts: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

categorieSchema.plugin(mongoosePaginate);

module.exports = model("Category", categorieSchema);
