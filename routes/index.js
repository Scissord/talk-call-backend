import { Router } from 'express';
import authRoutes from './authRoute.js';
import umnicoRoutes from './umnicoWebHookRoute.js';
import conversationRoutes from './conversationRoute.js';
import messageRoutes from './messageRoute.js';
import whatsAppRoutes from './webhookRoute.js';

const router = Router();

// router.get('/', indexRoutes);
router.use('/auth', authRoutes);
// router.use('/umnico', umnicoRoutes);
router.use('/conversations', conversationRoutes);
router.use('/messages', messageRoutes);
router.use('/webhook', whatsAppRoutes);

export default router;
