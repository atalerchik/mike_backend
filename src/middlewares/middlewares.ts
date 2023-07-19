import { NextFunction, Request, Response } from "express";

export function errorBoundaryMiddleware(
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      name: err.name,
      message: err.message,
      // data: err.data,
    },
  });
}
