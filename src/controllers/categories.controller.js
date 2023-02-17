const Category = require("../models/Category");
const Response = require("../common/response");
const createHttpError = require("http-errors");
const paginate = require("../common/paginate");
const { apiURL } = require("../config/config");
const PascalCase = require("../libs/pascalCase");

const path = `${apiURL}/category`;

const getCategories = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const query = getQueryParams(req);
    const sort = getQuerySort(req);

    let Categories = await Category.paginate(
      query,
      paginate.getOptions({ limit, page, sort })
    );

    const info = paginate.info(Categories, path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = Categories;
    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    let category = await Category.findById(id);

    if (!category) return Response.error(res, createHttpError.NotFound());

    Response.succes(res, 200, `Categoria ${id}`, category);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const createCategory = async (req, res) => {
  const { name, imgURL } = req.body;
  const newCategory = new Category({ name: PascalCase(name), imgURL });

  try {
    const categorySave = await newCategory.save();
    Response.succes(res, 201, "Categoria Creado Con exito", categorySave);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory)
      return Response.error(res, createHttpError.NotFound());

    Response.succes(res, 200, `Categoria ${id} eliminada`, deletedCategory);
  } catch (error) {
    Response.error(res);
  }
};

const updateCategory = async (req, res) => {
  let { name, imgURL, active } = req.body;
  const { id } = req.params;

  if (name) name = PascalCase(name);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        $set: { name, imgURL, active },
      },
      { new: true }
    );
    Response.succes(res, 200, `Categoria ${id} actualizada`, updatedCategory);
  } catch (error) {
    Response.error(res);
  }
};

function getQueryParams(req) {
  let query = {};
  const { q } = req.query;

  if (q) query.name = { $regex: q, $options: "i" };

  return query;
}

function getQuerySort(req) {
  const { sort } = req.query;
  let query = {};

  if (sort) query.totalProducts = sort == -1 ? sort : 1;

  return query;
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
