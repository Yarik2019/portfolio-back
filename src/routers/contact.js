import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { confirmEmailController, sendContactEmailController } from "../controllers/contact.js";

const router = Router();
router.post("/", ctrlWrapper(sendContactEmailController));
router.get("/confirm", ctrlWrapper(confirmEmailController));
export default router;
