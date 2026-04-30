import { Router } from "express";
import aboutRouter from "./about.js";
import socialRouter from "./social.js";
import homeRouter from "./home.js";
import experienceRouter from "./experience.js";
import portfolioRouter from "./portfolio.js";
import usersRouter from "./users.js";
const router = Router();

// router.use('/home', );
router.use("/about", aboutRouter);
router.use("/social", socialRouter);
router.use("/home", homeRouter);
router.use("/experience", experienceRouter);
router.use("/portfolio", portfolioRouter);
router.use("/users", usersRouter);
// router.use('/portfolio',);
// router.use('/experience',);
// router.use('/contact',);

export default router;
