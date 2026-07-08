import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../employee/employee.controller";

import { validateEmployee,validateEmployeeUpdate } from "../employee/employee.validator";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
const router = Router();

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               designation:
 *                 type: string
 *               department:
 *                 type: string
 *               salary:
 *                 type: number
 *               joiningDate:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 */
// Create Employee
router.post("/", authenticate,authorize("admin","hr"),validateEmployee, createEmployee);

// Get All Employees
router.get("/", authenticate,authorize("admin", "hr", "manager"), getAllEmployees);

// Get Employee By ID
router.get("/:id",authenticate,
  authorize("admin", "hr", "manager", "employee"), getEmployeeById);

// Update Employee
router.put("/:id",authenticate,
  authorize("admin", "hr"), validateEmployeeUpdate, updateEmployee);

// Delete Employee
router.delete("/:id",authenticate,
  authorize("admin"), deleteEmployee);

export default router;