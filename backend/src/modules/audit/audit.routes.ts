import { Router } from "express";

import {
  getAllAuditLogs,
  getMyAuditLogs,
  getAuditStats,
} from "./audit.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

/**
 * Audit Summary
 */
router.get(
  "/stats",
  authenticate,
  authorize("admin", "hr"),
  getAuditStats
);

router.get(
  "/",
  authenticate,
  authorize("admin", "hr"),
  getAllAuditLogs
);

router.get(
  "/me",
  authenticate,
  getMyAuditLogs
);

export default router;