const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Category = require("./Category");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    // imgURL: { type: String, required: true },
    imgURL: { type: String },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    // ingredents: [
    //   {
    //     name: { type: String },
    //     required: { type: Boolean, default: true },
    //     extraPrice: { type: Number, default: 0 },
    //   },
    // ],
    ingredents: [
      {
        id: { type: Schema.Types.ObjectID, ref: "Ingredent" },
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
    active: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.plugin(mongoosePaginate);

productSchema.statics.getProductById = function (productId) {
  return this.findById(productId);
};

productSchema.pre("save", async function () {
  for (let i = 0; i < this.categories.length; i++) {
    let categoryId = this.categories[i];

    await Category.findByIdAndUpdate(categoryId, {
      $inc: { totalProducts: 1 },
    });
  }
});

productSchema.pre("findOneAndDelete", async function () {
  console.log(this.getFilter());
  const Product = await this.model.findOne(this.getFilter());

  for (let i = 0; i < Product.categories.length; i++) {
    let categoryId = Product.categories[i];

    await Category.findByIdAndUpdate(categoryId, {
      $inc: { totalProducts: -1 },
    });
  }
});

productSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    ret.categories = doc.categories.map((c) => {
      return {
        id: c._id,
        name: c.name,
      };
    });

    ret.ingredents = doc.ingredents.map((i) => {
      if (i.id)
        return {
          id: i.id.id,
          name: i.id.name,
          required: i.required,
          extraPrice: i.extraPrice,
        };
    });

    ret.ingredents = ret.ingredents.filter((i) => i !== undefined);
    // delete ret.ingredents._id;
    delete ret._id;
  },
});

module.exports = model("Product", productSchema);
