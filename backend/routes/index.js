import { Router } from 'express';
import webhooksRoutes from './umnicoWebHookRoute.js';
import authRoutes from './authRoute.js';
import productRoutes from './productRoute.js';
import dealRoutes from './dealRoute.js';

const router = Router();

router.use('/umnico', webhooksRoutes);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/deals', dealRoutes);

export default router;