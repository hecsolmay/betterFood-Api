const mongoose = require("mongoose");

const Config = require("../config/config");

const connect = () => {
  try {
    mongoose.connect(
      Config.mongoUri,
      // { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      {},
      () => {
        console.log("connected to database");
      }
    );
    // await mongoose.createConnection(Config.mongoUri).asPromise()
  } catch (error) {
    console.error(error);
  }
};

connect();
