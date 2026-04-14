import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  getPortfolioController,
  postPortfolioController,
  patchPortfolioController,
  deletePortfolioController,
  postCardController,
  patchCardController,
  deleteCardController,
} from "../controllers/portfolio.js";

import {
  portfolioValidation,
  cardsValidation,
  updatePortfolioValidation,
  updateCardsValidation,
} from "../validation/portfoilio.js";
import { isValidId } from "../middlewares/isValidId.js";

import { authentication } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";
const router = Router();

router.get("/", ctrlWrapper(getPortfolioController));

router.post(
  "/",
  authentication,
  validateBody(portfolioValidation),
  ctrlWrapper(postPortfolioController),
);

router.patch(
  "/:id",
  authentication,
  isValidId,
  validateBody(updatePortfolioValidation),
  ctrlWrapper(patchPortfolioController),
);

router.delete(
  "/:id",
  authentication,
  isValidId,
  ctrlWrapper(deletePortfolioController),
);

router.post(
  "/:id/card",
  authentication,
  isValidId,
  upload.single("image"),
  validateBody(cardsValidation),
  ctrlWrapper(postCardController),
);

router.patch(
  "/:id/card/:cardId",
  authentication,
  isValidId,
  upload.single("image"),
  validateBody(updateCardsValidation),
  ctrlWrapper(patchCardController),
);

router.delete(
  "/:id/card/:cardId",
  authentication,
  isValidId,
  ctrlWrapper(deleteCardController),
);

export default router;
