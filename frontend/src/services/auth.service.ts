import { login } from "../api/auth.api";

export const loginUser = async (
  email: string,
  password: string
) => {
  return await login(email, password);
};