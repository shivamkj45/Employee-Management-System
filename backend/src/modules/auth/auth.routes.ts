import { Router } from "express";

import { register,login,getCurrentUser,changePassword,logoutUser,refreshToken } from "./auth.controller";

import validate from "../../middleware/validate";
import { authenticate } from "../../middleware/auth.middleware";
import { registerSchema,loginSchema,changePasswordSchema } from "./auth.validator";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);
router.post(
  "/login",
  validate(loginSchema),
  login
);
router.post(
  "/logout",
  authenticate,
  logoutUser
);
router.post(
  "/refresh",
  refreshToken
);
router.get(
  "/me",
  authenticate,
  getCurrentUser
);

router.put(
    "/change-password",
    authenticate,
    validate(changePasswordSchema),
    changePassword
);

export default router;