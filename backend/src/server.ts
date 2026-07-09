import "./config/env";
import app from "./app";
import { connectDatabase } from "./config/database";
import logger from "./config/logger";
import { seedDatabase } from "./seeders/seed";


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();
  await seedDatabase();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();