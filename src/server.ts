import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mainRoutes from './router/index';
import { mongoConnect } from './database/mongo';
import { agendaStart } from './agendaStart';

dotenv.config();

async function startServer() {
    await mongoConnect();   // espera a conexão com o Mongo terminar

    await agendaStart(); // passa a conexão já conectada para o agenda
  
    const server = express();
  
    server.use(express.static(path.join(__dirname, '../public')));
    server.use(express.urlencoded({ extended: true }));
    server.use('/api', mainRoutes);
  
    server.use((req: Request, res: Response) => {
      res.status(404).send('Page not found!');
    });
    
    const PORT = process.env.PORT;
    
    server.listen(PORT, () => {
      console.log(`server running on PORT ${PORT}`);
    });
}
  
startServer();