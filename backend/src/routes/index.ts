import { Router } from "express";



import authRoutes from "../modules/auth/auth.routes";
import employeeRoutes from "../modules/employee/employee.routes";
import departmentRoutes from "../modules/department/department.routes";
import attendanceRoutes from "../modules/attendance/attendance.routes";
const router = Router();




// Auth
router.use("/auth", authRoutes);

// Employees
router.use("/employees", employeeRoutes);

// Departments
router.use("/departments", departmentRoutes);
// Attendance
router.use("/attendance", attendanceRoutes);
export default router;