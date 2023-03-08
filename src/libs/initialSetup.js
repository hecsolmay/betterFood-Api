const Role = require("../models/Role");
const services = require("../services/user.services");
const User = require("../models/User");
const Order = require("../models/Order");

module.exports.createRoles = async () => {
  try {
    const products = [
      { idProduct: "63f5392b4639813663648ed2" },
      { idProduct: "63f53c324639813663648f53" },
      { idProduct: "63f53eeb4639813663648fac" },
      { idProduct: "63f540a14639813663649012" },
      { idProduct: "63f5423a46398136636490cd" },
      { idProduct: "63f54567463981366364913b" },
      { idProduct: "63f5469a46398136636491bd" },
      { idProduct: "63f547784639813663649244" },
      { idProduct: "63f549fc46398136636492e4" },
      { idProduct: "63f54ad346398136636493c8" },
      { idProduct: "63f54cdc46398136636494c6" },
      { idProduct: "63f54dcb463981366364957b" },
      { idProduct: "63f54ecf463981366364963d" },
      { idProduct: "63f550274639813663649704" },
      { idProduct: "63f550ee46398136636497e2" },
      { idProduct: "63f551cd4639813663649847" },
      { idProduct: "63f552bc463981366364995b" },
      { idProduct: "63f5540d4639813663649a96" },
      { idProduct: "63f555594639813663649b57" },
      { idProduct: "63f556404639813663649c5f" },
      { idProduct: "63f55a6e4639813663649dc8" },
      { idProduct: "63f55be04639813663649f83" },
      { idProduct: "63f55cd8463981366364a061" },
      { idProduct: "63f55dbf463981366364a126" },
      { idProduct: "63f55eb7463981366364a1e4" },
      { idProduct: "63f55fa4463981366364a2fe" },
      { idProduct: "63f5609f463981366364a3c4" },
      { idProduct: "63f561ae463981366364a4d7" },
      { idProduct: "63f562be463981366364a5e6" },
      { idProduct: "63f56427463981366364a7e5" },
      { idProduct: "63fd2fcb42d5fb0eff2c4e3a" },
      { idProduct: "63fd302842d5fb0eff2c4f1d" },
      { idProduct: "63fd30db42d5fb0eff2c4fb4" },
      { idProduct: "63fd312242d5fb0eff2c5040" },
      { idProduct: "63fd314d42d5fb0eff2c5081" },
      { idProduct: "63fd318142d5fb0eff2c50ee" },
      { idProduct: "63fd31cf42d5fb0eff2c515b" },
      { idProduct: "63fd31fb42d5fb0eff2c518e" },
      { idProduct: "63fd322742d5fb0eff2c51ef" },
      { idProduct: "63fd324f42d5fb0eff2c5222" },
      { idProduct: "63fd35de42d5fb0eff2c5273" },
      { idProduct: "63fd361842d5fb0eff2c52c4" },
      { idProduct: "63fd364142d5fb0eff2c5315" },
      { idProduct: "63fd36bb42d5fb0eff2c53ca" },
      { idProduct: "63fd377042d5fb0eff2c54c9" },
      { idProduct: "63fd37eb42d5fb0eff2c5597" },
      { idProduct: "63fd386242d5fb0eff2c57a4" },
      { idProduct: "63fd388a42d5fb0eff2c57f5" },
      { idProduct: "63fd38d742d5fb0eff2c584e" },
      { idProduct: "63fd38fa42d5fb0eff2c587c" },
      { idProduct: "63fd3bb842d5fb0eff2c58cd" },
      { idProduct: "63fd3be042d5fb0eff2c591e" },
      { idProduct: "63fd3c5542d5fb0eff2c5abe" },
      { idProduct: "63fd3c8a42d5fb0eff2c5bd6" },
      { idProduct: "63fd3cfc42d5fb0eff2c5c71" },
      { idProduct: "63fd3d2042d5fb0eff2c5d0f" },
      { idProduct: "63fd3d4742d5fb0eff2c5dad" },
      { idProduct: "63fd3d6c42d5fb0eff2c5e4b" },
      { idProduct: "63fd3d8942d5fb0eff2c5e9e" },
      { idProduct: "63fd3dad42d5fb0eff2c5f00" },
      { idProduct: "63fd40fc42d5fb0eff2c5fbd" },
      { idProduct: "63fd412e42d5fb0eff2c6007" },
      { idProduct: "63fd416f42d5fb0eff2c604f" },
      { idProduct: "63fd41c142d5fb0eff2c6099" },
      { idProduct: "63fd421442d5fb0eff2c60e5" },
      { idProduct: "63fd426742d5fb0eff2c612f" },
      { idProduct: "63fd42b342d5fb0eff2c6179" },
      { idProduct: "63fd433242d5fb0eff2c6211" },
      { idProduct: "63fd43bc42d5fb0eff2c6291" },
      { idProduct: "63fd448142d5fb0eff2c634f" },
      { idProduct: "63fd475a42d5fb0eff2c63c1" },
      { idProduct: "63fd47b642d5fb0eff2c6401" },
      { idProduct: "63fd482742d5fb0eff2c646c" },
      { idProduct: "63fd489742d5fb0eff2c64ed" },
      { idProduct: "63fd492442d5fb0eff2c655e" },
      { idProduct: "63fd49aa42d5fb0eff2c65a9" },
      { idProduct: "63fd4a2642d5fb0eff2c660e" },
      { idProduct: "63fd4ab342d5fb0eff2c6695" },
      { idProduct: "63fd4b2842d5fb0eff2c6709" },
      { idProduct: "63fd4bc342d5fb0eff2c677d" },
      {
        idProduct: "63fd586e208f3a09cf8bddfe",
        extras: [
          {
            id: "63f5532246398136636499c7",
            extraPrice: 5,
          },
        ],
      },
      {
        idProduct: "63fd5ef4208f3a09cf8bdf27",
        extras: [
          {
            id: "63fd5f18208f3a09cf8bdf65",
            extraPrice: 10,
          },
        ],
      },
      { idProduct: "63fd60ba208f3a09cf8be069" },
      {
        idProduct: "63fd6c09208f3a09cf8be252",
        extras: [
          {
            id: "63fd6886208f3a09cf8be140",
            extraPrice: 40,
          },
          {
            id: "63fd687e208f3a09cf8be137",
            extraPrice: 45,
          },
        ],
      },
      { idProduct: "63fd6c5e208f3a09cf8be294" },
      {
        idProduct: "63fd6cb7208f3a09cf8be2d9",
        extras: [
          {
            id: "63f555794639813663649bb6",
            extraPrice: 5,
          },
          {
            id: "63fd690e208f3a09cf8be189",
            extraPrice: 5,
          },
        ],
      },
      {
        idProduct: "63fd6d8b208f3a09cf8be39a",
        extras: [
          {
            id: "63fd695b208f3a09cf8be1c0",
            extraPrice: 10,
          },
        ],
      },
      { idProduct: "63fd6de5208f3a09cf8be3e6" },
      { idProduct: "63fd6e38208f3a09cf8be424" },
      { idProduct: "63fd6ef5208f3a09cf8be4cb" },
      { idProduct: "63fd7bb3208f3a09cf8be694" },
      { idProduct: "63fd7c0c208f3a09cf8be6d2" },
      { idProduct: "63fd7c52208f3a09cf8be714" },
      { idProduct: "63fd7c92208f3a09cf8be752" },
      { idProduct: "63fd7cc2208f3a09cf8be78e" },
      { idProduct: "63fd7d04208f3a09cf8be7c8" },
      { idProduct: "63fd7d5e208f3a09cf8be806" },
      { idProduct: "63fd7da2208f3a09cf8be850" },
      { idProduct: "63fd7dd5208f3a09cf8be890" },
      { idProduct: "63fd7e10208f3a09cf8be8ca" },
    ];
    const count = await Role.estimatedDocumentCount();

    for (let i = 0; i < 10; i++) {
      let randomOrders = randomBetween(1, 7);
      let productsOrder = [];

      for (let j = 0; j < randomOrders; j++) {
        let newProduct = products[randomBetween(0, 99)];

        newProduct.quantity = randomBetween(1, 5);

        productsOrder.push(newProduct);
      }
      console.log(productsOrder);
    }

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};
module.exports.createAdmin = async () => {
  try {
    const foundUser = await User.findOne({ email: "admin@email.com" });

    if (foundUser) return;

    const savedUser = await services.createUser({
      username: "admin",
      email: "admin@email.com",
      password: "admin",
      rol: "admin",
    });

    console.log(savedUser);
  } catch (error) {
    console.error(error);
  }
};

function randomBetween(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
