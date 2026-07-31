import api from "./axios";

export const getLeaveSummary = async () => {
  const response = await api.get("/leave/summary");

  return response.data.data;
};
export const getAllLeaves = async () => {
  const response = await api.get("/leave");

  return response.data.data;
};

export const approveLeave = async (
  leaveId: string
) => {
  const response = await api.patch(
    `/leave/${leaveId}/approve`
  );

  return response.data.data;
};

export const rejectLeave = async (
  leaveId: string
) => {
  const response = await api.patch(
    `/leave/${leaveId}/reject`
  );

  return response.data.data;
};