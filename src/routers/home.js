import Router from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";

import {
  getHomeController,
  createHomeController,
  updateHomeController,
  deleteHomeController,
} from "../controllers/home.js";

import { homeValidation, updateHomeValidation } from "../validation/home.js";
import { upload } from "../middlewares/upload.js";
import { authentication } from "../middlewares/authenticate.js";
const router = Router();

router.get("/", ctrlWrapper(getHomeController));

router.post(
  "/",
  authentication,
  upload.single("image"),
  validateBody(homeValidation),
  ctrlWrapper(createHomeController),
);

router.patch(
  "/:id",
  authentication,
  isValidId,
  upload.single("image"),
  validateBody(updateHomeValidation),
  ctrlWrapper(updateHomeController),
);

router.delete(
  "/:id",
  authentication,
  isValidId,
  ctrlWrapper(deleteHomeController),
);

export default router;
