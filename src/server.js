import express from "express";
import dotenv from "dotenv";
import pino from "pino-http";
import cors from "cors";
import router from "./routers/index.js";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
export const setupServer = () => {
  const app = express();
  app.use(express.json());
  const docs = swaggerDocs();

  const corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://admin-portfolio-dashboard-front-g9f.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders:  ["Content-Type", "Authorization"],
    credentials: true,
  };

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    }),
  );
  
  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.get("/", (req, res) => {
    res.send("API is running");
  });

  app.use("/api-docs", docs);

  app.use(router);

  app.use("*", notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};
