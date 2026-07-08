import { Router } from "express";

import { applyLeave, approveLeave,rejectLeave,getAllLeaves,
  getLeaveById, } from "./leave.controller";
import { authorize } from "../../middleware/authorize.middleware";
import validate from "../../middleware/validate";

import { applyLeaveSchema } from "./leave.validator";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/apply",
  authenticate,
  validate(applyLeaveSchema),
  applyLeave
);
router.patch(
  "/:id/approve",
  authenticate,
  authorize("admin", "hr"),
  approveLeave
);

router.patch(
  "/:id/reject",
  authenticate,
  authorize("admin", "hr"),
  rejectLeave
);

router.get(
  "/",
  authenticate,
  authorize("admin", "hr"),
  getAllLeaves
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "hr"),
  getLeaveById
);
export default router;