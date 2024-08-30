import express from "express";
import * as controller from '../controllers/userController.js';
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("", protectRoute, controller.get);
router.post("", protectRoute, controller.create);
router.patch("/user_id", protectRoute, controller.update);
router.delete("/user_id", protectRoute, controller.destroy);

export default router;
