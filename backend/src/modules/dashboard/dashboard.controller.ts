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
export const getRecentEmployees = asyncHandler(
  async (_req: Request, res: Response) => {

    const employees =
      await dashboardService.getRecentEmployees();

    return res.status(200).json(
      new ApiResponse(
        200,
        employees,
        "Recent employees fetched successfully"
      )
    );
  }
);

export const getDepartmentStats = asyncHandler(
  async (_req: Request, res: Response) => {

    const stats =
      await dashboardService.getDepartmentStats();

    return res.status(200).json(
      new ApiResponse(
        200,
        stats,
        "Department statistics fetched successfully"
      )
    );
  }
);
export const getAttendanceTrend = asyncHandler(
  async (_req: Request, res: Response) => {

    const trend =
      await dashboardService.getAttendanceTrend();

    return res.status(200).json(
      new ApiResponse(
        200,
        trend,
        "Attendance trend fetched successfully"
      )
    );
  }
);