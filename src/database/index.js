const mongoose = require("mongoose");

const Config = require("../config/config");

const connect = () => {
  try {
    mongoose.connect(Config.mongoUri, {}, () => {
      console.log("connected to database");
    });
    const db = mongoose.connection;
    db.once("connected", () => {
      console.log("Mongoose connection opened.");
    });
  } catch (error) {
    console.error(error);
  }
};

connect();
