import Notification, {
  INotification,
  NotificationCategory,
  NotificationPriority,
  NotificationType,
} from "./notification.model";

/**
 * Create Notification
 */
export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: NotificationType = "info",
  category: NotificationCategory = "system",
  priority: NotificationPriority = "medium",
  actionUrl?: string,
  metadata?: Record<string, any>,
  expiresAt?: Date
): Promise<INotification> => {
  return await Notification.create({
    user: userId,
    title,
    message,
    type,
    category,
    priority,
    actionUrl,
    metadata,
    expiresAt,
  });
};

/**
 * Get Notifications
 */
export const getMyNotifications = async (
  userId: string,
  page = 1,
  limit = 20,
  all = false
) => {

  if (all) {

    const notifications =
      await Notification.find({
        user: userId,
      }).sort({
        createdAt: -1,
      });

    return {
      notifications,
      pagination: {
        total: notifications.length,
        page: 1,
        limit: notifications.length,
        totalPages: 1,
      },
    };
  }

  const skip = (page - 1) * limit;

  const [notifications, total] =
    await Promise.all([

      Notification.find({
        user: userId,
      })
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit),

      Notification.countDocuments({
        user: userId,
      }),

    ]);

  return {

    notifications,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },

  };

};

/**
 * Get unread notification count
 */
export const getUnreadCount = async (
  userId: string
) => {
  return Notification.countDocuments({
    user: userId,
    isRead: false,
  });
};

/**
 * Mark One Notification Read
 */
export const markAsRead = async (
  notificationId: string,
  userId: string
) => {
  return Notification.findOneAndUpdate(
    {
      _id: notificationId,
      user: userId,
    },
    {
      isRead: true,
    },
    {
      new: true,
    }
  );
};

/**
 * Mark All Notifications Read
 */
export const markAllAsRead = async (
  userId: string
) => {
  await Notification.updateMany(
    {
      user: userId,
      isRead: false,
    },
    {
      isRead: true,
    }
  );

  return true;
};

/**
 * Delete Notification
 */
export const deleteNotification = async (
  notificationId: string,
  userId: string
) => {
  return Notification.findOneAndDelete({
    _id: notificationId,
    user: userId,
  });
};