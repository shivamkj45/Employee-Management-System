import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";

import { AuthRequest } from "../../middleware/auth.middleware";

import * as profileService from "./profile.service";
import ApiError from "../../utils/ApiError";
export const getMyProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
     if (!req.user) {
      throw new ApiError(401,"Unauthorized");
    }

    const profile = await profileService.getMyProfile(
      req.user._id.toString()
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        profile,
        "Profile fetched successfully"
      )
    );
  }
);
export const updateMyProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const employee =
      await profileService.updateMyProfile(
        req.user._id.toString(),
        req.body
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        employee,
        "Profile updated successfully"
      )
    );
  }
);