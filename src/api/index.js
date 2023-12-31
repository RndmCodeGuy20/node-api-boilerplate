import { Router } from 'express';
import { getHealth } from './health';
import { routeNotFound } from '#middlewares/index';
import versionRoutes from './v1.0';

const router = new Router();

router.get('/health', getHealth);
router.use('/v1.0', versionRoutes);
router.all('*', routeNotFound);

export default router;
