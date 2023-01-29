const Sale = require("../models/Sale");
const Response = require("../common/response");
const paginate = require("../common/paginate");

const getSales = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const query = getQueryParams(req);
    const sort = getQuerySort(req);
    console.log(sort);
    console.log(query);
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

const getSale = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await Sale.findById(id).populate("order");

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

  console.log(sale);

  if (total > moneyReceived)
    return res
      .status(400)
      .json({ error: "El pago no puede ser menor al total" });

  const updatedSale = await Sale.findByIdAndUpdate(
    sale._id,
    { $set: { paid: true, change, moneyReceived } },
    { new: true }
  );

  Response.succes(res, 201, `Update sale ${sale._id}`, updatedSale);
};

function getQueryParams(req) {
  let query = {};
  const { paid, date } = req.query;

  if (paid) query.paid = paid == 1;

  if (date) {
    let findate = new Date(Date.parse(date.split("/").reverse().join("/")));
    query.createdAt = { $gte: findate };
  }
  return query;
}

function getQuerySort(req) {
  const { sort } = req.query;
  let body = {};

  if (sort) {
    sort == 1 ? (body = { createdAt: 1 }) : body == { createdAt: 0 };
  }
  return body;
}

module.exports = {
  getSales,
  getSale,
  updateSale,
};
