import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";

import { getMyProfile,updateMyProfile } from "./profile.controller";
import { validate } from "../../middleware/validate.middleware";
import { updateProfileSchema } from "./profile.validator";

const router = Router();

router.get(
  "/profile",
  authenticate,
  getMyProfile
);
router.put(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  updateMyProfile
);

export default router;