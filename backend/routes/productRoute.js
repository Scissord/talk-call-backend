import express from "express";
import * as controller from '../controllers/productController.js';
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("", protectRoute, controller.get);
router.post("", protectRoute, controller.create);
router.delete("/:id", protectRoute, controller.softDelete);

export default router;