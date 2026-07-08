import "./config/env";
import app from "./app";
import { connectDatabase } from "./config/database";
import logger from "./config/logger";



const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();