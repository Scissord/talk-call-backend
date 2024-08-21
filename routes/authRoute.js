import express from "express";
import * as controller from '../controllers/authController.js';

const router = express.Router();

router.post("/login", controller.login);

export default router;