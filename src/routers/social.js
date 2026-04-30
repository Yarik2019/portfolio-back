/**
 * @swagger
 * /users:
 *   get:
 *     summary: Отримати всіх користувачів
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Список користувачів
 */

import Router from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import {
  socialValidation,
  updateSocialValidation,
} from "../validation/social.js";
import {
  getSocialController,
  createSocialController,
  patchSocialController,
  deleteSocialController,
} from "../controllers/social.js";
import { authentication } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", ctrlWrapper(getSocialController));

router.post(
  "/",
  authentication,
  validateBody(socialValidation),
  ctrlWrapper(createSocialController),
);

router.patch(
  "/:id",
  authentication,
  isValidId,
  validateBody(updateSocialValidation),
  ctrlWrapper(patchSocialController),
);

router.delete(
  "/:id",
  authentication,
  isValidId,
  ctrlWrapper(deleteSocialController),
);

export default router;
