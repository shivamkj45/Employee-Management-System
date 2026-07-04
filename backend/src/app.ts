import express from "express";
import healthRouter from "./routes/health.routes";

const app = express();

app.use(express.json());

// API Versioning
app.use("/api/v1", healthRouter);

export default app;