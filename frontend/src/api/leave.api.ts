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
  leaveId: string,
  remarks: string
) => {
  const response = await api.patch(
    `/leave/${leaveId}/approve`,
    {
      remarks,
    }
  );

  return response.data.data;
};

export const rejectLeave = async (
  leaveId: string,
  remarks: string
) => {
  const response = await api.patch(
    `/leave/${leaveId}/reject`,
    {
      remarks,
    }
  );

  return response.data.data;
};