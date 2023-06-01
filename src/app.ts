import express, { json, Application } from "express";
import userRoutes from "./routes";
import helmet from "helmet";
import { errorBoundaryMiddleware } from "./middlewares/middlewares";
import { connect } from "./libs/sequelize";
import PinoHttp from "pino-http";
import { logger } from "./libs/logger";
import compression from "compression";

const app: Application = express();
Promise.all([connect()]);
app.use(compression());
app.use(
  PinoHttp({
    logger,
  }),
);
app.use(helmet());
app.use(json());
app.use(errorBoundaryMiddleware);

app.use("/api", userRoutes);

export default app;
