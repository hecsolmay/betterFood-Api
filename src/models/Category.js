const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const categorieSchema = new Schema(
  {
    name: { type: String, required: true },
    imgURL: { type: String, required: true },
    totalProducts: { type: Number, default: 0 },
    active: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

categorieSchema.plugin(mongoosePaginate);

categorieSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    delete ret._id;
  },
});

module.exports = model("Category", categorieSchema);
