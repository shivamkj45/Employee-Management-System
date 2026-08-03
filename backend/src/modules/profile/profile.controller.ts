import { Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";

import { AuthRequest } from "../../middleware/auth.middleware";

import * as profileService from "./profile.service";

/* ===============================
   GET MY PROFILE
================================ */

export const getMyProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const profile =
      await profileService.getMyProfile(
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

/* ===============================
   UPDATE PROFILE
================================ */

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

/* ===============================
   PROFILE STATS
================================ */

export const getProfileStats = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const stats =
      await profileService.getProfileStats(
        req.user._id.toString()
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        stats,
        "Profile statistics fetched successfully"
      )
    );

  }
);

/* ===============================
   PROFILE ACTIVITY
================================ */

export const getProfileActivity = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const activity =
      await profileService.getProfileActivity(
        req.user._id.toString()
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        activity,
        "Profile activity fetched successfully"
      )
    );

  }
);

/* ===============================
   PROFILE COMPLETION
================================ */

export const getProfileCompletion = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const completion =
      await profileService.getProfileCompletion(
        req.user._id.toString()
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        completion,
        "Profile completion fetched successfully"
      )
    );

  }
);