import express from "express";
import * as controller from '../controllers/customerController.js';
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("", protectRoute, controller.get);
router.get("/update", controller.updateFilteredOrder)

export default router;
