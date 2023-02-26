const Table = require("../models/Table");
const Response = require("../common/response");
const paginate = require("../common/paginate");
const { apiURL } = require("../config/config");
const { generateListQr, generateQr } = require("../libs/qrcode");

const path = `${apiURL}/table`;

const getTables = async (req, res) => {
  let { limit, page } = paginate.getQuery(req);
  const sort = { numMesa: 1 };

  const tables = await Table.paginate(
    {},
    paginate.getOptions({
      limit,
      page,
      sort,
    })
  );

  const info = paginate.info(tables, path);

  if (page > info.totalPages)
    return res.status(404).json({ error: "there is nothing here" });

  const { results } = tables;

  return paginate.success(res, 200, "ok", info, results);
};

const getTable = async (req, res) => {
  const { id } = req.params;
  try {
    const table = await Table.findById(id);

    if (!table) return res.status(404).json({ message: "Table Not Found" });

    return Response.succes(res, 200, `Mesa ${id}`, table);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getTableDto = async (req, res) => {
  const { id } = req.params;
  try {
    const table = await Table.findById(id, { numMesa: 1, capacity: 1 });

    if (!table) return res.status(404).json({ message: "Table Not Found" });

    return Response.succes(res, 200, `Mesa ${id}`, table);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const createTable = async (req, res) => {
  const { numMesa, capacity } = req.body;
  try {
    const newTable = new Table({ numMesa, capacity });

    const savedTable = await newTable.save();

    Response.succes(res, 201, "Mesa creada con exito", savedTable);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const updateTable = async (req, res) => {
  const { id } = req.params;
  try {
    const { numMesa, capacity, active } = req.body;

    const updatedTable = await Table.findByIdAndUpdate(
      id,
      {
        $set: {
          numMesa,
          capacity,
          active,
        },
      },
      { new: true }
    );

    Response.succes(res, 200, `Actualizando mesa ${id}`, updatedTable);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const deleteTable = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTable = await Table.findByIdAndDelete(id);
    if (!deletedTable) return res.status(404).json({ message: "Not Found" });

    return res.status(204).json({ message: `Mesa ${id} eliminada con exito` });
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getTablesQr = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const sort = { numMesa: 1 };

    const tables = await Table.paginate(
      {},
      paginate.getOptions({
        limit,
        page,
        sort,
      })
    );

    const { results } = tables;

    let listTables = results.map((t) => {
      let title = `Mesa ${t.numMesa}`;
      return {
        title,
        id: t._id,
      };
    });

    generateListQr(res, listTables, "tablesqr");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generando códigos QR" });
  }
};

const getTableQrId = async (req, res) => {
  const { id } = req.params;
  try {
    const table = await Table.findById(id);

    if (!table) return res.status(404).json({ message: "Table not Found" });
    let title = `Mesa ${table.numMesa}`;

    let qrTable = {
      title,
      id: table._id,
    };

    generateQr(res, qrTable, "qrcode");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generando códigos QR" });
  }
};

const getAllQr = async (req, res) => {
  try {
    const tables = await Table.find({}).sort({ numMesa: 1 });

    let listTables = tables.map((t) => {
      let title = `Mesa ${t.numMesa}`;
      return {
        title,
        id: t._id,
      };
    });

    generateListQr(res, listTables, "tablesqr");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generando códigos QR" });
  }
};

module.exports = {
  getTables,
  getTable,
  createTable,
  updateTable,
  deleteTable,
  getTableDto,
  getTablesQr,
  getAllQr,
  getTableQrId,
};
