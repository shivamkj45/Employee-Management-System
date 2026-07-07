import { Router } from "express";

import { applyLeave } from "./leave.controller";

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

export default router;