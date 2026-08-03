import api from "./axios";

export const getNotifications = async (
  page = 1,
  limit = 20,
  all = false
) => {

  const response = await api.get(
    `/notifications?page=${page}&limit=${limit}&all=${all}`
  );

  return response.data.data;

};

export const getUnreadCount = async () => {
  const response = await api.get(
    "/notifications/unread-count"
  );

  return response.data.data.count;
};

export const markNotificationRead = async (
  id: string
) => {
  const response = await api.patch(
    `/notifications/${id}/read`
  );

  return response.data.data;
};

export const markAllNotificationsRead =
  async () => {
    const response = await api.patch(
      "/notifications/read-all"
    );

    return response.data.data;
  };

export const deleteNotification =
  async (id: string) => {
    const response = await api.delete(
      `/notifications/${id}`
    );

    return response.data.data;
  };