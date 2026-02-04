import { createAgenda } from './libs/agenda';
import { defineExchangeRateJobs } from './jobs/exchangeRates';

export async function agendaStart() {
    const agenda = await createAgenda();

    await defineExchangeRateJobs(agenda);
    
    await agenda.start();
  
    console.log('✅ Schedule started and jobs scheduled!');
};