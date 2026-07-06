import bcrypt from "bcrypt";
import User from "../user/user.model";
import Employee from "../employee/employee.model";

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
    throw new Error("Employee not found");
  }

  const existingUser = await User.findOne({
    email
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({

    employee: employee._id,

    email,

    password: hashedPassword,

    role

  });

  return user;

};