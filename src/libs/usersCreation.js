const User = require("../models/User");
const Role = require("../models/Role");

const createUser = async (username, email, password, roles) => {
  const newUser = new User({
    username,
    email,
  });

  if (password) newUser.password = await User.encryptPassword(password);

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });

    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  return savedUser;
};

const searchUser = async (email) => {
  return await User.findOne({ email: email });
};

const comparePassword = async (password, userPassword) => {
  return await User.comparePassword(password, userPassword);
};

module.exports = {
  createUser,
  comparePassword,
  searchUser,
};
