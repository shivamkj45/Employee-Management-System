import api from "../api/axios";

export const checkIn = async () => {
  const { data } = await api.post(
    "/attendance/check-in"
  );

  return data.data;
};

export const checkOut = async () => {
  const { data } = await api.post(
    "/attendance/check-out"
  );

  return data.data;
};