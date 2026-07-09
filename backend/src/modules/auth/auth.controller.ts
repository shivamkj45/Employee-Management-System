import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";

import * as authService from "./auth.service";
import { AuthRequest } from "../../middleware/auth.middleware";
export const register = asyncHandler(
  async (req: Request, res: Response) => {

    const user = await authService.registerUser(

      req.body.employeeId,

      req.body.email,

      req.body.password,

      req.body.role

    );

    return res.status(201).json(

      new ApiResponse(

        201,

        user,

        "User registered successfully"

      )

    );

  }
);
export const login = asyncHandler(
  async (req: Request, res: Response) => {

    const result = await authService.loginUser(
      req.body.email,
      req.body.password
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Login successful"
      )
    );

  }
);

export const getCurrentUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const user = await authService.getCurrentUser(
      req.user!._id.toString()
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        user,
        "Profile fetched successfully"
      )
    );
  }
);

export const changePassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const { oldPassword, newPassword } =
      req.body;

    await authService.changePassword(
      req.user!._id.toString(),
      oldPassword,
      newPassword
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Password changed successfully"
      )
    );
  }
);

export const logoutUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await authService.logoutUser(
      req.user!._id.toString()
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Logged out successfully"
      )
    );
  }
);

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {

    const { refreshToken } = req.body;

    const tokens =
      await authService.refreshUserToken(refreshToken);

    return res.status(200).json(
      new ApiResponse(
        200,
        tokens,
        "Token refreshed successfully"
      )
    );
  }
);