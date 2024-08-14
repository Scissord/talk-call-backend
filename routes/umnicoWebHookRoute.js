import express from "express";
import * as umnicoController from '../controllers/umnicoWebHookController.js';

const router = express.Router();

router.post("/message_incoming", umnicoController.getIncomingMessages);

export default router;
