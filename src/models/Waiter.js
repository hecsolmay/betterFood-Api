const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

/**
 * @swagger
 * components:
 *   schemas:
 *     Waiter:
 *       type: object
 *       properties:
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        birthdate:
 *          type: string
 *       required:
 *        - name
 *        - lastName
 *        - birthdate
 *       example:
 *        name: hecTOR
 *        lastName: Solis
 *        birthdate: 01/30/2003
 *
 *     WaiterResponse:
 *       type: object
 *       properties:
 *        id:
 *          type: string
 *          description: id de la categoria
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        birthdate:
 *          type: string
 *        active:
 *          type: number
 *        age:
 *          type: number
 *        createAt:
 *          type: string
 *        updateAt:
 *          type: string
 *
 *       example:
 *          name: Hector
 *          lastName: Solis
 *          birthdate: 2003-01-30T06:00:00.000Z
 *          active: 1,
 *          age: 20,
 *          createdAt: 2023-02-09T16:14:05.541Z,
 *          updatedAt: 2023-02-16T06:47:31.559Z,
 *          id: 63e51bccc8f638d26725715c
 *
 *     WaiterResponseDto:
 *       type: object
 *       properties:
 *        id:
 *          type: string
 *          description: id de la categoria
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *
 *       example:
 *          name: Hector
 *          lastName: Solis
 *          id: 63e51bccc8f638d26725715c
 *
 *     WaiterUpdate:
 *       type: object
 *       properties:
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        birthdate:
 *          type: string
 *        active:
 *          type: number
 *       example:
 *          name: Hector
 *          lastName: Solis
 *          birthdate: 01/30/2003
 *          active: 1,
 */

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
  if (this.birthdate) {
    const now = new Date();
    const diff = now - this.birthdate;
    const age = Math.floor(diff / (365 * 24 * 60 * 60 * 1000));
    return age;
  }
});

WaiterSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    delete ret._id;
  },

  virtuals: true,
});

module.exports = model("Waiter", WaiterSchema);
