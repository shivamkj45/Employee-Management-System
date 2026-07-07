import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";

import * as leaveService from "./leave.service";

export const applyLeave = asyncHandler(
  async (req: Request, res: Response) => {

    const leave = await leaveService.applyLeave(
      req.body.employee,
      req.body.leaveType,
      req.body.startDate,
      req.body.endDate,
      req.body.reason
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        leave,
        "Leave applied successfully"
      )
    );
  }
);