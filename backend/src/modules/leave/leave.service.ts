import mongoose from "mongoose";

import Leave, { ILeave, LeaveType } from "./leave.model";
import Employee from "../employee/employee.model";

import ApiError from "../../utils/ApiError";
import { string } from "zod";
import {
  notifyUser,
  notifyRoles,
} from "../notification/notification.helper";
import User from "../user/user.model";
import { logAction } from "../audit/audit.helper";

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
  await notifyRoles(
  ["admin", "hr"],
  "New Leave Request",
  `${employee.firstName} ${employee.lastName} has applied for ${leaveType} leave.`,
  "info"
);
await logAction(
  employee._id.toString(),
  "CREATE",
  "Leave",
  `${employee.firstName} ${employee.lastName} applied for ${leaveType} leave.`
);

  return leave;
};

export const approveLeave = async (
  leaveId: string
): Promise<ILeave> => {

  const leave = await Leave.findById(leaveId);

  if (!leave) {
    throw new ApiError(404, "Leave request not found.");
  }

  if (leave.status !== "Pending") {
    throw new ApiError(
      400,
      `Leave request is already ${leave.status}.`
    );
  }

  leave.status = "Approved";

  await leave.save();
  const employeeUser = await User.findOne({
  employee: leave.employee,
});

if (employeeUser) {
  await notifyUser(
    employeeUser._id.toString(),
    "Leave Approved",
    "Your leave request has been approved.",
    "success"
  );
  await logAction(
  leave.employee.toString(),
  "APPROVE",
  "Leave",
  "Leave request approved."
);
}

  return leave;
};

export const rejectLeave = async (
  leaveId: string
): Promise<ILeave> => {

  const leave = await Leave.findById(leaveId);

  if (!leave) {
    throw new ApiError(404, "Leave request not found.");
  }

  if (leave.status !== "Pending") {
    throw new ApiError(
      400,
      `Leave request is already ${leave.status}.`
    );
  }

  leave.status = "Rejected";

  await leave.save();
  const employeeUser = await User.findOne({
  employee: leave.employee,
});

if (employeeUser) {
  await notifyUser(
    employeeUser._id.toString(),
    "Leave Rejected",
    "Your leave request has been rejected.",
    "warning"
  );
  await logAction(
  leave.employee.toString(),
  "REJECT",
  "Leave",
  "Leave request rejected."
);
}

  return leave;
};

// Get All Leave Requests
export const getAllLeaves = async (): Promise<ILeave[]> => {
  return Leave.find()
    .populate("employee")
    .sort({ createdAt: -1 });
};

// Get Leave By ID
export const getLeaveById = async (
  leaveId: string
): Promise<ILeave | null> => {
  return Leave.findById(leaveId).populate("employee");
};