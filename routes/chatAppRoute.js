import express from "express";
import * as controller from '../controllers/chatAppController.js';

const router = express.Router();

router.get("/webhook", controller.register);
router.post("/get_incoming_messages", controller.getIncomingMessages);

export default router;
