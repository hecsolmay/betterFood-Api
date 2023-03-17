const Order = require("../models/Order");
const Sale = require("../models/Sale");
const Response = require("../common/response");
const services = require("../services/order.services");
const paginate = require("../common/paginate");
const { apiURL } = require("../config/config");
const {
  getSalesPaginate,
  getPaginateSalesMobile,
} = require("./sales.controller");

const path = `${apiURL}/order`;

const getOrders = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const query = getQueryParams(req);
    const sort = getQuerySort();

    const orders = await Order.paginate(
      query,
      paginate.getOptions({ limit, page, sort })
    );

    const info = paginate.info(orders, path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = orders;
    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getOrder = async (req, res) => {
  try {
    const selectProduct = {
      description: 0,
      categories: 0,
      ordered: 0,
      ingredents: 0,
      createdAt: 0,
      updatedAt: 0,
      active: 0,
    };

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

    const { id } = req.params;
    const order = await Order.findById(id).populate([
      { path: "tableId", select: selectTable },
      { path: "waiterId", select: selectWaiter },
      {
        path: "products.idProduct",
        populate: { path: "ingredents.id" },
      },
    ]);

    if (!order)
      return res.status(400).json({ message: "No se encontro ninguna orden" });

    Response.succes(res, 200, `Orden ${id}`, order);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: { status },
      },
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Order Not Found" });

    if (status === "cancelado") {
      const foundSale = await Sale.findOneAndUpdate(
        { order: updatedOrder._id },
        { $set: { canceled: true } },
        { new: true }
      );

      console.log(foundSale);
    }
    Response.succes(res, 200, `Orden ${id} actualizada`, updatedOrder);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const postOrder = async (req, res) => {
  const { products, tableId, waiterId } = req.body;

  try {
    const { io } = require("../index");

    const foundProducts = await services.searchProducts(products);
    if (!foundProducts)
      return res
        .status(400)
        .json({ message: "No se pudieron encontrar todos los productos" });

    const newOrder = new Order({ products, tableId, waiterId });
    let savedOrder = await newOrder.save();

    const newSale = new Sale({ order: savedOrder._id });
    await newSale.save();

    const { info, results } = await getSalesPaginate();

    const data = await getPaginateSalesMobile(waiterId);

    io.emit("newOrder", { info, results });
    io.to(`${waiterId}`).emit("newOrderWaiter", { info: data.info, results: data.results });
    Response.succes(res, 201, "Orden creada", savedOrder);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

function getQueryParams(req) {
  let query = {};
  const { date } = req.query;

  if (date) {
    let findDate = new Date(Date.parse(date.split("/").reverse().join("/")));
    query.createdAt = { $gte: findDate };
  }
  return query;
}

function getQuerySort() {
  let sort = { createdAt: 0 };

  return sort;
}

function getResultsPaginate() {}

module.exports = {
  getOrders,
  getOrder,
  postOrder,
  updateOrder,
};
