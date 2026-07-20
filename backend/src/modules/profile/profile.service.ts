import User from "../user/user.model";
import Employee from "../employee/employee.model";
import { IEmployee } from "../employee/employee.model";
import ApiError from "../../utils/ApiError";
import { logAction } from "../audit/audit.helper";

export const getMyProfile = async (
  userId: string
) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const employee = await Employee.findById(
    user.employee
  ).populate("department");

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return {
    user,
    employee,
  };
};

export const updateMyProfile = async (
  userId: string,
  profileData: Partial<IEmployee>
) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const employee = await Employee.findById(user.employee);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  // Only allow safe fields
  if (profileData.firstName !== undefined) {
    employee.firstName = profileData.firstName;
  }

  if (profileData.lastName !== undefined) {
    employee.lastName = profileData.lastName;
  }

  if (profileData.phone !== undefined) {
    employee.phone = profileData.phone;
  }

  if (profileData.address !== undefined) {
    employee.address = profileData.address;
  }

  await employee.save();
  await logAction(
  user._id.toString(),
  "PROFILE_UPDATED",
  "Profile",
  "User updated profile."
);

  return employee;
};