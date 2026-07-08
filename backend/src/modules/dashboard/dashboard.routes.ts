import { Router } from "express";

import { getDashboardSummary } from "./dashboard.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.get(
  "/summary",
  authenticate,
  authorize("admin", "hr", "manager"),
  getDashboardSummary
);

export default router;