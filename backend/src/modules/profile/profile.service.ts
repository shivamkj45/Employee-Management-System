import User from "../user/user.model";
import Employee from "../employee/employee.model";
import { IEmployee } from "../employee/employee.model";
import ApiError from "../../utils/ApiError";
import { logAction } from "../audit/audit.helper";
import Audit from "../audit/audit.model";
import Notification from "../notification/notification.model";

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

export const getProfileStats = async (
  userId: string
) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const employee = await Employee.findById(user.employee)
    .populate("department");

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  const totalNotifications =
    await Notification.countDocuments({
      user: user._id,
    });

  const totalActivities =
    await Audit.countDocuments({
      user: user._id,
    });

  const joiningDate = new Date(employee.joiningDate);

  const yearsInCompany = Number(
    (
      (Date.now() - joiningDate.getTime()) /
      (1000 * 60 * 60 * 24 * 365)
    ).toFixed(1)
  );

  return {

    yearsInCompany,

    totalNotifications,

    totalActivities,

    department:
      (employee.department as any)?.name ?? "-",

    designation:
      employee.designation,

  };

};

export const getProfileActivity = async (
  userId: string
) => {

  const activities = await Audit.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(10);

  return activities;

};

export const getProfileCompletion = async (
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

  let completed = 0;

  const totalFields = 8;

  if (employee.firstName) completed++;
  if (employee.lastName) completed++;
  if (employee.phone) completed++;
  if (employee.address) completed++;
  if (employee.designation) completed++;
  if (employee.department) completed++;
  if (employee.profileImage) completed++;
  if (employee.joiningDate) completed++;

  const percentage = Math.round(
    (completed / totalFields) * 100
  );

  return {

    completion: percentage,

    completedFields: completed,

    totalFields,

  };

};