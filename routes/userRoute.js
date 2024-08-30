import express from "express";
import * as controller from '../controllers/userController.js';
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("", protectRoute, controller.get);
router.post("", protectRoute, controller.create);

export default router;
