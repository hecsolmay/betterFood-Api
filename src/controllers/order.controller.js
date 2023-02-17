const Order = require("../models/Order");
const Sale = require("../models/Sale");
const Response = require("../common/response");
const services = require("../services/order.services");
const paginate = require("../common/paginate");
const { apiURL } = require("../config/config");

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
    Response.error(res);
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order)
      return res.status(400).json({ message: "No se encontro ninguna orden" });

    Response.succes(res, 200, `Orden ${id}`, order);
  } catch (error) {
    Response.error(res);
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder)
      return res.status(400).json({ message: "No se pudo encontrar la orden" });

    res.status(204).json();
  } catch (error) {
    Response.error(res);
  }
};

const postOrder = async (req, res) => {
  const { products, numMesa } = req.body;

  try {
    const foundProducts = await services.searchProducts(products);
    if (!foundProducts)
      return res
        .status(400)
        .json({ message: "No se pudieron encontrar todos los productos" });

    const newOrder = new Order({ products, numMesa });
    let savedOrder = await newOrder.save();

    const newSale = new Sale({ order: savedOrder._id });
    await newSale.save();

    Response.succes(res, 201, "Orden creada", savedOrder);
  } catch (error) {
    Response.error(res);
  }
};

function getQueryParams(req) {
  let query = {};
  const { q } = req.query;

  // if (paid) query.paid = paid == 1;
  if (q) query.numMesa = q;

  return query;
}

function getQuerySort() {
  let sort = { createdAt: 0 };

  return sort;
}

module.exports = {
  getOrders,
  getOrder,
  deleteOrder,
  postOrder,
};
