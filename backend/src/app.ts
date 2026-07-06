import express from "express";
import healthRouter from "./routes/health.routes";
import employeeRoutes from "./routes/employee.routes";
import { errorHandler } from "./middleware/error.middleware";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
const app = express();

app.use(express.json());

// API Versioning
app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use("/api/v1", healthRouter);
app.use("/api/v1/employees", employeeRoutes);
app.use(errorHandler);
export default app;