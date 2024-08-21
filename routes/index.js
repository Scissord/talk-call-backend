import { Router } from 'express';
import express from "express";
import authRoutes from './authRoute.js';
import conversationRoutes from './conversationRoute.js';
import messageRoutes from './messageRoute.js';
import greenApiRoutes from './greenApiRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/conversations', conversationRoutes);
router.use('/messages', messageRoutes);
router.use('/greenApi', greenApiRoutes);
router.use('/uploads', express.static('uploads'));

export default router;
