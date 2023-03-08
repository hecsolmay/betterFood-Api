const Ingredent = require("../models/Ingredent");
const Response = require("../common/response");
const paginate = require("../common/paginate");
const { apiURL } = require("../config/config");
const createHttpError = require("http-errors");
const PascalCase = require("../libs/pascalCase");

const path = `${apiURL}/ingredent`;

const getAll = async (req, res) => {
  try {
    const allIngredents = await Ingredent.find({ active: 1 }).sort({ name: 1 });
    return Response.succes(res, 200, "All ingredents", allIngredents);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getIngredents = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const query = getQueryParams(req);
    const sort = { name: 1 };

    const ingredents = await Ingredent.paginate(
      query,
      paginate.getOptions({
        limit,
        page,
        sort,
      })
    );

    const info = paginate.info(ingredents, path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = ingredents;

    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getIngredent = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredent = await Ingredent.findById(id);
    if (!ingredent) return Response.error(res, createHttpError.NotFound());

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

    return res.status(204).json({ message: "No Content" });
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const updateIngredent = async (req, res) => {
  let { name, active } = req.body;
  const { id } = req.params;

  if (name) name = PascalCase(name);
  try {
    const prevIngredent = await Ingredent.findById(id);

    if (!prevIngredent)
      return res.status(404).json({ message: "Ingredent Not Found" });

    if (prevIngredent.name != name) {
      const foundIngredent = await Ingredent.findOne({ name: name });
      if (foundIngredent)
        return res
          .status(409)
          .json({ message: "Conflict Ingredent Already Exist" });
    }
    const updatedIngredent = await Ingredent.findByIdAndUpdate(
      id,
      {
        $set: { name, active },
      },
      { new: true }
    );

    if (!updatedIngredent)
      return Response.error(res, createHttpError.NotFound());
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
  const { q, active } = req.query;

  if (q) query.name = { $regex: q, $options: "i" };
  if (active) {
    if (active == 1) query.active = 1;
  }

  return query;
}

module.exports = {
  getAll,
  getIngredents,
  getIngredent,
  createIngredent,
  updateIngredent,
  deleteIngredent,
};
