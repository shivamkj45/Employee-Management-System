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

  const attendance = await Attendance.create({
    employee: employeeObjectId,
    date: today,
    checkIn: new Date(),
    status: "Present",
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
export const getTodayAttendance = async (): Promise<IAttendance[]> => {

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return Attendance.find({
    date: {
      $gte: today,
      $lt: tomorrow,
    },
  })
    .populate("employee")
    .sort({ checkIn: 1 });
};