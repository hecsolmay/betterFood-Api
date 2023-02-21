const Role = require("../models/Role");
const services = require("../services/user.services");
const User = require("../models/User");

module.exports.createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};
module.exports.createAdmin = async () => {
  try {
    const foundUser = await User.findOne({ email: "admin@email.com" });

    if (foundUser) return;

    const savedUser = await services.createUser({
      username: "admin",
      email: "admin@email.com",
      password: "admin",
      rol: "admin",
    });

    console.log(savedUser);
  } catch (error) {
    console.error(error);
  }
};
