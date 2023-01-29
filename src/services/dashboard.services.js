const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");
const Sale = require("../models/Sale");
const User = require("../models/User");

const getData = async (req) => {
  let sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  let today = new Date(Date.now());
  const { begday, lastday } = req.query;

  if (lastday && !begday) {
    sevenDaysAgo = new Date(Date.parse(lastday) - 7 * 24 * 60 * 60 * 1000);
  }

  gteDate = begday ? reverseDate(begday) : sevenDaysAgo;
  ltDate = lastday ? reverseDate(lastday) : today;

  const totalRecaudation = await Order.aggregate([
    {
      $match: { createdAt: { $gte: gteDate, $lt: ltDate } },
    },
    { $group: { _id: null, amount: { $sum: "$total" } } },
  ]);

  const mostPopularsProducts = await Product.find({})
    .populate("categories")
    .sort({ ordered: -1 })
    .limit(10);

  const totalUsers = await User.count();

  return {
    totalUsers,
    totalRecaudation,
    topProduct: mostPopularsProducts[1],
    topProducts: mostPopularsProducts,
  };
};

function reverseDate(date) {
  return new Date(Date.parse(date.split("/").reverse().join("/")));
}




module.exports = {
  getData,
};
