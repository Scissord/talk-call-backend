import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as controller from '../controllers/boardController.js';

const router = express.Router();

router.get("", protectRoute, controller.getBoard);

export default router;
