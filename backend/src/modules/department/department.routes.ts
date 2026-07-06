import { Router } from "express";

import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "./department.controller";

import validate from "../../middleware/validate";
import { createDepartmentSchema } from "./department.validator";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("admin", "hr"),
  validate(createDepartmentSchema),
  createDepartment
);

router.get(
  "/",
  authenticate,
  getAllDepartments
);

router.get(
  "/:id",
  authenticate,
  getDepartmentById
);

router.put(
  "/:id",
  authenticate,
  authorize("admin", "hr"),
  validate(createDepartmentSchema),
  updateDepartment
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteDepartment
);

export default router;