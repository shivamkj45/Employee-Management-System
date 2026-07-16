import { createAuditLog } from "./audit.service";

export const logAction = async (
  userId: string,
  action: string,
  module: string,
  description: string,
  ipAddress?: string,
  userAgent?: string
) => {
  await createAuditLog(
    userId,
    action,
    module,
    description,
    ipAddress,
    userAgent
  );
};