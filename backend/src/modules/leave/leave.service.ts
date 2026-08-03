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
import { sendEmail } from "../../services/email.service";
import { leaveAppliedEmail } from "../../templates/leaveAppliedEmail";
import { leaveApprovedEmail } from "../../templates/leaveApprovedEmail";
import { leaveRejectedEmail } from "../../templates/leaveRejectedEmail";

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

try {
  await sendEmail({
    to: employee.email,
    subject: "Leave Request Submitted",
    html: leaveAppliedEmail(
      `${employee.firstName} ${employee.lastName}`,
      leaveType,
      start.toLocaleDateString(),
      end.toLocaleDateString(),
      reason
    ),
  });
} catch (error) {
  console.error("Failed to send leave application email:", error);
}
await logAction(
  employee._id.toString(),
  "CREATE",
  "Leave",
  `${employee.firstName} ${employee.lastName} applied for ${leaveType} leave.`
);

  return leave;
};

export const approveLeave = async (
  leaveId: string,
  remarks: string,
  approvedBy: string
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
  leave.approvalRemarks = remarks;
  leave.approvedBy = new mongoose.Types.ObjectId(approvedBy);
  leave.approvedAt = new Date();

  await leave.save();

  const employeeUser = await User.findOne({
    employee: leave.employee,
  });

  const employee = await Employee.findById(
    leave.employee
  );

  if (employeeUser) {
    await notifyUser(
      employeeUser._id.toString(),
      "Leave Approved",
      `Your leave request has been approved.

Remarks:
${remarks || "No remarks provided."}`,
      "success"
    );
  }

  if (employee) {
    try {
      await sendEmail({
        to: employee.email,
        subject: "Leave Approved",
        html: leaveApprovedEmail(
          `${employee.firstName} ${employee.lastName}`,
          leave.leaveType,
          remarks
        ),
      });
    } catch (error) {
      console.error(
        "Failed to send approval email:",
        error
      );
    }

    await logAction(
      employee._id.toString(),
      "APPROVE",
      "Leave",
      `Leave request approved. Remarks: ${
        remarks || "None"
      }`
    );
  }

  return leave;
};

export const rejectLeave = async (
  leaveId: string,
  remarks: string,
  rejectedBy: string
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
  leave.rejectionRemarks = remarks;
  leave.rejectedBy = new mongoose.Types.ObjectId(rejectedBy);
  leave.rejectedAt = new Date();

  await leave.save();

  const employeeUser = await User.findOne({
    employee: leave.employee,
  });

  const employee = await Employee.findById(
    leave.employee
  );

  if (employeeUser) {
    await notifyUser(
      employeeUser._id.toString(),
      "Leave Rejected",
      `Your leave request has been rejected.

Reason:
${remarks || "No reason provided."}`,
      "warning"
    );
  }

  if (employee) {
    try {
      await sendEmail({
        to: employee.email,
        subject: "Leave Rejected",
        html: leaveRejectedEmail(
          `${employee.firstName} ${employee.lastName}`,
          leave.leaveType,
          remarks
        ),
      });
    } catch (error) {
      console.error(
        "Failed to send rejection email:",
        error
      );
    }

    await logAction(
      employee._id.toString(),
      "REJECT",
      "Leave",
      `Leave request rejected. Reason: ${
        remarks || "None"
      }`
    );
  }

  return leave;
};

// Get All Leave Requests
export const getAllLeaves = async (): Promise<ILeave[]> => {
  return Leave.find()
    .populate({
      path: "employee",
      populate: {
        path: "department",
        select: "name",
      },
    })
    .populate({
      path: "approvedBy",
      select: "email role employee",
      populate: {
        path: "employee",
        select: "firstName lastName",
      },
    })
    .populate({
      path: "rejectedBy",
      select: "email role employee",
      populate: {
        path: "employee",
        select: "firstName lastName",
      },
    })
    .sort({ createdAt: -1 });
};

// Get Leave By ID
export const getLeaveById = async (
  leaveId: string
): Promise<ILeave | null> => {
  return Leave.findById(leaveId)
    .populate({
      path: "employee",
      populate: {
        path: "department",
        select: "name",
      },
    })
    .populate({
      path: "approvedBy",
      select: "email role employee",
      populate: {
        path: "employee",
        select: "firstName lastName",
      },
    })
    .populate({
      path: "rejectedBy",
      select: "email role employee",
      populate: {
        path: "employee",
        select: "firstName lastName",
      },
    });
};

export const getLeaveSummary = async () => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const [
    pending,
    approved,
    rejected,
    onLeaveToday,
  ] = await Promise.all([
    Leave.countDocuments({
      status: "Pending",
    }),

    Leave.countDocuments({
      status: "Approved",
    }),

    Leave.countDocuments({
      status: "Rejected",
    }),

    Leave.countDocuments({
      status: "Approved",
      startDate: {
        $lte: today,
      },
      endDate: {
        $gte: today,
      },
    }),
  ]);

  return {
    pending,
    approved,
    rejected,
    onLeaveToday,
  };
};