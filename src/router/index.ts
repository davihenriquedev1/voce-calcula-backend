import { Router } from 'express';

import * as ExchangeRateController from '../controllers/ExchangeRates';
import { internalAuth } from '../middlewares/internalAuth';
import { ratesLimiter } from '../middlewares/ratesLimiter';

const router = Router();

router.get('/exchange-rates', ratesLimiter, internalAuth, ExchangeRateController.getExchangeRates);
router.get('/healthz', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default router;