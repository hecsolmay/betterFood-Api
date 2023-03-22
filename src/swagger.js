const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require("path");

const allRoutes = path.join(__dirname, "documentation/*.js");
const allSchemas = path.join(__dirname, "models/*.js");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "BetterFood API",
      description: "API Documentation",
    }, 
    servers: [
      {
        // url: "http://localhost:3000",
        // url: "https://betterfood-api.up.railway.app",
        url: "https://betterfood.onrender.com",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [allRoutes, allSchemas],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
const swaggerSetup = (app) => {
  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
};

module.exports = {
  swaggerSetup,
};
