import api from "./axios";

import type {
  Department,
  DepartmentStats,
  DepartmentsResponse,
} from "../types/department.types";

export const getDepartments = async () => {
  const { data } =
    await api.get<DepartmentsResponse>("/departments");

  return data.data;
};

export const getDepartmentStats = async () => {
  const { data } =
    await api.get("/departments/stats");

  return data.data as DepartmentStats;
};

export const createDepartment = async (
  payload: Partial<Department>
) => {
  const { data } =
    await api.post("/departments", payload);

  return data.data;
};

export const updateDepartment = async (
  id: string,
  payload: Partial<Department>
) => {
  const { data } =
    await api.put(`/departments/${id}`, payload);

  return data.data;
};

export const deleteDepartment = async (
  id: string
) => {
  const { data } =
    await api.delete(`/departments/${id}`);

  return data.data;
};

export const restoreDepartment = async (
  id: string
) => {
  const { data } =
    await api.patch(`/departments/${id}/restore`);

  return data.data;
};