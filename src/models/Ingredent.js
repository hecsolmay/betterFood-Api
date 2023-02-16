const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ingredentSchema = new Schema(
  {
    name: { type: String },
    active: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ingredentSchema.plugin(mongoosePaginate);

ingredentSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    delete ret._id;
  },
});

module.exports = model("Ingredent", ingredentSchema);
