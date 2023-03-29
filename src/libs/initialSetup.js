const Role = require("../models/Role");
const services = require("../services/user.services");
const User = require("../models/User");
const Order = require("../models/Order");

module.exports.createRoles = async () => {
  try {
    const avalibleDates = [
      new Date(Date.parse("2022-11-01")).toISOString(),
      new Date(Date.parse("2022-12-01")).toISOString(),
      new Date(Date.parse("2023-01-01")).toISOString(),
      new Date(Date.parse("2023-02-01")).toISOString(),
      new Date(Date.parse("2023-03-14")).toISOString(),
      new Date(Date.parse("2023-03-25")).toISOString(),
    ];

    const allOrders = await Order.find({});

    for (let i = 0; i < allOrders.length; i++) {
      let randomIndex = Math.floor(Math.random() * avalibleDates.length);
      let randomDate = avalibleDates[randomIndex];

      console.log(randomDate);
    }
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

function randomBetween(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
