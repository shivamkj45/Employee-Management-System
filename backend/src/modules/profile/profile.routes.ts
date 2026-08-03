import { Router } from "express";

import {
  getMyProfile,
  updateMyProfile,
  getProfileStats,
  getProfileActivity,
  getProfileCompletion,
} from "./profile.controller";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

/* ===============================
   MY PROFILE
================================ */

router.get(
  "/",
  authenticate,
  getMyProfile
);

/* ===============================
   UPDATE PROFILE
================================ */

router.put(
  "/",
  authenticate,
  updateMyProfile
);

/* ===============================
   PROFILE STATS
================================ */

router.get(
  "/stats",
  authenticate,
  getProfileStats
);

router.get(
  "/activity",
  authenticate,
  getProfileActivity
);
router.get(
  "/completion",
  authenticate,
  getProfileCompletion
);

export default router;