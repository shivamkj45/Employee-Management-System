import { Schema, model, Document, Types } from "mongoose";

export interface IAudit extends Document {
  user: Types.ObjectId;

  action: string;

  module: string;

  description: string;

  ipAddress?: string;

  userAgent?: string;
}

const auditSchema = new Schema<IAudit>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    module: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IAudit>(
  "Audit",
  auditSchema
);