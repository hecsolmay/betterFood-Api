const Sale = require("../models/Sale");
const Order = require("../models/Order");

const verifyStatusDeleteOrder = async (req, res, next) => {
  const { id } = req.params;

  // const sale = await Sale.findOne({ order: id });
  const sale = await Sale.findOne({ order: id });

  console.log(sale);

  if (!sale) return res.status(400).json({ message: "Bad Request" });
  if (sale.paid)
    return res
      .status(400)
      .json({ message: "No puedes modificar o eliminar una orden ya pagada" });

  next();
};

const verifyOrderStatus = async (req, res, next) => {
  const { status } = req.body;

  const avalibleStatus = ["pendiente", "cocinando", "servido", "cancelado"];

  let foundStatus = avalibleStatus.find((s) => s === status);

  if (!foundStatus)
    return res.status(400).json({ message: "Bad request Unvalid Status" });

  next();
};

const verifyUpdateSale = async (req, res, next) => {
  const { id } = req.params;

  const sale = await Sale.findById(id).populate("order");

  if (!sale) return res.status(400).json({ error: "sale not found" });

  if (sale.paid)
    return res
      .status(400)
      .json({ message: "no puedes cambiar una venta pagada" });

  if (sale.canceled)
    return res
      .status(400)
      .json({ message: "No se puede pagar una venta ya cancelada" });

  req.sale = sale;

  next();
};

module.exports = {
  verifyStatusDeleteOrder,
  verifyUpdateSale,
  verifyOrderStatus,
};
