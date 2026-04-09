import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const startApp = async () => {
  try {
    // MongoDB
    await initMongoConnection();
    
    // Server
    setupServer();
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
};

startApp();