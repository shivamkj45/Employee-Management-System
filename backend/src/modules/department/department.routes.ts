import { Router } from "express";

import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  restoreDepartment,
  getDepartmentStats,
} from "./department.controller";

import validate from "../../middleware/validate";
import { createDepartmentSchema } from "./department.validator";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

/**
 * Statistics
 */
router.get(
  "/stats",
  authenticate,
  authorize("admin", "hr"),
  getDepartmentStats
);

/**
 * Create
 */
router.post(
  "/",
  authenticate,
  authorize("admin", "hr"),
  validate(createDepartmentSchema),
  createDepartment
);

/**
 * Get All
 */
router.get(
  "/",
  authenticate,
  getAllDepartments
);

/**
 * Get One
 */
router.get(
  "/:id",
  authenticate,
  getDepartmentById
);

/**
 * Update
 */
router.put(
  "/:id",
  authenticate,
  authorize("admin", "hr"),
  validate(createDepartmentSchema),
  updateDepartment
);

/**
 * Soft Delete
 */
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteDepartment
);

/**
 * Restore
 */
router.patch(
  "/:id/restore",
  authenticate,
  authorize("admin"),
  restoreDepartment
);

export default router;