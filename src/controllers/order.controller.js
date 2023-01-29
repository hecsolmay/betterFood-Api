const Order = require("../models/Order");
const Sale = require("../models/Sale");
const Response = require("../common/response");
const services = require("../services/order.services");
const paginate = require("../common/paginate");

const getOrders = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const query = getQueryParams(req);
    const sort = getQuerySort();

    const sales = await Sale.paginate(
      query,
      paginate.getOptions({ limit, page, sort, populate: "order" })
    );

    const info = paginate.info(sales);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = sales;
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
    const deletedOrder = await services.deleteOrder(id);

    if (!deletedOrder)
      return res.status(400).json({ message: "No se pudo encontrar la orden" });

    res.status(204).json();
  } catch (error) {
    Response.error(res);
  }
};

const postOrder = async (req, res) => {
  const { products, numMesa } = req.body;
  let total = 0;
  let totalQuantity = 0;

  try {
    const foundProducts = await services.searchProducts(products);
    if (!foundProducts)
      return res
        .status(400)
        .json({ message: "No se pudieron encontrar todos los productos" });

    foundProducts.map((pf) => {
      let i = products.findIndex((p) => p.idProduct == pf._id);
      let offert = roundToTwo(pf.offert / 100) * pf.price;
      products[i].totalProduct = roundToTwo(
        (pf.price - offert) * products[i].cantidad
      );
      totalQuantity += products[i].cantidad;
      total += products[i].totalProduct;
    });

    const savedOrder = await services.createOrderAndUpdateProd(
      products,
      numMesa,
      total,
      totalQuantity,
      foundProducts
    );

    console.log(savedOrder.createdAt.toLocaleDateString());

    Response.succes(res, 201, "Orden creada", savedOrder);
  } catch (error) {
    Response.error(res);
  }
};

function roundToTwo(num) {
  return Math.round(num * 100) / 100;
}

function getQueryParams(req) {
  let query = {};
  const { paid } = req.query;

  if (paid) query.paid = paid == 1;

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
