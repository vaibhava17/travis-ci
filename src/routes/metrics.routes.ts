import { Router } from 'express';
import * as promClient from 'prom-client';

const router = Router();

router.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', promClient.register.contentType);
    const metrics = await promClient.register.metrics();
    res.send(metrics);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;