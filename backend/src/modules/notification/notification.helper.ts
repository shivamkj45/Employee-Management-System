import { UserRole } from "../../types/roles";
import User from "../user/user.model";
import { createNotification } from "./notification.service";

/**
 * Send notification to all users having specific roles.
 */
export const notifyRoles = async (
  roles: UserRole[],
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error" = "info"
) => {
  const users = await User.find({
    role: { $in: roles },
    isActive: true,
  }).select("_id");

  if (!users.length) return;

  await Promise.all(
    users.map((user) =>
      createNotification(
        user._id.toString(),
        title,
        message,
        type
      )
    )
  );
};

/**
 * Send notification to one user.
 */
export const notifyUser = async (
  userId: string,
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error" = "info"
) => {
  await createNotification(
    userId,
    title,
    message,
    type
  );
};