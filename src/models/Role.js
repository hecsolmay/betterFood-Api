const { Schema, model } = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     RoleUpdate:
 *       type: object
 *       properties:
 *        rol: 
 *          type: string
 *        active:
 *          type: number
 *       example: 
 *          name: moderador
 *          active: 0
 */



const roleSchema = new Schema(
  {
    name: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Role", roleSchema);
