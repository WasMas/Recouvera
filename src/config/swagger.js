const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const setupSwagger = (app) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Recouvera",
        version: "1.0.0",
        description: "API documentation for Recouvera backend",
      },
      servers: [
        {
          url: "http://localhost:5000",
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
    },
    apis: ["./src/routes/*.js"],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;