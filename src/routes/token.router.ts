import { Router } from "express";
import {
  activateTokenController,
  authorizeTokenController,
  authorizeTokenCreateController,
} from "../controllers/token.controller";

const tokenRouter = Router();

tokenRouter.post("/activate", activateTokenController);

tokenRouter.post("/authorize", authorizeTokenController);
tokenRouter.post("/authorize/create", authorizeTokenCreateController);

export default tokenRouter;
