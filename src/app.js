const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { swaggerSetup } = require("./swagger");
const { apiURL } = require("./config/config");

const {
  adminRouter: CategoryAdmin,
  mobileRouter: CategoryMobile,
} = require("./routes/categories.routes");
const {
  adminRouter: ProductAdmin,
  mobileRouter: ProductMobile,
} = require("./routes/products.routes");
const {
  adminRouter: WaiterAdmin,
  mobileRouter: WaiterMobile,
} = require("./routes/waiter.routes");

const {
  AdminRoute: tableAdmin,
  MobileRoute: tableMobile,
} = require("./routes/table.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect(`${apiURL}/docs`);
});

swaggerSetup(app);
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/category", CategoryAdmin);
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/ingredent", require("./routes/ingredents.routes"));
app.use("/api/notification", require("./routes/notification.routes"));
app.use("/api/order", require("./routes/orders.routes"));
app.use("/api/product", ProductAdmin);
app.use("/api/role", require("./routes/roles.routes"));
app.use("/api/sale", require("./routes/sales.routes"));
app.use("/api/table", tableAdmin);
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/waiter", WaiterAdmin);
app.use("/api/m/category", CategoryMobile);
app.use("/api/m/product", ProductMobile);
app.use("/api/m/table", tableMobile);
app.use("/api/m/waiter", WaiterMobile);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Nothing Found Here" });
});

module.exports = app;
