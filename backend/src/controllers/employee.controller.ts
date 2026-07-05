import { Request, Response } from "express";
import * as employeeService from "../services/employee.service";

export const createEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const employee = await employeeService.createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create employee",
      error,
    });
  }
};