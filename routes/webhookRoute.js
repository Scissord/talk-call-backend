import express from "express";
import * as controller from '../controllers/whatsAppController.js';

const router = express.Router();

router.get("", controller.initialize);
router.post("", controller.getIncomingMessages);

export default router;
