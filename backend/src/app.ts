import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";

import routes from "./routes";

import errorHandler from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// API v1
app.use("/api/v1", routes);

// Global Error Handler
app.use(errorHandler);

export default app;