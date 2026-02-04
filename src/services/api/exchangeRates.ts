import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.EXCHANGE_RATES_API_KEY as string;
const BASE_URL = 'https://openexchangerates.org/api/latest.json';

export const getExchangeRatesFromAPI = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                app_id: API_KEY,
            },
        });

        const data = response.data;

        if (!data || !data.rates || Object.keys(data.rates).length === 0) {
            throw new Error('Invalid API response or no exchange rates');
        }

        return data;
    } catch (error) {
        console.error('Request error, unable to fetch exchange rates', error);
        throw error;
    }
};
