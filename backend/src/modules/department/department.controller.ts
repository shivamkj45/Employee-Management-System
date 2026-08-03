import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";

import * as departmentService from "./department.service";

// Create
export const createDepartment = asyncHandler(async (req: AuthRequest, res: Response) => {

  const department =
  await departmentService.createDepartment(
    req.body,
    req.user!._id.toString()
  );

  return res.status(201).json(
    new ApiResponse(201, department, "Department created successfully")
  );
});

// Get All
export const getAllDepartments = asyncHandler(async (req: AuthRequest, res: Response) => {

  const departments = await departmentService.getAllDepartments();

  return res.status(200).json(
    new ApiResponse(200, departments, "Departments fetched successfully")
  );
});
// Department Statistics
export const getDepartmentStats = asyncHandler(
  async (_req: AuthRequest, res: Response) => {

    const stats =
      await departmentService.getDepartmentStats();

    return res.status(200).json(
      new ApiResponse(
        200,
        stats,
        "Department statistics fetched successfully"
      )
    );
  }
);
// Get By ID
export const getDepartmentById = asyncHandler(async (req: AuthRequest, res: Response) => {

  const department = await departmentService.getDepartmentById(req.params.id);

  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  return res.status(200).json(
    new ApiResponse(200, department, "Department fetched successfully")
  );
});

// Update
export const updateDepartment = asyncHandler(async (req: AuthRequest, res: Response) => {

  const department =
  await departmentService.updateDepartment(
    req.params.id,
    req.body,
    req.user!._id.toString()
  );

  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  return res.status(200).json(
    new ApiResponse(200, department, "Department updated successfully")
  );
});

// Delete
export const deleteDepartment = asyncHandler(async (req: AuthRequest, res: Response) => {

  const department =
  await departmentService.deleteDepartment(
    req.params.id,
    req.user!._id.toString()
  );
  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  return res.status(200).json(
    new ApiResponse(200, null, "Department deleted successfully")
  );
});

// Restore Department
export const restoreDepartment = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const department =
  await departmentService.restoreDepartment(
    req.params.id,
    req.user!._id.toString()
  );

    if (!department) {
      throw new ApiError(
        404,
        "Department not found"
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        department,
        "Department restored successfully"
      )
    );
  }
);