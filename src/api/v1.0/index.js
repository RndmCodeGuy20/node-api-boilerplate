import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.jsend.success('V1.0 API');
});

export default router;
