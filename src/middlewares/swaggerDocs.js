import createHttpError from "http-errors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
// import { jsonPath } from "../portfolio/portfolio.js";
// import fs from "node:fs";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My portfolio API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerDocs = () => {
  try {
    // const file = fs.readFileSync(jsonPath, "utf-8");
    // const data = JSON.parse(file);
    // const json = JSON.stringify(data, null, 2);

    const swaggerSpec = swaggerJSDoc(options);

    return [swaggerUI.serve, swaggerUI.setup(swaggerSpec)];
  } catch {
    return (req, res, next) => {
      next(createHttpError(500, "Error generating Swagger docs"));
    };
  }
};
