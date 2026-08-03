import { Schema, model, Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  description?: string;
  manager?: string;
  status: string;
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
    type: Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
},

   status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
}
  },
  {
    timestamps: true,
  }
);

export default model<IDepartment>(
  "Department",
  departmentSchema
);