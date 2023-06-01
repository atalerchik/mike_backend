import { Request, Response } from "express";
import { createUser, getUser } from "../services/user.service";
import { HttpError } from "../utils/HttpError";
import { errorResponse } from "../utils/errorResponse";
import { successResponse } from "../utils/successRespons";

export async function createUserController(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await getUser({ email });
    if (user) {
      throw new HttpError(409, "User already exists");
    }

    const newUser = await createUser(name, email, password);
    successResponse(req, res, newUser);
  } catch (error) {
    errorResponse(req, res, error);
  }
}

export async function getUserController(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await getUser({ id });

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    successResponse(req, res, user);
  } catch (error) {
    errorResponse(req, res, error);
  }
}

export async function updateUserController(req: Request, res: Response) {
  return res.status(200).json();
}

export async function deleteUserController(req: Request, res: Response) {
  return res.status(200).json();
}

export async function loginUserController(req: Request, res: Response) {
  return res.status(200).json();
}

export async function resetPasswordController(req: Request, res: Response) {
  return res.status(200).json();
}
