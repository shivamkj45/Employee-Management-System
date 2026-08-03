import { UserRole } from "../../types/roles";

import {
  notifyRolesEnterprise,
  notifyUserEnterprise,
} from "./notification.event";

/**
 * Backward-compatible wrapper
 */
export const notifyRoles = async (
  roles: UserRole[],
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error" = "info"
) => {

  return notifyRolesEnterprise(
    roles,
    {
      title,
      message,
      type,
    }
  );

};

/**
 * Backward-compatible wrapper
 */
export const notifyUser = async (
  userId: string,
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error" = "info"
) => {

  return notifyUserEnterprise(
    userId,
    {
      title,
      message,
      type,
    }
  );

};