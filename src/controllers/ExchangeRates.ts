import { Request, Response } from 'express';
import { getExchangeRates as getRates } from '../services/db/exchangeRates';

export const getExchangeRates = async (req: Request, res: Response)=>{
    try {
        const exchangeRates = await getRates();
        if (!exchangeRates) return res.status(404).json({ error: 'data not found' });
        return res.json(exchangeRates);

    } catch (error) {
        return res.status(500).json({ error: 'internal server error' });
    }
};