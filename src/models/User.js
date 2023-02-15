const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    picture: {
      type: String,
      default: "", //todo: implementando multer subir una foto de perfil por defecto si esta vacio
    },
    rol: { ref: "Role", type: Schema.Types.ObjectId },
    active: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(mongoosePaginate);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    ret.rol = {
      id: doc.rol._id,
      name: doc.rol.name,
    };
    delete ret._id;
  },
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

module.exports = model("User", userSchema);
