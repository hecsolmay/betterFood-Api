const User = require("../models/User");
const Response = require("../common/response");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).populate("roles");
    Response.succes(res, 200, "Lista de usuarios", users);
  } catch (error) {
    Response.error(res);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    Response.succes(res, 200, `Usuario ${id}`, user);
  } catch (error) {
    Response.error(res);
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { roles } = req.body;
    const { id } = req.params;
    const updatedUser = User.findByIdAndUpdate(id, { $set: { roles: roles } });
    Response.succes(res, 200, `Usuario ${id} actualizado`, updatedUser);
  } catch (error) {
    Response.error(res);
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUserRole,
};
