import userControllers from "../controllers/user.controllers.js";

import middlewares from "../middlewares/middlewares.js";

import { Router } from "express";

const router = Router();

router.post("/", userControllers.createAdminUser);

export default router;