const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcryptjs");

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRegister:
 *       type: object
 *       properties:
 *        username:
 *          type: string
 *          description: Nombre del usuario
 *        email:
 *          type: string
 *          format: email
 *          description: Correo del usuario
 *        password:
 *          type: string
 *          description: Contraseña del usuario
 *       required:
 *        - username
 *        - email
 *        - password
 *       example:
 *          username: Pedro Solis
 *          email: email@email.com
 *          password: smgk323ls@s23.s
 *
 *     AuthLogin:
 *       type: object
 *       properties:
 *        email:
 *          type: string
 *          format: email
 *          description: Correo del usuario
 *        password:
 *          type: string
 *          description: Contraseña del usuario
 *       required:
 *        - email
 *        - password
 *       example:
 *          email: email@email.com
 *          password: smgk323ls@s23.s
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *        token:
 *          type: string
 *          description: jwToken
 *        user:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              description: id del usuario
 *            username:
 *              type: string
 *              description: username del usuario
 *            email:
 *              type: string
 *              description: email del usuario
 *            picture:
 *              type: string
 *              description: url de imagen del usuario
 *            rol:
 *              type: object
 *              properties: 
 *                name:
 *                  type: string
 *                  description: nombre del rol
 *            createdAt:
 *              type: string
 *              description: fecha de creacion del usuario
 *            updatedAt:
 *              type: string
 *              description: fecha de creacion del usuario
 * 
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         picture:
 *           type: string
 *         rol:
 *           type: object
 *           properties: 
 *             id:
 *               type: string
 *             name:
 *               type: string
 *         active:
 *           type: 1
 *         createdAt:
 *           type: string
 *           description: fecha de creacion del usuario
 *         updatedAt:
 *           type: string
 *           description: fecha de creacion del usuario
 */

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
