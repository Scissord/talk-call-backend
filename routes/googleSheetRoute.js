import express from "express";
import * as controller from '../controllers/googleSheetController.js';

const router = express.Router();

router.post("/webhook", controller.webhook);

export default router;
