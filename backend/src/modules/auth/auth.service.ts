import { hashPassword } from "./auth.utils";
import User from "../user/user.model";
import Employee from "../employee/employee.model";
import ApiError from "../../utils/ApiError";
import { comparePassword } from "./auth.utils";
import { generateAccessToken,generateRefreshToken,verifyRefreshToken } from "../../utils/jwt";
import { UserRole } from "../../types/roles";
import {
  notifyUser,
  notifyRoles,
} from "../notification/notification.helper";
import { logAction } from "../audit/audit.helper";
export const registerUser = async (
  employeeId: string,
  email: string,
  password: string,
  role: UserRole
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

  if (!user.isActive) {
  throw new ApiError(403, "Your account has been deactivated. Please contact HR.");
}

  const isPasswordValid = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken({
  userId: user._id.toString(),
  email: user.email,
  role: user.role,
});

const refreshToken = generateRefreshToken({
  userId: user._id.toString(),
  email: user.email,
  role: user.role,
});

user.refreshToken = refreshToken;

await user.save();
await logAction(
  user._id.toString(),
  "LOGIN",
  "Authentication",
  "User logged in."
);

return {
  user,
  accessToken,
  refreshToken,
};
};

export const getCurrentUser = async (userId: string) => {
  const user = await User.findById(userId)
    .select("-password -refreshToken")
    .populate({
      path: "employee",
      populate: {
        path: "department",
      },
    });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect =
    await comparePassword(
      oldPassword,
      user.password
    );

  if (!isPasswordCorrect) {
    throw new ApiError(
      400,
      "Old password is incorrect"
    );
  }

  user.password =
    await hashPassword(newPassword);

  await user.save();
  await notifyUser(
  user._id.toString(),
  "Password Changed",
  "Your account password was changed successfully.",
  "info"
);
await logAction(
  user._id.toString(),
  "PASSWORD_CHANGED",
  "Authentication",
  "User changed account password."
);

  return;
};

export const logoutUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.refreshToken = null;

  await user.save();
  await logAction(
  user._id.toString(),
  "LOGOUT",
  "Authentication",
  "User logged out."
);
};

export const refreshUserToken = async (
  refreshToken: string
) => {

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  // Verify JWT
  const decoded = verifyRefreshToken(refreshToken);

  // Find user
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  // Compare stored refresh token
  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  // Generate new access token
  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  // Rotate refresh token
  const newRefreshToken = generateRefreshToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  user.refreshToken = newRefreshToken;

  await user.save();

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};