const Sale = require("../models/Sale");
const Response = require("../common/response");
const paginate = require("../common/paginate");
const { apiURL } = require("../config/config");
const moment = require("moment");
const Order = require("../models/Order");

const path = `${apiURL}/sale`;

const getSales = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const { orderNumber } = req.query;

    const query = await getQueryParams(req);
    if (orderNumber) {
      let order = `#${orderNumber.padStart(3, "0")}`;
      const orderId = await getOrderId(order);
      if (!orderId) {
        return res.status(404).json({ message: "Not Found" });
      }
      delete query.createdAt;
      delete query.order;
      query.order = orderId;
    }
    const sort = { createdAt: 1 };
    const populate = {
      path: "order",
      populate: [
        { path: "tableId", select: { numMesa: 1, capacity: 1 } },
        { path: "waiterId", select: { name: 1, lastName: 1 } },
      ],
    };
    console.log(query);
    const sales = await Sale.paginate(
      query,
      paginate.getOptions({ limit, page, sort, populate })
    );

    const info = paginate.info(sales, path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = sales;
    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getReports = async (req, res) => {
  const { date } = req.query;
  try {
    let { limit, page } = paginate.getQuery(req);
    let query = {};

    const sort = { createdAt: 1 };
    const populate = {
      path: "order",
      populate: [
        { path: "tableId", select: { numMesa: 1 } },
        { path: "waiterId", select: { name: 1, lastName: 1 } },
      ],
    };
    if (date) {
      query.createdAt = { $gte: new Date(Date.parse(date)).toISOString() };
    }

    const sales = await Sale.paginate(
      query,
      paginate.getOptions({ limit, page, sort, populate })
    );

    const info = paginate.info(sales, path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = sales;
    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getSale = async (req, res) => {
  const { id } = req.params;
  try {
    const selectTable = {
      active: 0,
      createdAt: 0,
      updatedAt: 0,
    };

    const selectWaiter = {
      birthdate: 0,
      active: 0,
      createdAt: 0,
      updatedAt: 0,
    };
    const sale = await Sale.findById(id).populate({
      path: "order",
      populate: [
        { path: "tableId", select: selectTable },
        { path: "waiterId", select: selectWaiter },
        {
          path: "products.idProduct",
          populate: { path: "ingredents.id" },
        },
      ],
    });

    if (!sale) return res.status(400).json({ message: "sale not found" });

    Response.succes(res, 200, `Venta ${id}`, sale);
  } catch (error) {
    Response.error(res);
  }
};

const updateSale = async (req, res) => {
  const { moneyReceived } = req.body;
  const sale = req.sale;
  const total = sale.order.total;
  change = moneyReceived - total;

  if (total > moneyReceived)
    return res
      .status(400)
      .json({ error: "El pago no puede ser menor al total" });

  const updatedSale = await Sale.findByIdAndUpdate(
    sale._id,
    { $set: { paid: true, change, moneyReceived } },
    { new: true, populate: "order" }
  );

  Response.succes(res, 200, `Update sale ${sale._id}`, updatedSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    const saleDeleted = await Sale.findByIdAndUpdate(
      id,
      {
        $set: { canceled: true },
      },
      { new: true, populate: "order" }
    );

    if (!saleDeleted)
      return res.status(404).json({ message: "Sale Not Found" });

    Response.succes(res, 200, `Venta ${id} cancelada`, saleDeleted);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

async function getQueryParams(req) {
  let query = {};
  const { date, status } = req.query;

  const avalibleStatus = [
    { name: "all", query: {} },
    { name: "served", query: "servido" },
    { name: "pending", query: "pendiente" },
    { name: "kitchen", query: "cocinando" },
    { name: "canceled", query: "cancelado" },
  ];

  let useDate = new Date(Date.now());
  useDate.setHours(0, 0, 0);

  const avalibleDates = [
    { time: "today", query: useDate.toISOString() },
    { time: "week", query: moment().subtract(1, "week").toISOString() },
    { time: "month", query: moment().subtract(1, "months").toISOString() },
    { time: "period", query: moment().subtract(3, "months").toISOString() },
    { time: "all", query: {} },
  ];

  const testDate = moment().subtract(1, "day").toISOString();

  console.log(testDate);

  const index = avalibleStatus.findIndex((s) => s.name === status);

  if (index !== -1 && index !== 0) {
    const foundOrders = await Order.find({
      status: avalibleStatus[index].query,
    });
    let ids = foundOrders.map((o) => o._id);

    console.log("entro");
    query.order = { $in: ids };
  }

  const indexDate = avalibleDates.findIndex((d) => d.time === date);

  if (indexDate !== -1) {
    let findDate = avalibleDates[indexDate];
    if (findDate.time === "all") {
      return query;
    }
    query.createdAt = { $gte: findDate.query };
  } else {
    let useDate = new Date(Date.now());
    useDate.setHours(0, 0, 0);

    query.createdAt = { $gte: useDate.toISOString() };
  }
  return query;
}

async function getOrderId(orderNumber) {
  const foundCategory = await Order.findOne({ orderNumber });
  if (!foundCategory) return null;
  return foundCategory._id;
}

module.exports = {
  getSales,
  getSale,
  updateSale,
  getReports,
  deleteSale,
};
