import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../api/notification.api";

export const useNotifications = (
  page = 1,
  limit = 20,
  all = false
) =>
  useQuery({
    queryKey: [
      "notifications",
      page,
      limit,
      all,
    ],

    queryFn: () =>
      getNotifications(
        page,
        limit,
        all
      ),

    refetchInterval: 30000,
  });

export const useUnreadCount = () =>
  useQuery({
    queryKey: ["notification-count"],

    queryFn: getUnreadCount,

    refetchInterval: 30000,
  });

export function useMarkNotificationRead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: markNotificationRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "notification-count",
        ],
      });
    },
  });
}

export function useMarkAllRead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      markAllNotificationsRead,

    onSuccess: () => {
      toast.success(
        "All notifications marked as read"
      );

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "notification-count",
        ],
      });
    },
  });
}

export function useDeleteNotification() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      deleteNotification,

    onSuccess: () => {
      toast.success(
        "Notification deleted"
      );

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "notification-count",
        ],
      });
    },
  });
}