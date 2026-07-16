import { Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";

import { AuthRequest } from "../../middleware/auth.middleware";

import * as auditService from "./audit.service";

export const getAllAuditLogs = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const logs =
      await auditService.getAuditLogs();

    return res.status(200).json(
      new ApiResponse(
        200,
        logs,
        "Audit logs fetched successfully"
      )
    );
  }
);

export const getMyAuditLogs = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const logs =
      await auditService.getAuditLogsByUser(
        req.user._id.toString()
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        logs,
        "Audit history fetched successfully"
      )
    );
  }
);