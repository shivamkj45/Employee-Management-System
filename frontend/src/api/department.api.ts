import api from "./axios";

import type {
  DepartmentsResponse,
} from "../types/department.types";

export const getDepartments = async () => {
  const { data } =
    await api.get<DepartmentsResponse>(
      "/departments"
    );

  return data.data;
};