import { Router } from "express";
import saleController from "../controllers/sale.controllers.js";

const router = Router();

router.post("/", saleController.createSale);

export default router;