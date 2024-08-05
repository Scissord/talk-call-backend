import { Router } from 'express';
import webhooksRoutes from './umnicoWebHookRoute.js';
import authRoutes from './authRoute.js';

const router = Router();

router.use('/umnico', webhooksRoutes);
router.use('/auth', authRoutes);

export default router;