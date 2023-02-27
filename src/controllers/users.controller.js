const User = require("../models/User");
const Response = require("../common/response");
const Role = require("../models/Role");
const paginate = require("../common/paginate");
const createHttpError = require("http-errors");
const { apiURL } = require("../config/config");
const PascalCase = require("../libs/pascalCase");

const path = `${apiURL}/user`;

const getUsers = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);

    const query = await getQueryParams(req);

    const users = await User.paginate(
      query,
      paginate.getOptions({
        limit,
        page,
        populate: "rol",
        select: "-password -picture",
      })
    );

    const info = paginate.info(users, path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = users;
    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, { password: 0 }).populate("rol");
    if (!user) return Response.error(res, createHttpError.NotFound());

    Response.succes(res, 200, `Usuario ${id}`, user);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const updateUserRole = async (req, res) => {
  const { rol, active } = req.body;
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: { rol, active },
    })
      .populate("rol")
      .select({ password: 0 });

    res
      .status(204)
      .json({ message: `Usuario ${updatedUser.username} actualizado` });
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const updateUser = async (req, res) => {
  const { username, email, picture } = req.body;
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: { username: PascalCase(username), email, picture },
    })
      .populate("rol")
      .select({ password: 0 });

    res
      .status(204)
      .json({ message: `Usuario ${updatedUser.username} actualizado` });
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

async function getQueryParams(req) {
  let { q = "", email = "", rol = "" } = req.query;
  let query = {};

  if (q) {
    query.username = { $regex: q, $options: "i" };
  }
  if (email && email.lenght > 3) {
    query.email = { $regex: username, $options: "i" };
  }

  if (rol) {
    const rolFound = await Role.findOne({ name: rol });
    if (rolFound) query.rol = rolFound._id;
  }

  return query;
}

module.exports = {
  getUsers,
  getUser,
  updateUserRole,
  updateUser,
};
