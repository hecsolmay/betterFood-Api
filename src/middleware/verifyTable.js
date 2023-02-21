const Table = require("../models/Table");
const Waiter = require("../models/Waiter");

const uniqueTable = async (req, res, next) => {
  const { numMesa } = req.body;

  if (numMesa) {
    const foundTable = await Table.findOne({ numMesa });
    if (foundTable)
      return res
        .status(409)
        .json({ message: "conflict already exist a table with that number" });
  }

  next();
};

const verifyWaiter = async (req, res, next) => {
  const { waiterId } = req.body;

  if (waiterId) {
    const foundWaiter = await Waiter.findById(waiterId);
    if (!foundWaiter)
      return res.status(404).json({ message: "Waiter don't found" });
  }

  next();
};

module.exports = { uniqueTable, verifyWaiter };
