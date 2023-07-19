import PinoHttp from "pino-http";
import compression from "compression";
import cors from "cors";
import express, { json, Application } from "express";
import helmet from "helmet";
import userRoutes from "./routes/user";
import { connect } from "./libs/sequelize";
import { errorBoundaryMiddleware } from "./middlewares/middlewares";
import { logger } from "./libs/logger";

const app: Application = express();
Promise.all([connect()]);
app.use(compression());
app.use(
  PinoHttp({
    logger,
  }),
);
app.use(cors());
app.use(helmet());
app.use(json());
app.use(errorBoundaryMiddleware);

app.use("/api", userRoutes);

export default app;
