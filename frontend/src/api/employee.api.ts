import api from "./axios";

import type { Employee } from "../types/employee.types";

interface EmployeesApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    employees: Employee[];
    totalEmployees: number;
    currentPage: number;
    totalPages: number;
  };
}

export const getEmployees = async () => {
  const { data } =
    await api.get<EmployeesApiResponse>(
      "/employees"
    );

  return data.data;
};
export const getEmployeeById = async (
  id: string
) => {
  const response = await api.get(
    `/employees/${id}`
  );

  return response.data.data;
};
export const createEmployee = async (
  data: unknown
) => {
  const response = await api.post(
    "/employees",
    data
  );

  return response.data;
};

export const getManagers = async () => {

  const { data } = await api.get(
    "/employees?role=manager&limit=100"
  );

  return data.data;

};