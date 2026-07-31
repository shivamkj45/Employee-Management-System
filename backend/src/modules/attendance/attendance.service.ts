import mongoose from "mongoose";
import Attendance, { IAttendance } from "./attendance.model";
import ApiError from "../../utils/ApiError";
import Employee from "../employee/employee.model";
export const checkIn = async (
  employeeId: string,
  remarks?: string
): Promise<IAttendance> => {

  const employeeObjectId = new mongoose.Types.ObjectId(employeeId);
  const employee = await Employee.findById(employeeObjectId);

if (!employee) {
  throw new ApiError(404, "Employee not found.");
}

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingAttendance = await Attendance.findOne({
    employee: employeeObjectId,
    date: today,
  });

  if (existingAttendance) {
    throw new ApiError(400, "Employee has already checked in today.");
  }

  const checkInTime = new Date();

const officeStart = new Date();
officeStart.setHours(10, 15, 0, 0);

let status: "Present" | "Late" = "Present";
let lateMinutes = 0;

if (checkInTime > officeStart) {
  status = "Late";

  lateMinutes = Math.floor(
    (checkInTime.getTime() -
      officeStart.getTime()) /
      (1000 * 60)
  );
}

  const attendance = await Attendance.create({
    employee: employeeObjectId,
    date: today,
    checkIn: checkInTime,
    status,
    lateMinutes,
    remarks,
  });

  return attendance;
};
export const checkOut = async (
  employeeId: string
): Promise<IAttendance> => {

  const employeeObjectId = new mongoose.Types.ObjectId(employeeId);

  const employee = await Employee.findById(employeeObjectId);

  if (!employee) {
    throw new ApiError(404, "Employee not found.");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    employee: employeeObjectId,
    date: today,
  });

  if (!attendance) {
    throw new ApiError(400, "Employee has not checked in today.");
  }

  if (attendance.checkOut) {
    throw new ApiError(400, "Employee has already checked out.");
  }

  const checkOutTime = new Date();

  const workingHours =
    (checkOutTime.getTime() - attendance.checkIn!.getTime()) /
    (1000 * 60 * 60);

  attendance.checkOut = checkOutTime;
  attendance.workingHours = Number(workingHours.toFixed(2));

  await attendance.save();

  return attendance;
};
export const getTodayAttendance =
async (
  selectedDate?: string
): Promise<IAttendance[]> => {

  const date = selectedDate
  ? new Date(selectedDate)
  : new Date();

date.setHours(0, 0, 0, 0);

const nextDay = new Date(date);

nextDay.setDate(date.getDate() + 1);

  return Attendance.find({
    date: {
      $gte: date,
$lt: nextDay,
    },
  })
    .populate({
    path: "employee",
    populate: {
        path: "department",
        select: "name",
    },
})
    .sort({ checkIn: 1 });
};

export const getEmployeeAttendanceHistory =
async (
  employeeId: string
): Promise<IAttendance[]> => {

  return Attendance.find({
    employee: employeeId,
  })
    .sort({ date: -1 })
    .populate(
      "employee",
      "firstName lastName employeeId profileImage"
    );
};