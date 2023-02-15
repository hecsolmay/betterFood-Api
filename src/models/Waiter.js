const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const WaiterSchema = new Schema(
  {
    name: { type: String, length: 100 },
    lastName: { type: String, length: 100 },
    birthdate: { type: Date },
    active: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

WaiterSchema.plugin(mongoosePaginate);

WaiterSchema.virtual("age").get(function () {
  const now = new Date();
  const diff = now - this.birthdate;
  const age = Math.floor(diff / (365 * 24 * 60 * 60 * 1000));
  return age;
});

WaiterSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    delete ret._id;
  },

  virtuals: true,
});

module.exports = model("Waiter", WaiterSchema);
