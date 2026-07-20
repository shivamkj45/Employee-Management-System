import "./config/env";
import app from "./app";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database";
import logger from "./config/logger";
import { seedDatabase } from "./seeders/seed";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase();
    await seedDatabase();

    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });

    const gracefulShutdown = async () => {
      logger.info("Gracefully shutting down server...");

      server.close(async () => {
        await mongoose.connection.close();

        logger.info("MongoDB connection closed.");

        process.exit(0);
      });
    };

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);

  } catch (error) {
    logger.error(
      error instanceof Error ? error.stack ?? error.message : String(error)
    );
    process.exit(1);
  }
};

startServer();
