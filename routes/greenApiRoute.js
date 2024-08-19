import express from "express";
import * as controller from '../controllers/greenApiController.js';

const router = express.Router();

router.post("/get_incoming_messages", controller.getIncomingMessages);

export default router;
