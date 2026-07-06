import { hashPassword } from "./auth.utils";
import User from "../user/user.model";
import Employee from "../employee/employee.model";
import ApiError from "../../utils/ApiError";
import { comparePassword } from "./auth.utils";
import { generateAccessToken } from "../../utils/jwt";
export const registerUser = async (
  employeeId: string,
  email: string,
  password: string,
  role: "admin" | "hr" | "manager" | "employee"
) => {

  const employee = await Employee.findOne({
    employeeId
  });

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  const existingUser = await User.findOne({
    email
  });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({

    employee: employee._id,

    email,

    password: hashedPassword,

    role

  });

  return user;

};
export const loginUser = async (
  email: string,
  password: string
) => {

  const user = await User.findOne({ email }).populate("employee");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    user,
    token,
  };
};
