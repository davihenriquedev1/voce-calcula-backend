import { Agenda } from 'agenda';
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.DATABASE_URI as string;

export const createAgenda = async () => {

  const agenda = new Agenda({
    db: { 
      address: mongoUrl,
      collection: 'jobs' 
    },
    processEvery: '1 minute',
    defaultConcurrency: 1,  
  });

  await agenda._ready;

  return agenda;
};