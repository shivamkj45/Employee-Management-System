import mongoose, { Schema,model, Document } from "mongoose";
import { UserRole } from "../../types/roles";
/**
 * TypeScript interface representing an Employee document.
 */
export interface IEmployee extends Document {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  department: mongoose.Types.ObjectId;
  salary: number;
  joiningDate: Date;
  status: "Active" | "Inactive";
  role: UserRole;
  address: string;
}

const employeeSchema = new Schema<IEmployee>(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    department: {
       type: Schema.Types.ObjectId,
       ref: "Department",
       required: true,
    },

    salary: {
      type: Number,
      required: true,
      min: 0,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    role: {
      type: String,
      enum: ["admin", "hr", "manager", "employee"],
      default: "employee",
    },

    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;