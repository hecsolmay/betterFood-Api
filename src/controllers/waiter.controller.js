const Waiter = require("../models/Waiter");
const Response = require("../common/response");
const paginate = require("../common/paginate");
const { apiURL } = require("../config/config");
const createHttpError = require("http-errors");
const PascalCase = require("../libs/pascalCase");
const { generateListQr, generateQr } = require("../libs/qrcode");
const PDFDocument = require("pdfkit");

const path = `${apiURL}/waiter`;

const getWaiters = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const query = getQueryParams(req);
    // const sort = getQuerySort(req);

    const waiters = await Waiter.paginate(
      query,
      paginate.getOptions({
        limit,
        page,
      })
    );

    const info = paginate.info(waiters, path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = waiters;

    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
  }
};

const getWaiter = async (req, res) => {
  try {
    const { id } = req.params;
    const waiter = await Waiter.findById(id);
    if (!waiter) Response.error(res, createHttpError.NotFound());

    Response.succes(res, 200, `Mesero ${id}`, waiter);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getWaiterDto = async (req, res) => {
  try {
    const { id } = req.params;
    const waiter = await Waiter.findById(id, { name: 1, lastName: 1 });
    if (!waiter) Response.error(res, createHttpError.NotFound());

    Response.succes(res, 200, `Mesero ${id}`, waiter);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const createWaiter = async (req, res) => {
  const { name, lastName } = req.body;
  let { birthdate } = req.body;
  birthdate = new Date(birthdate);
  const newWaiter = new Waiter({
    name: PascalCase(name),
    lastName: PascalCase(lastName),
    birthdate,
  });

  try {
    const savedWaiter = await newWaiter.save();
    Response.succes(res, 201, "Mesero Creado Con exito", savedWaiter);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const deleteWaiter = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWaiter = await Waiter.findByIdAndDelete(id);

    if (!deletedWaiter) return Response.error(res, createHttpError.NotFound());

    return res.status(204).json();
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const updateWaiter = async (req, res) => {
  let { name, lastName, active } = req.body;
  let { birthdate } = req.body;
  birthdate ? (birthdate = new Date(birthdate)) : null;
  name ? (name = PascalCase(name)) : null;
  lastName ? (lastName = PascalCase(lastName)) : null;

  const { id } = req.params;

  try {
    const updatedWaiter = await Waiter.findByIdAndUpdate(
      id,
      {
        $set: { name, lastName, birthdate, active },
      },
      { new: true }
    );
    Response.succes(res, 200, `Mesero ${id} actualizada`, updatedWaiter);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getWaitersQr = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const query = getQueryParams(req);

    const waiters = await Waiter.paginate(
      query,
      paginate.getOptions({
        limit,
        page,
      })
    );

    const { results } = waiters;

    let listWaiters = results.map((w) => {
      let title = `Mesero ${w.name} ${w.lastName}`;
      return {
        title,
        id: w._id,
      };
    });

    generateListQr(res, listWaiters, "waitersqr");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generando códigos QR" });
  }
};

const getWaiterQrId = async (req, res) => {
  const { id } = req.params;
  try {
    const waiter = await Waiter.findById(id);

    if (!waiter) return res.status(404).json({ message: "Waiter not Found" });
    let title = `Mesero ${waiter.name} ${waiter.lastName}`;

    let qrWaiter = {
      title,
      id: waiter._id,
    };

    generateQr(res, qrWaiter, "qrcode");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generando códigos QR" });
  }
};

const getAllQr = async (req, res) => {
  try {
    const waiter = await Waiter.find({});

    let listWaiters = waiter.map((w) => {
      let title = `Mesero ${w.name} ${w.lastName}`;
      return {
        title,
        id: w._id,
      };
    });

    generateListQr(res, listWaiters, "waitersqr");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generando códigos QR" });
  }
};

function getQueryParams(req) {
  let query = {};
  const { q } = req.query;

  if (q) query.name = { $regex: q, $options: "i" };

  return query;
}

module.exports = {
  getWaiters,
  getWaiter,
  createWaiter,
  deleteWaiter,
  updateWaiter,
  getWaiterDto,
  getWaitersQr,
  getWaiterQrId,
  getAllQr,
};
