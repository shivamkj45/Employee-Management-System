import mongoose from "mongoose";
import logger from "./logger";
export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    logger.info("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ Database Connection Failed");

    logger.error(error instanceof Error ? error.stack || error.message : String(error));

    process.exit(1);
  }
};