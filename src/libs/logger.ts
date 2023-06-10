import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "debug",
  prettyPrint: process.env.NODE_ENV === "development",
});
