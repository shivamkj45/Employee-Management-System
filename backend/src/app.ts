import express from "express";
import healthRouter from "./routes/health.routes";
import employeeRoutes from "./routes/employee.routes";
const app = express();

app.use(express.json());

// API Versioning
app.use("/api/v1", healthRouter);
app.use("/api/v1/employees", employeeRoutes);
export default app;