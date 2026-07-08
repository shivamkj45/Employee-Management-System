import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";

import * as dashboardService from "./dashboard.service";

export const getDashboardSummary = asyncHandler(
  async (_req: Request, res: Response) => {
    const summary =
      await dashboardService.getDashboardSummary();

    return res.status(200).json(
      new ApiResponse(
        200,
        summary,
        "Dashboard summary fetched successfully"
      )
    );
  }
);