import { Request, Response } from "express";
import { createUser, deleteUser, getUser, updateUser } from "../services/user.service";
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
    successResponse(req, res, { user: newUser });
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

    successResponse(req, res, { user });
  } catch (error) {
    errorResponse(req, res, error);
  }
}

export async function updateUserController(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await getUser({ id });

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const updatedUser = await updateUser(id, req.body);

    successResponse(req, res, { user: updatedUser });
  } catch (error) {
    errorResponse(req, res, error);
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const user = await getUser({ id: req.params.id });
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    const deletedUser = await deleteUser(req.params.id);
    successResponse(req, res, { user: deletedUser });
  } catch (error) {
    errorResponse(req, res, error);
  }
}

export async function loginUserController(req: Request, res: Response) {
  return res.status(200).json();
}

export async function resetPasswordController(req: Request, res: Response) {
  return res.status(200).json();
}
