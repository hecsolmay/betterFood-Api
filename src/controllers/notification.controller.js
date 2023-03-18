const Notification = require("../models/Notification");
const Response = require("../common/response");
const paginate = require("../common/paginate");
const Table = require("../models/Table");
const Waiter = require("../models/Waiter");

const postHelp = async (req, res) => {
  const { idTable, waiterId } = req.body;
  try {
    const { io } = require("../index");

    const foundTable = await Table.findById(idTable);

    const newNotification = new Notification({
      waiter: waiterId,
      table: idTable,
      title: `Solicitud de ayuda`,
      text: `La mesa ${foundTable.numMesa} ha solicitado su ayuda`,
    });

    const savedNotification = await newNotification.save();

    io.to(`${waiterId}`).emit("notification", savedNotification);
    Response.succes(res, 201, "Notificacion creada", savedNotification);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getNotifications = async (req, res) => {
  const { id } = req.params;
  try {
    const { limit, page } = paginate.getQuery(req);
    const foundWaiter = await Waiter.findById(id);

    if (!foundWaiter)
      return res.status(404).json({ message: "Waiter Not Found" });

    const notifications = await Notification.paginate(
      { waiter: foundWaiter._id },
      paginate.getOptions({ limit, page })
    );

    const info = paginate.info(notifications);
    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = notifications;

    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

module.exports = { postHelp, getNotifications };
