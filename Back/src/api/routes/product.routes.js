import {Router} from "express";

import middlewares from "../middlewares/middlewares.js";

import productControllers from "../controllers/product.controllers.js";

const router = Router();

router.get("/", productControllers.getAllProducts);

router.get("/:id", middlewares.validateId, productControllers.getProductById);

router.post("/", middlewares.validateIsAdmin, middlewares.validateProduct, productControllers.createProduct);

router.put("/:id", middlewares.validateIsAdmin, middlewares.validateId, middlewares.validateProduct, productControllers.modifyProduct);

router.delete("/:id", middlewares.validateIsAdmin, middlewares.validateId, productControllers.removeProduct);

export default router;