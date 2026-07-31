import api from "./axios";

export const getDashboardSummary = async () => {
  const response = await api.get(
    "/dashboard/summary"
  );

  return response.data.data;
};
export const getEmployeeGrowth = async () => {
  const response = await api.get("/dashboard/employee-growth");
  return response.data.data;
};

export const getDepartmentStats = async () => {
  const response = await api.get("/dashboard/department-stats");
  return response.data.data;
};

export const getLeaveStats = async () => {
  const response = await api.get("/dashboard/leave-stats");
  return response.data.data;
};

export const getRecentEmployees = async () => {
  const response = await api.get("/dashboard/recent-employees");
  return response.data.data;
};

export const getAttendanceTrend = async () => {
  const response = await api.get("/dashboard/attendance-trend");
  return response.data.data;
};