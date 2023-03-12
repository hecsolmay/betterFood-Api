const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");
const Sale = require("../models/Sale");
const User = require("../models/User");
const moment = require("moment/moment");
const Waiter = require("../models/Waiter");

const getData = async (req) => {
  const currentlyYear = moment().startOf("year");
  const endYear = moment().endOf("year").toLocaleString();

  let gteDate = new Date(Date.parse(currentlyYear.toLocaleString()));
  let ltDate = new Date(Date.parse(endYear));

  const currentMonth = moment().startOf("month").toLocaleString();
  const endMonth = moment().endOf("month").toLocaleString();

  const recaudation = await Order.aggregate([
    {
      $match: { createdAt: { $gte: gteDate, $lt: ltDate } },
    },
    { $group: { _id: null, amount: { $sum: "$total" } } },
  ]);

  const totalCategories = await Category.count();
  const totalProducts = await Product.count();

  const total = recaudation[0]?.amount || 0;

  const monthWaiterId = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(Date.parse(currentMonth)),
          $lt: new Date(Date.parse(endMonth)),
        },
        waiterId: { $exists: true },
      },
    },
    {
      $group: {
        _id: "$waiterId",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 1,
    },
  ]);

  let monthWaiter = null;

  if (monthWaiterId[0]?._id) {
    foundWaiter = await Waiter.findById(monthWaiterId[0]._id).select({
      name: 1,
      lastName: 1,
    });

    if (foundWaiter) {
      let name = `${foundWaiter.name} ${foundWaiter.lastName}`;
      let totalSales = monthWaiterId[0].count;
      monthWaiter = { name, totalSales };
    }
  }

  const yearRecaudation = { year: currentlyYear.get("year"), total: total };

  const monthsRecaudation = await getMonthRecaudation();

  const mostPopularsProducts = await Product.find({})
    .populate("categories")
    .sort({ ordered: -1 })
    .limit(10);

  const totalUsers = await User.count();

  return {
    totalUsers,
    monthWaiter,
    totalCategories,
    totalProducts,
    yearRecaudation,
    monthEarnings: monthsRecaudation[5],
    monthsRecaudationData: monthsRecaudation,
    topProduct: mostPopularsProducts[0],
    topProducts: mostPopularsProducts,
  };
};

async function getMonthRecaudation() {
  const totalMonths = 6;
  const monthsArray = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const monthsRecaudation = [];

  for (let i = 0; i < totalMonths; i++) {
    let beginMonth = moment().subtract(i, "months").startOf("month");
    let endMonth = moment().subtract(i, "months").endOf("month");
    let recaudation = { month: monthsArray[beginMonth.get("month")], total: 0 };

    let gteDate = new Date(Date.parse(beginMonth.toLocaleString()));
    let ltDate = new Date(Date.parse(endMonth.toLocaleString()));

    const monthRecaudation = await Order.aggregate([
      {
        $match: { createdAt: { $gte: gteDate, $lt: ltDate } },
      },
      { $group: { _id: null, amount: { $sum: "$total" } } },
    ]);

    const total = monthRecaudation[0]?.amount || 0;

    recaudation.total = total;

    monthsRecaudation.push(recaudation);
  }

  return monthsRecaudation.reverse();
}

module.exports = {
  getData,
};
