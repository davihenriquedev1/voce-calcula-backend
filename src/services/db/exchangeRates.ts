import ExchangeRates from '../../models/ExchangeRates';
import { getExchangeRatesFromAPI } from '../api/exchangeRates';
    
const base_currency = 'USD';

export const getExchangeRates = async () => {
    const response = await ExchangeRates.findOne({ base: base_currency });
    return response.rates;
}   

export const updateExchangeRates = async () => {
    try {
        const result = await getExchangeRatesFromAPI();
        
        if(!result || !result.rates) {
            throw new Error('Api returned invalid data');
        }

        try {
            const updated = await ExchangeRates.updateOne(
              { base: base_currency },
              { $set: result },
              { upsert: true }
            );
      
            const wasModified = updated.modifiedCount > 0 || updated.upsertedCount > 0;
      
            return { ok: true, updated: wasModified };

        } catch (dbErr) {
            console.error('error saving to mongoDB:', dbErr);
            return { ok: false, error: 'MongoDB update failed' };
        }
    
    } catch (err) {
        console.error('Erro on update exchanges: ', err);
        return { ok: false };
    }
}