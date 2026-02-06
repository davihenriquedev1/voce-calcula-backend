import Agenda from "agenda";
import { updateExchangeRates } from "../services/db/exchangeRates";

export const defineExchangeRateJobs = async (agenda: Agenda) => {
    
    const jobName = `update exchange rates`;

    agenda.define(jobName, async () => {
        console.log(`[${jobName}] running update...`);
        await updateExchangeRates();
    });

    const existingJobs = await agenda.jobs({name: jobName});

    if(existingJobs.length == 0) {
        const job = agenda.create(jobName, {createdAt: new Date()});
    
        job.repeatEvery('0 9,12,15 * * 1-5', {
            timezone: 'America/New_York'
        });

        console.log(`Job ${jobName} created and scheduled`);
        await job.save();
    } else {
        console.log(`Job ${jobName} already exists`);
    }

    console.log(`Job ${jobName} scheduled`);
};