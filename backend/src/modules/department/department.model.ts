import { Schema, model, Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  description?: string;
  manager?: string;
  status: boolean;
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    manager: {
      type: String,
      default: "",
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IDepartment>(
  "Department",
  departmentSchema
);