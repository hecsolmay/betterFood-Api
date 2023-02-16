const Ingredent = require("../models/Ingredent");
const Response = require("../common/response");
const paginate = require("../common/paginate");
const { apiURL } = require("../config/config");
const createHttpError = require("http-errors");
const PascalCase = require("../libs/pascalCase");

const path = `${apiURL}/ingredent`;

const getIngredents = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const query = getQueryParams(req);
    // const sort = getQuerySort(req);

    const ingredents = await Ingredent.paginate(
      query,
      paginate.getOptions({
        limit,
        page,
      })
    );

    const info = paginate.info(ingredents, path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = ingredents;

    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
  }
};

const getIngredent = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredent = await Ingredent.findById(id);
    if (!ingredent) Response.error(res, createHttpError.NotFound());

    Response.succes(res, 200, `ingrediente ${id}`, ingredent);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const createIngredent = async (req, res) => {
  const { name } = req.body;
  const newIngredent = new Ingredent({ name: PascalCase(name) });

  try {
    const savedIngredent = await newIngredent.save();
    Response.succes(res, 201, "Ingrediente creado con exito", savedIngredent);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const deleteIngredent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIngredent = await Ingredent.findByIdAndDelete(id);

    if (!deletedIngredent)
      return Response.error(res, createHttpError.NotFound());

    Response.succes(res, 200, `Ingrediente ${id} eliminada`, deletedIngredent);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const updateIngredent = async (req, res) => {
  let { name, active } = req.body;
  const { id } = req.params;

  if(name) name = PascalCase(name)
  try {
    const updatedIngredent = await Ingredent.findByIdAndUpdate(
      id,
      {
        $set: { name, active },
      },
      { new: true }
    );
    Response.succes(
      res,
      200,
      `Ingrediente ${id} actualizada`,
      updatedIngredent
    );
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

function getQueryParams(req) {
  let query = {};
  const { q } = req.query;

  if (q) query.name = { $regex: q, $options: "i" };

  return query;
}

module.exports = {
  getIngredents,
  getIngredent,
  createIngredent,
  updateIngredent,
  deleteIngredent,
};
