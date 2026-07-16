import { Router } from "express";

import { getDashboardSummary,getRecentEmployees,getDepartmentStats,getAttendanceTrend,getLeaveStats,getEmployeeGrowth } from "./dashboard.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.get(
  "/summary",
  authenticate,
  authorize("admin", "hr", "manager"),
  getDashboardSummary
);
router.get(
  "/recent-employees",
  authenticate,
  authorize("admin", "hr", "manager"),
  getRecentEmployees
);

router.get(
  "/department-stats",
  authenticate,
  authorize("admin", "hr", "manager"),
  getDepartmentStats
);

router.get(
  "/attendance-trend",
  authenticate,
  authorize("admin", "hr", "manager"),
  getAttendanceTrend
);

router.get(
  "/leave-stats",
  authenticate,
  authorize("admin", "hr", "manager"),
  getLeaveStats
);

router.get(
  "/employee-growth",
  authenticate,
  authorize("admin", "hr", "manager"),
  getEmployeeGrowth
);
export default router;