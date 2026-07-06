import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  employee: mongoose.Types.ObjectId;
  email: string;
  password: string;
  role: "admin" | "hr" | "manager" | "employee";
  isActive: boolean;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "hr", "manager", "employee"],
      default: "employee",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User; 