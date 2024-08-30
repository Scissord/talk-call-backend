import { Router } from 'express';
import express from "express";
import authRoutes from './authRoute.js';
import customerRoutes from './customerRoute.js';
import messageRoutes from './messageRoute.js';
import greenApiRoutes from './greenApiRoute.js';
import userRoutes from './userRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/customers', customerRoutes);
router.use('/messages', messageRoutes);
router.use('/greenApi', greenApiRoutes);
router.use('/users', userRoutes);
router.use('/uploads', express.static('uploads'));

export default router;
