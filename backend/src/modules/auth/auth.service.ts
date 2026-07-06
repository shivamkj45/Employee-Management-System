import { hashPassword } from "./auth.utils";
import User from "../user/user.model";
import Employee from "../employee/employee.model";
import ApiError from "../../utils/ApiError";
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