import { Router } from "express";

import {
  getAllAuditLogs,
  getMyAuditLogs,
} from "./audit.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

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