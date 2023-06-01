import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/create", createUserController);

userRouter.patch("/update/:id", updateUserController);

userRouter.get("/get/:id", getUserController);

userRouter.delete("/delete/:id", deleteUserController);

export default userRouter;
