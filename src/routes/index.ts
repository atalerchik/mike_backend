import { Router } from "express";
import userRouter from "./user.router";
import tokenRouter from "./token.router";

const router = Router();

router.use("/user", userRouter);
router.use("/tokens", tokenRouter);

export default router;
