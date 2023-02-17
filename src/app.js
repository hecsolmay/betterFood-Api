const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createRoles } = require("./libs/initialSetup");
const { swaggerSetup } = require("./swagger");

const app = express();
createRoles();

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hola mundo");
});

swaggerSetup(app);
app.use("/auth", require("./routes/auth.routes"));
app.use("/category", require("./routes/categories.routes"));
app.use("/dashboard", require("./routes/dashboard.routes"));
app.use("/ingredent", require("./routes/ingredents.routes"));
app.use("/order", require("./routes/orders.routes"));
app.use("/product", require("./routes/products.routes"));
app.use("/sale", require("./routes/sales.routes"));
app.use("/user", require("./routes/user.routes"));
app.use("/waiter", require("./routes/waiter.routes"));

module.exports = app;
