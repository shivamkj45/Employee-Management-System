import { Router } from "express";

import { applyLeave, approveLeave,rejectLeave } from "./leave.controller";
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
export default router;