import express from "express";
import * as controller from '../controllers/conversationController.js';
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("", protectRoute, controller.get);
router.patch("/:customer_id", protectRoute, controller.makeFavorite);

export default router;