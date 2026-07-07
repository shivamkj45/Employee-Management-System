import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";

import * as attendanceService from "./attendance.service";

export const checkIn = asyncHandler(
  async (req: Request, res: Response) => {

    const attendance = await attendanceService.checkIn(
      req.body.employee,
      req.body.remarks
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        attendance,
        "Check-in successful"
      )
    );
  }
);
export const checkOut = asyncHandler(
  async (req: Request, res: Response) => {

    const attendance = await attendanceService.checkOut(
      req.body.employee
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        attendance,
        "Check-out successful"
      )
    );
  }
);
export const getTodayAttendance = asyncHandler(
  async (req, res) => {

    const attendance =
      await attendanceService.getTodayAttendance();

    return res.status(200).json(
      new ApiResponse(
        200,
        attendance,
        "Today's attendance fetched successfully"
      )
    );
  }
);