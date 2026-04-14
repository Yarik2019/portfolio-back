import { Router } from "express";

import {
  getUserController,
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
} from "../controllers/users.js";

import { getAllUserController } from "../controllers/users.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authSchema } from "../validation/users.js";
import { authentication } from "../middlewares/authenticate.js";

const router = Router();

router.post(
  "/register",
  validateBody(authSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  "/login",
  validateBody(authSchema),
  ctrlWrapper(loginUserController),
);
router.post("/logout", ctrlWrapper(logoutUserController));
router.post("/refresh", ctrlWrapper(refreshTokenController));

router.get("/info", authentication, ctrlWrapper(getUserController));
router.get("/count", ctrlWrapper(getAllUserController));

export default router;
