import Audit, { IAudit } from "./audit.model";

/**
 * Create Audit Log
 */
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

/**
 * Get All Audit Logs (Admin / HR)
 */
export const getAuditLogs = async () => {
  return await Audit.find()
    .populate({
      path: "user",
      select: "email role employee",
      populate: {
        path: "employee",
        select:
          "firstName lastName profileImage designation",
      },
    })
    .sort({
      createdAt: -1,
    });
};

/**
 * Get Logged-in User Audit History
 */
export const getAuditLogsByUser = async (
  userId: string
) => {
  return await Audit.find({
    user: userId,
  })
    .populate({
      path: "user",
      select: "email role employee",
      populate: {
        path: "employee",
        select:
          "firstName lastName profileImage designation",
      },
    })
    .sort({
      createdAt: -1,
    });
};
/**
 * Audit Statistics
 */
export const getAuditStats = async () => {

  const totalLogs =
    await Audit.countDocuments();

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const todayLogs =
    await Audit.countDocuments({
      createdAt: {
        $gte: today,
      },
    });

  const activeUsers =
    await Audit.distinct("user");

  const criticalLogs =
    await Audit.countDocuments({
      action: {
        $in: [
          "DELETE",
          "DISABLE",
          "RESTORE",
        ],
      },
    });

  return {

    totalLogs,

    todayLogs,

    activeUsers:
      activeUsers.length,

    criticalLogs,

  };

};