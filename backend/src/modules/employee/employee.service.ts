import mongoose from "mongoose";
import bcrypt from "bcrypt";

import Employee, { IEmployee } from "./employee.model";
import User from "../user/user.model";

import { generateTemporaryPassword } from "../../utils/password";
import ApiError from "../../utils/ApiError";
import { notifyRoles } from "../notification/notification.helper";
import { logAction } from "../audit/audit.helper";

// Create Employee
// Create Employee + User Account
export const createEmployee = async (
  employeeData: Partial<IEmployee>,
  customPassword?: string
): Promise<{ employee: IEmployee; temporaryPassword: string }> => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    // Check duplicate Employee ID
    const employeeIdExists = await Employee.findOne({
      employeeId: employeeData.employeeId,
    }).session(session);

    if (employeeIdExists) {
      throw new ApiError(409, "Employee ID already exists.");
    }

    // Check duplicate Email
    const emailExists = await Employee.findOne({
      email: employeeData.email,
    }).session(session);

    if (emailExists) {
      throw new ApiError(409, "Employee email already exists.");
    }

    // Create Employee
    const [employee] = await Employee.create(
  [employeeData],
  { session }
  );

    // Generate temporary password
    const temporaryPassword =
    customPassword ?? generateTemporaryPassword();

    // Hash password
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Create User
    await User.create(
      [
        {
          employee: employee._id,
          email: employee.email,
          password: hashedPassword,
          role: employee.role,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    await notifyRoles(
  ["admin", "hr"],
  "New Employee Added",
  `${employee.firstName} ${employee.lastName} has been added.`,
  "success"
);
await logAction(
  employee._id.toString(),
  "CREATE",
  "Employee",
  `Employee ${employee.employeeId} (${employee.firstName} ${employee.lastName}) was created.`
);
    return {
      employee: employee,
      temporaryPassword,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};

// Get All Employees
export const getAllEmployees = async (query: any) => {
  const {
    page = "1",
    limit = "10",
    search = "",
    department,
    designation,
    sort = "-createdAt",
  } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const filter: any = {};

  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { employeeId: { $regex: search, $options: "i" } },
    ];
  }

  if (department) {
    filter.department = department;
  }

  if (designation) {
    filter.designation = designation;
  }

  const totalEmployees = await Employee.countDocuments(filter);

  const employees = await Employee.find(filter)
    .populate("department")
    .sort(sort)
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  return {
    employees,
    totalEmployees,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalEmployees / limitNumber),
  };
};

// Get Employee By ID
export const getEmployeeById = async (
  id: string
): Promise<IEmployee | null> => {
  const employee = await Employee.findById(id).populate("department");
  return employee;
};

// Update Employee
export const updateEmployee = async (
  id: string,
  employeeData: Partial<IEmployee>
): Promise<IEmployee | null> => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    // Update Employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      employeeData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!updatedEmployee) {
      throw new ApiError(404, "Employee not found.");
    }

    // Synchronize User email & role
    await User.findOneAndUpdate(
  { employee: updatedEmployee._id },
  {
    email: updatedEmployee.email,
    role: updatedEmployee.role,
    isActive: updatedEmployee.status === "Active",
  },
  { session }
);

    await session.commitTransaction();
    await logAction(
  updatedEmployee._id.toString(),
  "UPDATE",
  "Employee",
  `Employee ${updatedEmployee.employeeId} profile updated.`
);

    session.endSession();

    return updatedEmployee;
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    throw error;
  }
};
// Delete Employee
export const deleteEmployee = async (
  id: string
): Promise<IEmployee | null> => {

  const employee = await Employee.findById(id);

  if (!employee) {
    throw new Error("Employee not found");
  }

  const deletedEmployee =
    await Employee.findByIdAndDelete(id);

  await logAction(
    employee._id.toString(),
    "DELETE",
    "Employee",
    `Employee ${employee.employeeId} deleted.`
  );

  return deletedEmployee;
};