import api from "./axios";

import type{ LoginResponse } from "../types/auth.types";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {

  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};