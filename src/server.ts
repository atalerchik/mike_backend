import config from "config";
import app from "./app";
import { logger } from "./libs/logger";

const port: number = config.get<number>("server.port") || 3006;

app.listen(port, () => {
  logger.info(`Mike backend started on port ${port} || http://localhost:${port}`);
});
