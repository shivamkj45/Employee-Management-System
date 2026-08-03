import { Schema, model, Document, Types } from "mongoose";

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error";

export type NotificationCategory =
  | "leave"
  | "attendance"
  | "employee"
  | "payroll"
  | "recruitment"
  | "asset"
  | "performance"
  | "announcement"
  | "system";

export type NotificationPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface INotification extends Document {
  user: Types.ObjectId;

  title: string;

  message: string;

  type: NotificationType;

  category: NotificationCategory;

  priority: NotificationPriority;

  actionUrl?: string;

  metadata?: Record<string, any>;

  isRead: boolean;

  expiresAt?: Date;
}

const notificationSchema =
  new Schema<INotification>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        enum: [
          "info",
          "success",
          "warning",
          "error",
        ],
        default: "info",
      },

      category: {
        type: String,
        enum: [
          "leave",
          "attendance",
          "employee",
          "payroll",
          "recruitment",
          "asset",
          "performance",
          "announcement",
          "system",
        ],
        default: "system",
      },

      priority: {
        type: String,
        enum: [
          "low",
          "medium",
          "high",
          "critical",
        ],
        default: "medium",
      },

      actionUrl: {
        type: String,
      },

      metadata: {
        type: Schema.Types.Mixed,
      },

      expiresAt: {
        type: Date,
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default model<INotification>(
  "Notification",
  notificationSchema
);