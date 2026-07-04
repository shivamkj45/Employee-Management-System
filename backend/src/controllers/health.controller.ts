import { Request, Response } from "express";

export const getHealth = (
  req: Request,
  res: Response
): void => {
  res.status(200).json({
    success: true,
    message: "Employee Management API is running 🚀",
  });
};