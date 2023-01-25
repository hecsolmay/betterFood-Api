const express = require('express');
const morgan = require('morgan');
const { createRoles } = require('./libs/initialSetup');

const authorization = require('./routes/auth.routes');
const categories = require('./routes/categories.routes');
const orders = require('./routes/orders.routes');
const products = require('./routes/products.routes');
const sales = require('./routes/sales.routes');
const users = require('./routes/user.routes');


const app = express();
createRoles();

app.use(express.json())

app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send("hola mundo")
})

app.use('/auth', authorization)
app.use('/category', categories)
app.use('/order', orders)
app.use('/product', products);
app.use('/sale', sales)
app.use('/user', users)

module.exports = app;