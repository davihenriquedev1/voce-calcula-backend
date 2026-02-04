import Agenda from "agenda";
import { updateExchangeRates } from "../services/db/exchangeRates";

export const defineExchangeRateJobs = async (agenda: Agenda) => {
    
    const jobName = `update exchange rates`;

    // Remove qualquer job antigo com esse nome
    const existingJobs = await agenda.jobs({name: jobName});

    if(existingJobs.length > 0) {
        for (const job of existingJobs) {
            await job.remove();
        }
        console.log(`Job ${jobName} deleted for updating.`);
    }

    agenda.define(jobName, async () => {
        console.log(`[${jobName}] running update...`);
        await updateExchangeRates();

        job.attrs.lastRunAt = new Date();
        
        await job.save();
    });

    const job = agenda.create(jobName, {createdAt: new Date()});
    job.repeatEvery('0 9,12,15 * * 1-5', {
        timezone: 'America/New_York'
    });

    await job.save();

    console.log(`Job ${jobName} scheduled`);

};