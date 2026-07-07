import { Schema, model, Document } from "mongoose";
import { Types } from "mongoose";

export type LeaveType =
  | "Casual"
  | "Sick"
  | "Earned"
  | "Maternity"
  | "Paternity";
export interface ILeave extends Document {

  employee: Types.ObjectId;

  leaveType:LeaveType;

  startDate: Date;

  endDate: Date;

  reason: string;

  status:
    | "Pending"
    | "Approved"
    | "Rejected";

}

const leaveSchema = new Schema<ILeave>(
  {

    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    leaveType: {
      type: String,
      enum: [
        "Casual",
        "Sick",
        "Earned",
        "Maternity",
        "Paternity",
      ],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default model<ILeave>(
  "Leave",
  leaveSchema
);