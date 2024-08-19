import express from "express";
import * as controller from '../controllers/greenApiController.js';

const router = express.Router();

router.post("/getIncomingMessages", controller.getIncomingMessages);

export default router;
