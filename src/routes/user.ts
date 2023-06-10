import { Router } from "express";
import { LoginController, RegistrationController} from "../controllers/user";

const userRouter = Router();

userRouter.post("/login", LoginController);
userRouter.post("/signup", RegistrationController);
userRouter.post("/signup/telegram", RegistrationController);

export default userRouter;