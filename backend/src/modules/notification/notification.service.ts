import Notification, {
  INotification,
} from "./notification.model";

/**
 * Create Notification
 */
export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error" = "info"
): Promise<INotification> => {
  return await Notification.create({
    user: userId,
    title,
    message,
    type,
  });
};

/**
 * Get Notifications of Logged-in User
 */
export const getMyNotifications = async (
  userId: string
) => {
  return await Notification.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    });
};

/**
 * Mark One Notification as Read
 */
export const markAsRead = async (
  notificationId: string,
  userId: string
) => {
  return await Notification.findOneAndUpdate(
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
 * Mark All Notifications as Read
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

  return await Notification.findOneAndDelete({
    _id: notificationId,
    user: userId,
  });

};