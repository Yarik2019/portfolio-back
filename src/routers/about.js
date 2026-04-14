import { Router } from "express";
// import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

import {
  getAboutController,
  postAboutController,
  deleteAboutController,
  patchAboutController,
} from "../controllers/about.js";
import { validateBody } from "../middlewares/validateBody.js";
import { aboutValidation, updateAboutValidation } from "../validation/about.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authentication } from "../middlewares/authenticate.js";
// const jsonParser = express.json();
const router = Router();

router.get("/", ctrlWrapper(getAboutController));

router.post(
  "/",
  authentication,
  validateBody(aboutValidation),
  ctrlWrapper(postAboutController),
);

router.patch(
  "/:id",
  authentication,
  isValidId,
  validateBody(updateAboutValidation),
  ctrlWrapper(patchAboutController),
);

router.delete(
  "/:id",
  authentication,
  isValidId,
  ctrlWrapper(deleteAboutController),
);

export default router;
