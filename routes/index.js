import { Router } from 'express';
import authRoutes from './authRoute.js';
import conversationRoutes from './conversationRoute.js';
import messageRoutes from './messageRoute.js';
import greenApiRoutes from './greenApiRoute.js';
import chatAppRoutes from './chatAppRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/conversations', conversationRoutes);
router.use('/messages', messageRoutes);
router.use('/greenApi', greenApiRoutes);
// router.use('/chatapp', chatAppRoutes);

export default router;
