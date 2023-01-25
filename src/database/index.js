const mongoose = require("mongoose");

const Config = require("../config/config");

const connect = async () => {
  try {
    await mongoose.connect(Config.mongoUri);
    console.log("connected to database");
  } catch (error) {
    console.error(error);
  }
};

connect();
