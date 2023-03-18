const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *        idTable:
 *          type: string
 *        waiterId:
 *          type: string
 *       example:
 *          waiterId: 63f804a8757fa73689a81958
 *          idTable: 63f8df91757fa73689a81a98
 *
 *     NotificationResponse:
 *       type: object
 *       properties:
 *        table:
 *          type: string
 *        waiter:
 *          type: string
 *        title:
 *          type: string
 *        text:
 *          type: string
 *        type:
 *          type: string
 *       example:
 *          table: 63f8df91757fa73689a81a98
 *          waiter: 63f804a8757fa73689a81958
 *          title: Nueva Orden en la mesa 1
 *          text: La mesa 1 ha generado una nueva orden
 *          type: order
 *
 */

const notificationSchema = new Schema(
  {
    table: { ref: "Table", type: Schema.Types.ObjectId },
    waiter: { ref: "Waiter", type: Schema.Types.ObjectId },
    title: { type: String },
    text: { type: String },
    type: { type: String, enum: ["help", "order"], default: "help" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

notificationSchema.plugin(mongoosePaginate);

notificationSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = doc._id;
    delete ret.updatedAt;
    delete ret._id;
  },
});

module.exports = model("Notification", notificationSchema);
