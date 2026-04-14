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
  contactValidation,
  updateContactValidation,
} from "../validation/contact.js";
import {
  getContactsController,
  createContactController,
  patchContactController,
  deleteContactController,
} from "../controllers/contact.js";
import { authentication } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", ctrlWrapper(getContactsController));

router.post(
  "/",
  authentication,
  validateBody(contactValidation),
  ctrlWrapper(createContactController),
);

router.patch(
  "/:id",
  authentication,
  isValidId,
  validateBody(updateContactValidation),
  ctrlWrapper(patchContactController),
);

router.delete(
  "/:id",
  authentication,
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
