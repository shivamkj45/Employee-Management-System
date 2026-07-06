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
const router = Router();

// Create Employee
router.post("/", validateEmployee, createEmployee);

// Get All Employees
router.get("/", authenticate, getAllEmployees);

// Get Employee By ID
router.get("/:id", getEmployeeById);

// Update Employee
router.put("/:id", validateEmployee, updateEmployee);

// Delete Employee
router.delete("/:id", deleteEmployee);

export default router;