const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

/**
 * @swagger
 * components:
 *   schemas:
 *     Table:
 *       type: object
 *       properties:
 *        numMesa:
 *          type: number
 *        capacity:
 *          type: number
 *       required:
 *        - numMesa
 *        - capacity
 *       example:
 *          numMesa: 1
 *          capacity: 5
 *
 *     TableResponse:
 *       type: object
 *       properties:
 *        id:
 *          type: string
 *        numMesa:
 *          type: number
 *        capacity:
 *          type: number
 *        waiterId:
 *          type: string
 *        active:
 *          type: number
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *       example:
 *          id: 63e51bccc8f638d26725715c
 *          numMesa: 1
 *          capacity: 6
 *          waiterId: 63e51bccc8f638d26725720P
 *          active: 1,
 *          createdAt: 2023-02-09T16:14:05.541Z,
 *          updatedAt: 2023-02-16T06:47:31.559Z,
 *
 *     TableUpdate:
 *       type: object
 *       properties:
 *        numMesa:
 *          type: number
 *        capacity:
 *          type: number
 *        waiterId:
 *          type: string
 *        active:
 *          type: number
 *       example:
 *          numMesa: 2
 *          capacity: 6
 *          waiterId: 63e51bccc8f638d26725715c
 *          active: 1,
 */

const tableSchema = new Schema(
  {
    numMesa: { type: Number, required: true },
    capacity: { type: Number, required: true },
    waiterId: { type: Schema.Types.ObjectId, ref: "Waiter" },
    active: { type: Number, default: 1 },
  },
  { timestamps: true, versionKey: false }
);

tableSchema.plugin(mongoosePaginate);

tableSchema.set("toObject", { getters: true, virtuals: true });

tableSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;

    delete ret._id;
  },
  virtuals: true,
  getters: true,
});

module.exports = model("Table", tableSchema);
