const { Schema, model } = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     RoleResponse:
 *       type: object
 *       properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *       example:
 *          id: 65233124Es
 *          name: moderador
 */

const roleSchema = new Schema(
  {
    name: { type: String },
  },
  {
    versionKey: false,
  }
);

roleSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    delete ret._id;
  },
});

module.exports = model("Role", roleSchema);
