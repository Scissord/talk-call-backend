import { Router } from 'express';
import webhooksRoutes from './umnicoWebHookRoute.js';
import authRoutes from './authRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/umnico', webhooksRoutes);

export default router;
