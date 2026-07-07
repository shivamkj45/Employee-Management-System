import { Router } from "express";

import { checkIn,checkOut } from "./attendance.controller";

import validate from "../../middleware/validate";

import { checkInSchema } from "./attendance.validator";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/check-in",
  authenticate,
  validate(checkInSchema),
  checkIn
);
router.post(
  "/check-out",
  authenticate,
  validate(checkInSchema),
  checkOut
);

export default router;