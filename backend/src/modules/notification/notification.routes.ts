import { Router } from "express";

import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} from "./notification.controller";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  getMyNotifications
);

router.get(
  "/unread-count",
  authenticate,
  getUnreadCount
);

router.patch(
  "/:id/read",
  authenticate,
  markAsRead
);

router.patch(
  "/read-all",
  authenticate,
  markAllAsRead
);

router.delete(
  "/:id",
  authenticate,
  deleteNotification
);

export default router;