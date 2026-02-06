import ExchangeRates from '../../models/ExchangeRates';
import { getExchangeRatesFromAPI } from '../api/exchangeRates';
    
const base_currency = 'USD';

export const getExchangeRates = async () => {
    const response = await ExchangeRates.findOne({ base: base_currency });
    
    if (!response) return null;

    return {
        base: response.base,
        timestamp: response.timestamp,
        rates: response.rates
    };
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
            if (wasModified) {
                console.log("Exchange rates updated");
            } else {
                console.log("Exchange rates already up to date");
            }
            return { ok: true, updated: wasModified};

        } catch (dbErr) {
            console.error('error saving to database:', dbErr);
            return { ok: false, error: 'Database update failed' };
        }
    
    } catch (err) {
        console.error('Error on update exchanges: ', err);
        return { ok: false };
    }
}