import { Router } from "express";

import { checkIn,checkOut,getTodayAttendance,getAttendanceHistory } from "./attendance.controller";

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
router.get(
  "/",
  authenticate,
  getTodayAttendance
);

router.get(
  "/history/:id",
  authenticate,
  getAttendanceHistory
);

export default router;