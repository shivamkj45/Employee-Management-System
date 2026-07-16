import { Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";

import { AuthRequest } from "../../middleware/auth.middleware";

import * as notificationService from "./notification.service";

/**
 * Get My Notifications
 */
export const getMyNotifications = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const notifications =
      await notificationService.getMyNotifications(
        req.user._id.toString()
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        notifications,
        "Notifications fetched successfully"
      )
    );
  }
);

/**
 * Mark One Notification Read
 */
export const markAsRead = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const notification =
      await notificationService.markAsRead(
        req.params.id,
        req.user._id.toString()
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        notification,
        "Notification marked as read"
      )
    );
  }
);

/**
 * Mark All Read
 */
export const markAllAsRead = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    await notificationService.markAllAsRead(
      req.user._id.toString()
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "All notifications marked as read"
      )
    );
  }
);

/**
 * Delete Notification
 */
export const deleteNotification = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    await notificationService.deleteNotification(
      req.params.id,
      req.user._id.toString()
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Notification deleted successfully"
      )
    );
  }
);