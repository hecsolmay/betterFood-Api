const User = require("../models/User");
const Role = require("../models/Role");

const createUser = async (username, email, password, rol) => {
  const newUser = new User({
    username,
    email,
  });

  if (password) newUser.password = await User.encryptPassword(password);

  if (rol) {
    const foundRol = await Role.findOne({ name: rol });

    newUser.rol = foundRol._id;
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.rol = role._id;
  }

  const savedUser = await newUser.save();

  return savedUser;
};

const searchUser = async (email) => {
  return await User.findOne({ email: email }).populate("rol");
};

const comparePassword = async (password, userPassword) => {
  return await User.comparePassword(password, userPassword);
};

module.exports = {
  createUser,
  comparePassword,
  searchUser,
};
