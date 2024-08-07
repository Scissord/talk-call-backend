import express from "express";
import * as controller from '../controllers/messageController.js';
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:conversation_id", protectRoute, controller.get);
router.post("/:conversation_id", protectRoute, controller.create);

export default router;