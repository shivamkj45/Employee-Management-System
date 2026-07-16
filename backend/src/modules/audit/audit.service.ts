import Audit, { IAudit } from "./audit.model";

export const createAuditLog = async (
  userId: string,
  action: string,
  module: string,
  description: string,
  ipAddress?: string,
  userAgent?: string
): Promise<IAudit> => {
  return await Audit.create({
    user: userId,
    action,
    module,
    description,
    ipAddress,
    userAgent,
  });
};

export const getAuditLogs = async () => {
  return await Audit.find()
    .populate("user", "email role")
    .sort({ createdAt: -1 });
};

export const getAuditLogsByUser = async (
  userId: string
) => {
  return await Audit.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};