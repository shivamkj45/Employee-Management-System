import api from "../api/axios";

export const updateEmployee = async (
  id: string,
  data: unknown
) => {
  const response = await api.put(
    `/employees/${id}`,
    data
  );

  return response.data;
};

export const deleteEmployee = async (
  id: string
) => {
  const response = await api.delete(
    `/employees/${id}`
  );

  return response.data;
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