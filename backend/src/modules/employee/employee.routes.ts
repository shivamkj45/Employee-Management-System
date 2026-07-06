import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../employee/employee.controller";

import { validateEmployee } from "../employee/employee.validator";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
const router = Router();

// Create Employee
router.post("/", authenticate,authorize("admin","hr"),validateEmployee, createEmployee);

// Get All Employees
router.get("/", authenticate,authorize("admin", "hr", "manager"), getAllEmployees);

// Get Employee By ID
router.get("/:id",authenticate,
  authorize("admin", "hr", "manager", "employee"), getEmployeeById);

// Update Employee
router.put("/:id",authenticate,
  authorize("admin", "hr"), validateEmployee, updateEmployee);

// Delete Employee
router.delete("/:id",authenticate,
  authorize("admin"), deleteEmployee);

export default router;