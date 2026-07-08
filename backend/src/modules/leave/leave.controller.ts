import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";

import * as leaveService from "./leave.service";
import ApiError from "../../utils/ApiError";

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
export const approveLeave = asyncHandler(
  async (req: Request, res: Response) => {

    const leave = await leaveService.approveLeave(
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        leave,
        "Leave approved successfully"
      )
    );
  }
);

export const rejectLeave = asyncHandler(
  async (req: Request, res: Response) => {

    const leave = await leaveService.rejectLeave(
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        leave,
        "Leave rejected successfully"
      )
    );
  }
);

export const getAllLeaves = asyncHandler(
  async (req: Request, res: Response) => {

    const leaves = await leaveService.getAllLeaves();

    return res.status(200).json(
      new ApiResponse(
        200,
        leaves,
        "Leave requests fetched successfully"
      )
    );
  }
);

export const getLeaveById = asyncHandler(
  async (req: Request, res: Response) => {

    const leave = await leaveService.getLeaveById(
      req.params.id
    );

    if (!leave) {
      throw new ApiError(404, "Leave request not found.");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        leave,
        "Leave request fetched successfully"
      )
    );
  }
);