const services = require("../services/dashboard.services");
const Response = require("../common/response");

const getData = async (req, res) => {
  try {
    const data = await services.getData(req);
    Response.succes(res, 200, "Dashboard", data);
  } catch (error) {
    Response.error(res);
  }
};

module.exports = {
  getData,
};
