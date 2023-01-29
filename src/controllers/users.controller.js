const User = require("../models/User");
const Response = require("../common/response");
const Role = require("../models/Role");
const paginate = require("../common/paginate");

const getUsers = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);

    const query = await getQueryParams(req);


    const users = await User.paginate(
      query,
      paginate.getOptions({ limit, page, populate: "rol", select: "-password" })
    );

    const info = paginate.info(users);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = users;
    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    Response.error(res);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, { password: 0 }).populate("rol");
    Response.succes(res, 200, `Usuario ${id}`, user);
  } catch (error) {
    Response.error(res);
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { rol } = req.body;
    const { id } = req.params;

    if (!rol) return res.status(400).json({ message: "No role provided" });

    const foundRol = await Role.find({ name: rol });
    const newRoles = foundRol._id;

    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: { rol: newRoles },
    }).populate("rol");

    res
      .status(204)
      .json({ message: `Usuario ${updatedUser.email} actualizado` });
  } catch (error) {
    Response.error(res);
  }
};

async function getQueryParams(req) {
  let { username = "", email = "", rol = "" } = req.query;
  let query = {};

  if (username && username.lenght > 3) {
    query.username = { $regex: username, $options: "i" };
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
};
