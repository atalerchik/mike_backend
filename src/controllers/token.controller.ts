import { HttpError } from "../utils/HttpError";
import { Request, Response } from "express";
import { activateToken, authorizeToken, createAuthorizeToken } from "../services/token.service";
import { errorResponse } from "../utils/errorResponse";
import { successResponse } from "../utils/successRespons";

export async function activateTokenController(req: Request, res: Response) {
  const token = req.body.token;
  try {
    if (!token) {
      throw new HttpError(400, "Missing token");
    }

    const data = await activateToken(token);

    successResponse(req, res, data);
  } catch (error) {
    errorResponse(req, res, error);
  }
}

export async function authorizeTokenController(req: Request, res: Response) {
  const token = req.body.token;
  try {
    if (!token) {
      throw new HttpError(400, "Missing token");
    }

    const data = await authorizeToken(token);

    successResponse(req, res, data);
  } catch (error) {
    errorResponse(req, res, error);
  }
}

export async function authorizeTokenCreateController(req: Request, res: Response) {
  const token = req.body.token;
  try {
    if (!token) {
      throw new HttpError(400, "Missing token");
    }

    const data = await createAuthorizeToken(token);

    successResponse(req, res, data);
  } catch (error) {
    errorResponse(req, res, error);
  }
}
