import { Schema, model, Document } from "mongoose";
import { Types } from "mongoose";
export interface IAttendance extends Document {
  employee: Types.ObjectId;

  date: Date;

  checkIn?: Date;

  checkOut?: Date;

  status: "Present" | "Absent" | "Half Day" | "Leave";

  workingHours?: number;

  remarks?: string;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    checkIn: Date,

    checkOut: Date,

    status: {
      type: String,
      enum: ["Present", "Absent", "Half Day", "Leave"],
      default: "Present",
    },

    workingHours: {
      type: Number,
      default: 0,
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

attendanceSchema.index(
  { employee: 1, date: 1 },
  { unique: true }
);

export default model<IAttendance>(
  "Attendance",
  attendanceSchema
);