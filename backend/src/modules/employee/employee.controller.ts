import { Request, Response } from "express";

import * as employeeService from "./employee.service";

import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";

// Create Employee
export const createEmployee = asyncHandler(async (req: Request, res: Response) => {

  const employee = await employeeService.createEmployee(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      employee,
      "Employee created successfully"
    )
  );

});

// Get All Employees
export const getAllEmployees = asyncHandler(async (req: Request, res: Response) => {

  const employees = await employeeService.getAllEmployees();

  return res.status(200).json(
    new ApiResponse(
      200,
      employees,
      "Employees fetched successfully"
    )
  );

});

// Get Employee By ID
export const getEmployeeById = asyncHandler(async (req: Request, res: Response) => {

  const employee = await employeeService.getEmployeeById(req.params.id);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      employee,
      "Employee fetched successfully"
    )
  );

});

// Update Employee
export const updateEmployee = asyncHandler(async (req: Request, res: Response) => {

  const employee = await employeeService.updateEmployee(
    req.params.id,
    req.body
  );

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      employee,
      "Employee updated successfully"
    )
  );

});

// Delete Employee
export const deleteEmployee = asyncHandler(async (req: Request, res: Response) => {

  const employee = await employeeService.deleteEmployee(req.params.id);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Employee deleted successfully"
    )
  );

});