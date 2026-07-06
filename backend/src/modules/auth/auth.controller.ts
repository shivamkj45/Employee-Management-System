import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";

import * as authService from "./auth.service";

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