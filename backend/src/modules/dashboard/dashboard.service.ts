import Employee from "../employee/employee.model";
import Department from "../department/department.model";
import Attendance from "../attendance/attendance.model";
import Leave from "../leave/leave.model";

export const getDashboardSummary = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [
    totalEmployees,
    totalDepartments,
    presentToday,
    employeesOnLeave,
    pendingLeaveRequests,
  ] = await Promise.all([
    Employee.countDocuments(),
    Department.countDocuments(),

    Attendance.countDocuments({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
      status: "Present",
    }),

    Leave.countDocuments({
      status: "Approved",
      startDate: { $lte: today },
      endDate: { $gte: today },
    }),

    Leave.countDocuments({
      status: "Pending",
    }),
  ]);

  const absentToday =
    totalEmployees - presentToday - employeesOnLeave;

  return {
    totalEmployees,
    totalDepartments,
    presentToday,
    absentToday,
    employeesOnLeave,
    pendingLeaveRequests,
  };
};