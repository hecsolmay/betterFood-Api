require("dotenv").config();

module.exports = {
  mongoUri: process.env.MONGO_URI,
  SECRET: process.env.SECRET,
  apiURL: process.env.APIURL
};
