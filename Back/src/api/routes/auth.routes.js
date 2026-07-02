import { Router } from "express";

import authControllers from "../controllers/auth.controllers.js";

const router = Router();

router.get("/", authControllers.loginView);

router.post("/", authControllers.processLogininfo);

router.post("/destroy", authControllers.destroyLogin);

export default router;