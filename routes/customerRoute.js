import express from "express";
import * as controller from '../controllers/customerController.js';
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("", controller.create);
router.get("", protectRoute, controller.get);
router.patch("/:customer_id", protectRoute, controller.toggleFavorite);

export default router;
