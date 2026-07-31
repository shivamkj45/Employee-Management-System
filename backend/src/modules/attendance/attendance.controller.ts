import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as attendanceService from "./attendance.service";

export const checkIn = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const attendance = await attendanceService.checkIn(
  req.user!.employee._id.toString(),
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
  async (req: AuthRequest, res: Response) => {

    const attendance =
  await attendanceService.checkOut(
    req.user!.employee._id.toString()
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
  await attendanceService.getTodayAttendance(
    req.query.date as string | undefined
  );

    return res.status(200).json(
      new ApiResponse(
        200,
        attendance,
        "Today's attendance fetched successfully"
      )
    );
  }
);

export const getAttendanceHistory =
asyncHandler(async (req, res) => {

  const attendance =
    await attendanceService.getEmployeeAttendanceHistory(
      req.params.id
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      attendance,
      "Attendance history fetched successfully"
    )
  );
});