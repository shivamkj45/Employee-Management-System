import api from "./axios";

export const checkIn = async (
  employee: string,
  remarks?: string
) => {
  const response = await api.post(
    "/attendance/check-in",
    {
      employee,
      remarks,
    }
  );

  return response.data.data;
};

export const checkOut = async (
  employee: string
) => {
  const response = await api.post(
    "/attendance/check-out",
    {
      employee,
    }
  );

  return response.data.data;
};

export const getTodayAttendance = async (
  date?: string
) => {
  const response = await api.get(
    "/attendance",
    {
      params: date
        ? { date }
        : {},
    }
  );

  return response.data.data;
};

export const getAttendanceHistory =
  async (id: string) => {
    const response = await api.get(
      `/attendance/history/${id}`
    );

    return response.data.data;
  };