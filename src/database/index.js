const mongoose = require("mongoose");
const { createAdmin, createRoles } = require("../libs/initialSetup");

const Config = require("../config/config");

mongoose.set("strictQuery", false);

const connect = async () => {
  await mongoose.connect(Config.mongoUri, {});
  console.log("connected to database");
  await createRoles();
  await createAdmin();
  const db = mongoose.connection;
  db.once("connected", () => {
    console.log("Mongoose connection opened.");
  });
};

connect().catch((err) => {
  console.error(err);
});
