import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI!);
    console.log('MongoDB conectado com mongoose');
  } catch (err) {
    console.error('Erro ao conectar mongoose:', err);
  }
};
