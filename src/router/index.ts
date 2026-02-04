import { Router } from 'express';

import * as ExchangeRateController from '../controllers/ExchangeRates';

const router = Router();

router.get('/exchange-rates', ExchangeRateController.getExchangeRates);

export default router;