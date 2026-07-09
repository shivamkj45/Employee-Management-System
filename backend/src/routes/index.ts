import { Router } from "express";



import authRoutes from "../modules/auth/auth.routes";
import employeeRoutes from "../modules/employee/employee.routes";
import departmentRoutes from "../modules/department/department.routes";
import attendanceRoutes from "../modules/attendance/attendance.routes";
import leaveRoutes from "../modules/leave/leave.routes";
import profileRoutes from "../modules/profile/profile.routes";
import dashboardRoutes from "../modules/dashboard/dashboard.routes";
const router = Router();




// Auth
router.use("/auth", authRoutes);

// Employees
router.use("/employees", employeeRoutes);

// Departments
router.use("/departments", departmentRoutes);
// Attendance
router.use("/attendance", attendanceRoutes);
//Leave
router.use("/leave", leaveRoutes);
//profile
router.use("/users", profileRoutes);
router.use("/dashboard",dashboardRoutes);

export default router;