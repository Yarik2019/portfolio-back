import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  getExperiencesController,
  postExperienceController,
  patchExperienceController,
  deleteExperienceController,
  postCardController,
  updateCardController,
  deleteCardController,
} from "../controllers/experience.js";

import {
  experienceValidation,
  updateExperienceValidation,
  cardValidation,
  updateCardValidation,
} from "../validation/experience.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authentication } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/", ctrlWrapper(getExperiencesController));

router.post(
  "/",
  authentication,
  validateBody(experienceValidation),
  ctrlWrapper(postExperienceController),
);
router.patch(
  "/:id",
  authentication,
  isValidId,
  validateBody(updateExperienceValidation),
  ctrlWrapper(patchExperienceController),
);

router.delete(
  "/:id",
  authentication,
  isValidId,
  ctrlWrapper(deleteExperienceController),
);

router.post(
  "/:id/cards",
  authentication,
  isValidId,
  upload.single("image"),
  validateBody(cardValidation),
  ctrlWrapper(postCardController),
);

router.patch(
  "/:id/cards/:cardId",
  authentication,
  isValidId,
  upload.single("image"),
  validateBody(updateCardValidation),
  ctrlWrapper(updateCardController),
);

router.delete(
  "/:id/cards/:cardId",
  authentication,
  isValidId,
  ctrlWrapper(deleteCardController),
);
export default router;
