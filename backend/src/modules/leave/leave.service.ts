import mongoose from "mongoose";

import Leave, { ILeave, LeaveType } from "./leave.model";
import Employee from "../employee/employee.model";

import ApiError from "../../utils/ApiError";
import { string } from "zod";

export const applyLeave = async (
  employeeId: string,
  leaveType: LeaveType,
  startDate: string,
  endDate: string,
  reason: string
): Promise<ILeave> => {

  const employeeObjectId = new mongoose.Types.ObjectId(employeeId);

  const employee = await Employee.findById(employeeObjectId);

  if (!employee) {
    throw new ApiError(404, "Employee not found.");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    throw new ApiError(400, "Start date cannot be after end date.");
  }

  const today = new Date();
  today.setHours(0,0,0,0);

  if (start < today) {
    throw new ApiError(400, "Leave cannot start in the past.");
  }

  const overlappingLeave = await Leave.findOne({
    employee: employeeObjectId,
    startDate: { $lte: end },
    endDate: { $gte: start },
    status: {
      $in: ["Pending", "Approved"],
    },
  });

  if (overlappingLeave) {
    throw new ApiError(
      400,
      "Employee already has leave during this period."
    );
  }

  const leave = await Leave.create({
    employee: employeeObjectId,
    leaveType ,
    startDate: start,
    endDate: end,
    reason,
    status: "Pending",
  });

  return leave;
};