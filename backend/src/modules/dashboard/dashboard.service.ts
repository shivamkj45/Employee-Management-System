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

export const getRecentEmployees = async () => {

  const employees = await Employee.find()
    .populate("department", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  return employees;
};

export const getDepartmentStats = async () => {

  const stats = await Employee.aggregate([
    {
      $lookup: {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        as: "department",
      },
    },
    {
      $unwind: "$department",
    },
    {
      $group: {
        _id: "$department.name",
        employees: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        department: "$_id",
        employees: 1,
      },
    },
    {
      $sort: {
        employees: -1,
      },
    },
  ]);

  return stats;
};
export const getAttendanceTrend = async () => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 6);
  lastWeek.setHours(0, 0, 0, 0);

  const totalEmployees = await Employee.countDocuments();

  const attendance = await Attendance.aggregate([
    {
      $match: {
        date: {
          $gte: lastWeek,
          $lte: today,
        },
      },
    },
    {
      $group: {
        _id: "$date",
        present: {
          $sum: {
            $cond: [
              { $eq: ["$status", "Present"] },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return attendance.map((item) => ({
    date: item._id.toISOString().split("T")[0],
    present: item.present,
    absent: totalEmployees - item.present,
  }));
};