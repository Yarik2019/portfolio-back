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

  // const corsOptions = {
  //   origin: ["http://localhost:5173", ""],
  //   methods: "GET,POST,PATCH,DELETE",
  //   allowedHeaders: "Content-Type,Authorization",
  //   credentials: true,
  // };
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    }),
  );
  app.use(cors());

  app.use(cookieParser());

  app.use(router);

  app.use("/api-docs", docs);
  // app.get("/", (req, res) => {
  //   res.send("API is running");
  // });
  app.use("*", notFoundHandler);

  app.use(errorHandler); 
   
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};
