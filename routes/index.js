import { Router } from 'express';
import authRoutes from './authRoute.js';
import webhooksRoutes from './umnicoWebHookRoute.js';
import conversationRoutes from './conversationRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/umnico', webhooksRoutes);
router.use('/conversations', conversationRoutes);

export default router;
