import { Router } from 'express';
import authRoutes from './authRoute.js';
import webhooksRoutes from './umnicoWebHookRoute.js';
import conversationRoutes from './conversationRoute.js';
import messageRoutes from './messageRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/umnico', webhooksRoutes);
router.use('/conversations', conversationRoutes);
router.use('/messages', messageRoutes);

export default router;
