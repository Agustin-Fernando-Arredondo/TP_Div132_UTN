import viewControllers from "../controllers/view.controllers.js";

import middlewares from "../middlewares/middlewares.js";

import {Router} from "express";

const router = Router();

router.get("/index", middlewares.requireLogin, viewControllers.indexView);

router.get("/consultar", middlewares.requireLogin, viewControllers.getProductView);

router.get("/crear", middlewares.requireLogin, viewControllers.createProductView);

router.get("/modificar", middlewares.requireLogin, viewControllers.updateProductView);

router.get("/eliminar", middlewares.requireLogin, viewControllers.deleteProductView)

export default router;