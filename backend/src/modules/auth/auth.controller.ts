import { Request, Response } from "express";

import * as authService from "./auth.service";

export const register = async (
  req: Request,
  res: Response
) => {

  try {

    const {

      employeeId,
      email,
      password,
      role

    } = req.body;

    const user = await authService.registerUser(

      employeeId,

      email,

      password,

      role

    );

    res.status(201).json({

      success: true,

      message: "User Registered Successfully",

      data: user

    });

  }

  catch (error: any) {

    res.status(400).json({

      success: false,

      message: error.message

    });

  }

};