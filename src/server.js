import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { getContactsController, getContactByIdController } from './controllers/contacts.js';

const logger = pino();
const pinoMiddleware = pinoHttp({ logger });

export function setupServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(pinoMiddleware);
  app.use(express.json());

  // Routes
  app.get('/contacts', getContactsController);
  app.get('/contacts/:contactId', getContactByIdController);

  // 404 Handler
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}